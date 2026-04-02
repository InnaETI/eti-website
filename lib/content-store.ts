import path from 'path';
import {
  getAllBlogPostSummaries,
  getAllPageSlugs,
  getAllPageSummaries,
  getBlogPostContent,
  getBlogPostSlugs,
  getGlobalContent,
  getHomeContent,
  getPageContent,
  getUploadsDir,
  getUploadsPath,
  writeBlogPost,
  writeGlobalContent,
  writeHomeContent,
  writePageContent,
  type BlogPostContent,
  type BlogPostSummary,
  type GlobalContent,
  type PageContent,
  type PageSummary,
} from '@/lib/content';

type StorageMode = 'local' | 'github';

export type StorageBackendInfo = {
  mode: StorageMode;
  label: string;
  repo?: string;
  branch?: string;
  productionBranch?: string;
  canPublishToProduction: boolean;
  message: string;
  stagingUrl?: string;
  productionUrl?: string;
};

type GitHubConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  productionBranch: string;
};

const CONTENT_BACKEND = process.env.CONTENT_BACKEND?.toLowerCase();

function getGitHubConfig(): GitHubConfig | null {
  if (CONTENT_BACKEND !== 'github') return null;

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_STAGING_BRANCH || 'staging';
  const productionBranch = process.env.GITHUB_PRODUCTION_BRANCH || 'main';

  if (!token || !owner || !repo) {
    return null;
  }

  return { token, owner, repo, branch, productionBranch };
}

export function getStorageBackendInfo(): StorageBackendInfo {
  const github = getGitHubConfig();
  const stagingUrl = process.env.NEXT_PUBLIC_STAGING_SITE_URL || 'https://eti-website.vercel.app';
  const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_SITE_URL;

  if (!github) {
    return {
      mode: 'local',
      label: 'Local file mode',
      canPublishToProduction: false,
      stagingUrl,
      productionUrl,
      message:
        CONTENT_BACKEND === 'github'
          ? 'GitHub mode was requested but required GitHub environment variables are missing, so the admin is using the local repository files instead.'
          : 'Edits save to the local repository files. Commit and push to staging to publish changes.',
    };
  }

  return {
    mode: 'github',
    label: 'GitHub staging mode',
    repo: `${github.owner}/${github.repo}`,
    branch: github.branch,
    productionBranch: github.productionBranch,
    canPublishToProduction: true,
    stagingUrl,
    productionUrl,
    message:
      'Edits save directly to the configured GitHub staging branch. Review the site there before promoting to production.',
  };
}

export async function promoteStagingToProduction() {
  const github = getGitHubConfig();
  if (!github) {
    throw new Error('GitHub-backed publishing is not configured.');
  }

  const url = `https://api.github.com/repos/${github.owner}/${github.repo}/merges`;
  return githubFetchJson<{ sha: string; message: string }>(url, github, {
    method: 'POST',
    body: JSON.stringify({
      base: github.productionBranch,
      head: github.branch,
      commit_message: `Promote ${github.branch} to ${github.productionBranch}`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getContentsUrl(repoPath: string, config: GitHubConfig) {
  return `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${repoPath}?ref=${encodeURIComponent(config.branch)}`;
}

async function githubFetchJson<T>(url: string, config: GitHubConfig, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function githubGetFile(repoPath: string, config: GitHubConfig): Promise<{ content: string; sha?: string } | null> {
  const url = getContentsUrl(repoPath, config);
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`GitHub file request failed: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as { content?: string; encoding?: string; sha?: string };
  const encoded = json.content?.replace(/\n/g, '') ?? '';
  const content = Buffer.from(encoded, json.encoding === 'base64' ? 'base64' : 'utf8').toString('utf8');

  return { content, sha: json.sha };
}

async function githubReadJson<T>(repoPath: string, config: GitHubConfig): Promise<T | null> {
  const file = await githubGetFile(repoPath, config);
  if (!file) return null;
  return JSON.parse(file.content) as T;
}

async function githubWriteFile(repoPath: string, content: string, message: string, config: GitHubConfig) {
  const existing = await githubGetFile(repoPath, config);
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${repoPath}`;
  const payload: Record<string, unknown> = {
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: config.branch,
  };

  if (existing?.sha) {
    payload.sha = existing.sha;
  }

  await githubFetchJson(url, config, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function githubListDirectory(dir: string, config: GitHubConfig): Promise<Array<{ name: string; type: string }>> {
  const url = getContentsUrl(dir, config);
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  });

  if (response.status === 404) return [];
  if (!response.ok) {
    throw new Error(`GitHub directory request failed: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as Array<{ name: string; type: string }>;
  return json;
}

function parseGitHubMdxBlog(slug: string, raw: string): BlogPostContent {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  const frontmatter = match ? match[1] : '';
  const body = match ? match[2].trim() : raw;
  const title = frontmatter.match(/title:\s*["']?([^"'\n]+)/)?.[1]?.trim() ?? slug;
  const excerpt = frontmatter.match(/excerpt:\s*["']?([^"'\n]+)/)?.[1]?.trim() ?? body.slice(0, 160);
  const date = frontmatter.match(/date:\s*(\S+)/)?.[1] ?? '';
  const image = frontmatter.match(/image:\s*["']?([^"'\n]+)/)?.[1]?.trim();
  return { slug, title, date, excerpt, body, image };
}

async function githubReadBlogPost(slug: string, config: GitHubConfig): Promise<BlogPostContent | null> {
  const jsonFile = await githubReadJson<BlogPostContent>(`content/blog/${slug}.json`, config);
  if (jsonFile) return jsonFile;

  const mdxFile = await githubGetFile(`content/blog/${slug}.mdx`, config);
  if (!mdxFile) return null;
  return parseGitHubMdxBlog(slug, mdxFile.content);
}

function formatJson(data: unknown) {
  return `${JSON.stringify(data, null, 2)}\n`;
}

export async function getGlobalContentFromStore(): Promise<GlobalContent | null> {
  const github = getGitHubConfig();
  if (!github) return getGlobalContent();
  try {
    return await githubReadJson<GlobalContent>('content/global.json', github);
  } catch {
    return getGlobalContent();
  }
}

export async function getHomeContentFromStore(): Promise<Record<string, unknown> | null> {
  const github = getGitHubConfig();
  if (!github) return getHomeContent();
  try {
    return await githubReadJson<Record<string, unknown>>('content/home.json', github);
  } catch {
    return getHomeContent();
  }
}

export async function getPageContentFromStore(slug: string): Promise<PageContent | null> {
  const github = getGitHubConfig();
  if (!github) return getPageContent(slug);
  const safe = slug.replace(/[^a-z0-9-]/gi, '');
  try {
    return await githubReadJson<PageContent>(`content/pages/${safe}.json`, github);
  } catch {
    return getPageContent(slug);
  }
}

export async function getAllPageSlugsFromStore(): Promise<string[]> {
  const github = getGitHubConfig();
  if (!github) return getAllPageSlugs();
  try {
    const files = await githubListDirectory('content/pages', github);
    return files
      .filter((entry) => entry.type === 'file' && entry.name.endsWith('.json'))
      .map((entry) => entry.name.replace(/\.json$/, ''))
      .sort();
  } catch {
    return getAllPageSlugs();
  }
}

export async function getAllPageSummariesFromStore(): Promise<PageSummary[]> {
  const slugs = await getAllPageSlugsFromStore();
  const pages = await Promise.all(slugs.map((slug) => getPageContentFromStore(slug)));
  return pages
    .flatMap((page, index) =>
      page
        ? [
            {
              slug: slugs[index],
              title: page.title ?? slugs[index],
              subheading: page.subheading,
              bannerImage: page.bannerImage,
            },
          ]
        : []
    )
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getBlogPostContentFromStore(slug: string): Promise<BlogPostContent | null> {
  const github = getGitHubConfig();
  if (!github) return getBlogPostContent(slug);
  try {
    return await githubReadBlogPost(slug, github);
  } catch {
    return getBlogPostContent(slug);
  }
}

export async function getBlogPostSlugsFromStore(): Promise<string[]> {
  const github = getGitHubConfig();
  if (!github) return getBlogPostSlugs();
  try {
    const files = await githubListDirectory('content/blog', github);
    return files
      .filter((entry) => entry.type === 'file' && /\.(json|mdx)$/.test(entry.name))
      .map((entry) => entry.name.replace(/\.(json|mdx)$/, ''))
      .sort();
  } catch {
    return getBlogPostSlugs();
  }
}

export async function getAllBlogPostSummariesFromStore(): Promise<BlogPostSummary[]> {
  const github = getGitHubConfig();
  if (!github) return getAllBlogPostSummaries();
  try {
    const slugs = await getBlogPostSlugsFromStore();
    const posts = await Promise.all(slugs.map((slug) => getBlogPostContentFromStore(slug)));
    return posts
      .filter((post): post is BlogPostContent => Boolean(post))
      .map((post) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        image: post.image,
      }))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  } catch {
    return getAllBlogPostSummaries();
  }
}

export async function writeGlobalContentToStore(data: GlobalContent) {
  const github = getGitHubConfig();
  if (!github) {
    writeGlobalContent(data);
    return;
  }
  await githubWriteFile('content/global.json', formatJson(data), 'Update global content', github);
}

export async function writeHomeContentToStore(data: Record<string, unknown>) {
  const github = getGitHubConfig();
  if (!github) {
    writeHomeContent(data);
    return;
  }
  await githubWriteFile('content/home.json', formatJson(data), 'Update homepage content', github);
}

export async function writePageContentToStore(slug: string, data: PageContent) {
  const safe = slug.replace(/[^a-z0-9-]/gi, '');
  const github = getGitHubConfig();
  if (!github) {
    writePageContent(safe, data);
    return;
  }
  await githubWriteFile(`content/pages/${safe}.json`, formatJson(data), `Update page content: ${safe}`, github);
}

export async function writeBlogPostToStore(slug: string, data: BlogPostContent) {
  const safe = slug.replace(/[^a-z0-9-]/gi, '');
  const github = getGitHubConfig();
  if (!github) {
    writeBlogPost(safe, data);
    return;
  }
  await githubWriteFile(`content/blog/${safe}.json`, formatJson(data), `Update blog post: ${safe}`, github);
}

export async function saveUploadToStore(file: File): Promise<string> {
  const ext = path.extname(file.name).toLowerCase() || '.jpg';
  const base = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
  const relativePath = base;
  const publicPath = `/uploads/${relativePath}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const github = getGitHubConfig();
  if (!github) {
    const dest = getUploadsPath(relativePath);
    getUploadsDir();
    const fs = await import('fs');
    fs.writeFileSync(dest, bytes);
    return publicPath;
  }

  // Keep a local mirror so previews still work in the current dev session.
  const fs = await import('fs');
  getUploadsDir();
  fs.writeFileSync(getUploadsPath(relativePath), bytes);

  const existing = await githubGetFile(`public/uploads/${relativePath}`, github);
  const url = `https://api.github.com/repos/${github.owner}/${github.repo}/contents/public/uploads/${relativePath}`;
  const payload: Record<string, unknown> = {
    message: `Upload asset: ${relativePath}`,
    content: bytes.toString('base64'),
    branch: github.branch,
  };

  if (existing?.sha) {
    payload.sha = existing.sha;
  }

  await githubFetchJson(url, github, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return publicPath;
}

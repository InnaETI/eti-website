import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

export type GlobalContent = {
  siteName: string;
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  social: { facebook?: string; linkedin?: string };
  nav: Array<{ href: string; label: string }>;
  footerLinks: Array<{ href: string; label: string }>;
  copyrightText: string;
  logoUrl: string;
  footerLogoUrl: string;
};

export type PageContent = {
  title: string;
  subheading?: string;
  bannerImage?: string;
  body?: string;
  [key: string]: unknown;
};

export type BlogPostContent = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  image?: string;
};

function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(filePath: string, data: unknown): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getGlobalContent(): GlobalContent | null {
  return readJson<GlobalContent>(path.join(CONTENT_DIR, 'global.json'));
}

export function getHomeContent(): Record<string, unknown> | null {
  return readJson<Record<string, unknown>>(path.join(CONTENT_DIR, 'home.json'));
}

export function getPageContent(slug: string): PageContent | null {
  const safe = slug.replace(/[^a-z0-9-]/gi, '');
  const filePath = path.join(PAGES_DIR, `${safe}.json`);
  return readJson<PageContent>(filePath);
}

export function getAllPageSlugs(): string[] {
  if (!fs.existsSync(PAGES_DIR)) return [];
  return fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

export function writePageContent(slug: string, data: PageContent): void {
  const safe = slug.replace(/[^a-z0-9-]/gi, '');
  const filePath = path.join(PAGES_DIR, `${safe}.json`);
  writeJson(filePath, data);
}

export function writeGlobalContent(data: GlobalContent): void {
  writeJson(path.join(CONTENT_DIR, 'global.json'), data);
}

export function writeHomeContent(data: Record<string, unknown>): void {
  writeJson(path.join(CONTENT_DIR, 'home.json'), data);
}

/** Blog: list .json and .mdx; read post by slug. */
export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.(json|mdx)$/, ''));
}

export function getBlogPostContent(slug: string): BlogPostContent | null {
  const jsonPath = path.join(BLOG_DIR, `${slug}.json`);
  if (fs.existsSync(jsonPath)) return readJson<BlogPostContent>(jsonPath);
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(mdxPath)) return null;
  const raw = fs.readFileSync(mdxPath, 'utf-8');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  const frontmatter = match ? match[1] : '';
  const body = match ? match[2].trim() : raw;
  const title = frontmatter.match(/title:\s*["']?([^"'\n]+)/)?.[1]?.trim() ?? slug;
  const excerpt = frontmatter.match(/excerpt:\s*["']?([^"'\n]+)/)?.[1]?.trim() ?? body.slice(0, 160);
  const date = frontmatter.match(/date:\s*(\S+)/)?.[1] ?? '';
  const image = frontmatter.match(/image:\s*["']?([^"'\n]+)/)?.[1]?.trim();
  return { slug, title, date, excerpt, body, image };
}

export function writeBlogPost(slug: string, data: BlogPostContent): void {
  const filePath = path.join(BLOG_DIR, `${slug}.json`);
  writeJson(filePath, data);
}

export function getUploadsDir(): string {
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  return UPLOADS_DIR;
}

export function getUploadsPath(relativePath: string): string {
  return path.join(getUploadsDir(), relativePath);
}

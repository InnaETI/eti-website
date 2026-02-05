import fs from 'fs';
import path from 'path';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  /** Present for WordPress HTML posts; use for rendering body. */
  bodyHtml?: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const WP_PAGES_DIR = path.join(process.cwd(), 'wordpress-pages');

// WordPress blog posts live under wordpress-pages/YYYY/MM/DD/slug.html
const WP_POST_YEARS = ['2020', '2022', '2023', '2024'];

function getSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
}

function getPostBySlugMdx(slug: string): BlogPost | null {
  const base = slug.replace(/\.mdx$/, '');
  const filePath = path.join(CONTENT_DIR, `${base}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  const frontmatter = match ? match[1] : '';
  const title = frontmatter.match(/title:\s*["']?([^"'\n]+)/)?.[1] ?? base;
  const excerpt =
    frontmatter.match(/excerpt:\s*["']?([^"'\n]+)/)?.[1] ?? raw.slice(0, 160).replace(/\n/g, ' ');
  const date = frontmatter.match(/date:\s*(\S+)/)?.[1] ?? '';
  const author = frontmatter.match(/author:\s*["']?([^"'\n]+)/)?.[1];
  return { slug: base, title, excerpt, date, author };
}

export function getPostContent(slug: string): string | null {
  const base = slug.replace(/\.mdx$/, '');
  const filePath = path.join(CONTENT_DIR, `${base}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)$/);
  return match ? match[1].trim() : raw;
}

// Discover all WordPress post HTML paths (YYYY/MM/DD/slug.html)
function getWpPostPaths(): string[] {
  const paths: string[] = [];
  for (const year of WP_POST_YEARS) {
    const yearDir = path.join(WP_PAGES_DIR, year);
    if (!fs.existsSync(yearDir)) continue;
    const months = fs.readdirSync(yearDir);
    for (const month of months) {
      const monthDir = path.join(yearDir, month);
      if (!fs.statSync(monthDir).isDirectory()) continue;
      const days = fs.readdirSync(monthDir);
      for (const day of days) {
        const dayDir = path.join(monthDir, day);
        if (!fs.statSync(dayDir).isDirectory()) continue;
        const files = fs.readdirSync(dayDir).filter((f) => f.endsWith('.html'));
        for (const file of files) {
          paths.push(path.join(dayDir, file));
        }
      }
    }
  }
  return paths;
}

function parseWpPostHtml(filePath: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const slug = path.basename(filePath, '.html');

    const ogTitle = raw.match(/<meta\s+property="og:title"\s+content="([^"]+)"/)?.[1];
    const titleTag = raw.match(/<title>([^<]+)<\/title>/)?.[1];
    const title = (ogTitle || titleTag || slug)
      .replace(/\s*[-|]\s*ETI\s*$/i, '')
      .trim();

    const published = raw.match(/<meta\s+property="article:published_time"\s+content="([^"]+)"/)?.[1];
    const pathMatch = filePath.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
    const date = published
      ? published.slice(0, 10)
      : pathMatch
        ? `${pathMatch[1]}-${pathMatch[2]}-${pathMatch[3]}`
        : '';

    const desc = raw.match(/<meta\s+name="description"\s+content="([^"]+)"/)?.[1];
    const ogDesc = raw.match(/<meta\s+property="og:description"\s+content="([^"]+)"/)?.[1];
    let excerpt = (desc || ogDesc || '').replace(/&#039;/g, "'").replace(/&#8217;/g, "'").trim();
    if (!excerpt) {
      const firstP = raw.match(/<div class="blog-sidebar-img-wrapper-1">\s*([\s\S]*?)<\/div>/)?.[1];
      if (firstP) {
        const text = firstP.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200);
        if (text) excerpt = text + (text.length >= 200 ? '…' : '');
      }
    }

    const postedBy = raw.match(/Posted by:\s*([^,]+)/)?.[1]?.trim();
    const author = postedBy || undefined;

    const bodyMatch = raw.match(/<div class="blog-sidebar-img-wrapper-1">([\s\S]*?)<\/div>\s*<div class="side-sidebar-blog-media/);
    let bodyHtml = bodyMatch ? bodyMatch[1].trim() : '';
    if (bodyHtml) {
      bodyHtml = bodyHtml
        .replace(/data-srcset=/g, 'srcset=')
        .replace(/data-src=/g, 'src=')
        .replace(/src="data:image\/gif[^"]*"/g, '');
    }

    return { slug, title, excerpt: excerpt || title, date, author, bodyHtml };
  } catch {
    return null;
  }
}

function getWpPostBySlug(slug: string, includeBody = true): BlogPost | null {
  const paths = getWpPostPaths();
  const normalized = slug.replace(/\.html$/, '');
  const filePath = paths.find((p) => path.basename(p, '.html') === normalized);
  if (!filePath) return null;
  const post = parseWpPostHtml(filePath);
  if (!post || !includeBody) return post;
  return post;
}

function getAllWpPosts(includeBody = false): BlogPost[] {
  const paths = getWpPostPaths();
  const posts = paths
    .map((p) => parseWpPostHtml(p))
    .filter((p): p is BlogPost => p !== null);
  if (!includeBody) {
    posts.forEach((p) => delete (p as { bodyHtml?: string }).bodyHtml);
  }
  return posts;
}

export function getAllPosts(): BlogPost[] {
  const mdxSlugs = getSlugs();
  const mdxPosts = mdxSlugs
    .map((s) => getPostBySlugMdx(s.replace(/\.mdx$/, '')))
    .filter((p): p is BlogPost => p !== null);
  const wpPosts = getAllWpPosts(false);
  const bySlug = new Map<string, BlogPost>();
  for (const p of wpPosts) bySlug.set(p.slug, p);
  for (const p of mdxPosts) bySlug.set(p.slug, p); // MDX overrides WP if same slug
  return Array.from(bySlug.values()).sort((a, b) => {
    const aTime = Date.parse(a.date || '');
    const bTime = Date.parse(b.date || '');
    if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
      return bTime - aTime;
    }
    if (!Number.isNaN(bTime)) return 1;
    if (!Number.isNaN(aTime)) return -1;
    return a.slug.localeCompare(b.slug);
  });
}

export function getLatestPosts(limit: number): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getPost(slug: string): BlogPost | null {
  const mdx = getPostBySlugMdx(slug);
  if (mdx) return mdx;
  return getWpPostBySlug(slug, true);
}

import fs from 'fs';
import path from 'path';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author?: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

function getSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
}

function getPostBySlug(slug: string): BlogPost | null {
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

export function getAllPosts(): BlogPost[] {
  const slugs = getSlugs();
  const posts = slugs
    .map((s) => getPostBySlug(s.replace(/\.mdx$/, '')))
    .filter((p): p is BlogPost => p !== null);
  return posts.sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getLatestPosts(limit: number): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getPost(slug: string): BlogPost | null {
  return getPostBySlug(slug);
}

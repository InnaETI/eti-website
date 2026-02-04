#!/usr/bin/env node
/**
 * Fetches full HTML from live WordPress (emergingti.com) for each page,
 * downloads all referenced assets to public/wp-content, and saves
 * rewritten HTML to wordpress-pages/ for pixel-identical serving.
 * Uses public URLs only (no admin auth).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.emergingti.com';
const PAGES = [
  '',
  'about-us/',
  'services/',
  'clients/',
  'team/',
  'careers/',
  'blog/',
  'contact-us/',
  'privacy-policy/',
  'rfp-wizard/',
  'strategy/',
  'methodology/',
  'execution/',
  'career/',
];

const WP_CONTENT_PUBLIC = path.join(ROOT, 'public', 'wp-content');
const WORDPRESS_PAGES_DIR = path.join(ROOT, 'wordpress-pages');
const fetchedPages = new Set();

function extractUrls(html) {
  const urls = new Set();
  const patterns = [
    /href\s*=\s*["'](https?:\/\/[^"']+)["']/gi,
    /src\s*=\s*["'](https?:\/\/[^"']+)["']/gi,
    /data-src\s*=\s*["'](https?:\/\/[^"']+)["']/gi,
    /url\s*\(\s*["']?(https?:\/\/[^"')]+)["']?\s*\)/gi,
    /url\s*\(\s*["']?(https?:\/\/[^"')]+)["']?\s*\)/gi,
    /content\s*=\s*["'](https?:\/\/[^"']+)["']/gi,
    /["'](https:\/\/www\.emergingti\.com\/[^"'\s>]+)["']/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html)) !== null) urls.add(m[1]);
  }
  return [...urls];
}

function rewriteHtml(html) {
  let out = html;
  out = out.replaceAll('https://www.emergingti.com/wp-content/', '/wp-content/');
  out = out.replaceAll('https://www.emergingti.com/wp-includes/', '/wp-includes/');
  out = out.replaceAll('https://www.emergingti.com/', '/');
  out = out.replaceAll('http://www.emergingti.com/', '/');
  return out;
}

function urlToLocalPath(url) {
  if (!url.startsWith(BASE + '/')) return null;
  const pathname = new URL(url).pathname;
  if (pathname.startsWith('/wp-content/')) return path.join(WP_CONTENT_PUBLIC, pathname.replace(/^\/wp-content\//, ''));
  if (pathname.startsWith('/wp-includes/')) return path.join(ROOT, 'public', 'wp-includes', pathname.replace(/^\/wp-includes\//, ''));
  return null;
}

async function download(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ETI-fetch/1.0)' } });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.warn('Fetch failed:', url, e.message);
    return null;
  }
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function saveAsset(url) {
  const localPath = urlToLocalPath(url);
  if (!localPath) return;
  const exists = fs.existsSync(localPath);
  let buf = null;
  if (!exists) {
    buf = await download(url);
    if (!buf) return;
    await ensureDir(path.dirname(localPath));
    fs.writeFileSync(localPath, buf);
    console.log('  saved:', url.replace(BASE, ''));
  }

  // If CSS (or LESS), fetch referenced assets (fonts, images)
  if (localPath.endsWith('.css') || localPath.endsWith('.less')) {
    const cssText = exists ? fs.readFileSync(localPath, 'utf-8') : buf.toString('utf-8');
    const assets = extractCssUrls(cssText, url);
    for (const assetUrl of assets) {
      await saveAsset(assetUrl);
    }
  }
}

async function fetchPage(pathSegment) {
  const url = pathSegment ? `${BASE}/${pathSegment}` : BASE + '/';
  console.log('Fetching', url);
  const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ETI-fetch/1.0)' } });
  if (!res.ok) {
    console.warn('Failed', res.status, url);
    return null;
  }
  const html = await res.text();
  const urls = extractUrls(html);
  const wpUrls = urls.filter((u) => u.startsWith(BASE) && (u.includes('/wp-content/') || u.includes('/wp-includes/')));
  for (const u of wpUrls) await saveAsset(u);
  const rewritten = rewriteHtml(html);
  const filename = pathSegment ? pathSegment.replace(/\/$/, '') + '.html' : 'index.html';
  await ensureDir(WORDPRESS_PAGES_DIR);
  const outPath = path.join(WORDPRESS_PAGES_DIR, filename);
  fs.writeFileSync(outPath, rewritten, 'utf-8');
  console.log('  wrote', filename);
  return rewritten;
}

/** Extract internal blog post URLs from HTML: /YYYY/MM/DD/slug/ */
function extractBlogPostPaths(html) {
  const paths = new Set();
  const re = /href=["']\/(\d{4}\/\d{2}\/\d{2}\/[^"'\s?#]+)\/?["']/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    paths.add(m[1].replace(/\/$/, ''));
  }
  return [...paths];
}

/** Extract category and tag archive URLs: /category/slug/, /tag/slug/ */
function extractCategoryAndTagPaths(html) {
  const paths = new Set();
  const reCategory = /href=["']\/category\/([^"'\s?#\/]+)\/?["']/g;
  const reTag = /href=["']\/tag\/([^"'\s?#\/]+)\/?["']/g;
  let m;
  while ((m = reCategory.exec(html)) !== null) paths.add('category/' + m[1]);
  while ((m = reTag.exec(html)) !== null) paths.add('tag/' + m[1]);
  return [...paths];
}

/** Extract blog pagination paths: /blog/page/2/ etc. */
function extractBlogPaginationPaths(html) {
  const paths = new Set();
  const re = /href=["']\/blog\/page\/(\d+)\/?["']/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    paths.add(`blog/page/${m[1]}`);
  }
  return [...paths];
}

/** Extract pagination for category/tag: /category/slug/page/2/ or /tag/slug/page/2/ */
function extractArchivePaginationPaths(html) {
  const paths = new Set();
  const re = /href=["']\/((?:category|tag)\/[^"'\s?#\/]+)\/page\/(\d+)\/?["']/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    paths.add(`${m[1]}/page/${m[2]}`);
  }
  return [...paths];
}

function extractCssUrls(cssText, baseUrl) {
  const urls = new Set();
  const re = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
  let m;
  while ((m = re.exec(cssText)) !== null) {
    const raw = m[1].trim();
    if (!raw || raw.startsWith('data:')) continue;
    try {
      const resolved = new URL(raw, baseUrl).toString();
      if (resolved.startsWith(BASE)) urls.add(resolved);
    } catch {
      // ignore invalid urls
    }
  }
  return [...urls];
}

/** Fetch a page by full path (e.g. 2024/02/24/slug) and save to wordpress-pages/YYYY/MM/DD/slug.html */
async function fetchPageByPath(fullPath) {
  const normalized = fullPath.replace(/^\/+/, '').replace(/\/+$/, '');
  if (fetchedPages.has(normalized)) return true;
  fetchedPages.add(normalized);
  const url = `${BASE}/${normalized}/`;
  console.log('Fetching page', url);
  const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ETI-fetch/1.0)' } });
  if (!res.ok) {
    console.warn('Failed', res.status, url);
    return false;
  }
  const html = await res.text();
  const urls = extractUrls(html);
  const wpUrls = urls.filter((u) => u.startsWith(BASE) && (u.includes('/wp-content/') || u.includes('/wp-includes/')));
  for (const u of wpUrls) await saveAsset(u);
  const rewritten = rewriteHtml(html);
  const outPath = path.join(WORDPRESS_PAGES_DIR, normalized + '.html');
  await ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, rewritten, 'utf-8');
  console.log('  wrote', normalized + '.html');
  return true;
}

async function main() {
  await ensureDir(WP_CONTENT_PUBLIC);
  await ensureDir(WORDPRESS_PAGES_DIR);
  const args = process.argv.slice(2).filter(Boolean);
  if (args.length) {
    for (const arg of args) {
      await fetchPageByPath(arg);
    }
    console.log('Done. HTML in wordpress-pages/, assets in public/wp-content/');
    return;
  }
  for (const segment of PAGES) {
    await fetchPage(segment);
  }
  const blogHtmlPath = path.join(WORDPRESS_PAGES_DIR, 'blog.html');
  if (fs.existsSync(blogHtmlPath)) {
    const blogHtml = fs.readFileSync(blogHtmlPath, 'utf-8');
    const blogPaths = extractBlogPostPaths(blogHtml);
    for (const p of blogPaths) {
      await fetchPageByPath(p);
    }
    const blogPagination = extractBlogPaginationPaths(blogHtml);
    for (const p of blogPagination) {
      await fetchPageByPath(p);
      const pageHtmlPath = path.join(WORDPRESS_PAGES_DIR, p + '.html');
      if (fs.existsSync(pageHtmlPath)) {
        const pageHtml = fs.readFileSync(pageHtmlPath, 'utf-8');
        const morePosts = extractBlogPostPaths(pageHtml);
        for (const post of morePosts) {
          await fetchPageByPath(post);
        }
      }
    }
    // Try additional blog pages even if not linked
    for (let page = 2; page <= 15; page += 1) {
      const pathKey = `blog/page/${page}`;
      const ok = await fetchPageByPath(pathKey);
      if (!ok) break;
      const pageHtmlPath = path.join(WORDPRESS_PAGES_DIR, pathKey + '.html');
      if (fs.existsSync(pageHtmlPath)) {
        const pageHtml = fs.readFileSync(pageHtmlPath, 'utf-8');
        const morePosts = extractBlogPostPaths(pageHtml);
        for (const post of morePosts) {
          await fetchPageByPath(post);
        }
      }
    }
    const categoryTagPaths = extractCategoryAndTagPaths(blogHtml);
    for (const p of categoryTagPaths) {
      await fetchPageByPath(p);
      const archiveHtmlPath = path.join(WORDPRESS_PAGES_DIR, p + '.html');
      if (fs.existsSync(archiveHtmlPath)) {
        const archiveHtml = fs.readFileSync(archiveHtmlPath, 'utf-8');
        const archivePages = extractArchivePaginationPaths(archiveHtml);
        for (const ap of archivePages) {
          await fetchPageByPath(ap);
        }
      }
    }
  }
  console.log('Done. HTML in wordpress-pages/, assets in public/wp-content/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

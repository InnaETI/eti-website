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
  const rest = url.slice(BASE.length);
  if (rest.startsWith('/wp-content/')) return path.join(WP_CONTENT_PUBLIC, rest.replace(/^\/wp-content\//, ''));
  if (rest.startsWith('/wp-includes/')) return path.join(ROOT, 'public', 'wp-includes', rest.replace(/^\/wp-includes\//, ''));
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
  if (fs.existsSync(localPath)) return;
  const buf = await download(url);
  if (!buf) return;
  await ensureDir(path.dirname(localPath));
  fs.writeFileSync(localPath, buf);
  console.log('  saved:', url.replace(BASE, ''));
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

async function main() {
  await ensureDir(WP_CONTENT_PUBLIC);
  await ensureDir(WORDPRESS_PAGES_DIR);
  for (const segment of PAGES) {
    await fetchPage(segment);
  }
  console.log('Done. HTML in wordpress-pages/, assets in public/wp-content/');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

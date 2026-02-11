import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const WORDPRESS_PAGES_DIR = path.join(process.cwd(), 'wordpress-pages');
const WP_BASE = 'https://www.emergingti.com';

const PAGE_FILES: Record<string, string> = {
  '': 'index.html',
  'about-us': 'about-us.html',
  'services': 'services.html',
  'clients': 'clients.html',
  'team': 'team.html',
  'careers': 'careers.html',
  'blog': 'blog.html',
  'contact-us': 'contact-us.html',
  'privacy-policy': 'privacy-policy.html',
  'rfp-wizard': 'rfp-wizard.html',
  'strategy': 'strategy.html',
  'methodology': 'methodology.html',
  'execution': 'execution.html',
  'career': 'career.html',
};

const LAZYLOAD_FALLBACK =
  '<script>(function(){function l(){document.querySelectorAll(".lazyload[data-src]").forEach(function(e){e.src=e.getAttribute("data-src")||"";e.removeAttribute("data-src")});document.querySelectorAll(".lazyload[data-srcset]").forEach(function(e){e.srcset=e.getAttribute("data-srcset")||"";e.removeAttribute("data-srcset")})}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",l);else l();setTimeout(l,500);setTimeout(l,1500);})();</script>';

function rewriteWpHtml(html: string): string {
  let out = html
    // Protocol-relative URLs - most specific first
    .replaceAll('//www.emergingti.com/wp-content/', '/wp-content/')
    .replaceAll('//www.emergingti.com/wp-includes/', '/wp-includes/')
    .replaceAll('//www.emergingti.com/', '/')
    .replaceAll('//emergingti.com/wp-content/', '/wp-content/')
    .replaceAll('//emergingti.com/wp-includes/', '/wp-includes/')
    .replaceAll('//emergingti.com/', '/')
    // HTTPS URLs
    .replaceAll('https://www.emergingti.com/wp-content/', '/wp-content/')
    .replaceAll('https://www.emergingti.com/wp-includes/', '/wp-includes/')
    .replaceAll('https://www.emergingti.com/', '/')
    .replaceAll('https://emergingti.com/wp-content/', '/wp-content/')
    .replaceAll('https://emergingti.com/wp-includes/', '/wp-includes/')
    .replaceAll('https://emergingti.com/', '/')
    // HTTP URLs
    .replaceAll('http://www.emergingti.com/wp-content/', '/wp-content/')
    .replaceAll('http://www.emergingti.com/wp-includes/', '/wp-includes/')
    .replaceAll('http://www.emergingti.com/', '/')
    .replaceAll('http://emergingti.com/wp-content/', '/wp-content/')
    .replaceAll('http://emergingti.com/wp-includes/', '/wp-includes/')
    .replaceAll('http://emergingti.com/', '/');
  out = out.replace(/action="\/wp-comments-post\.php"/g, 'action="#"');

  // Keep the original cached bundle (72e57.js) - don't replace it
  // Just ensure jsFileLocation points to local assets with relative path
  out = out.replace(
    /jsFileLocation:"[^"]*"/g,
    'jsFileLocation:"/wp-content/plugins/revslider/public/assets/js/"'
  );

  if (out.includes('class="') && out.includes('lazyload') && !out.includes('data-src to src')) {
    out = out.replace('</body>', LAZYLOAD_FALLBACK + '\n</body>');
  }
  return out;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  let pathSegments = (await params).path ?? [];
  pathSegments = pathSegments.filter((p) => p !== '');
  const pathKey = pathSegments.join('/');
  const searchQuery = request.nextUrl.searchParams.get('s');

  // Don't serve WordPress HTML for Next.js internal paths
  // Note: wp-content is NOT blocked here - it's served as static files from public/
  if (pathSegments[0] === '_next' || pathSegments[0] === 'api') {
    return new Response(null, { status: 404 });
  }

  // Search: fetch WordPress search results and serve rewritten HTML
  if (pathKey === '' && searchQuery != null && searchQuery.trim() !== '') {
    try {
      const wpSearchUrl = `${WP_BASE}/?s=${encodeURIComponent(searchQuery.trim())}`;
      const res = await fetch(wpSearchUrl, {
        redirect: 'follow',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ETI/1.0)' },
      });
      if (res.ok) {
        const html = await res.text();
        return new Response(rewriteWpHtml(html), {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
      }
    } catch {
      // fall through to index
    }
  }

  const fileName = PAGE_FILES[pathKey] ?? (pathKey ? `${pathKey}.html` : 'index.html');
  const toTry = path.join(WORDPRESS_PAGES_DIR, fileName);

  if (!fs.existsSync(toTry)) {
    return new Response(null, { status: 404 });
  }

  let html = fs.readFileSync(toTry, 'utf-8');
  html = rewriteWpHtml(html);
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

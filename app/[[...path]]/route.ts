import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const WORDPRESS_PAGES_DIR = path.join(process.cwd(), 'wordpress-pages');

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

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const pathSegments = (await params).path ?? [];
  const pathKey = pathSegments.join('/');

  // Don't serve WordPress HTML for asset-like or reserved paths
  if (pathSegments[0] === '_next' || pathSegments[0] === 'api' || pathSegments[0] === 'wp-content') {
    return new Response(null, { status: 404 });
  }

  const fileName = PAGE_FILES[pathKey] ?? (pathKey ? `${pathKey}.html` : 'index.html');
  const toTry = path.join(WORDPRESS_PAGES_DIR, fileName);

  if (!fs.existsSync(toTry)) {
    return new Response(null, { status: 404 });
  }

  const html = fs.readFileSync(toTry, 'utf-8');
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

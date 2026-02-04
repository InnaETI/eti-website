import path from 'path';

export const WORDPRESS_PAGES_DIR = path.join(process.cwd(), 'wordpress-pages');
export const WP_BASE = 'https://www.emergingti.com';

export const PAGE_FILES: Record<string, string> = {
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

export function listKnownPages(): Array<{ label: string; path: string; slug: string }> {
  return Object.entries(PAGE_FILES).map(([slug, file]) => {
    const label = slug
      ? slug
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')
      : 'Home';
    const pathName = slug ? `${slug}.html` : 'index.html';
    return { label, path: pathName, slug };
  });
}

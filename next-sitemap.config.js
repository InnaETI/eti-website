const fs = require('fs');
const path = require('path');

const siteUrl = process.env.SITE_URL || 'https://www.emergingti.com';
const PAGES_DIR = path.join(process.cwd(), 'content', 'pages');
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const WP_PAGES_DIR = path.join(process.cwd(), 'wordpress-pages');
const WP_POST_YEARS = ['2020', '2022', '2023', '2024'];

const EXCLUDED_PATHS = new Set([
  '/admin',
  '/admin/',
  '/admin/login',
  '/admin/global',
  '/admin/home',
  '/admin/media',
  '/admin/pages',
  '/admin/blog',
  '/admin/publishing',
  '/clients-lab',
]);

const PUBLIC_ROUTES = [
  '/',
  '/about-us',
  '/services',
  '/clients',
  '/team',
  '/blog',
  '/contact-us',
  '/privacy-policy',
  '/advancing-healthcare-it',
  '/distributed-workforce-solutions',
  '/methodology',
  '/strategy',
  '/execution',
];

function readPageRoutes() {
  if (!fs.existsSync(PAGES_DIR)) return [];

  return fs
    .readdirSync(PAGES_DIR)
    .filter((file) => file.endsWith('.json'))
    .map((file) => `/${file.replace(/\.json$/, '')}`)
    .filter((route) => !EXCLUDED_PATHS.has(route) && route !== '/about' && route !== '/clients-lab');
}

function readMdxPostRoutes() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => `/blog/${file.replace(/\.mdx$/, '')}`);
}

function readWordPressPostRoutes() {
  if (!fs.existsSync(WP_PAGES_DIR)) return [];

  const routes = [];

  for (const year of WP_POST_YEARS) {
    const yearDir = path.join(WP_PAGES_DIR, year);
    if (!fs.existsSync(yearDir)) continue;

    for (const month of fs.readdirSync(yearDir)) {
      const monthDir = path.join(yearDir, month);
      if (!fs.statSync(monthDir).isDirectory()) continue;

      for (const day of fs.readdirSync(monthDir)) {
        const dayDir = path.join(monthDir, day);
        if (!fs.statSync(dayDir).isDirectory()) continue;

        for (const file of fs.readdirSync(dayDir)) {
          if (!file.endsWith('.html')) continue;
          routes.push(`/blog/${file.replace(/\.html$/, '')}`);
        }
      }
    }
  }

  return routes;
}

function uniqueRoutes() {
  return Array.from(
    new Set([
      ...PUBLIC_ROUTES,
      ...readPageRoutes(),
      ...readMdxPostRoutes(),
      ...readWordPressPostRoutes(),
    ])
  );
}

function changefreqFor(route) {
  if (route === '/') return 'weekly';
  if (route.startsWith('/blog/')) return 'monthly';
  if (route === '/blog') return 'weekly';
  return 'monthly';
}

function priorityFor(route) {
  if (route === '/') return 1.0;
  if (route === '/services' || route === '/clients' || route === '/contact-us') return 0.9;
  if (route === '/about-us' || route === '/blog' || route === '/advancing-healthcare-it') return 0.8;
  if (route.startsWith('/blog/')) return 0.7;
  return 0.7;
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/admin',
    '/admin/*',
    '/clients-lab',
    '/clients-lab/*',
    '/about',
    '/about/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/*', '/clients-lab', '/about'],
      },
    ],
    additionalSitemaps: [`${siteUrl}/sitemap.xml`],
  },
  transform: async (config, route) => {
    if (
      EXCLUDED_PATHS.has(route) ||
      route.startsWith('/api') ||
      route.startsWith('/admin') ||
      route === '/about'
    ) {
      return null;
    }

    return {
      loc: route,
      changefreq: changefreqFor(route),
      priority: priorityFor(route),
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    return uniqueRoutes()
      .map((route) => ({
      loc: route,
      changefreq: changefreqFor(route),
      priority: priorityFor(route),
      lastmod: new Date().toISOString(),
      }));
  },
};

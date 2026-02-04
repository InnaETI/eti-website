export const SITE = {
  name: 'Emerging Technologies',
  legalName: 'Emerging Technologies, Inc.',
  shortName: 'ETI',
  tagline: 'Executive IT and AI Advisory',
  description:
    'ETI delivers strategy, methodology, and execution for technology transformation. We partner with leadership to align technology with business goals.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.emergingti.com',
  ogImage: '/og.png',
} as const;

export function canonicalUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

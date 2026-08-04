export const SITE = {
  name: 'Emerging Technologies',
  legalName: 'Emerging Technologies, Inc.',
  shortName: 'ETI',
  tagline: 'Executive IT and AI Advisory',
  description:
    'ETI helps healthcare organizations and growth-focused companies align technology strategy, modernization, AI, and execution with measurable business outcomes.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.emergingti.com',
  ogImage: '/images/advancing-healthcare-it-hero.jpg',
} as const;

export function canonicalUrl(path: string): string {
  const base = SITE.url.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

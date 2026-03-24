export const NAV_LINKS = [
  { href: '/about-us', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/clients', label: 'Clients' },
  { href: '/team', label: 'Team' },
  { href: '/blog', label: 'Blog' },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

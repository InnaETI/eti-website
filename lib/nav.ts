// Matches emergingti.com screenshots: ABOUT US, SERVICES, CLIENTS, TEAM, CAREERS, BLOG, CONTACT US
export const NAV_LINKS = [
  { href: '/about-us', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/clients', label: 'Clients' },
  { href: '/team', label: 'Team' },
  { href: '/careers', label: 'Careers' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact-us', label: 'Contact Us' },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

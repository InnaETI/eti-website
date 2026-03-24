'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type FooterNavLink = { href: string; label: string };

function normalizePath(p: string) {
  return p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p;
}

function linkIsActive(pathname: string, href: string): boolean {
  const p = normalizePath(pathname);
  const h = normalizePath(href);
  if (h === '/') return p === '/' || p === '';
  return p === h || p.startsWith(`${h}/`);
}

export function FooterNav({ links }: { links: FooterNavLink[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 md:gap-x-9"
      aria-label="Footer"
    >
      {links.map((item) => {
        const active = linkIsActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[0.65rem] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[0.7rem] ${
              active ? 'text-[var(--color-brand-orange)]' : 'text-white hover:text-white/85'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type NavItem = {
  href: string;
  label: string;
};

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

function isActiveLink(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === '/') return current === '/';
  return current === target || current.startsWith(`${target}/`);
}

function navLinkClass(active: boolean) {
  return `border-b-2 px-0 py-2 text-[1.06rem] font-semibold transition ${
    active
      ? 'border-[var(--color-brand-orange)] font-bold text-[var(--color-brand-blue-deep)]'
      : 'border-transparent text-[var(--color-ink-muted)] hover:border-[rgba(17,39,77,0.12)] hover:text-[var(--color-brand-blue-deep)]'
  }`;
}

function mobileNavLinkClass(active: boolean) {
  return `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    active ? 'bg-white font-bold text-[var(--color-brand-blue-deep)]' : 'text-[var(--color-ink)] hover:bg-white'
  }`;
}

export function HeaderNav({
  navItems,
  initialPath,
  mobile = false,
}: {
  navItems: NavItem[];
  initialPath: string;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(() => normalizePath(initialPath));

  useEffect(() => {
    if (pathname) {
      setCurrentPath(normalizePath(pathname));
    }
  }, [pathname]);

  return navItems.map((item) => {
    const active = isActiveLink(currentPath, item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        className={mobile ? mobileNavLinkClass(active) : navLinkClass(active)}
      >
        {item.label}
      </Link>
    );
  });
}

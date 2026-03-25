'use client';

import Image from 'next/image';
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

export function HeaderClient({
  navItems,
  ctaHref,
  logoUrl,
  initialPath,
}: {
  navItems: NavItem[];
  ctaHref: string;
  logoUrl: string;
  initialPath: string;
}) {
  const pathname = normalizePath(usePathname() || initialPath || '/');
  const [currentPath, setCurrentPath] = useState(normalizePath(initialPath || '/'));

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const isContactActive = isActiveLink(currentPath, ctaHref);

  return (
    <header className="site-header">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-8 px-5 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-slate-950">
          <Image
            src={logoUrl}
            alt="Emerging Technologies"
            width={180}
            height={56}
            priority
            unoptimized={logoUrl.endsWith('.svg')}
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = isActiveLink(currentPath, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`border-b-2 px-0 py-2 text-[0.94rem] font-semibold transition ${
                  active
                    ? 'border-[var(--color-brand-orange)] font-bold text-[var(--color-brand-blue-deep)]'
                    : 'border-transparent text-[var(--color-ink-muted)] hover:border-[rgba(17,39,77,0.12)] hover:text-[var(--color-brand-blue-deep)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Link
            href={ctaHref}
            aria-current={isContactActive ? 'page' : undefined}
            className={`site-button px-5 py-2.5 text-[0.82rem] uppercase tracking-[0.06em] ${
              isContactActive ? 'site-button-primary ring-2 ring-[rgba(229,141,73,0.28)]' : 'site-button-primary'
            }`}
          >
            Contact Us
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-[rgba(17,39,77,0.12)] bg-white text-[var(--color-brand-blue)] shadow-[0_10px_30px_rgba(17,39,77,0.08)] [&::-webkit-details-marker]:hidden">
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </summary>

          <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(20rem,calc(100vw-2.5rem))] rounded-[1.5rem] border border-white/60 bg-[#f5f8fc] p-4 shadow-[0_18px_60px_rgba(17,39,77,0.12)]">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActiveLink(currentPath, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? 'bg-white font-bold text-[var(--color-brand-blue-deep)]'
                        : 'text-[var(--color-ink)] hover:bg-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={ctaHref}
                aria-current={isContactActive ? 'page' : undefined}
                className={`site-button mt-2 justify-center ${
                  isContactActive ? 'site-button-primary ring-2 ring-[rgba(229,141,73,0.28)]' : 'site-button-primary'
                }`}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

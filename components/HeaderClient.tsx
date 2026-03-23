'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
};

type HeaderClientProps = {
  navItems: NavItem[];
  logoUrl: string;
  ctaHref: string;
};

export function HeaderClient({ navItems, logoUrl, ctaHref }: HeaderClientProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-header">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-8 px-5 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-slate-950" onClick={() => setOpen(false)}>
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

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b-2 px-0 py-2 text-[0.92rem] font-semibold transition ${
                isActive(item.href)
                  ? 'border-[var(--color-brand-orange)] text-[var(--color-brand-blue-deep)]'
                  : 'border-transparent text-[var(--color-ink-muted)] hover:border-[rgba(17,39,77,0.12)] hover:text-[var(--color-brand-blue-deep)]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href={ctaHref} className="site-button site-button-primary px-5 py-2.5 text-[0.82rem] uppercase tracking-[0.06em]">
            Schedule a Call
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(17,39,77,0.12)] bg-white text-[var(--color-brand-blue)] shadow-[0_10px_30px_rgba(17,39,77,0.08)] lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/60 bg-[#f5f8fc] px-5 py-4 shadow-[0_18px_60px_rgba(17,39,77,0.12)] lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.href)
                    ? 'bg-white text-[var(--color-brand-blue)]'
                    : 'text-[var(--color-ink)] hover:bg-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href={ctaHref} onClick={() => setOpen(false)} className="site-button site-button-primary mt-2 justify-center">
              Schedule a Call
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_LINKS } from '@/lib/nav';

/* Key icon (skeleton key / line-art) for Get Started button */
function KeyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="7.5" cy="15.5" r="2.5" />
      <path d="M10 13L21 2" />
      <path d="M15 4l5 5" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      id="header"
      className="header-one header-eti simple fixed sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-header-bg)] shadow-sm"
    >
      <div className="container-content">
        <div className="flex h-20 items-center justify-between">
          
          {/* Left Side: Logo + Nav */}
          <div className="flex flex-1 items-center">
            {/* Logo */}
            <div className="navbar-header mr-8 shrink-0">
              <Link
                href="/"
                className="navbar-brand logo-one flex items-center no-underline"
                aria-label="Emerging Technologies – Home"
              >
                <Image
                  src="/logo.png"
                  alt="ETI"
                  width={90}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Nav Menu */}
            <nav id="cssmenu" className="hidden flex-1 lg:block">
              <ul id="menu-primary-navigation" className="nav navbar-nav flex items-center gap-1">
                {NAV_LINKS.map(({ href, label }) => {
                  const active = pathname === href || (pathname.startsWith(href));
                  return (
                    <li key={href} className={`menu-item ${active ? 'active' : ''}`}>
                      <Link
                        href={href}
                        className={`block px-3 py-2 text-[13px] font-bold uppercase tracking-wider text-[var(--color-nav-text)] no-underline transition-colors hover:text-[var(--color-brand-orange)] ${
                          active ? 'text-[var(--color-brand-orange)]' : ''
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Right Side: Get Started Button */}
          <div className="hidden shrink-0 lg:block">
            <Link
              href="/contact"
              className="sign-up_btn flex h-full items-center gap-2 bg-[var(--color-button-blue)] px-6 py-3 text-[13px] font-bold uppercase tracking-wider text-white no-underline hover:opacity-90"
            >
              <KeyIcon className="h-4 w-4" />
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="navbar-toggle inline-flex h-10 w-10 items-center justify-center rounded text-[var(--color-ink)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar block h-0.5 w-6 bg-current mb-1"></span>
            <span className="icon-bar block h-0.5 w-6 bg-current mb-1"></span>
            <span className="icon-bar block h-0.5 w-6 bg-current"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        className={`border-t border-[var(--color-border)] bg-[var(--color-header-bg)] lg:hidden ${open ? 'block' : 'hidden'}`}
        aria-hidden={!open}
      >
        <ul className="nav navbar-nav flex flex-col p-4">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className="border-b border-gray-100 last:border-0">
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-sm font-bold uppercase text-[var(--color-nav-text)] no-underline ${
                  pathname === href ? 'text-[var(--color-brand-orange)]' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded bg-[var(--color-button-blue)] px-4 py-3 text-sm font-bold uppercase text-white no-underline"
            >
              <KeyIcon className="h-4 w-4" />
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

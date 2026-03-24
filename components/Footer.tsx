import Link from 'next/link';
import Image from 'next/image';
import { getGlobalContent } from '@/lib/content';
import { NAV_LINKS } from '@/lib/nav';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  const globalContent = getGlobalContent();
  const footerLinks = globalContent?.footerLinks?.length
    ? globalContent.footerLinks
    : [...NAV_LINKS, { href: '/privacy-policy', label: 'Privacy' }];
  const footerLogoUrl =
    globalContent?.footerLogoUrl || '/wp-content/uploads/2017/08/eti__identity__logo_.svg';
  const social = globalContent?.social ?? {};
  const copyrightText =
    globalContent?.copyrightText ||
    `Copyright © ${new Date().getFullYear()} Emerging Technologies, Inc. All rights reserved.`;

  return (
    <footer className="mt-auto text-white">
      <div className="relative mx-auto max-w-[1320px]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-20 hidden h-0 -translate-x-1/2 lg:left-[33.333333%] lg:block lg:translate-x-0"
          aria-hidden
        >
          <div className="absolute left-0 top-0 h-0 w-0 -translate-x-[70%] -translate-y-full border-x-[26px] border-b-[30px] border-x-transparent border-b-[var(--color-brand-blue)]" />
          <div className="absolute left-0 top-0 h-0 w-0 translate-x-[5%] -translate-y-full border-x-[16px] border-b-[22px] border-x-transparent border-b-[var(--color-brand-orange)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="flex flex-col items-center justify-center bg-[var(--color-brand-blue)] px-8 py-14 lg:py-16">
            <Link href="/" className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Image
                src={footerLogoUrl}
                alt={globalContent?.shortName || 'ETI'}
                width={200}
                height={60}
                className="h-12 w-auto brightness-0 invert sm:h-14"
                unoptimized={footerLogoUrl.endsWith('.svg')}
              />
              <div className="text-center sm:text-left">
                <span className="block text-[0.625rem] font-bold uppercase leading-snug tracking-[0.28em] text-white sm:text-[0.6875rem]">
                  Emerging
                </span>
                <span className="block text-[0.625rem] font-bold uppercase leading-snug tracking-[0.28em] text-white sm:text-[0.6875rem]">
                  Technologies
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-col bg-[#141820] px-6 pb-10 pt-12 sm:px-10 lg:pb-12 lg:pt-14">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 md:gap-x-9"
              aria-label="Footer"
            >
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-white/85 sm:text-[0.7rem]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <p className="mx-auto mt-10 max-w-3xl text-center text-[0.625rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/50 sm:text-[0.6875rem]">
              {copyrightText}
            </p>

            <div className="mt-8 flex justify-end gap-5 text-white/50">
              {social.facebook ? (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white/80"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-[18px] w-[18px]" />
                </a>
              ) : null}
              {social.linkedin ? (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white/80"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="h-[18px] w-[18px]" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

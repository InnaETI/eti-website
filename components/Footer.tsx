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
    globalContent?.footerLogoUrl || '/wp-content/uploads/2017/08/logo-transparent-horizontal-80-237-dark.png';
  const social = globalContent?.social ?? {};
  const copyrightText =
    globalContent?.copyrightText ||
    `Copyright © ${new Date().getFullYear()} Emerging Technologies, Inc. All rights reserved.`;

  return (
    <footer className="mt-auto text-white">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%]">
          <div className="flex min-h-[112px] items-center justify-center bg-[var(--color-brand-blue)] px-8 py-6 lg:px-10 lg:py-5">
            <Link href="/" className="flex items-center justify-center">
              <Image
                src={footerLogoUrl}
                alt={globalContent?.shortName || 'ETI'}
                width={237}
                height={80}
                className="h-auto w-[158px] sm:w-[176px] lg:w-[192px]"
                priority={false}
              />
            </Link>
          </div>

          <div className="flex min-h-[112px] flex-col justify-center bg-[#2a2a2a] px-6 py-5 sm:px-10 lg:px-12">
            <nav
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start"
              aria-label="Footer"
            >
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:text-[#f0a165]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex flex-col items-center lg:items-start">
              <p className="text-center text-[0.6rem] font-medium uppercase leading-relaxed tracking-[0.08em] text-white/48 lg:text-left">
                {copyrightText}
              </p>

              <div className="mt-3 flex items-center gap-4 text-white/48">
                {social.facebook ? (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white/82"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-[14px] w-[14px]" />
                  </a>
                ) : null}
                {social.linkedin ? (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-white/82"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="h-[14px] w-[14px]" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { getGlobalContent } from '@/lib/content';
import { NAV_LINKS } from '@/lib/nav';

export function Footer() {
  const globalContent = getGlobalContent();
  const footerLinks = globalContent?.footerLinks?.length
    ? globalContent.footerLinks
    : [...NAV_LINKS, { href: '/privacy-policy', label: 'Privacy' }];
  const footerLogoUrl =
    globalContent?.footerLogoUrl || '/wp-content/uploads/2017/08/logo-transparent-horizontal-80-237-dark.png';
  const social = globalContent?.social ?? {};
  const copyrightText =
    globalContent?.copyrightText || `Copyright © ${new Date().getFullYear()} Emerging Technologies, Inc.`;

  return (
    <footer className="relative overflow-hidden border-t border-white/60 bg-[linear-gradient(160deg,#0f1f3d_0%,#16386d_42%,#0f2243_100%)] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)]" />
      <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:px-10">
        <div className="space-y-6">
          <Link href="/" className="inline-flex items-center">
            <Image
              src={footerLogoUrl}
              alt="ETI"
              width={220}
              height={64}
              className="h-11 w-auto brightness-0 invert"
              unoptimized
            />
          </Link>
          <p className="max-w-md text-sm leading-7 text-white/72">
            Emerging Technologies helps operators align strategy, systems, and execution where
            business pressure, technology complexity, and speed all matter.
          </p>
          <div className="flex flex-wrap gap-3">
            {social.linkedin ? (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/82 transition hover:border-white/45 hover:text-white">
                LinkedIn
              </a>
            ) : null}
            {social.facebook ? (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/82 transition hover:border-white/45 hover:text-white">
                Facebook
              </a>
            ) : null}
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Navigation
            </p>
            <nav className="grid gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base text-white/82 transition hover:text-[var(--color-brand-orange)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Contact
            </p>
            <div className="space-y-3 text-sm leading-7 text-white/72">
              <p>Executive IT and AI advisory for transformation work that needs clarity, pace, and accountability.</p>
              <Link href="/contact-us" className="inline-flex items-center text-[var(--color-brand-orange)] transition hover:text-white">
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-3 px-5 py-5 text-xs uppercase tracking-[0.18em] text-white/45 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <p>{copyrightText}</p>
          <p>Built on a native Next.js content system</p>
        </div>
      </div>
    </footer>
  );
}

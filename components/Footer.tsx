import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/lib/nav';
import { SITE } from '@/lib/site';

export function Footer() {
  const footerLinks = [
    ...NAV_LINKS,
    { href: '/privacy-policy', label: 'Privacy' }
  ];

  return (
    <footer id="footer" className="bg-[#ffffff] border-t border-[var(--color-border)] py-12">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Logo Column (Col-4ish) */}
          <div className="lg:w-1/3">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="ETI"
                width={80}
                height={237}
                className="h-auto w-auto max-h-16" // Adjusted size
                unoptimized
              />
            </Link>
          </div>

          {/* Menu Column (Col-8ish) */}
          <div className="lg:w-2/3">
            <div className="flex flex-col h-full justify-between">
              
              {/* Nav Menu */}
              <nav className="mb-8">
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {footerLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-[var(--color-brand-orange)] font-open-sans text-sm hover:underline flex items-center gap-1"
                      >
                        <i className="inline-block border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-[var(--color-brand-orange)] mr-1"></i>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Copyright & Social */}
              <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-[var(--color-ink-muted)] font-open-sans">
                  Copyright © {new Date().getFullYear()} Emerging Technologies, Inc. All rights reserved.
                </span>
                
                {/* Social Icons (Placeholder using FontAwesome classes from ref, replaced with SVGs or text) */}
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/EmergingTI/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand-orange)] hover:opacity-80">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="https://www.linkedin.com/company/323460/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand-orange)] hover:opacity-80">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS } from '@/lib/nav';

export function Footer() {
  const footerLinks = [
    ...NAV_LINKS,
    { href: '/privacy-policy', label: 'Privacy' }
  ];

  return (
    <footer className="relative bg-[#2c2c2c] overflow-hidden text-white">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row min-h-[120px]">
          
          {/* Left Column (Logo) - Blue Background Extension */}
          <div className="relative lg:w-[33.33%] bg-[#254fbb] lg:bg-transparent p-8 lg:p-0 flex items-center justify-center lg:justify-start">
             {/* This pseudo-element creates the blue background extending infinitely to the left on desktop */}
             <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-[100vw] bg-[#254fbb] z-0" />
             
             <div className="relative z-10">
                <Link href="/" className="block">
                  <Image
                    src="/wp-content/uploads/2017/08/logo-transparent-horizontal-80-237-dark.png"
                    alt="ETI"
                    width={150}
                    height={50}
                    className="h-auto w-auto brightness-0 invert" 
                    unoptimized
                  />
                </Link>
             </div>
          </div>

          {/* Right Column (Content) - Dark Background (Default) */}
          <div className="lg:w-[66.66%] py-8 lg:py-12 lg:pl-12 flex flex-col justify-center">
            
            {/* Top Row: Navigation */}
            <nav className="mb-6">
              <ul className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
                {footerLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm font-bold uppercase tracking-wider text-white hover:text-[#ffaf36] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Row: Copyright & Social */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-[#888]">
              <div className="text-xs uppercase tracking-wide text-center lg:text-left">
                Copyright © {new Date().getFullYear()} Emerging Technologies, Inc. All rights reserved.
              </div>
              
              <div className="flex gap-4">
                <a href="https://www.facebook.com/EmergingTI/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="https://www.linkedin.com/company/323460/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

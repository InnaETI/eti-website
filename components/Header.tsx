'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_LINKS } from '@/lib/nav';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 bg-[#eaeff3] border-b border-[#dde4ea]">
      <div className="container-content relative">
        <div className="flex items-center justify-between min-h-[70px]">
          
          {/* Logo */}
          <div className="flex-shrink-0 relative z-20 py-3 pr-8 border-r border-[#dde4ea]">
            <Link href="/" className="block">
              <Image
                src="/wp-content/uploads/2017/08/eti__identity__logo_.svg"
                alt="ETI"
                width={140}
                height={44}
                priority
                className="h-[44px] w-auto"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-1 items-stretch h-full">
            <nav className="flex-1 px-6">
              <ul className="flex items-center h-full space-x-0">
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <li key={href} className="h-full">
                      <Link
                        href={href}
                        className={`flex items-center h-full px-6 text-[14px] font-semibold uppercase tracking-wide transition-colors border-l border-[#dde4ea] hover:text-black ${
                          isActive ? 'text-[var(--color-brand-orange)]' : 'text-[#60717e]'
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            {/* Desktop CTA */}
            <div className="flex-shrink-0 bg-[#254fbb] h-[70px] flex items-center justify-center -mr-4 px-6 min-w-[200px] relative">
               {/* Extend blue to the right edge of the screen */}
               <div className="absolute top-0 bottom-0 left-full w-[100vw] bg-[#254fbb]" />
               
              <Link 
                 href="/rfp-wizard/" 
                className="flex items-center text-white text-[14px] font-semibold uppercase tracking-wide group whitespace-nowrap"
               >
                 <span className="mr-3 bg-[url('/wp-content/themes/businessplus/assets/images/key-icon.png')] w-[20px] h-[20px] bg-no-repeat bg-center inline-block" />
                 Get Started
               </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="p-2 border border-gray-300 rounded bg-transparent"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
                <span className="block w-6 h-0.5 bg-gray-600"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col py-2">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 text-sm font-semibold uppercase ${
                    isActive ? 'text-[#ea580c] bg-gray-50' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/rfp-wizard/"
              className="px-4 py-3 text-sm font-semibold uppercase text-[#254fbb] hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

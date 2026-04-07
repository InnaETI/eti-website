import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { getGlobalContent } from '@/lib/content';
import { NAV_LINKS } from '@/lib/nav';
import { HeaderNav } from '@/components/HeaderNav';

type NavItem = {
  href: string;
  label: string;
};

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

export async function Header() {
  const currentPath = normalizePath((await headers()).get('x-current-path') || '/');
  const globalContent = getGlobalContent();
  const navItems: NavItem[] = globalContent?.nav?.length ? globalContent.nav : [...NAV_LINKS];
  const logoUrl = globalContent?.logoUrl || '/wp-content/uploads/2017/08/eti__identity__logo_.svg';
  const ctaHref = '/contact-us';

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
          <HeaderNav navItems={navItems} initialPath={currentPath} />
        </nav>

        <div className="hidden lg:block">
          <Link href={ctaHref} className="site-button site-button-primary px-5 py-2.5 text-[0.82rem] uppercase tracking-[0.06em]">
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
              <HeaderNav navItems={navItems} initialPath={currentPath} mobile />
              <Link href={ctaHref} className="site-button site-button-primary mt-2 justify-center">
                Contact Us
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}

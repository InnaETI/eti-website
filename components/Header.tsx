import { headers } from 'next/headers';
import { getGlobalContent } from '@/lib/content';
import { NAV_LINKS } from '@/lib/nav';
import { HeaderClient } from '@/components/HeaderClient';

export async function Header() {
  const currentPath = (await headers()).get('x-current-path') || '/';
  const globalContent = getGlobalContent();
  const navItems = globalContent?.nav?.length ? globalContent.nav : [...NAV_LINKS];
  const logoUrl = globalContent?.logoUrl || '/wp-content/uploads/2017/08/eti__identity__logo_.svg';
  const ctaHref = '/contact-us';

  return (
    <HeaderClient navItems={navItems} ctaHref={ctaHref} logoUrl={logoUrl} initialPath={currentPath} />
  );
}

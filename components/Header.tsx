import { HeaderClient } from '@/components/HeaderClient';
import { getGlobalContent } from '@/lib/content';
import { NAV_LINKS } from '@/lib/nav';

export function Header() {
  const globalContent = getGlobalContent();
  const navItems = globalContent?.nav?.length ? globalContent.nav : [...NAV_LINKS];
  const logoUrl = globalContent?.logoUrl || '/wp-content/uploads/2017/08/eti__identity__logo_.svg';

  return (
    <HeaderClient
      navItems={navItems}
      logoUrl={logoUrl}
      ctaHref="/rfp-wizard"
    />
  );
}

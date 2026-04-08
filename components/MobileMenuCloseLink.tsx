'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';

type MobileMenuCloseLinkProps = ComponentProps<typeof Link>;

function closeDetailsMenu(event: MouseEvent<HTMLAnchorElement>) {
  const details = event.currentTarget.closest('details');
  if (details instanceof HTMLDetailsElement) {
    details.open = false;
  }
}

export function MobileMenuCloseLink({ onClick, ...props }: MobileMenuCloseLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        closeDetailsMenu(event);
        onClick?.(event);
      }}
    />
  );
}

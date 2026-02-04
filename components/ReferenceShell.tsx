import type { ReactNode } from 'react';
import { getReferenceFooter, getReferenceHeader } from '@/lib/reference';

type ReferenceShellProps = {
  children: ReactNode;
};

export function ReferenceShell({ children }: ReferenceShellProps) {
  const header = getReferenceHeader();
  const footer = getReferenceFooter();

  return (
    <div id="wrapper">
      <div
        dangerouslySetInnerHTML={{ __html: header }}
        suppressHydrationWarning
      />
      <div id="content" className="post-content">
        {children}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: footer }}
        suppressHydrationWarning
      />
    </div>
  );
}

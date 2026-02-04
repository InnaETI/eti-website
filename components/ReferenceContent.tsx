import Script from 'next/script';
import { getReferenceContent } from '@/lib/reference';

type ReferenceContentProps = {
  page: string;
};

export function ReferenceContent({ page }: ReferenceContentProps) {
  const raw = getReferenceContent(page);
  const scripts: string[] = [];
  const html = raw.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (_match, code) => {
    if (code && code.trim()) {
      scripts.push(code.trim());
    }
    return '';
  });

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning
      />
      {scripts.map((code, index) => (
        <Script
          // eslint-disable-next-line react/no-array-index-key
          key={`${page}-inline-${index}`}
          id={`${page}-inline-${index}`}
          strategy="afterInteractive"
        >
          {code}
        </Script>
      ))}
    </>
  );
}

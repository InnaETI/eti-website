import type { Metadata, Viewport } from 'next';
import { Open_Sans, Raleway, Lora } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { ReferenceShell } from '@/components/ReferenceShell';
import { SITE } from '@/lib/site';

// Body font
const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  display: 'swap',
});

// Headings font
const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  display: 'swap',
});

// Accent/Subheading font
const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${raleway.variable} ${lora.variable}`}>
      <head>
        <link rel="stylesheet" href="/wp-content/cache/minify/20958.css" media="all" />
        <link rel="stylesheet" href="/wp-content/cache/minify/73c3d.css" media="all" />
        <link rel="stylesheet" href="/wp-content/cache/minify/11259.css" media="all" />
        <link rel="stylesheet" href="/wp-content/cache/minify/e9d1e.css" media="all" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Slab%3A100%2C400"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway%3A900"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-white text-[var(--color-ink)] businessplus wpb-js-composer js-comp-ver-5.2.1 vc_responsive">
        <ReferenceShell>{children}</ReferenceShell>

        <Script id="businessplus-options" strategy="beforeInteractive">
          {`var BUSINESSPLUS_SITE_OPTION = {"lat":"41.879586","lng":"-87.636036"};
var BUSINESSPLUS_OPTION = {"url":"/wp-content/themes/businessplus","color":"#ffaf36","font":"Open Sans","heading_font":"Raleway","sub_heading_font":"Lora","header":"fix","layout":"fullWidth"};`}
        </Script>
        <Script id="monsterinsights-frontend-script-js-extra" strategy="beforeInteractive">
          {`var monsterinsights_frontend = {"js_events_tracking":"true","download_extensions":"doc,pdf,ppt,zip,xls,docx,pptx,xlsx","inbound_paths":"[]","home_url":"https://www.emergingti.com","hash_tracking":"false","ua":"UA-99597219-1","v4_id":"G-NVC6BCD4GQ"};`}
        </Script>
        <Script src="/wp-content/cache/minify/a62fc.js" strategy="beforeInteractive" />
        <Script src="/wp-content/cache/minify/84673.js" strategy="beforeInteractive" />
        <Script src="/wp-content/cache/minify/72e57.js" strategy="beforeInteractive" />
        <Script src="/wp-content/cache/minify/ec9a7.js" strategy="beforeInteractive" />
        <Script src="/wp-content/cache/minify/2ca60.js" strategy="beforeInteractive" />
        <Script src="/wp-content/cache/minify/0d6f9.js" strategy="beforeInteractive" />
        <Script src="/wp-content/cache/minify/cc16b.js" strategy="beforeInteractive" />
        <Script src="/wp-content/cache/minify/fa112.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

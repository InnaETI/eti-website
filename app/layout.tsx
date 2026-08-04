import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Sora, Newsreader } from 'next/font/google';
import { getGlobalContent } from '@/lib/content';
import { buildOrganizationSchema, buildWebsiteSchema, jsonLd } from '@/lib/seo';
import { SITE } from '@/lib/site';
import './globals.css';

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const accentFont = Newsreader({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Healthcare Technology Consulting, IT Execution, and AI Advisory',
    template: '%s | ETI',
  },
  description:
    'ETI helps healthcare organizations and growth-focused companies align technology strategy, modernization, AI, and execution with measurable business outcomes.',
  applicationName: SITE.legalName,
  openGraph: {
    siteName: SITE.legalName,
    locale: 'en_US',
    type: 'website',
    images: [{ url: SITE.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [SITE.ogImage],
  },
  icons: {
    icon: '/reference-assets/transparent-300-logo.ico',
    shortcut: '/reference-assets/transparent-300-logo.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalContent = getGlobalContent() ?? undefined;
  const organizationSchema = buildOrganizationSchema(globalContent);
  const websiteSchema = buildWebsiteSchema(globalContent);

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteSchema)} />
        {children}
      </body>
    </html>
  );
}

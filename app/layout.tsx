import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ETI',
  description: 'Emerging Technologies, Inc.',
};

/**
 * Root layout. Not used for WordPress routes (they are served as full HTML by
 * app/[[...path]]/route.ts). Used only if you add other routes (e.g. /admin).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

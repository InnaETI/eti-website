import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Sora, Newsreader } from 'next/font/google';
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
  title: {
    default: 'ETI | Executive IT and AI Advisory',
    template: '%s | ETI',
  },
  description:
    'Emerging Technologies, Inc. helps organizations align strategy, technology, and execution across healthcare, AI, and digital transformation work.',
  icons: {
    icon: '/wp-content/uploads/2017/08/transparent-300-logo.ico',
    shortcut: '/wp-content/uploads/2017/08/transparent-300-logo.ico',
    apple: '/wp-content/uploads/2017/08/transparent-300-logo.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${accentFont.variable}`}>
        {children}
      </body>
    </html>
  );
}

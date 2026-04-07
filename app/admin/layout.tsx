'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminGuard } from './AdminGuard';
import { LogoutButton } from './LogoutButton';

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/publishing', label: 'Publishing' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/global', label: 'Global' },
  { href: '/admin/home', label: 'Home' },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/blog', label: 'Blog' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login' || pathname === '/admin/login/';

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef4fa_100%)] text-zinc-900">
        {!isLogin && (
          <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
              <div>
                <Link href="/admin" className="text-lg font-semibold tracking-tight text-zinc-950">
                  ETI Website Manager
                </Link>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Content operations
                </p>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-zinc-200 px-3 py-2 text-sm text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-950"
                >
                  View site
                </a>
                <LogoutButton />
              </div>
            </div>
          </header>
        )}
        <main className={isLogin ? '' : 'mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10'}>
          {isLogin ? (
            children
          ) : (
            <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
              <aside className="lg:sticky lg:top-8 lg:self-start">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    Workspace
                  </p>
                  <nav className="space-y-1">
                    {NAV_ITEMS.map((item) => {
                      const active =
                        pathname === item.href ||
                        (item.href !== '/admin' && pathname.startsWith(`${item.href}/`));

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                            active
                              ? 'bg-[#1f3b68] text-white shadow-[0_10px_24px_rgba(31,59,104,0.18)]'
                              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
                          }`}
                        >
                          <span>{item.label}</span>
                          {active ? <span className="text-xs uppercase tracking-[0.22em] text-white/70">Open</span> : null}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </aside>
              <section>{children}</section>
            </div>
          )}
        </main>
      </div>
    </AdminGuard>
  );
}

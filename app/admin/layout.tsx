'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminGuard } from './AdminGuard';
import { LogoutButton } from './LogoutButton';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login' || pathname === '/admin/login/';

  return (
    <AdminGuard>
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        {!isLogin && (
          <header className="border-b border-zinc-200 bg-white">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
              <Link href="/admin" className="font-semibold text-zinc-900">
                ETI Admin
              </Link>
              <nav className="flex items-center gap-6 text-sm">
                <Link href="/admin/global" className="text-zinc-600 hover:text-zinc-900">Global</Link>
                <Link href="/admin/home" className="text-zinc-600 hover:text-zinc-900">Home</Link>
                <Link href="/admin/pages" className="text-zinc-600 hover:text-zinc-900">Pages</Link>
                <Link href="/admin/blog" className="text-zinc-600 hover:text-zinc-900">Blog</Link>
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-700">
                  View site →
                </a>
                <LogoutButton />
              </nav>
            </div>
          </header>
        )}
        <main className={isLogin ? '' : 'mx-auto max-w-6xl px-4 py-8'}>
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}

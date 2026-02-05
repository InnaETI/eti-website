import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Content admin</h1>
      <p className="text-zinc-600 mb-8">
        Edit site-wide settings, homepage, pages, and blog posts. Changes save to your content files.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/global"
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow transition"
        >
          <h2 className="font-medium text-zinc-900">Global</h2>
          <p className="text-sm text-zinc-500 mt-1">Site name, nav, footer, logos, contact</p>
        </Link>
        <Link
          href="/admin/home"
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow transition"
        >
          <h2 className="font-medium text-zinc-900">Home</h2>
          <p className="text-sm text-zinc-500 mt-1">Hero, pillars, services, clients, CTA, news</p>
        </Link>
        <Link
          href="/admin/pages"
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow transition"
        >
          <h2 className="font-medium text-zinc-900">Pages</h2>
          <p className="text-sm text-zinc-500 mt-1">About, Services, Team, Careers, Contact, etc.</p>
        </Link>
        <Link
          href="/admin/blog"
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm hover:border-zinc-300 hover:shadow transition"
        >
          <h2 className="font-medium text-zinc-900">Blog</h2>
          <p className="text-sm text-zinc-500 mt-1">Posts and articles</p>
        </Link>
      </div>
    </div>
  );
}

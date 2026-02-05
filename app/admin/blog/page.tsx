'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminBlogListPage() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/content?type=blog')
      .then((r) => r.json())
      .then((json) => setSlugs(json.slugs ?? json ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const list = Array.isArray(slugs) ? slugs : [];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Blog</h1>
      <p className="text-zinc-600 mb-6">
        Edit posts. Content is stored in <code className="text-sm bg-zinc-100 px-1 rounded">content/blog/</code> (JSON or MDX).
      </p>
      <ul className="rounded border border-zinc-200 bg-white divide-y divide-zinc-100">
        {list.length === 0 ? (
          <li className="px-4 py-6 text-center text-zinc-500">No posts yet.</li>
        ) : (
          list.map((slug: string) => (
            <li key={slug}>
              <Link
                href={`/admin/blog/${encodeURIComponent(slug)}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-zinc-50 text-zinc-900"
              >
                <span className="font-medium">{slug}</span>
                <span className="text-zinc-400 text-sm">Edit →</span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

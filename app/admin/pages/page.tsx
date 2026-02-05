'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPagesListPage() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/content?type=pages')
      .then((r) => r.json())
      .then((json) => setSlugs(json.slugs ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-zinc-900 mb-2">Pages</h1>
      <p className="text-zinc-600 mb-6">
        Edit content for each page. Changes save to <code className="text-sm bg-zinc-100 px-1 rounded">content/pages/</code>.
      </p>
      <ul className="rounded border border-zinc-200 bg-white divide-y divide-zinc-100">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`/admin/pages/${encodeURIComponent(slug)}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-zinc-50 text-zinc-900"
            >
              <span className="font-medium">{slug}</span>
              <span className="text-zinc-400 text-sm">Edit →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

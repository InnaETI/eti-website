'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { AdminPanel } from '../components/AdminPanel';

type PageEntry = {
  slug: string;
  title: string;
  subheading?: string;
};

export default function AdminPagesListPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<PageEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createError, setCreateError] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftSlug, setDraftSlug] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?type=pages')
      .then((r) => r.json())
      .then((json) => setEntries(json.entries ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async function createPage() {
    const title = draftTitle.trim();
    const slug = slugify(draftSlug || draftTitle);

    if (!title) {
      setCreateError('Add a page title first.');
      return;
    }
    if (!slug) {
      setCreateError('Add a valid page slug.');
      return;
    }
    if (entries.some((entry) => entry.slug === slug)) {
      setCreateError('That slug already exists.');
      return;
    }

    setCreating(true);
    setCreateError('');

    const data = {
      title,
      subheading: '',
      bannerImage: '',
      body: '',
    };

    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'page', slug, data }),
    });

    setCreating(false);

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setCreateError(json.error ?? 'Could not create page.');
      return;
    }

    router.push(`/admin/pages/${encodeURIComponent(slug)}`);
    router.refresh();
  }

  const filtered = entries.filter((entry) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      entry.slug.toLowerCase().includes(q) ||
      entry.title.toLowerCase().includes(q) ||
      (entry.subheading ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <AdminPageHeader
        eyebrow="Pages"
        title="Core site pages"
        description="Manage the evergreen pages used across the public website. These records map directly to files in content/pages."
        actions={
          <button
            type="button"
            onClick={() => {
              setShowCreate((value) => !value);
              setCreateError('');
            }}
            className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e]"
          >
            {showCreate ? 'Close' : 'New page'}
          </button>
        }
      />

      <AdminPanel>
        {showCreate ? (
          <div className="mb-5 rounded-2xl border border-[#d7e2ef] bg-[#f7fafc] p-4">
            <h2 className="text-base font-semibold text-zinc-950">Create a new page</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Start a new editable page record. You can refine the hero, body, and page-specific content after creation.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => {
                  setDraftTitle(e.target.value);
                  if (!draftSlug) setDraftSlug(slugify(e.target.value));
                }}
                placeholder="Page title"
                className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm"
              />
              <input
                type="text"
                value={draftSlug}
                onChange={(e) => setDraftSlug(slugify(e.target.value))}
                placeholder="page-slug"
                className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-mono"
              />
            </div>
            {createError ? <p className="mt-3 text-sm text-red-600">{createError}</p> : null}
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={createPage}
                disabled={creating}
                className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e] disabled:opacity-50"
              >
                {creating ? 'Creating…' : 'Create page'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreate(false);
                  setDraftTitle('');
                  setDraftSlug('');
                  setCreateError('');
                }}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-950">{entries.length} editable pages</p>
            <p className="text-sm text-zinc-600">Search by page name, slug, or supporting label.</p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages"
            className="w-full rounded-full border border-zinc-300 px-4 py-2.5 text-sm md:max-w-xs"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center text-sm text-zinc-500">
            No matching pages.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((entry) => (
              <Link
                key={entry.slug}
                href={`/admin/pages/${encodeURIComponent(entry.slug)}`}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 transition hover:border-zinc-300 hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-950">{entry.title}</h2>
                    <p className="mt-1 text-sm text-zinc-500">/{entry.slug}</p>
                  </div>
                  <span className="rounded-full bg-[#eef4fa] px-3 py-1 text-xs font-medium text-[#1f3b68]">
                    Edit
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  {entry.subheading || 'Core public page content and hero settings.'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </AdminPanel>
    </div>
  );
}

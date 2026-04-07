'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { AdminPanel } from '../components/AdminPanel';

type BlogEntry = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
};

export default function AdminBlogListPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<BlogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [createError, setCreateError] = useState('');
  const [draftTitle, setDraftTitle] = useState('');
  const [draftSlug, setDraftSlug] = useState('');

  useEffect(() => {
    fetch('/api/admin/content?type=blog')
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

  async function createPost() {
    const title = draftTitle.trim();
    const slug = slugify(draftSlug || draftTitle);

    if (!title) {
      setCreateError('Add a post title first.');
      return;
    }
    if (!slug) {
      setCreateError('Add a valid post slug.');
      return;
    }
    if (entries.some((entry) => entry.slug === slug)) {
      setCreateError('That slug already exists.');
      return;
    }

    setCreating(true);
    setCreateError('');

    const today = new Date().toISOString().slice(0, 10);
    const data = {
      slug,
      title,
      date: today,
      excerpt: '',
      body: '',
      image: '',
    };

    const res = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'blog', slug, data }),
    });

    setCreating(false);

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setCreateError(json.error ?? 'Could not create post.');
      return;
    }

    router.push(`/admin/blog/${encodeURIComponent(slug)}`);
    router.refresh();
  }

  const filtered = entries.filter((entry) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      entry.slug.toLowerCase().includes(q) ||
      entry.title.toLowerCase().includes(q) ||
      entry.excerpt.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <AdminPageHeader
        eyebrow="Blog"
        title="Articles and insights"
        description="Manage article titles, publication dates, summaries, images, and body copy."
        actions={
          <button
            type="button"
            onClick={() => {
              setShowCreate((value) => !value);
              setCreateError('');
            }}
            className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e]"
          >
            {showCreate ? 'Close' : 'New post'}
          </button>
        }
      />

      <AdminPanel>
        {showCreate ? (
          <div className="mb-5 rounded-2xl border border-[#d7e2ef] bg-[#f7fafc] p-4">
            <h2 className="text-base font-semibold text-zinc-950">Create a new post</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Start a new blog post with a title and slug. You can add the article image, excerpt, and body in the editor.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => {
                  setDraftTitle(e.target.value);
                  if (!draftSlug) setDraftSlug(slugify(e.target.value));
                }}
                placeholder="Post title"
                className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm"
              />
              <input
                type="text"
                value={draftSlug}
                onChange={(e) => setDraftSlug(slugify(e.target.value))}
                placeholder="post-slug"
                className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-mono"
              />
            </div>
            {createError ? <p className="mt-3 text-sm text-red-600">{createError}</p> : null}
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={createPost}
                disabled={creating}
                className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e] disabled:opacity-50"
              >
                {creating ? 'Creating…' : 'Create post'}
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
            <p className="text-sm font-medium text-zinc-950">{entries.length} posts</p>
            <p className="text-sm text-zinc-600">Search by title, slug, or excerpt.</p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full rounded-full border border-zinc-300 px-4 py-2.5 text-sm md:max-w-xs"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center text-sm text-zinc-500">
            No matching posts.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <Link
                key={entry.slug}
                href={`/admin/blog/${encodeURIComponent(entry.slug)}`}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 transition hover:border-zinc-300 hover:bg-white md:flex-row md:items-start md:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    <span>{entry.date || 'No date'}</span>
                    <span>•</span>
                    <span>{entry.slug}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-zinc-950">{entry.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-600">
                    {entry.excerpt || 'No summary yet.'}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#eef4fa] px-3 py-1 text-xs font-medium text-[#1f3b68]">
                  Edit
                </span>
              </Link>
            ))}
          </div>
        )}
      </AdminPanel>
    </div>
  );
}

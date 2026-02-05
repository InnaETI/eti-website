'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ImageField } from '../../components/ImageField';
import { MarkdownPreview } from '../../components/MarkdownPreview';
import { PreviewLink } from '../../components/PreviewLink';

const BODY_MARKDOWN_HELP =
  'Post content in Markdown: **bold**, *italic*, [links](url), # headings, - lists. This is rendered as HTML on the blog post page.';

type BlogData = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  image?: string;
};

export default function AdminBlogEditorPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [data, setData] = useState<BlogData>({ slug: '', title: '', date: '', excerpt: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/admin/content?type=blog&slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((json) => setData({
        slug: json.slug ?? slug,
        title: json.title ?? '',
        date: json.date ?? '',
        excerpt: json.excerpt ?? '',
        body: json.body ?? '',
        image: json.image,
      }))
      .finally(() => setLoading(false));
  }, [slug]);

  function save() {
    setSaving(true);
    setMessage(null);
    const payload = { ...data, slug: data.slug || slug };
    fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'blog', slug, data: payload }),
    })
      .then((r) => {
        if (r.ok) setMessage({ type: 'ok', text: 'Saved.' });
        else return r.json().then((d) => { setMessage({ type: 'error', text: d.error ?? 'Save failed' }); });
      })
      .finally(() => setSaving(false));
  }

  if (!slug) return null;
  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const publicPath = `/blog/${data.slug || slug}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-zinc-900">Edit post: {slug}</h1>
          <PreviewLink href={publicPath} />
        </div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
      {message && (
        <p className={`mb-4 text-sm ${message.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl">
        <div className="space-y-4">
          <section className="rounded border border-zinc-200 bg-white p-4">
            <h2 className="font-medium text-zinc-900 mb-3">Post fields</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => setData({ ...data, slug: e.target.value })}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  placeholder="e.g. my-post-title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Date</label>
                <input
                  type="text"
                  value={data.date}
                  onChange={(e) => setData({ ...data, date: e.target.value })}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  placeholder="e.g. 2024-01-15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Excerpt</label>
                <textarea
                  value={data.excerpt}
                  onChange={(e) => setData({ ...data, excerpt: e.target.value })}
                  rows={2}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <ImageField
                label="Featured image"
                value={data.image ?? ''}
                onChange={(image) => setData({ ...data, image })}
              />
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Body (Markdown)</label>
                <p className="text-xs text-zinc-500 mb-1">{BODY_MARKDOWN_HELP}</p>
                <textarea
                  value={data.body}
                  onChange={(e) => setData({ ...data, body: e.target.value })}
                  rows={14}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm font-mono"
                  placeholder="Add post content in Markdown…"
                />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <section className="rounded border border-zinc-200 bg-white p-4">
            <h2 className="font-medium text-zinc-900 mb-3">Body preview</h2>
            <p className="text-xs text-zinc-500 mb-2">
              How the Body (Markdown) content will look on the post.
            </p>
            <div className="min-h-[200px] rounded border border-zinc-100 bg-zinc-50 p-4">
              <MarkdownPreview source={data.body} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

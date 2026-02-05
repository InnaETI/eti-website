'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ImageField } from '../../components/ImageField';
import { MarkdownPreview } from '../../components/MarkdownPreview';
import { PreviewLink } from '../../components/PreviewLink';

const BODY_MARKDOWN_HELP =
  'Main text content for this page. Use Markdown: **bold**, *italic*, [link text](url), # for headings, - for lists. This is rendered as HTML on the live page.';

type PageData = Record<string, unknown> & {
  title?: string;
  subheading?: string;
  bannerImage?: string;
  body?: string;
};

export default function AdminPageEditorPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [data, setData] = useState<PageData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/admin/content?type=page&slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [slug]);

  function save() {
    setSaving(true);
    setMessage(null);
    fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'page', slug, data }),
    })
      .then((r) => {
        if (r.ok) setMessage({ type: 'ok', text: 'Saved.' });
        else return r.json().then((d) => { setMessage({ type: 'error', text: d.error ?? 'Save failed' }); });
      })
      .finally(() => setSaving(false));
  }

  if (!slug) return null;
  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const publicPath = `/${slug}`;
  const extraData = Object.fromEntries(
    Object.entries(data).filter(
      ([k]) => !['title', 'subheading', 'bannerImage', 'body'].includes(k)
    )
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-zinc-900">Edit: {slug}</h1>
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
            <h2 className="font-medium text-zinc-900 mb-3">Main fields</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                <input
                  type="text"
                  value={(data.title as string) ?? ''}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Subheading</label>
                <input
                  type="text"
                  value={(data.subheading as string) ?? ''}
                  onChange={(e) => setData({ ...data, subheading: e.target.value })}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <ImageField
                label="Banner image"
                value={(data.bannerImage as string) ?? ''}
                onChange={(bannerImage) => setData({ ...data, bannerImage })}
              />
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Body (Markdown)</label>
                <p className="text-xs text-zinc-500 mb-1">{BODY_MARKDOWN_HELP}</p>
                <textarea
                  value={(data.body as string) ?? ''}
                  onChange={(e) => setData({ ...data, body: e.target.value })}
                  rows={12}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm font-mono"
                  placeholder="Add main page content in Markdown…"
                />
              </div>
            </div>
          </section>

          <section className="rounded border border-zinc-200 bg-white p-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
            >
              {showAdvanced ? '▼' : '▶'} Advanced: Edit raw page data (JSON)
            </button>
            {showAdvanced ? (
              <>
                <p className="text-xs text-zinc-500 mt-2 mb-2">
                Only edit if you know what you are doing. Invalid JSON can break the page.
              </p>
              <textarea
                value={JSON.stringify(extraData, null, 2)}
                onChange={(e) => {
                  try {
                    const extra = JSON.parse(e.target.value || '{}') as Record<string, unknown>;
                    setData({ title: data.title, subheading: data.subheading, bannerImage: data.bannerImage, body: data.body, ...extra });
                  } catch {
                    // keep previous on invalid JSON
                  }
                }}
                rows={12}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm font-mono"
                spellCheck={false}
                />
              </>
            ) : null}
          </section>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <section className="rounded border border-zinc-200 bg-white p-4">
            <h2 className="font-medium text-zinc-900 mb-3">Body preview</h2>
            <p className="text-xs text-zinc-500 mb-2">
              How the Body (Markdown) content will look on the page.
            </p>
            <div className="min-h-[200px] rounded border border-zinc-100 bg-zinc-50 p-4">
              <MarkdownPreview source={(data.body as string) ?? ''} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ImageField } from '../../components/ImageField';
import { MarkdownEditor } from '../../components/MarkdownEditor';
import { MarkdownPreview } from '../../components/MarkdownPreview';
import { PreviewLink } from '../../components/PreviewLink';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { AdminPanel } from '../../components/AdminPanel';
import { AdminBackendNotice } from '../../components/AdminBackendNotice';

const BODY_MARKDOWN_HELP =
  'Use the toolbar for headings, bold, italic, links, quotes, and lists. Markdown is still stored behind the scenes so the live site stays compatible.';

type PageData = Record<string, unknown> & {
  title?: string;
  subheading?: string;
  bannerImage?: string;
  body?: string;
  mission?: {
    title?: string;
    image?: string;
    text?: string;
  };
  servicesOverview?: {
    title?: string;
    intro?: string;
    columns?: string[];
  };
  valueDeliver?: {
    title?: string;
    items?: string[];
  };
};

const PAGE_NOTES: Record<string, string> = {
  about: 'The hero, capability cards, and the bottom proof section are still code-managed. The mission section and opening copy on this page are content-managed here.',
  'about-us':
    'The hero, capability cards, and the bottom proof section are still code-managed. The mission section and opening copy on this page are content-managed here.',
  services:
    'The hero, ETI Services Overview, and Value We Deliver are content-managed here. The capabilities card layout is still partly component-driven, so card presentation changes still require code edits.',
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
      ([k]) => !['title', 'subheading', 'bannerImage', 'body', 'mission', 'servicesOverview', 'valueDeliver'].includes(k)
    )
  );
  const mission = data.mission ?? {};
  const servicesOverview = data.servicesOverview ?? { title: '', intro: '', columns: ['', ''] };
  const servicesColumns = [servicesOverview.columns?.[0] ?? '', servicesOverview.columns?.[1] ?? ''];
  const valueDeliver = data.valueDeliver ?? { title: '', items: [] };

  return (
    <div>
      <AdminPageHeader
        eyebrow="Page editor"
        title={`Edit ${data.title || slug}`}
        description="Update the hero, markdown body content, and any additional page-specific fields for this section of the site."
        actions={
          <>
            <PreviewLink href={publicPath} />
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e] disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </>
        }
      />
      <AdminBackendNotice codeManagedNote={PAGE_NOTES[slug]} />
      {message && (
        <p className={`mb-4 text-sm ${message.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2 max-w-5xl">
        <div className="space-y-4">
          <AdminPanel title="Main fields">
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
                help="Used as the hero/background image for this page when the page layout supports one."
                recommendedSize="1600 × 700px"
              />
              <MarkdownEditor
                label="Body"
                value={(data.body as string) ?? ''}
                onChange={(body) => setData({ ...data, body })}
                help={BODY_MARKDOWN_HELP}
                placeholder="Add main page content…"
                rows={14}
              />
            </div>
          </AdminPanel>

          {(slug === 'about' || slug === 'about-us') && (
            <AdminPanel title="Mission section" description="This drives the editable mission block on the About page.">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Mission label</label>
                  <input
                    type="text"
                    value={mission.title ?? ''}
                    onChange={(e) => setData({ ...data, mission: { ...mission, title: e.target.value } })}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Mission copy</label>
                  <textarea
                    value={mission.text ?? ''}
                    onChange={(e) => setData({ ...data, mission: { ...mission, text: e.target.value } })}
                    rows={5}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <ImageField
                  label="Mission image"
                  value={mission.image ?? ''}
                  onChange={(image) => setData({ ...data, mission: { ...mission, image } })}
                  help="Shown beside the About page mission section."
                  recommendedSize="800 × 560px"
                />
              </div>
            </AdminPanel>
          )}

          {slug === 'services' && (
            <>
              <AdminPanel title="ETI Services Overview" description="Controls the lead overview band under the Services hero.">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Section title</label>
                    <input
                      type="text"
                      value={servicesOverview.title ?? ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          servicesOverview: { ...servicesOverview, title: e.target.value, columns: servicesColumns },
                        })
                      }
                      className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Intro</label>
                    <textarea
                      value={servicesOverview.intro ?? ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          servicesOverview: { ...servicesOverview, intro: e.target.value, columns: servicesColumns },
                        })
                      }
                      rows={4}
                      className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Left column</label>
                    <textarea
                      value={servicesColumns[0]}
                      onChange={(e) =>
                        setData({
                          ...data,
                          servicesOverview: {
                            ...servicesOverview,
                            columns: [e.target.value, servicesColumns[1]],
                          },
                        })
                      }
                      rows={6}
                      className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Right column</label>
                    <textarea
                      value={servicesColumns[1]}
                      onChange={(e) =>
                        setData({
                          ...data,
                          servicesOverview: {
                            ...servicesOverview,
                            columns: [servicesColumns[0], e.target.value],
                          },
                        })
                      }
                      rows={6}
                      className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </AdminPanel>

              <AdminPanel title="Value We Deliver" description="Controls the checklist section that follows the services overview.">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Section title</label>
                    <input
                      type="text"
                      value={valueDeliver.title ?? ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          valueDeliver: { ...valueDeliver, title: e.target.value, items: valueDeliver.items ?? [] },
                        })
                      }
                      className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Items (one per line)</label>
                    <textarea
                      value={(valueDeliver.items ?? []).join('\n')}
                      onChange={(e) =>
                        setData({
                          ...data,
                          valueDeliver: {
                            ...valueDeliver,
                            items: e.target.value
                              .split('\n')
                              .map((item) => item.trim())
                              .filter(Boolean),
                          },
                        })
                      }
                      rows={8}
                      className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </AdminPanel>
            </>
          )}

          <AdminPanel title="Advanced JSON" description="Only use this section for page-specific fields that are not yet covered by the editor above.">
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
          </AdminPanel>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <AdminPanel title="Body preview">
            <p className="text-xs text-zinc-500 mb-2">
              How the Body (Markdown) content will look on the page.
            </p>
            <div className="min-h-[200px] rounded border border-zinc-100 bg-zinc-50 p-4">
              <MarkdownPreview source={(data.body as string) ?? ''} />
            </div>
          </AdminPanel>
        </div>
      </div>
    </div>
  );
}

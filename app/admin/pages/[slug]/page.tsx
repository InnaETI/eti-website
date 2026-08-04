'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ImageField } from '../../components/ImageField';
import { MarkdownEditor } from '../../components/MarkdownEditor';
import { PreviewLink } from '../../components/PreviewLink';
import { AdminPageHeader } from '../../components/AdminPageHeader';
import { AdminPanel } from '../../components/AdminPanel';
import { AdminBackendNotice } from '../../components/AdminBackendNotice';

const BODY_MARKDOWN_HELP =
  'Edit visually with headings, bold, italic, links, and lists. Content is still stored in the site’s existing format behind the scenes.';

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

type LinkItem = {
  label: string;
  href: string;
};

type StructuredBullet = {
  label: string;
  text: string;
};

type StrategyBody = {
  opening: string;
  pillars: StructuredBullet[];
  closing: string;
  links: LinkItem[];
};

type MethodologyBody = {
  opening: string;
  second: string;
  principlesHeading: string;
  principles: StructuredBullet[];
  closing: string;
  links: LinkItem[];
};

type ExecutionBody = {
  firstHeading: string;
  opening: string;
  second: string;
  secondHeading: string;
  guidance: StructuredBullet[];
  closing: string;
  links: LinkItem[];
};

const PAGE_NOTES: Record<string, string> = {
  about: 'The hero, capability cards, and the bottom proof section are still code-managed. The mission section and opening copy on this page are content-managed here.',
  'about-us':
    'The hero, capability cards, and the bottom proof section are still code-managed. The mission section and opening copy on this page are content-managed here.',
  services:
    'The hero, ETI Services Overview, and Value We Deliver are content-managed here. The capabilities card layout is still partly component-driven, so card presentation changes still require code edits.',
};

const STRATEGY_DEFAULT: StrategyBody = {
  opening: '',
  pillars: [
    { label: 'Productive Teams', text: '' },
    { label: 'Right Technologies', text: '' },
    { label: 'Intellectual Property Retention and Growth', text: '' },
    { label: 'Efficient and Timely Delivery', text: '' },
  ],
  closing: '',
  links: [
    { label: 'Methodology', href: '/methodology' },
    { label: 'Execution', href: '/execution' },
  ],
};

const METHODOLOGY_DEFAULT: MethodologyBody = {
  opening: '',
  second: '',
  principlesHeading: 'Our methodology is underpinned by the following principles:',
  principles: [
    { label: 'Agile Project Management', text: '' },
    { label: 'Collaboration and Best Practices', text: '' },
    { label: 'Continuous Communication and Improvements', text: '' },
    { label: 'Right-Sizing of Teams and Solutions', text: '' },
    { label: 'Emphasis on Security, Compliance, Scalability, and Flexibility', text: '' },
    { label: 'Business-Focused Solutions', text: '' },
  ],
  closing: '',
  links: [
    { label: 'Strategy', href: '/strategy' },
    { label: 'Execution', href: '/execution' },
  ],
};

const EXECUTION_DEFAULT: ExecutionBody = {
  firstHeading: 'Achieving Success through Strategic Execution:',
  opening: '',
  second: '',
  secondHeading: 'We guide our team members to:',
  guidance: [
    { label: 'Fully Engage in Customer Success', text: '' },
    { label: 'Understand the Customer', text: '' },
    { label: 'Leverage Your Strengths', text: '' },
    { label: 'Integrate IT and Business', text: '' },
    { label: 'Align Projects with Business Goals', text: '' },
    { label: 'Business-Centric Approach', text: '' },
    { label: 'Celebrate Success', text: '' },
  ],
  closing: '',
  links: [
    { label: 'Strategy', href: '/strategy' },
    { label: 'Methodology', href: '/methodology' },
  ],
};

function trimParagraphs(parts: string[]) {
  return parts.map((part) => part.trim()).filter(Boolean);
}

function parseLinkLine(line: string) {
  const match = line.match(/^- Continue to \[([^\]]+)\]\(([^)]+)\)$/);
  if (!match) return null;
  return { label: match[1], href: match[2] };
}

function splitBodySections(body: string) {
  const segments = body.split('\n\n').map((segment) => segment.trim()).filter(Boolean);
  const links: LinkItem[] = [];
  while (segments.length && segments[segments.length - 1].startsWith('- Continue to ')) {
    const parsed = parseLinkLine(segments.pop() || '');
    if (parsed) links.unshift(parsed);
  }
  return { segments, links };
}

function parseBullets(segment: string) {
  return segment
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/^- \*\*([^*]+)\*\*:?\s*(.*)$/);
      if (match) {
        return { label: match[1].trim(), text: match[2].trim() };
      }
      return { label: '', text: line.replace(/^- /, '').trim() };
    });
}

function serializeBullets(items: StructuredBullet[]) {
  return items
    .map((item) => item.label.trim() || item.text.trim() ? `- **${item.label.trim()}:** ${item.text.trim()}` : '')
    .filter(Boolean)
    .join('\n');
}

function serializeLinks(links: LinkItem[]) {
  return links
    .map((link) => (link.label.trim() && link.href.trim() ? `- Continue to [${link.label.trim()}](${link.href.trim()})` : ''))
    .filter(Boolean)
    .join('\n\n');
}

function parseStrategyBody(body: string): StrategyBody {
  const { segments, links } = splitBodySections(body);
  const opening = segments[0] || '';
  const pillars = parseBullets(segments[1] || '');
  const closing = segments[2] || '';
  return {
    opening,
    pillars: pillars.length ? pillars : STRATEGY_DEFAULT.pillars,
    closing,
    links: links.length ? links : STRATEGY_DEFAULT.links,
  };
}

function buildStrategyBody(value: StrategyBody) {
  return trimParagraphs([
    value.opening,
    serializeBullets(value.pillars),
    value.closing,
    serializeLinks(value.links),
  ]).join('\n\n');
}

function parseMethodologyBody(body: string): MethodologyBody {
  const { segments, links } = splitBodySections(body);
  const opening = segments[0] || '';
  const second = segments[1] || '';
  const principlesHeading = (segments[2] || '## Our methodology is underpinned by the following principles:').replace(/^##\s*/, '');
  const principles = parseBullets(segments[3] || '');
  const closing = segments[4] || '';
  return {
    opening,
    second,
    principlesHeading,
    principles: principles.length ? principles : METHODOLOGY_DEFAULT.principles,
    closing,
    links: links.length ? links : METHODOLOGY_DEFAULT.links,
  };
}

function buildMethodologyBody(value: MethodologyBody) {
  return trimParagraphs([
    value.opening,
    value.second,
    `## ${value.principlesHeading.trim()}`,
    serializeBullets(value.principles),
    value.closing,
    serializeLinks(value.links),
  ]).join('\n\n');
}

function parseExecutionBody(body: string): ExecutionBody {
  const { segments, links } = splitBodySections(body);
  const firstHeading = (segments[0] || '## Achieving Success through Strategic Execution:').replace(/^##\s*/, '');
  const opening = segments[1] || '';
  const second = segments[2] || '';
  const secondHeading = (segments[3] || '## We guide our team members to:').replace(/^##\s*/, '');
  const guidance = parseBullets(segments[4] || '');
  const closing = segments[5] || '';
  return {
    firstHeading,
    opening,
    second,
    secondHeading,
    guidance: guidance.length ? guidance : EXECUTION_DEFAULT.guidance,
    closing,
    links: links.length ? links : EXECUTION_DEFAULT.links,
  };
}

function buildExecutionBody(value: ExecutionBody) {
  return trimParagraphs([
    `## ${value.firstHeading.trim()}`,
    value.opening,
    value.second,
    `## ${value.secondHeading.trim()}`,
    serializeBullets(value.guidance),
    value.closing,
    serializeLinks(value.links),
  ]).join('\n\n');
}

function StructuredBulletEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: StructuredBullet[];
  onChange: (items: StructuredBullet[]) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-700">{label}</p>
      {items.map((item, index) => (
        <div key={`${label}-${index}`} className="rounded-2xl border border-zinc-200 p-3">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Label</label>
              <input
                type="text"
                value={item.label}
                onChange={(event) => {
                  const next = items.slice();
                  next[index] = { ...item, label: event.target.value };
                  onChange(next);
                }}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Text</label>
              <textarea
                value={item.text}
                onChange={(event) => {
                  const next = items.slice();
                  next[index] = { ...item, text: event.target.value };
                  onChange(next);
                }}
                rows={3}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function JourneyLinksEditor({
  links,
  onChange,
}: {
  links: LinkItem[];
  onChange: (links: LinkItem[]) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-700">Continue journey links</p>
      {links.map((link, index) => (
        <div key={`${link.label}-${index}`} className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Link label</label>
            <input
              type="text"
              value={link.label}
              onChange={(event) => {
                const next = links.slice();
                next[index] = { ...link, label: event.target.value };
                onChange(next);
              }}
              className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">Path</label>
            <input
              type="text"
              value={link.href}
              onChange={(event) => {
                const next = links.slice();
                next[index] = { ...link, href: event.target.value };
                onChange(next);
              }}
              className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              placeholder="/strategy"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminPageEditorPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [data, setData] = useState<PageData>({});
  const [loadedData, setLoadedData] = useState<PageData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [strategyBody, setStrategyBody] = useState<StrategyBody>(STRATEGY_DEFAULT);
  const [methodologyBody, setMethodologyBody] = useState<MethodologyBody>(METHODOLOGY_DEFAULT);
  const [executionBody, setExecutionBody] = useState<ExecutionBody>(EXECUTION_DEFAULT);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/admin/content?type=page&slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((json) => {
        setData(json);
        setLoadedData(json);
        const body = (json.body as string) ?? '';
        if (slug === 'strategy') setStrategyBody(parseStrategyBody(body));
        if (slug === 'methodology') setMethodologyBody(parseMethodologyBody(body));
        if (slug === 'execution') setExecutionBody(parseExecutionBody(body));
      })
      .finally(() => setLoading(false));
  }, [slug]);

  function syncStructuredStatesFromBody(nextSlug: string, body: string) {
    if (nextSlug === 'strategy') setStrategyBody(parseStrategyBody(body));
    if (nextSlug === 'methodology') setMethodologyBody(parseMethodologyBody(body));
    if (nextSlug === 'execution') setExecutionBody(parseExecutionBody(body));
  }

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
      .then(() => setLoadedData(data))
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
  const hasUnsavedChanges = JSON.stringify(data) !== JSON.stringify(loadedData);
  const isStructuredPage = slug === 'strategy' || slug === 'methodology' || slug === 'execution';

  function syncStructuredBody(next: StrategyBody | MethodologyBody | ExecutionBody) {
    if (slug === 'strategy') {
      const typed = next as StrategyBody;
      setStrategyBody(typed);
      setData((current) => ({ ...current, body: buildStrategyBody(typed) }));
      return;
    }
    if (slug === 'methodology') {
      const typed = next as MethodologyBody;
      setMethodologyBody(typed);
      setData((current) => ({ ...current, body: buildMethodologyBody(typed) }));
      return;
    }
    if (slug === 'execution') {
      const typed = next as ExecutionBody;
      setExecutionBody(typed);
      setData((current) => ({ ...current, body: buildExecutionBody(typed) }));
    }
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Page editor"
        title={`Edit ${data.title || slug}`}
        description="Update the hero, page content, and any additional page-specific fields for this section of the site."
        actions={
          <>
            <PreviewLink href={publicPath} />
            <button
              type="button"
              onClick={() => {
                setData(loadedData);
                syncStructuredStatesFromBody(slug, (loadedData.body as string) ?? '');
                setMessage(null);
              }}
              disabled={!hasUnsavedChanges || saving}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset changes
            </button>
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
      {hasUnsavedChanges ? <p className="mb-4 text-sm text-amber-700">You have unsaved changes in this editor.</p> : null}

      <div className="max-w-5xl space-y-6">
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
              {!isStructuredPage ? (
                <MarkdownEditor
                  label="Body"
                  value={(data.body as string) ?? ''}
                  onChange={(body) => setData({ ...data, body })}
                  help={BODY_MARKDOWN_HELP}
                  placeholder="Add main page content…"
                  rows={18}
                />
              ) : null}
            </div>
          </AdminPanel>

          {slug === 'strategy' ? (
            <AdminPanel title="Strategy content" description="Edit the strategy page as paragraphs, pillars, and linked next steps without touching raw markup.">
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Opening paragraph</label>
                  <textarea
                    value={strategyBody.opening}
                    onChange={(event) => syncStructuredBody({ ...strategyBody, opening: event.target.value })}
                    rows={5}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <StructuredBulletEditor
                  label="Four pillars"
                  items={strategyBody.pillars}
                  onChange={(pillars) => syncStructuredBody({ ...strategyBody, pillars })}
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Closing paragraph</label>
                  <textarea
                    value={strategyBody.closing}
                    onChange={(event) => syncStructuredBody({ ...strategyBody, closing: event.target.value })}
                    rows={4}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <JourneyLinksEditor
                  links={strategyBody.links}
                  onChange={(links) => syncStructuredBody({ ...strategyBody, links })}
                />
              </div>
            </AdminPanel>
          ) : null}

          {slug === 'methodology' ? (
            <AdminPanel title="Methodology content" description="Edit the methodology page as paragraphs, principle items, and next-step links without exposing markdown.">
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Opening paragraph</label>
                  <textarea
                    value={methodologyBody.opening}
                    onChange={(event) => syncStructuredBody({ ...methodologyBody, opening: event.target.value })}
                    rows={5}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Second paragraph</label>
                  <textarea
                    value={methodologyBody.second}
                    onChange={(event) => syncStructuredBody({ ...methodologyBody, second: event.target.value })}
                    rows={5}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Principles heading</label>
                  <input
                    type="text"
                    value={methodologyBody.principlesHeading}
                    onChange={(event) => syncStructuredBody({ ...methodologyBody, principlesHeading: event.target.value })}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <StructuredBulletEditor
                  label="Principles"
                  items={methodologyBody.principles}
                  onChange={(principles) => syncStructuredBody({ ...methodologyBody, principles })}
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Closing paragraph</label>
                  <textarea
                    value={methodologyBody.closing}
                    onChange={(event) => syncStructuredBody({ ...methodologyBody, closing: event.target.value })}
                    rows={4}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <JourneyLinksEditor
                  links={methodologyBody.links}
                  onChange={(links) => syncStructuredBody({ ...methodologyBody, links })}
                />
              </div>
            </AdminPanel>
          ) : null}

          {slug === 'execution' ? (
            <AdminPanel title="Execution content" description="Edit the execution page as headings, paragraphs, guidance points, and next-step links without raw markup.">
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">First heading</label>
                  <input
                    type="text"
                    value={executionBody.firstHeading}
                    onChange={(event) => syncStructuredBody({ ...executionBody, firstHeading: event.target.value })}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Opening paragraph</label>
                  <textarea
                    value={executionBody.opening}
                    onChange={(event) => syncStructuredBody({ ...executionBody, opening: event.target.value })}
                    rows={5}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Second paragraph</label>
                  <textarea
                    value={executionBody.second}
                    onChange={(event) => syncStructuredBody({ ...executionBody, second: event.target.value })}
                    rows={5}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Second heading</label>
                  <input
                    type="text"
                    value={executionBody.secondHeading}
                    onChange={(event) => syncStructuredBody({ ...executionBody, secondHeading: event.target.value })}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <StructuredBulletEditor
                  label="Guidance items"
                  items={executionBody.guidance}
                  onChange={(guidance) => syncStructuredBody({ ...executionBody, guidance })}
                />
                <div>
                  <label className="mb-1 block text-sm font-medium text-zinc-700">Closing paragraph</label>
                  <textarea
                    value={executionBody.closing}
                    onChange={(event) => syncStructuredBody({ ...executionBody, closing: event.target.value })}
                    rows={4}
                    className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                  />
                </div>
                <JourneyLinksEditor
                  links={executionBody.links}
                  onChange={(links) => syncStructuredBody({ ...executionBody, links })}
                />
              </div>
            </AdminPanel>
          ) : null}

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
                    const next = {
                      title: data.title,
                      subheading: data.subheading,
                      bannerImage: data.bannerImage,
                      body: data.body,
                      mission: data.mission,
                      servicesOverview: data.servicesOverview,
                      valueDeliver: data.valueDeliver,
                      ...extra,
                    };
                    setData(next);
                    syncStructuredStatesFromBody(slug, (next.body as string) ?? '');
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
      </div>
    </div>
  );
}

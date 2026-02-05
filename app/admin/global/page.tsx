'use client';

import { useEffect, useState } from 'react';
import { ImageField } from '../components/ImageField';

type GlobalData = {
  siteName: string;
  legalName: string;
  shortName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  social: { facebook?: string; linkedin?: string };
  nav: Array<{ href: string; label: string }>;
  footerLinks: Array<{ href: string; label: string }>;
  copyrightText: string;
  logoUrl: string;
  footerLogoUrl: string;
};

const defaultGlobal: GlobalData = {
  siteName: '',
  legalName: '',
  shortName: '',
  tagline: '',
  description: '',
  contactEmail: '',
  contactPhone: '',
  social: {},
  nav: [],
  footerLinks: [],
  copyrightText: '',
  logoUrl: '',
  footerLogoUrl: '',
};

function LinkRow({
  item,
  onChange,
  onRemove,
}: {
  item: { href: string; label: string };
  onChange: (item: { href: string; label: string }) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={item.href}
        onChange={(e) => onChange({ ...item, href: e.target.value })}
        placeholder="href"
        className="flex-1 rounded border border-zinc-300 px-2 py-1.5 text-sm"
      />
      <input
        type="text"
        value={item.label}
        onChange={(e) => onChange({ ...item, label: e.target.value })}
        placeholder="label"
        className="flex-1 rounded border border-zinc-300 px-2 py-1.5 text-sm"
      />
      <button type="button" onClick={onRemove} className="text-red-600 hover:underline text-sm">Remove</button>
    </div>
  );
}

export default function AdminGlobalPage() {
  const [data, setData] = useState<GlobalData>(defaultGlobal);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?type=global')
      .then((r) => r.json())
      .then((json) => setData({ ...defaultGlobal, ...json }))
      .finally(() => setLoading(false));
  }, []);

  function save() {
    setSaving(true);
    setMessage(null);
    fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'global', data }),
    })
      .then((r) => {
        if (r.ok) setMessage({ type: 'ok', text: 'Saved.' });
        else return r.json().then((d) => { setMessage({ type: 'error', text: d.error ?? 'Save failed' }); });
      })
      .finally(() => setSaving(false));
  }

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Global settings</h1>
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

      <div className="space-y-6 max-w-2xl">
        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Brand</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Site name</label>
              <input
                type="text"
                value={data.siteName}
                onChange={(e) => setData({ ...data, siteName: e.target.value })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Legal name</label>
              <input
                type="text"
                value={data.legalName}
                onChange={(e) => setData({ ...data, legalName: e.target.value })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Short name</label>
              <input
                type="text"
                value={data.shortName}
                onChange={(e) => setData({ ...data, shortName: e.target.value })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">Tagline</label>
              <input
                type="text"
                value={data.tagline}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                rows={2}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Logos</h2>
          <div className="space-y-4">
            <ImageField
              label="Header logo URL"
              value={data.logoUrl}
              onChange={(logoUrl) => setData({ ...data, logoUrl })}
            />
            <ImageField
              label="Footer logo URL"
              value={data.footerLogoUrl}
              onChange={(footerLogoUrl) => setData({ ...data, footerLogoUrl })}
            />
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Contact</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
              <input
                type="email"
                value={data.contactEmail}
                onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Phone</label>
              <input
                type="text"
                value={data.contactPhone}
                onChange={(e) => setData({ ...data, contactPhone: e.target.value })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Social</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Facebook URL</label>
              <input
                type="url"
                value={data.social?.facebook ?? ''}
                onChange={(e) => setData({ ...data, social: { ...data.social, facebook: e.target.value || undefined } })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={data.social?.linkedin ?? ''}
                onChange={(e) => setData({ ...data, social: { ...data.social, linkedin: e.target.value || undefined } })}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Navigation</h2>
          <div className="space-y-2">
            {data.nav.map((item, i) => (
              <LinkRow
                key={i}
                item={item}
                onChange={(next) => {
                  const nav = [...data.nav];
                  nav[i] = next;
                  setData({ ...data, nav });
                }}
                onRemove={() => setData({ ...data, nav: data.nav.filter((_, j) => j !== i) })}
              />
            ))}
            <button
              type="button"
              onClick={() => setData({ ...data, nav: [...data.nav, { href: '', label: '' }] })}
              className="text-sm text-zinc-600 hover:underline"
            >
              + Add nav item
            </button>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Footer links</h2>
          <div className="space-y-2">
            {data.footerLinks.map((item, i) => (
              <LinkRow
                key={i}
                item={item}
                onChange={(next) => {
                  const footerLinks = [...data.footerLinks];
                  footerLinks[i] = next;
                  setData({ ...data, footerLinks });
                }}
                onRemove={() => setData({ ...data, footerLinks: data.footerLinks.filter((_, j) => j !== i) })}
              />
            ))}
            <button
              type="button"
              onClick={() => setData({ ...data, footerLinks: [...data.footerLinks, { href: '', label: '' }] })}
              className="text-sm text-zinc-600 hover:underline"
            >
              + Add footer link
            </button>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Copyright</h2>
          <input
            type="text"
            value={data.copyrightText}
            onChange={(e) => setData({ ...data, copyrightText: e.target.value })}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </section>
      </div>
    </div>
  );
}

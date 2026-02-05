'use client';

import { useEffect, useState } from 'react';
import { ImageField } from '../components/ImageField';
import { PreviewLink } from '../components/PreviewLink';

type Pillar = { title: string; image: string; copy: string; linkText: string; href: string };
type ServiceItem = { icon: string; title: string };
type NewsLink = { title: string; url: string };
type NewsSection = { heading: string; links: NewsLink[] };

type HomeData = {
  heroBanner?: string;
  pillars?: Pillar[];
  services?: { intro: string; viewMoreHref: string; viewMoreText: string; items: ServiceItem[] };
  clients?: { intro: string; viewMoreHref: string; viewMoreText: string };
  cta?: { title: string; subtitle: string; buttonText: string; href: string };
  about?: { title: string; copy: string };
  joinTeam?: { title: string; copy: string; buttonText: string; href: string };
  news?: { title: string; sections: NewsSection[] };
};

const defaultHome: HomeData = {
  heroBanner: '',
  pillars: [],
  services: { intro: '', viewMoreHref: '', viewMoreText: '', items: [] },
  clients: { intro: '', viewMoreHref: '', viewMoreText: '' },
  cta: { title: '', subtitle: '', buttonText: '', href: '' },
  about: { title: '', copy: '' },
  joinTeam: { title: '', copy: '', buttonText: '', href: '' },
  news: { title: 'News', sections: [] },
};

export default function AdminHomePage() {
  const [data, setData] = useState<HomeData>(defaultHome);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content?type=home')
      .then((r) => r.json())
      .then((json) => setData({ ...defaultHome, ...json }))
      .finally(() => setLoading(false));
  }, []);

  function save() {
    setSaving(true);
    setMessage(null);
    fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'home', data }),
    })
      .then((r) => {
        if (r.ok) setMessage({ type: 'ok', text: 'Saved.' });
        else return r.json().then((d) => { setMessage({ type: 'error', text: d.error ?? 'Save failed' }); });
      })
      .finally(() => setSaving(false));
  }

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  const pillars = data.pillars ?? [];
  const services = data.services ?? defaultHome.services!;
  const clients = data.clients ?? defaultHome.clients!;
  const cta = data.cta ?? defaultHome.cta!;
  const about = data.about ?? defaultHome.about!;
  const joinTeam = data.joinTeam ?? defaultHome.joinTeam!;
  const news = data.news ?? defaultHome.news!;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-zinc-900">Home page</h1>
          <PreviewLink href="/" />
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

      <div className="space-y-6 max-w-2xl">
        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Hero</h2>
          <ImageField
            label="Hero banner image"
            value={data.heroBanner ?? ''}
            onChange={(heroBanner) => setData({ ...data, heroBanner })}
          />
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Pillars (Strategy / Methodology / Execution)</h2>
          <div className="space-y-4">
            {pillars.map((p, i) => (
              <div key={i} className="rounded border border-zinc-100 p-3 space-y-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    type="text"
                    value={p.title}
                    onChange={(e) => {
                      const next = [...pillars];
                      next[i] = { ...p, title: e.target.value };
                      setData({ ...data, pillars: next });
                    }}
                    placeholder="Title"
                    className="rounded border border-zinc-300 px-2 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    value={p.href}
                    onChange={(e) => {
                      const next = [...pillars];
                      next[i] = { ...p, href: e.target.value };
                      setData({ ...data, pillars: next });
                    }}
                    placeholder="Link (e.g. /strategy)"
                    className="rounded border border-zinc-300 px-2 py-1.5 text-sm"
                  />
                </div>
                <ImageField
                  label="Image"
                  value={p.image}
                  onChange={(image) => {
                    const next = [...pillars];
                    next[i] = { ...p, image };
                    setData({ ...data, pillars: next });
                  }}
                />
                <textarea
                  value={p.copy}
                  onChange={(e) => {
                    const next = [...pillars];
                    next[i] = { ...p, copy: e.target.value };
                    setData({ ...data, pillars: next });
                  }}
                  placeholder="Copy"
                  rows={2}
                  className="w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
                />
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={p.linkText}
                    onChange={(e) => {
                      const next = [...pillars];
                      next[i] = { ...p, linkText: e.target.value };
                      setData({ ...data, pillars: next });
                    }}
                    placeholder="Link text (e.g. READ MORE)"
                    className="rounded border border-zinc-300 px-2 py-1.5 text-sm w-40"
                  />
                  <button
                    type="button"
                    onClick={() => setData({ ...data, pillars: pillars.filter((_, j) => j !== i) })}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setData({ ...data, pillars: [...pillars, { title: '', image: '', copy: '', linkText: '', href: '' }] })}
              className="text-sm text-zinc-600 hover:underline"
            >
              + Add pillar
            </button>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Services</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Intro</label>
              <textarea
                value={services.intro}
                onChange={(e) => setData({ ...data, services: { ...services, intro: e.target.value } })}
                rows={3}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">View more link</label>
                <input
                  type="text"
                  value={services.viewMoreHref}
                  onChange={(e) => setData({ ...data, services: { ...services, viewMoreHref: e.target.value } })}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">View more text</label>
                <input
                  type="text"
                  value={services.viewMoreText}
                  onChange={(e) => setData({ ...data, services: { ...services, viewMoreText: e.target.value } })}
                  className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">Service items (icon + title)</label>
              {(services.items ?? []).map((item, i) => (
                <div key={i} className="flex gap-2 items-center mb-2">
                  <ImageField
                    label="Icon"
                    value={item.icon}
                    onChange={(icon) => {
                      const items = [...(services.items ?? [])];
                      items[i] = { ...item, icon };
                      setData({ ...data, services: { ...services, items } });
                    }}
                  />
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const items = [...(services.items ?? [])];
                      items[i] = { ...item, title: e.target.value };
                      setData({ ...data, services: { ...services, items } });
                    }}
                    placeholder="Title"
                    className="rounded border border-zinc-300 px-2 py-1.5 text-sm flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => setData({ ...data, services: { ...services, items: (services.items ?? []).filter((_, j) => j !== i) } })}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setData({ ...data, services: { ...services, items: [...(services.items ?? []), { icon: '', title: '' }] } })}
                className="text-sm text-zinc-600 hover:underline"
              >
                + Add item
              </button>
            </div>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Clients</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Intro</label>
              <textarea
                value={clients.intro}
                onChange={(e) => setData({ ...data, clients: { ...clients, intro: e.target.value } })}
                rows={2}
                className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                type="text"
                value={clients.viewMoreHref}
                onChange={(e) => setData({ ...data, clients: { ...clients, viewMoreHref: e.target.value } })}
                placeholder="View more href"
                className="rounded border border-zinc-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={clients.viewMoreText}
                onChange={(e) => setData({ ...data, clients: { ...clients, viewMoreText: e.target.value } })}
                placeholder="View more text"
                className="rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">CTA</h2>
          <div className="space-y-2">
            <input
              type="text"
              value={cta.title}
              onChange={(e) => setData({ ...data, cta: { ...cta, title: e.target.value } })}
              placeholder="Title"
              className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              value={cta.subtitle}
              onChange={(e) => setData({ ...data, cta: { ...cta, subtitle: e.target.value } })}
              placeholder="Subtitle"
              className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                type="text"
                value={cta.buttonText}
                onChange={(e) => setData({ ...data, cta: { ...cta, buttonText: e.target.value } })}
                placeholder="Button text"
                className="rounded border border-zinc-300 px-3 py-2 text-sm"
              />
              <input
                type="text"
                value={cta.href}
                onChange={(e) => setData({ ...data, cta: { ...cta, href: e.target.value } })}
                placeholder="Button href"
                className="rounded border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">About</h2>
          <input
            type="text"
            value={about.title}
            onChange={(e) => setData({ ...data, about: { ...about, title: e.target.value } })}
            placeholder="Title"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm mb-2"
          />
          <textarea
            value={about.copy}
            onChange={(e) => setData({ ...data, about: { ...about, copy: e.target.value } })}
            placeholder="Copy"
            rows={4}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">Join team</h2>
          <input
            type="text"
            value={joinTeam.title}
            onChange={(e) => setData({ ...data, joinTeam: { ...joinTeam, title: e.target.value } })}
            placeholder="Title"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm mb-2"
          />
          <textarea
            value={joinTeam.copy}
            onChange={(e) => setData({ ...data, joinTeam: { ...joinTeam, copy: e.target.value } })}
            placeholder="Copy"
            rows={3}
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm mb-2"
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              type="text"
              value={joinTeam.buttonText}
              onChange={(e) => setData({ ...data, joinTeam: { ...joinTeam, buttonText: e.target.value } })}
              placeholder="Button text"
              className="rounded border border-zinc-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              value={joinTeam.href}
              onChange={(e) => setData({ ...data, joinTeam: { ...joinTeam, href: e.target.value } })}
              placeholder="Button href"
              className="rounded border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
        </section>

        <section className="rounded border border-zinc-200 bg-white p-4">
          <h2 className="font-medium text-zinc-900 mb-3">News</h2>
          <input
            type="text"
            value={news.title}
            onChange={(e) => setData({ ...data, news: { ...news, title: e.target.value } })}
            placeholder="Section title"
            className="w-full rounded border border-zinc-300 px-3 py-2 text-sm mb-3"
          />
          {(news.sections ?? []).map((sec, si) => (
            <div key={si} className="rounded border border-zinc-100 p-3 mb-3">
              <input
                type="text"
                value={sec.heading}
                onChange={(e) => {
                  const sections = [...(news.sections ?? [])];
                  sections[si] = { ...sec, heading: e.target.value };
                  setData({ ...data, news: { ...news, sections } });
                }}
                placeholder="Heading"
                className="w-full rounded border border-zinc-300 px-2 py-1.5 text-sm mb-2"
              />
              {(sec.links ?? []).map((link, li) => (
                <div key={li} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => {
                      const sections = [...(news.sections ?? [])];
                      const links = [...(sections[si].links ?? [])];
                      links[li] = { ...link, title: e.target.value };
                      sections[si] = { ...sec, links };
                      setData({ ...data, news: { ...news, sections } });
                    }}
                    placeholder="Link title"
                    className="flex-1 rounded border border-zinc-300 px-2 py-1.5 text-sm"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => {
                      const sections = [...(news.sections ?? [])];
                      const links = [...(sections[si].links ?? [])];
                      links[li] = { ...link, url: e.target.value };
                      sections[si] = { ...sec, links };
                      setData({ ...data, news: { ...news, sections } });
                    }}
                    placeholder="URL"
                    className="flex-1 rounded border border-zinc-300 px-2 py-1.5 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const sections = [...(news.sections ?? [])];
                      sections[si] = { ...sec, links: (sec.links ?? []).filter((_, j) => j !== li) };
                      setData({ ...data, news: { ...news, sections } });
                    }}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const sections = [...(news.sections ?? [])];
                  sections[si] = { ...sec, links: [...(sec.links ?? []), { title: '', url: '' }] };
                  setData({ ...data, news: { ...news, sections } });
                }}
                className="text-sm text-zinc-600 hover:underline mr-2"
              >
                + Add link
              </button>
              <button
                type="button"
                onClick={() => setData({ ...data, news: { ...news, sections: (news.sections ?? []).filter((_, j) => j !== si) } })}
                className="text-sm text-red-600 hover:underline"
              >
                Remove section
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, news: { ...news, sections: [...(news.sections ?? []), { heading: '', links: [] }] } })}
            className="text-sm text-zinc-600 hover:underline"
          >
            + Add news section
          </button>
        </section>
      </div>
    </div>
  );
}

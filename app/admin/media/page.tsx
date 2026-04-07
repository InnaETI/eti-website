'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { AdminPanel } from '../components/AdminPanel';
import { ImageField } from '../components/ImageField';
import { PreviewLink } from '../components/PreviewLink';
import { AdminBackendNotice } from '../components/AdminBackendNotice';

type GlobalData = {
  logoUrl?: string;
  footerLogoUrl?: string;
};

type HomeData = {
  heroBanner?: string;
};

type PageData = {
  title?: string;
  bannerImage?: string;
} & Record<string, unknown>;

type HeroTarget = {
  slug: string;
  title: string;
  fieldLabel: string;
  recommendedSize: string;
  help: string;
};

const HERO_TARGETS: HeroTarget[] = [
  {
    slug: 'about-us',
    title: 'About Us hero',
    fieldLabel: 'About Us background image',
    recommendedSize: '1600 × 700px',
    help: 'Used behind the About Us page hero. Choose a calm city or architecture image with room for white type.',
  },
  {
    slug: 'services',
    title: 'Services hero',
    fieldLabel: 'Services background image',
    recommendedSize: '1600 × 700px',
    help: 'Shown behind the Services hero. Avoid crowded imagery; the text needs to remain easy to read.',
  },
  {
    slug: 'contact-us',
    title: 'Contact Us hero',
    fieldLabel: 'Contact background image',
    recommendedSize: '1600 × 600px',
    help: 'Supports the editorial Contact hero. Lighter images work best because the overlay is soft.',
  },
  {
    slug: 'clients',
    title: 'Clients hero',
    fieldLabel: 'Clients background image',
    recommendedSize: '1600 × 700px',
    help: 'Sets the tone for the premium client case study page. Use restrained, business-forward imagery.',
  },
];

export default function AdminMediaPage() {
  const [globalData, setGlobalData] = useState<GlobalData>({});
  const [homeData, setHomeData] = useState<HomeData>({});
  const [pageData, setPageData] = useState<Record<string, PageData>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      const responses = await Promise.all([
        fetch('/api/admin/content?type=global').then((r) => r.json()),
        fetch('/api/admin/content?type=home').then((r) => r.json()),
        ...HERO_TARGETS.map((target) =>
          fetch(`/api/admin/content?type=page&slug=${encodeURIComponent(target.slug)}`).then((r) => r.json())
        ),
      ]);

      if (!active) return;

      const [globalJson, homeJson, ...pageJson] = responses;
      setGlobalData({
        logoUrl: globalJson.logoUrl ?? '',
        footerLogoUrl: globalJson.footerLogoUrl ?? '',
      });
      setHomeData({
        heroBanner: homeJson.heroBanner ?? '',
      });

      const nextPages: Record<string, PageData> = {};
      HERO_TARGETS.forEach((target, index) => {
        nextPages[target.slug] = {
          ...(pageJson[index] ?? {}),
          title: pageJson[index]?.title ?? target.title,
          bannerImage: pageJson[index]?.bannerImage ?? '',
        };
      });
      setPageData(nextPages);
      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  const mediaCount = useMemo(() => {
    const pageImages = HERO_TARGETS.filter((target) => pageData[target.slug]?.bannerImage).length;
    return [globalData.logoUrl, globalData.footerLogoUrl, homeData.heroBanner].filter(Boolean).length + pageImages;
  }, [globalData, homeData, pageData]);

  async function saveAll() {
    setSaving(true);
    setMessage(null);

    const responses = await Promise.all([
      fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'global', data: globalData }),
      }),
      fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'home', data: homeData }),
      }),
      ...HERO_TARGETS.map((target) =>
        fetch('/api/admin/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'page',
            slug: target.slug,
            data: {
              ...pageData[target.slug],
              bannerImage: pageData[target.slug]?.bannerImage ?? '',
            },
          }),
        })
      ),
    ]);

    const failed = responses.find((response) => !response.ok);
    setSaving(false);

    if (failed) {
      const json = await failed.json().catch(() => ({}));
      setMessage({ type: 'error', text: json.error ?? 'Could not save media changes.' });
      return;
    }

    setMessage({ type: 'ok', text: 'Media settings saved.' });
  }

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Media"
        title="Manage images"
        description="Update the brand logos and hero/background images used across the website. This view is designed for non-technical editors who need the big visual assets in one place."
        actions={
          <button
            type="button"
            onClick={saveAll}
            disabled={saving}
            className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e] disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save all changes'}
          </button>
        }
      />
      <AdminBackendNotice codeManagedNote="This media workspace covers logos and the major hero/background images. Inline component images, blog thumbnails chosen in code, and some page-specific visuals still live outside this screen." />

      {message ? (
        <p className={`mb-4 text-sm ${message.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <AdminPanel
            title="Brand assets"
            description="These logos appear in the public header and footer. Keep them consistent with the live ETI site."
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <ImageField
                label="Header logo"
                value={globalData.logoUrl ?? ''}
                onChange={(logoUrl) => setGlobalData((current) => ({ ...current, logoUrl }))}
                help="Shown in the top navigation across the site."
                recommendedSize="Around 360 × 120px with transparency"
              />
              <ImageField
                label="Footer logo"
                value={globalData.footerLogoUrl ?? ''}
                onChange={(footerLogoUrl) => setGlobalData((current) => ({ ...current, footerLogoUrl }))}
                help="Shown in the footer. Use the horizontal ETI lockup with the red cube."
                recommendedSize="Around 520 × 120px with transparency"
              />
            </div>
          </AdminPanel>

          <AdminPanel
            title="Homepage hero"
            description="The main homepage background image. It sits behind the lead ETI positioning statement."
          >
            <div className="space-y-4">
              <ImageField
                label="Homepage hero background"
                value={homeData.heroBanner ?? ''}
                onChange={(heroBanner) => setHomeData((current) => ({ ...current, heroBanner }))}
                help="Use a restrained image with enough negative space for text."
                recommendedSize="1800 × 960px"
              />
              <div className="flex flex-wrap gap-3">
                <PreviewLink href="/" />
                <Link
                  href="/admin/home"
                  className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
                >
                  Open home editor
                </Link>
              </div>
            </div>
          </AdminPanel>

          <AdminPanel
            title="Core page hero images"
            description="These backgrounds control the first impression on the main public pages. Keep them calm, readable, and on-brand."
          >
            <div className="space-y-8">
              {HERO_TARGETS.map((target) => {
                const page = pageData[target.slug] ?? {};

                return (
                  <div key={target.slug} className="rounded-2xl border border-zinc-200 bg-zinc-50/65 p-5">
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-zinc-950">{page.title || target.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{target.help}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <PreviewLink href={`/${target.slug}`} />
                        <Link
                          href={`/admin/pages/${target.slug}`}
                          className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
                        >
                          Open page editor
                        </Link>
                      </div>
                    </div>

                    <ImageField
                      label={target.fieldLabel}
                      value={page.bannerImage ?? ''}
                      onChange={(bannerImage) =>
                        setPageData((current) => ({
                          ...current,
                          [target.slug]: { ...current[target.slug], bannerImage },
                        }))
                      }
                      help="Upload a new image, replace the current one, or paste an existing asset path."
                      recommendedSize={target.recommendedSize}
                    />
                  </div>
                );
              })}
            </div>
          </AdminPanel>
        </div>

        <div className="space-y-6 xl:sticky xl:top-8 xl:self-start">
          <AdminPanel title="Editing notes">
            <ul className="space-y-3 text-sm leading-6 text-zinc-600">
              <li>
                <span className="font-medium text-zinc-950">Today you can change:</span> header logo, footer logo, homepage hero, and the main hero/background images for About, Services, Contact, and Clients.
              </li>
              <li>
                <span className="font-medium text-zinc-950">Use transparent PNG or SVG</span> for logos and lockups.
              </li>
              <li>
                <span className="font-medium text-zinc-950">Use wider images</span> for hero backgrounds so text has room to breathe.
              </li>
              <li>
                For blog thumbnails, team headshots, and page-specific inline images, keep using the individual page or blog editors.
              </li>
            </ul>
          </AdminPanel>

          <AdminPanel title="Coverage">
            <div className="space-y-2 text-sm text-zinc-600">
              <p className="font-medium text-zinc-950">{mediaCount} key images configured</p>
              <p>Editable from this screen:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Header logo</li>
                <li>Footer logo</li>
                <li>Homepage hero</li>
                <li>About Us hero</li>
                <li>Services hero</li>
                <li>Contact Us hero</li>
                <li>Clients hero</li>
              </ul>
            </div>
          </AdminPanel>
        </div>
      </div>
    </div>
  );
}

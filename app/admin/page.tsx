import Link from 'next/link';
import {
  getAllBlogPostSummariesFromStore,
  getAllPageSummariesFromStore,
  getGlobalContentFromStore,
  getHomeContentFromStore,
  getStorageBackendInfo,
} from '@/lib/content-store';
import { AdminPageHeader } from './components/AdminPageHeader';
import { AdminPanel } from './components/AdminPanel';

export default async function AdminDashboardPage() {
  const [pages, posts, global, home] = await Promise.all([
    getAllPageSummariesFromStore(),
    getAllBlogPostSummariesFromStore(),
    getGlobalContentFromStore(),
    getHomeContentFromStore(),
  ]);
  const backend = getStorageBackendInfo();
  const navCount = global?.nav?.length ?? 0;
  const footerCount = global?.footerLinks?.length ?? 0;
  const metricsCount = Array.isArray(home?.metrics) ? home.metrics.length : 0;

  return (
    <div>
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Website manager"
        description="Manage the ETI website from one place. Update global brand settings, refresh homepage messaging, maintain core pages, and keep blog content current without digging through content files."
        actions={
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1f3b68] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#17345e]"
          >
            Open live site
          </a>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Core pages', value: pages.length, detail: 'Editable page records' },
          { label: 'Blog posts', value: posts.length, detail: 'Articles in content/blog' },
          { label: 'Navigation items', value: navCount, detail: 'Header links in global settings' },
          { label: 'Homepage metrics', value: metricsCount, detail: 'Stats surfaced on the homepage' },
        ].map((item) => (
          <AdminPanel key={item.label} className="p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">{item.value}</p>
            <p className="mt-2 text-sm text-zinc-600">{item.detail}</p>
          </AdminPanel>
        ))}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <AdminPanel
            title="Editing areas"
            description="Use these workspaces to manage the website without touching raw content files."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  href: '/admin/media',
                  title: 'Media',
                  description: 'Hero backgrounds, brand logos, and the main visual assets used across the site.',
                },
                {
                  href: '/admin/global',
                  title: 'Global settings',
                  description: 'Brand identity, logos, navigation, footer links, and contact details.',
                },
                {
                  href: '/admin/home',
                  title: 'Homepage',
                  description: 'Hero message, metrics, featured clients, pillars, and homepage call-to-action sections.',
                },
                {
                  href: '/admin/pages',
                  title: 'Core pages',
                  description: 'About, Services, Contact, Team, Strategy, Methodology, and other editable site pages.',
                },
                {
                  href: '/admin/blog',
                  title: 'Blog',
                  description: 'Manage article titles, publication dates, excerpts, images, and article bodies.',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 transition hover:border-zinc-300 hover:bg-white"
                >
                  <h2 className="text-lg font-semibold text-zinc-950">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.description}</p>
                  <p className="mt-4 text-sm font-medium text-[#1f3b68]">Open workspace →</p>
                </Link>
              ))}
            </div>
          </AdminPanel>

          <AdminPanel
            title="Recently managed content"
            description="Quick jump back into the sections that usually need updates."
          >
            <div className="grid gap-3 md:grid-cols-2">
              {pages.slice(0, 4).map((page) => (
                <Link
                  key={page.slug}
                  href={`/admin/pages/${page.slug}`}
                  className="rounded-xl border border-zinc-200 px-4 py-3 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <p className="text-sm font-semibold text-zinc-950">{page.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{page.subheading || page.slug}</p>
                </Link>
              ))}
            </div>
          </AdminPanel>
        </div>

        <div className="space-y-5">
          <AdminPanel
            title="At a glance"
            description="A quick sense of what the public site is currently surfacing."
          >
            <dl className="space-y-4 text-sm text-zinc-600">
              <div className="flex items-start justify-between gap-4">
                <dt>Brand</dt>
                <dd className="text-right font-medium text-zinc-950">{global?.siteName || 'Not set'}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Header CTA</dt>
                <dd className="text-right font-medium text-zinc-950">Contact Us</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Footer links</dt>
                <dd className="text-right font-medium text-zinc-950">{footerCount}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt>Homepage hero</dt>
                <dd className="text-right font-medium text-zinc-950">{home?.hero ? 'Configured' : 'Needs review'}</dd>
              </div>
            </dl>
          </AdminPanel>

          <AdminPanel
            title="Publishing notes"
            description="The admin follows the active content backend. Use staging by default and only promote to production deliberately."
          >
            <ul className="space-y-3 text-sm leading-6 text-zinc-600">
              <li>
                <span className="font-medium text-zinc-950">Current backend:</span> {backend.label}
                {backend.repo && backend.branch ? ` (${backend.repo} → ${backend.branch})` : null}
              </li>
              <li>Use <span className="font-medium text-zinc-950">Global settings</span> for nav, footer, logos, and contact information.</li>
              <li>Use <span className="font-medium text-zinc-950">Pages</span> for evergreen pages and <span className="font-medium text-zinc-950">Blog</span> for articles.</li>
              <li>Homepage sections are intentionally grouped in one place to reduce accidental cross-page edits.</li>
              <li>{backend.message}</li>
            </ul>
          </AdminPanel>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PAGE_HERO_DESCRIPTION_CLASS } from '@/components/PageHero';
import { getAllPosts } from '@/lib/blog';
import { buildBreadcrumbSchema, buildPageMetadata, getStaticSeo, jsonLd } from '@/lib/seo';

const RECENT_COUNT = 5;
const DEFAULT_LIST_IMAGE = '/wp-content/uploads/2017/08/eti__identity__logo_.svg';

export const metadata: Metadata = buildPageMetadata(getStaticSeo('/blog')!);

function formatDate(value: string): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
  });
}

function isContainedThumbnail(image: string | undefined): boolean {
  if (!image) return false;
  const normalized = image.toLowerCase();
  return (
    normalized.endsWith('.svg') ||
    normalized.includes('logo') ||
    normalized.includes('identity')
  );
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = (await searchParams) ?? {};
  const query = typeof q === 'string' ? q.trim().toLowerCase() : '';
  const allPosts = getAllPosts();
  const filteredPosts = query
    ? allPosts.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(query)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(query))
      )
    : allPosts;
  const recentPosts = allPosts.slice(0, RECENT_COUNT);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/blog' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <section className="relative overflow-hidden border-b border-white/55">
        <div className="absolute inset-0">
          <Image
            src="/images/insights-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(10,22,46,0.82)_0%,rgba(18,42,82,0.68)_38%,rgba(20,52,103,0.54)_62%,rgba(12,28,58,0.72)_100%)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[1240px] items-start gap-8 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-12">
          <div className="max-w-[56rem] text-white">
            <span className="inline-flex items-center font-display text-[clamp(1.02rem,1.45vw,1.22rem)] font-semibold uppercase tracking-[0.14em] text-white">
              Insights
            </span>
            <h1 className="mt-4 max-w-[24ch] font-display text-[clamp(1.8rem,3vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-white [text-shadow:0_0_1px_rgba(0,0,0,0.7),0_0_24px_rgba(0,0,0,0.32),0_2px_6px_rgba(0,0,0,0.45)]">
              Analysis, field lessons, and healthcare technology perspective.
            </h1>
            <p className={`${PAGE_HERO_DESCRIPTION_CLASS} max-w-[52rem] text-white/88 [text-shadow:0_0_20px_rgba(0,0,0,0.28),0_1px_3px_rgba(0,0,0,0.4)]`}>
              Browse ETI insights on healthcare IT, advancements of AI for operating model decisions, and the practical tradeoffs behind transformation work.
            </p>
          </div>

          <div className="content-card w-full max-w-[320px] justify-self-start rounded-[1.75rem] p-5 lg:justify-self-end lg:self-start">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
              Search the archive
            </h2>
            <form className="mt-5 space-y-3" action="/blog" method="get">
              <label className="sr-only" htmlFor="blog-search-input">
                Search blog
              </label>
              <input
                id="blog-search-input"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="Search articles"
                className="w-full rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brand-orange)]"
              />
              <button type="submit" className="site-button site-button-primary w-full">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 grid w-full max-w-[1240px] gap-6 px-5 pb-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:pb-12">
        <section aria-label="Blog posts">
          {query ? (
            <p className="mb-4 text-sm font-medium text-[var(--color-brand-blue)]">
              Results for &quot;{query}&quot;
            </p>
          ) : null}
          <ul className="grid gap-4" aria-label="Blog posts">
            {filteredPosts.map((post) => {
              const dateText = formatDate(post.date);
              const meta = [dateText, post.author].filter(Boolean).join(' • ');
              const thumbnail = post.image || DEFAULT_LIST_IMAGE;
              const useContain = isContainedThumbnail(thumbnail);
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="content-card block rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-[var(--color-brand-blue)]"
                  >
                    <div
                      className={
                        thumbnail
                          ? 'grid gap-5 sm:grid-cols-[128px_minmax(0,1fr)] sm:items-start sm:gap-6'
                          : undefined
                      }
                    >
                      {thumbnail ? (
                        <div
                          className={`relative h-[92px] w-[128px] overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] ${
                            useContain
                              ? 'bg-[linear-gradient(180deg,#f8fbff_0%,#eef3f8_100%)]'
                              : 'bg-[#eef3f8]'
                          }`}
                        >
                          <Image
                            src={thumbnail}
                            alt={useContain ? 'ETI logo' : `${post.title || post.slug} article image`}
                            fill
                            sizes="128px"
                            unoptimized
                            className={useContain ? 'object-contain p-4' : 'object-cover'}
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        {meta ? (
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                            {meta}
                          </p>
                        ) : null}
                        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                          {post.title || post.slug}
                        </h2>
                        {post.excerpt ? (
                          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
                            {post.excerpt}
                          </p>
                        ) : null}
                        <span className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
                          Read article
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {filteredPosts.length === 0 ? (
            <p className="content-card mt-4 rounded-[1.75rem] p-6 text-[var(--color-ink-muted)]">
              No posts match that search.
            </p>
          ) : null}
        </section>

        <aside className="space-y-4" aria-label="Blog sidebar">
          <div className="content-card rounded-[1.75rem] p-5">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
              Recent posts
            </h3>
            <ul className="mt-4 grid gap-3">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-sm leading-6 text-[var(--color-ink)] transition hover:text-[var(--color-brand-blue)]">
                    {post.title || post.slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#11274d_0%,#1d4e96_42%,#224380_100%)] p-5 text-white shadow-[0_24px_80px_rgba(17,39,77,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">Stay in touch</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">
              Bring the conversation back to your operating reality.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/75">
              If a post maps to a decision you are actively weighing, ETI can help pressure-test the next move.
            </p>
            <Link href="/contact-us" className="site-button site-button-primary mt-6">
              Contact ETI
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

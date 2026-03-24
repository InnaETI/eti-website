import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

const RECENT_COUNT = 5;

function formatDate(value: string): string {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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

  return (
    <div className="mx-auto w-full max-w-[1240px] px-5 pb-8 pt-10 lg:px-8 lg:pb-12 lg:pt-14">
      <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-[radial-gradient(circle_at_top_left,_rgba(49,104,196,0.22),_transparent_34%),linear-gradient(160deg,#f8fbff_0%,#edf3fa_48%,#f7f3ee_100%)] px-6 py-10 shadow-[0_24px_80px_rgba(17,39,77,0.12)] sm:px-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <span className="eyebrow">Insights</span>
            <h1 className="section-title mt-5 max-w-3xl text-[var(--color-brand-blue-deep)]">
              Analysis, field lessons, and healthcare technology perspective.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-ink-muted)]">
              Browse ETI writing on healthcare IT, operating model decisions, and the practical tradeoffs behind transformation work.
            </p>
            {query ? (
              <p className="mt-5 text-sm font-medium text-[var(--color-brand-blue)]">
                Results for &quot;{query}&quot;
              </p>
            ) : null}
          </div>

          <div className="content-card rounded-[1.75rem] p-5">
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

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section aria-label="Blog posts">
          <ul className="grid gap-4" aria-label="Blog posts">
            {filteredPosts.map((post) => {
              const dateText = formatDate(post.date);
              const meta = [dateText, post.author].filter(Boolean).join(' • ');
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="content-card block rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-[var(--color-brand-blue)]"
                  >
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
    </div>
  );
}

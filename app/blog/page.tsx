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
    <>
      <section
        className="banner-blog-sidebar"
        style={{
          backgroundImage: "url('/wp-content/uploads/2024/02/blog-banner.png')",
          backgroundPosition: 'top center',
        }}
      />
      <div className="container service-page-wrap">
        <div className="heading-wrap top-one">
          <h1 className="h1">BLOG</h1>
          {query && (
            <p className="blog-search-results" style={{ textAlign: 'center', marginTop: '10px' }}>
              Results for &quot;{query}&quot;
            </p>
          )}
        </div>
        <div className="blog-layout">
          <main className="blog-main">
            <ul className="blog-card-list" aria-label="Blog posts">
              {filteredPosts.map((post) => {
                const dateText = formatDate(post.date);
                const meta = [dateText, post.author].filter(Boolean).join(' • ');
                return (
                  <li key={post.slug} className="blog-card">
                    <Link href={`/blog/${post.slug}`} className="blog-card-link">
                      <div className="blog-card-body">
                        <h2 className="blog-card-title">{post.title || post.slug}</h2>
                        {meta && <p className="blog-card-meta">{meta}</p>}
                        {post.excerpt && (
                          <p className="blog-card-excerpt">{post.excerpt}</p>
                        )}
                        <span className="blog-card-cta">Read more</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {filteredPosts.length === 0 && (
              <p className="blog-empty">No posts match that search.</p>
            )}
          </main>
          <aside className="blog-sidebar" aria-label="Blog sidebar">
            <div className="blog-widget">
              <h3 className="blog-widget-title">Search</h3>
              <form className="blog-search-form" action="/blog" method="get">
                <label className="sr-only" htmlFor="blog-search-input">
                  Search blog
                </label>
                <input
                  id="blog-search-input"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="Search articles"
                  className="blog-search-input"
                />
                <button type="submit" className="blog-search-button">
                  Search
                </button>
              </form>
            </div>
            <div className="blog-widget">
              <h3 className="blog-widget-title">Recent Posts</h3>
              <ul className="blog-widget-list list-disc pl-5 space-y-2">
                {recentPosts.map((post) => (
                  <li key={post.slug} className="border-b border-gray-200 pb-2 last:border-b-0">
                    <Link href={`/blog/${post.slug}`} className="blog-widget-link">
                      {post.title || post.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="blog-widget blog-widget-cta">
              <h3 className="blog-widget-title">Stay updated</h3>
              <p className="blog-widget-cta-text">
                Get the latest insights on healthcare IT and strategy.
              </p>
              <Link href="/contact-us" className="blog-cta-button">
                Contact us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

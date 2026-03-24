import Link from 'next/link';
import { getPost, getPostContent } from '@/lib/blog';
import { RichText } from '@/components/RichText';

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

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const markdownContent = post && !post.bodyHtml ? getPostContent(slug) : null;

  if (!post) {
    return (
      <section className="mx-auto w-full max-w-[980px] px-5 py-10 lg:px-8 lg:py-14">
        <div className="content-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <Link href="/blog" className="inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
            ← Back to Blog
          </Link>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">Insight</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-[var(--color-brand-blue-deep)]">
            Post not found.
          </h1>
        </div>
      </section>
    );
  }

  const dateText = formatDate(post.date);
  const meta = [dateText, post.author].filter(Boolean).join(' • ');

  return (
    <article className="mx-auto w-full max-w-[980px] px-5 py-10 lg:px-8 lg:py-14">
      <div className="content-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
        <Link href="/blog" className="inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
          ← Back to blog
        </Link>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">
          Insight
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] text-[var(--color-brand-blue-deep)] sm:text-5xl">
          {post.title}
        </h1>
        {meta ? (
          <p className="mt-5 text-sm font-medium text-[var(--color-ink-muted)]">{meta}</p>
        ) : null}
        <div className="mt-8">
          {post.bodyHtml ? (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          ) : markdownContent ? (
            <RichText source={markdownContent} />
          ) : null}
        </div>

        <div className="mt-10 rounded-[1.75rem] bg-[linear-gradient(135deg,#11274d_0%,#1d4e96_42%,#224380_100%)] p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">Need a sharper read on this?</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">
            Bring the decision into a working session.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
            ETI helps leadership teams translate high-level analysis into specific choices, sequencing, and execution paths.
          </p>
          <Link href="/contact-us" className="site-button site-button-primary mt-6">
            Talk with ETI
          </Link>
        </div>
      </div>
    </article>
  );
}

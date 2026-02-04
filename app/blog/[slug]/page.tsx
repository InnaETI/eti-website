import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPost, getPostContent, getAllPosts } from '@/lib/blog';
import { SITE, canonicalUrl } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: canonicalUrl(`/blog/${slug}`) },
    openGraph: {
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  const content = getPostContent(slug);
  if (!post || !content) notFound();

  return (
    <>
      <article className="container-content py-16 sm:py-20">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm font-medium text-[var(--color-ink-muted)] no-underline hover:text-[var(--color-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] focus-visible:ring-offset-2"
        >
          ← Blog
        </Link>
        <header className="max-w-prose">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex gap-4 text-sm text-[var(--color-ink-muted)]">
            {post.date && <time dateTime={post.date}>{post.date}</time>}
            {post.author && <span>{post.author}</span>}
          </div>
        </header>
        <div className="prose-content mt-10 prose prose-invert max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-[var(--color-brand-orange)] prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="mt-10 border-t border-[var(--color-border)] pt-8 text-xl font-semibold text-[var(--color-ink)]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-6 text-lg font-semibold text-[var(--color-ink)]">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mt-4 text-[var(--color-ink-muted)]">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--color-ink-muted)]">
                  {children}
                </ul>
              ),
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold text-[var(--color-ink)]">
                  {children}
                </strong>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}

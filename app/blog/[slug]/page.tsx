import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getPost, getPostContent } from '@/lib/blog';

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
      <section className="blog-article">
        <div className="container-content blog-article-inner">
          <Link href="/blog" className="blog-back-link">
            ← Back to Blog
          </Link>
          <p className="blog-article-kicker">BLOG</p>
          <h1 className="blog-article-title">Post not found.</h1>
        </div>
      </section>
    );
  }

  const dateText = formatDate(post.date);
  const meta = [dateText, post.author].filter(Boolean).join(' • ');

  return (
    <article className="blog-article">
      <div className="container-content blog-article-inner">
        <Link href="/blog" className="blog-back-link">
          ← Back to Blog
        </Link>
        <p className="blog-article-kicker">BLOG</p>
        <h1 className="blog-article-title">{post.title}</h1>
        {meta && <p className="blog-article-meta">{meta}</p>}
        <div className="blog-article-content">
          {post.bodyHtml ? (
            <div dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
          ) : markdownContent ? (
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          ) : null}
        </div>
      </div>
    </article>
  );
}

'use client';

import ReactMarkdown from 'react-markdown';

type MarkdownPreviewProps = {
  source: string;
  className?: string;
  emptyMessage?: string;
};

export function MarkdownPreview({
  source,
  className = '',
  emptyMessage = 'Body is empty. Add content in the Body (Markdown) field to see a preview.',
}: MarkdownPreviewProps) {
  const trimmed = (source ?? '').trim();
  if (!trimmed) {
    return (
      <p className={`text-sm text-zinc-500 italic ${className}`}>{emptyMessage}</p>
    );
  }
  return (
    <div className={`prose prose-sm max-w-none text-zinc-700 ${className}`}>
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
}

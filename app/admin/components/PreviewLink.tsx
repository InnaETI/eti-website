'use client';

type PreviewLinkProps = {
  href: string;
  label?: string;
};

export function PreviewLink({ href, label = 'View on site' }: PreviewLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700"
    >
      {label} →
    </a>
  );
}

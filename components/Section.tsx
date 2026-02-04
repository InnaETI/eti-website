import { ReactNode } from 'react';

export function Section({
  children,
  className = '',
  as: Tag = 'section',
}: {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'div';
}) {
  return (
    <Tag className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-content">{children}</div>
    </Tag>
  );
}

export function SectionTitle({
  title,
  subtitle,
  className = '',
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-[var(--color-ink-muted)]">{subtitle}</p>
      )}
    </div>
  );
}

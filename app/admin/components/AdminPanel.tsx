import type { ReactNode } from 'react';

type AdminPanelProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function AdminPanel({
  title,
  description,
  children,
  className = '',
}: AdminPanelProps) {
  return (
    <section
      className={`rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] ${className}`.trim()}
    >
      {title ? <h2 className="text-base font-semibold text-zinc-950">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p> : null}
      <div className={title || description ? 'mt-4' : ''}>{children}</div>
    </section>
  );
}

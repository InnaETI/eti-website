import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  children,
}: PageHeroProps) {
  const style = backgroundImage
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(7, 19, 40, 0.88), rgba(18, 61, 126, 0.68)), url('${backgroundImage}')`,
      }
    : undefined;

  return (
    <section className="relative overflow-hidden">
      <div
        className={`relative border-b border-white/55 ${
          backgroundImage
            ? 'bg-cover bg-center bg-no-repeat'
            : 'bg-[radial-gradient(circle_at_top_left,_rgba(49,104,196,0.22),_transparent_34%),linear-gradient(160deg,#f8fbff_0%,#edf3fa_48%,#f7f3ee_100%)]'
        }`}
        style={style}
      >
        <div className="mx-auto grid min-h-[420px] w-full max-w-[1240px] items-end gap-10 px-5 py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-24">
          <div className={`max-w-3xl ${backgroundImage ? 'text-white' : 'text-[var(--color-ink)]'}`}>
            {eyebrow ? (
              <p className={`mb-5 text-xs font-semibold uppercase tracking-[0.22em] ${backgroundImage ? 'text-white/75' : 'text-[var(--color-ink-muted)]'}`}>
                {eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
              {title}
            </h1>
            {description ? (
              <p className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${backgroundImage ? 'text-white/82' : 'text-[var(--color-ink-muted)]'}`}>
                {description}
              </p>
            ) : null}
          </div>

          {children ? <div className="relative z-10">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

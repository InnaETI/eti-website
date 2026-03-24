import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  compact?: boolean;
  backgroundSoft?: boolean;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  backgroundImage,
  compact = false,
  backgroundSoft = false,
  children,
}: PageHeroProps) {
  const style = backgroundImage
    ? {
        backgroundImage: backgroundSoft
          ? `linear-gradient(135deg, rgba(7, 19, 40, 0.56), rgba(18, 61, 126, 0.3)), url('${backgroundImage}')`
          : `linear-gradient(135deg, rgba(7, 19, 40, 0.88), rgba(18, 61, 126, 0.68)), url('${backgroundImage}')`,
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
        <div
          className={`mx-auto grid w-full max-w-[1240px] items-end gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 ${
            compact
              ? 'min-h-[380px] py-16 lg:py-20'
              : 'min-h-[420px] py-20 lg:py-24'
          }`}
        >
          <div className={`max-w-3xl ${backgroundImage ? 'text-white' : 'text-[var(--color-ink)]'}`}>
            {eyebrow ? (
              <p
                className={`mb-5 text-xs font-semibold uppercase tracking-[0.22em] ${
                  backgroundImage
                    ? 'text-white/85 [text-shadow:0_0_18px_rgba(0,0,0,0.55),0_1px_2px_rgba(0,0,0,0.65)]'
                    : 'text-[var(--color-ink-muted)]'
                }`}
              >
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={`max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-7xl ${
                backgroundImage
                  ? // Halo + slight edge so type separates from busy photo — no box behind copy
                    '[text-shadow:0_0_1px_rgba(0,0,0,0.9),0_0_24px_rgba(0,0,0,0.55),0_0_48px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.55)]'
                  : ''
              }`}
            >
              {title}
            </h1>
            {description ? (
              <p
                className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg ${
                  backgroundImage
                    ? 'text-white/92 [text-shadow:0_0_20px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.6)]'
                    : 'text-[var(--color-ink-muted)]'
                }`}
              >
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

import Link from 'next/link';

export type BlockItem = {
  eyebrow?: string;
  title: string;
  body?: string;
  href?: string;
  linkLabel?: string;
};

export type StatItem = {
  value: string;
  label: string;
  detail?: string;
};

export type ContentBlock =
  | {
      type: 'text';
      eyebrow?: string;
      title: string;
      body?: string;
    }
  | {
      type: 'cards';
      eyebrow?: string;
      title: string;
      body?: string;
      items: BlockItem[];
    }
  | {
      type: 'stats';
      eyebrow?: string;
      title: string;
      body?: string;
      items: StatItem[];
    }
  | {
      type: 'quote';
      eyebrow?: string;
      quote: string;
      attribution?: string;
      role?: string;
      backgroundImage?: string;
    }
  | {
      type: 'cta';
      eyebrow?: string;
      title: string;
      body?: string;
      primaryLabel: string;
      primaryHref: string;
      secondaryLabel?: string;
      secondaryHref?: string;
    };

type ContentBlocksProps = {
  blocks: ContentBlock[];
};

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'text') {
          return (
            <section key={`${block.type}-${index}`} className="mx-auto mt-14 w-full max-w-[1320px] px-5 lg:mt-16 lg:px-10">
              <div className="content-card rounded-[2rem] p-6 sm:p-8">
                {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  {block.title}
                </h2>
                {block.body ? (
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
                    {block.body}
                  </p>
                ) : null}
              </div>
            </section>
          );
        }

        if (block.type === 'cards') {
          return (
            <section key={`${block.type}-${index}`} className="mx-auto mt-14 w-full max-w-[1320px] px-5 lg:mt-16 lg:px-10">
              <div className="content-card rounded-[2rem] p-6 sm:p-8">
                {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  {block.title}
                </h2>
                {block.body ? (
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
                    {block.body}
                  </p>
                ) : null}
                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                  {block.items.map((item) => (
                    <article
                      key={`${item.title}-${item.href ?? item.body ?? ''}`}
                      className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/84 p-5"
                    >
                      {item.eyebrow ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                          {item.eyebrow}
                        </p>
                      ) : null}
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
                        {item.title}
                      </h3>
                      {item.body ? (
                        <p className="mt-3 text-sm leading-7 text-[var(--color-ink-muted)]">{item.body}</p>
                      ) : null}
                      {item.href && item.linkLabel ? (
                        <Link href={item.href} className="mt-5 inline-flex text-sm font-semibold text-[var(--color-brand-blue)]">
                          {item.linkLabel}
                        </Link>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (block.type === 'stats') {
          return (
            <section key={`${block.type}-${index}`} className="mx-auto mt-14 w-full max-w-[1320px] px-5 lg:mt-16 lg:px-10">
              <div className="content-card rounded-[2rem] p-6 sm:p-8">
                {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  {block.title}
                </h2>
                {block.body ? (
                  <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
                    {block.body}
                  </p>
                ) : null}
                <div className="mt-8 grid gap-4 lg:grid-cols-3">
                  {block.items.map((item) => (
                    <article
                      key={`${item.value}-${item.label}`}
                      className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/84 p-5"
                    >
                      <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-[var(--color-brand-blue-deep)]">
                        {item.value}
                      </p>
                      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                        {item.label}
                      </p>
                      {item.detail ? (
                        <p className="mt-3 text-sm leading-7 text-[var(--color-ink-muted)]">{item.detail}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (block.type === 'quote') {
          return (
            <section
              key={`${block.type}-${index}`}
              className="relative mt-14 w-full overflow-hidden border-t border-[rgba(17,39,77,0.08)] bg-[#f3f7fb] lg:mt-16"
            >
              {block.backgroundImage ? (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${block.backgroundImage}')` }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,251,254,0.92),rgba(248,251,254,0.88))]"
                    aria-hidden
                  />
                </>
              ) : null}
              <div className="relative mx-auto w-full max-w-[1320px] px-5 py-14 lg:px-10 lg:py-16">
                {block.eyebrow ? <span className="eyebrow">{block.eyebrow}</span> : null}
                <blockquote className="mt-5 max-w-[60rem] text-[clamp(1.72rem,2.65vw,2.18rem)] font-semibold leading-[1.16] tracking-[-0.035em] text-[var(--color-brand-blue-deep)] lg:max-w-[72rem]">
                  “{block.quote}”
                </blockquote>
                {block.attribution || block.role ? (
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    {[block.attribution, block.role].filter(Boolean).join(' · ')}
                  </p>
                ) : null}
              </div>
            </section>
          );
        }

        return (
          <section key={`${block.type}-${index}`} className="mx-auto mt-14 w-full max-w-[1320px] px-5 lg:mt-16 lg:px-10">
            <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#11274d_0%,#1d4e96_42%,#224380_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(17,39,77,0.24)] sm:px-8 sm:py-10">
              {block.eyebrow ? <span className="eyebrow !text-white/72 before:!bg-white/45">{block.eyebrow}</span> : null}
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                    {block.title}
                  </h2>
                  {block.body ? (
                    <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">{block.body}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href={block.primaryHref} className="site-button site-button-primary">
                    {block.primaryLabel}
                  </Link>
                  {block.secondaryHref && block.secondaryLabel ? (
                    <Link
                      href={block.secondaryHref}
                      className="site-button site-button-secondary !border-white/20 !bg-white/10 !text-white !shadow-none"
                    >
                      {block.secondaryLabel}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

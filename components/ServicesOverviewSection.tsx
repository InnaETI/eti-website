type ServicesOverviewSectionProps = {
  title: string;
  intro: string;
  columns: string[];
};

/**
 * Intro band under the Services hero: serif title, body intro, two columns with orange accent bars.
 */
export function ServicesOverviewSection({ title, intro, columns }: ServicesOverviewSectionProps) {
  if (!columns?.length) return null;

  return (
    <section className="border-b border-[var(--color-border)] bg-[#f5f7f9] px-5 py-14 sm:py-16 lg:px-10 lg:py-[4.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-accent text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-brand-blue-deep)]">
          {title}
        </h2>
        <p className="mt-6 max-w-4xl text-base leading-[1.7] text-[var(--color-ink-muted)] sm:text-[1.0625rem]">
          {intro}
        </p>
        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-14">
          {columns.map((text, index) => (
            <div key={index} className="flex gap-4 sm:gap-5">
              <span
                className="mt-0.5 w-1 shrink-0 self-stretch rounded-full bg-[var(--color-brand-orange)]"
                aria-hidden
              />
              <p className="text-base leading-[1.65] text-[var(--color-ink-muted)] sm:text-[1.0625rem]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

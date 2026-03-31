type ServicesValueDeliverSectionProps = {
  title: string;
  items: string[];
};

/**
 * Matches ServicesOverviewSection: light band, Newsreader title, orange accent bars, muted body.
 */
export function ServicesValueDeliverSection({ title, items }: ServicesValueDeliverSectionProps) {
  if (!items?.length) return null;

  return (
    <section className="mt-14 border-b border-[var(--color-border)] bg-[#f5f7f9] px-5 py-14 sm:mt-16 sm:py-16 lg:mt-[4.5rem] lg:px-10 lg:py-[4.5rem]">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
          {title}
        </h2>
        <ul className="mt-10 grid list-none gap-x-8 gap-y-10 p-0 sm:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {items.map((text, index) => (
            <li key={index} className="flex gap-4 sm:gap-5">
              <span
                className="mt-0.5 w-1 shrink-0 self-stretch rounded-full bg-[var(--color-brand-orange)]"
                aria-hidden
              />
              <p className="text-base leading-[1.65] text-[var(--color-ink-muted)] sm:text-[1.0625rem]">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

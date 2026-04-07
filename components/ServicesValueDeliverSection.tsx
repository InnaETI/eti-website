type ServicesValueDeliverSectionProps = {
  title: string;
  items: string[];
};

/**
 * Full-width background-image band with orange checkbox markers.
 */
export function ServicesValueDeliverSection({ title, items }: ServicesValueDeliverSectionProps) {
  if (!items?.length) return null;

  return (
    <section
      className="mt-6 sm:mt-8 lg:mt-10"
      style={{
        backgroundImage:
          "linear-gradient(100deg, rgba(250,252,255,0.96) 0%, rgba(247,250,254,0.92) 38%, rgba(238,244,252,0.82) 100%), url('/images/value-deliver-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-5 py-8 sm:py-10 lg:px-10 lg:py-12">
        <h2 className="font-display text-[clamp(1.85rem,3.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
          {title}
        </h2>
        <ul className="mt-10 grid list-none gap-x-8 gap-y-10 p-0 sm:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {items.map((text, index) => (
            <li key={index} className="flex gap-4 sm:gap-5">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] bg-[var(--color-brand-orange)] sm:h-6 sm:w-6"
                aria-hidden
              >
                <svg
                  className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 10.5L8.2 13.5L15 6.5"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
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

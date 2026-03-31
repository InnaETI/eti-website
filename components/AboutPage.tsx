import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PageContent } from '@/lib/content';

type Mission = {
  title?: string;
  image?: string;
  text?: string;
};

type AboutPageContent = PageContent & {
  mission?: Mission;
};

type Capability = {
  title: string;
  description: string;
  icon: ReactNode;
};

const CAPABILITIES: Capability[] = [
  {
    title: 'Value creation through technology',
    description:
      'Align technology investments to growth, efficiency, scalability, and measurable business outcomes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-8 w-8 text-[var(--color-brand-blue)]">
        <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 15.5V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 15.5V8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 15.5V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m14.5 7.5 2.5-2.5 2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Integration and modernization',
    description:
      'Support platform consolidation, acquisition integration, and modernization efforts that reduce complexity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-8 w-8 text-[var(--color-brand-blue)]">
        <path
          d="M12 4v6m0 0 3-3m-3 3L9 7m3 3v6m0 0 3-3m-3 3-3-3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: 'Scalable platforms and workflows',
    description:
      'Design and deliver the systems, workflows, and automation needed to support stronger execution.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-8 w-8 text-[var(--color-brand-blue)]">
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 6h8M7.5 7.5l3 8M16.5 7.5l-3 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Leadership through execution',
    description:
      'Stay close to delivery, align stakeholders, and turn strategic priorities into operational results.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-8 w-8 text-[var(--color-brand-blue)]">
        <path
          d="M10.5 4H7a2 2 0 0 0-2 2v3.5m8.5-5.5H17a2 2 0 0 1 2 2v3.5M13.5 20H17a2 2 0 0 0 2-2v-3.5M10.5 20H7a2 2 0 0 1-2-2v-3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="m9.5 12 1.7 1.7L14.8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-brand-blue)]">
        {label}
      </span>
      <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(33,79,152,0.18),rgba(33,79,152,0.04))]" />
    </div>
  );
}

function AboutPage({ page }: { page: AboutPageContent }) {
  const missionTitle = page.mission?.title || 'Our mission';
  const missionText =
    page.mission?.text ||
    'We help companies create stronger enterprise value through practical technology leadership, disciplined execution, and scalable solutions that support growth and performance.';

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-black/5">
        <div className="absolute inset-0">
          <Image
            src="/wp-content/uploads/2015/12/chicago-bean-about-us-1140X400.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,36,0.5)_0%,rgba(8,18,36,0.45)_34%,rgba(8,18,36,0.62)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(226,121,66,0.14),transparent_24%)]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
          <div className="mx-auto max-w-[920px] text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/76">About ETI</p>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
              Technology leadership and execution that create enterprise value
            </h1>
            <p className="mx-auto mt-6 max-w-[780px] text-[clamp(1.05rem,2.1vw,1.55rem)] leading-[1.65] text-white/86">
              Emerging Technologies, Inc. helps companies strengthen operations, scale platforms,
              integrate acquisitions, and turn technology investments into measurable business
              value.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)] lg:items-center lg:gap-14">
          <div>
            <SectionHeading label="Who We Are" />
            <div className="mt-8 max-w-[36rem]">
              <h2 className="font-display text-[clamp(2rem,3.6vw,3.35rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--color-brand-blue-deep)]">
                Your leadership and delivery Partner for navigating growth, modernization, and operational transformation.
              </h2>
              <p className="mt-6 text-[1.05rem] leading-9 text-[var(--color-ink-muted)]">
                We work with executive teams and investors to shape direction, guide critical
                decisions, and deliver scalable systems, workflows, and operating models that improve
                performance and increase enterprise value.
              </p>
              {page.body ? (
                <p className="mt-5 text-base leading-8 text-[var(--color-ink-muted)]">
                  {page.body.split('\n\n')[0]}
                </p>
              ) : null}
            </div>
          </div>

          <div className="content-card overflow-hidden rounded-[2rem]">
            <Image
              src="/wp-content/uploads/2017/12/shutterstock_378755452.jpg"
              alt="Executive leadership team meeting in a city conference room"
              width={1930}
              height={470}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-y border-black/5 bg-white/68">
        <div className="absolute inset-0">
          <Image
            src="/wp-content/uploads/2020/06/future.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-12"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,251,254,0.92)_0%,rgba(248,251,254,0.95)_100%)]" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <SectionHeading label="What We Do" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {CAPABILITIES.map((capability) => (
              <article
                key={capability.title}
                className="content-card rounded-[1.75rem] px-6 py-7 sm:px-7 sm:py-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(33,79,152,0.08)]">
                  {capability.icon}
                </div>
                <h3 className="mt-6 font-display text-[1.7rem] font-semibold leading-[1.15] tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  {capability.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
                  {capability.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:items-center lg:gap-16">
          <div className="max-w-[38rem]">
            <SectionHeading label={missionTitle} />
            <h2 className="mt-8 font-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[var(--color-brand-blue-deep)]">
              Achieve long-term performance thru practical leadership, disciplined delivery, and scalable solutions.
            </h2>
            <p className="mt-6 text-[1.05rem] leading-9 text-[var(--color-ink-muted)]">{missionText}</p>
          </div>

          <div className="content-card overflow-hidden rounded-[2rem]">
            <Image
              src={page.mission?.image || '/wp-content/uploads/2015/12/eti-misson-263X176.jpg'}
              alt="Business partners shaking hands over a project review"
              width={526}
              height={352}
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[var(--color-brand-blue-deep)]">
        <div className="absolute inset-0">
          <Image
            src="/wp-content/uploads/2020/06/future.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,20,40,0.78)_0%,rgba(9,20,40,0.84)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-[1120px] px-5 py-16 text-center text-white sm:px-8 sm:py-20 lg:px-10">
          <h2 className="font-display text-[clamp(2rem,3.5vw,3.25rem)] font-semibold tracking-[0.04em] text-white">
            WHY ORGANIZATIONS CHOOSE ETI
          </h2>
          <p className="mx-auto mt-6 max-w-[840px] text-[1.06rem] leading-9 text-white/82 sm:text-[1.12rem]">
            <span className="block">Clients engage ETI when technology needs to do more than function.</span>
            <span className="block">
              It needs to support growth, absorb complexity, improve execution, and increase the
              value of the business.
            </span>
          </p>
          <div className="mt-8">
            <Link
              href="/advancing-healthcare-it"
              className="site-button site-button-secondary !border-white/20 !bg-white/10 !text-white !shadow-none"
            >
              See how ETI advances healthcare IT
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;

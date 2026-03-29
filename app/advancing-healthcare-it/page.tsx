import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PrimaryButton } from '@/components/Button';
import { Section, SectionTitle } from '@/components/Section';
import { canonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Advancing Healthcare IT | ETI',
  description: 'Enterprise technology leadership for complex healthcare initiatives from ETI.',
  alternates: {
    canonical: canonicalUrl('/advancing-healthcare-it'),
  },
};

const WEBSITE_URL = 'https://www.emergingti.com/';
const HERO_IMAGE_URL = '/wp-content/uploads/2020/05/shutterstock-banner_1692360436.jpg';
const LOGO_URL = '/wp-content/uploads/2017/08/logo-transparent-horizontal-80-237-dark.png';

const TRUST_PANEL = [
  {
    heading: 'Who we work with',
    items: [
      'Healthcare providers',
      'Health plans',
      'PE-backed healthcare businesses',
      'Operationally complex teams',
    ],
  },
  {
    heading: 'What we lead',
    items: [
      'Technology strategy and planning',
      'Program structure and governance',
      'Execution and implementation',
      'Workflow and operational improvement',
      'Systems modernization and integration',
      'Tools, training, and adoption support',
    ],
  },
  {
    heading: 'What clients get',
    items: [
      'Clear direction',
      'Stronger delivery discipline',
      'Faster issue resolution',
      'Better visibility into progress',
      'Work that holds after rollout',
    ],
  },
] as const;

const CAPABILITIES = [
  {
    title: 'Strategy and planning',
    copy: 'Technology direction, investment priorities, operating model decisions, and roadmap definition.',
  },
  {
    title: 'Methodology and governance',
    copy: 'Program structure, ownership, delivery cadence, decision frameworks, and escalation paths.',
  },
  {
    title: 'Execution and implementation',
    copy: 'Workstream leadership, dependency management, blocker removal, team coordination, and rollout support.',
  },
  {
    title: 'Tools and enablement',
    copy: 'Workflow tools, reporting visibility, team training, adoption support, and sustainable operating practices.',
  },
] as const;

const TRUST_BLOCKS = [
  {
    title: 'We work at the leadership level',
    copy: 'We help executives make technology decisions tied to business priorities, operating realities, and delivery pressure.',
  },
  {
    title: 'We know how to run the work',
    copy: 'We do not stop at recommendations. We help structure the work, manage progress, resolve issues, and keep delivery moving.',
  },
  {
    title: 'We understand healthcare complexity',
    copy: 'We work in environments shaped by operations, compliance, clinical workflows, staffing constraints, and legacy systems.',
  },
  {
    title: 'We make teams stronger',
    copy: 'We put the right tools in place and train teams to use them so progress stays visible and execution holds after rollout.',
  },
] as const;

const IMPACT_BLOCKS = [
  {
    title: 'Oak Street Health',
    copy: 'Helped modernize outreach and supplemental coverage workflows, supporting stronger patient acquisition and operational scale.',
  },
  {
    title: 'Integrated Surgical Solutions',
    copy: 'Supported modernization, communication, and health plan integration during a period of major growth and enterprise value expansion.',
  },
  {
    title: 'Healthcare Payment Specialists',
    copy: 'Assessed and improved a reimbursement platform focused on automation, compliance, and operational performance.',
  },
] as const;

export default function AdvancingHealthcareItPage() {
  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[var(--color-ink)]">
      <Header />
      <main>
        <section className="border-b border-[rgba(17,39,77,0.08)] bg-[#17345E] text-white">
          <div className="container-content py-10 sm:py-12 lg:py-14">
            <Link href={WEBSITE_URL} aria-label="Visit ETI website" className="inline-flex items-center">
              <Image
                src={LOGO_URL}
                alt="ETI"
                width={237}
                height={80}
                className="h-8 w-auto sm:h-9"
                unoptimized
                priority
              />
            </Link>

            <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start xl:grid-cols-[minmax(0,1fr)_410px]">
              <div className="max-w-[44rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Healthcare technology leadership
                </p>
                <h1 className="mt-5 font-raleway text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Enterprise technology leadership for complex healthcare initiatives
                </h1>
                <p className="mt-5 max-w-[38rem] text-base leading-8 text-white/82 sm:text-[1.06rem]">
                  ETI helps healthcare organizations structure the work, strengthen operations, modernize systems,
                  and deliver high-stakes initiatives with clear ownership, practical tools, and steady execution.
                </p>
                <div className="mt-8">
                  <PrimaryButton as="link" href={WEBSITE_URL}>
                    View our website
                  </PrimaryButton>
                </div>
              </div>

              <aside className="overflow-hidden rounded-[1.5rem] border border-[rgba(17,39,77,0.12)] bg-white text-[var(--color-ink)] shadow-[0_24px_70px_rgba(4,15,34,0.24)]">
                <div className="bg-[linear-gradient(135deg,#11274d_0%,#214f98_100%)] px-5 py-4 text-white sm:px-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                    ETI at a glance
                  </p>
                  <p className="mt-2.5 text-[0.92rem] leading-6 text-white/82">
                    Focused support for organizations carrying real delivery pressure, operating complexity, and
                    executive visibility.
                  </p>
                </div>
                <div className="px-5 py-2.5 sm:px-6">
                  {TRUST_PANEL.map((group, index) => (
                    <div
                      key={group.heading}
                      className={`py-4 ${index === TRUST_PANEL.length - 1 ? '' : 'border-b border-[rgba(17,39,77,0.08)]'}`}
                    >
                      <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-button-blue)]">
                        {group.heading}
                      </h2>
                      <ul className="mt-3 space-y-2.5">
                        {group.items.map((item) => (
                          <li key={item} className="text-[0.95rem] leading-[1.65rem] text-[var(--color-ink)]">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Section className="py-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:gap-10">
            <div className="max-w-[26rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-button-blue)]">
                Capabilities
              </p>
              <SectionTitle title="What ETI does" className="mt-5" />
              <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
                ETI combines technology leadership, operating discipline, and execution support to help organizations
                move important work forward.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-[rgba(17,39,77,0.1)] bg-[rgba(17,39,77,0.1)] shadow-[0_20px_60px_rgba(17,39,77,0.07)] md:grid-cols-2">
              {CAPABILITIES.map((item) => (
                <article key={item.title} className="bg-white p-6 sm:p-7">
                  <h3 className="font-raleway text-[1.5rem] font-semibold tracking-tight text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[22rem] text-[0.98rem] leading-8 text-[var(--color-ink-muted)]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <section className="bg-[linear-gradient(180deg,#11274d_0%,#173768_100%)] text-white">
          <div className="container-content py-12 lg:py-14">
            <div className="max-w-[44rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Why clients choose ETI</p>
              <h2 className="mt-5 font-raleway text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Why clients choose ETI
              </h2>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-2">
              {TRUST_BLOCKS.map((item) => (
                <article key={item.title} className="bg-[rgba(8,21,43,0.38)] p-6 sm:p-7">
                  <h3 className="font-raleway text-[1.45rem] font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[24rem] text-[0.98rem] leading-8 text-white/78">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Section className="py-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-10">
            <div className="max-w-[26rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-button-blue)]">
                Client impact
              </p>
              <SectionTitle title="Selected client impact" className="mt-5" />
              <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
                Examples of how ETI has supported growth, modernization, and operational improvement.
              </p>
            </div>

            <div className="grid gap-4">
              {IMPACT_BLOCKS.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-[rgba(17,39,77,0.1)] bg-white px-6 py-6 shadow-[0_16px_45px_rgba(17,39,77,0.06)] sm:px-7"
                >
                  <h3 className="font-raleway text-[1.55rem] font-semibold tracking-tight text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[44rem] text-[0.98rem] leading-8 text-[var(--color-ink-muted)]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        <section className="container-content pb-4 pt-0 lg:pb-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(17,39,77,0.1)] shadow-[0_20px_60px_rgba(17,39,77,0.08)]">
            <div className="relative h-[210px] sm:h-[250px] lg:h-[300px]">
              <Image
                src={HERO_IMAGE_URL}
                alt="ETI leadership team banner"
                fill
                sizes="(max-width: 1320px) 100vw, 1320px"
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(10,20,38,0.18)_0%,rgba(17,39,77,0.08)_48%,rgba(10,20,38,0.22)_100%)]" />
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(17,39,77,0.08)] bg-white">
          <div className="container-content py-12 lg:pb-8 lg:pt-14">
            <div className="rounded-[1.75rem] border border-[rgba(17,39,77,0.1)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f9fc_100%)] px-6 py-10 shadow-[0_20px_60px_rgba(17,39,77,0.08)] sm:px-8 lg:px-10">
              <div className="max-w-[48rem]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-button-blue)]">
                  ETI
                </p>
                <h2 className="mt-5 font-raleway text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
                  Large initiatives need structure, leadership, and follow through.
                </h2>
                <p className="mt-5 max-w-[42rem] text-base leading-8 text-[var(--color-ink-muted)]">
                  ETI helps organizations move important work from discussion to delivery with clearer priorities,
                  stronger execution, and practical support.
                </p>
                <div className="mt-8">
                  <PrimaryButton as="link" href={WEBSITE_URL}>
                    View our website
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

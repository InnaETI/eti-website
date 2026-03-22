import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { getGlobalContent, getHomeContent, getPageContent } from '@/lib/content';
import { getLatestPosts } from '@/lib/blog';
import { ContentBlocks, type ContentBlock } from '@/components/ContentBlocks';

type HomePillar = {
  title?: string;
  copy?: string;
  href?: string;
};

type HomeService = {
  title?: string;
};

type HomeData = {
  heroBanner?: string;
  hero?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    badgeTitle?: string;
    badgeBody?: string;
    badgePoints?: string[];
  };
  metrics?: Array<{
    value: string;
    label: string;
    detail?: string;
  }>;
  featuredClients?: Array<{
    name: string;
    outcome: string;
    summary: string;
  }>;
  sections?: ContentBlock[];
  pillars?: HomePillar[];
  services?: {
    intro?: string;
    viewMoreHref?: string;
    viewMoreText?: string;
    items?: HomeService[];
  };
  clients?: {
    intro?: string;
    viewMoreHref?: string;
    viewMoreText?: string;
    sectionLabel?: string;
    sectionHeadline?: string;
  };
  cta?: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    href?: string;
  };
  about?: {
    title?: string;
    copy?: string;
  };
  joinTeam?: {
    title?: string;
    copy?: string;
    buttonText?: string;
    href?: string;
  };
};

const OUR_WORK_TILES = [
  {
    title: 'Clinical Workflow and Decision Support Solutions',
    description:
      'Technology solutions designed to improve clinical workflows, strengthen decision support, and connect care operations more effectively across the enterprise. This work includes workflow automation, predictive healthcare analytics, interoperability with EMRs and EHRs, and patient-centered solution design.',
    objectPosition: '18% 42%',
    href: '/services',
    image: '/images/our-work/clinical-workflow.png',
  },
  {
    title: 'Patient Outreach and Supplemental Coverage Platform',
    description:
      'Custom technology ecosystem built to support patient outreach, supplemental coverage workflows, and operational growth across a multi-site healthcare environment. Designed to help organizations manage outreach more intelligently, expand service capacity, and support scalable patient engagement.',
    objectPosition: '72% 38%',
    href: '/services',
    image: '/images/our-work/patient-outreach.png',
  },
  {
    title: 'Surgical Cost Management and Health Plan Integration Platform',
    description:
      'Modernized platform supporting surgical cost management, internal process efficiency, cross-functional communication, and health plan integration. This work helped strengthen operational coordination and create a more scalable foundation for payer-aligned growth.',
    objectPosition: '50% 55%',
    href: '/services',
    image: '/images/our-work/surgical-cost.png',
  },
  {
    title: 'Healthcare Reimbursement and Compliance Platform Improvement',
    description:
      'Platform assessment and improvement initiative focused on reimbursement operations, process automation, and compliance-aware workflows. ETI helped strengthen the underlying platform to support more efficient operations, better data handling, and more reliable performance in a complex healthcare environment.',
    objectPosition: '28% 60%',
    href: '/services',
    image: '/images/our-work/reimbursement-compliance.png',
  },
  {
    title: 'Carrier and Patient Collections Revenue Cycle Platform',
    description:
      'Revenue cycle platform designed to improve carrier and patient collections through stronger workflow management, better financial visibility, and more efficient follow-through across the collections lifecycle. This work supports cleaner processes, stronger recovery performance, and more disciplined revenue operations.',
    objectPosition: '65% 48%',
    href: '/services',
    image: '/images/our-work/revenue-cycle-collections.png',
  },
  {
    title: 'AI Driven Medical Policy Automation',
    description:
      'AI-enabled solution for automating the interpretation, structuring, and operational use of medical policies. Designed to reduce manual review, improve consistency, accelerate policy-driven decision making, and create a stronger foundation for scalable utilization management and clinical policy operations.',
    objectPosition: '45% 35%',
    href: '/services',
    image: '/images/our-work/ai-policy.png',
  },
] as const;

function formatDate(value: string): string {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Renders card title with last word emphasized (e.g. "Where ETI leads"). */
function HeroBadgeTitle({ title }: { title: string }) {
  const trimmed = title.trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace <= 0) {
    return <span className="text-lg font-semibold text-[var(--color-brand-blue-deep)]">{trimmed}</span>;
  }
  const before = trimmed.slice(0, lastSpace);
  const last = trimmed.slice(lastSpace + 1);
  return (
    <p className="text-lg leading-snug text-[var(--color-brand-blue-deep)]">
      {before}{' '}
      <strong className="font-bold">{last}</strong>
    </p>
  );
}

export default function HomePage() {
  const globalContent = getGlobalContent();
  const homeContent = (getHomeContent() ?? {}) as HomeData;
  const latestPosts = getLatestPosts(3);
  const clientsPage = getPageContent('clients');
  const clientTestimonials = Array.isArray(clientsPage?.testimonials) ? clientsPage?.testimonials : [];

  function renderQuoteWithEmphasis(quote: string, emphasis?: string) {
    if (emphasis && quote.includes(emphasis)) {
      const i = quote.indexOf(emphasis);
      const before = quote.slice(0, i);
      const after = quote.slice(i + emphasis.length);
      return (
        <>
          “{before}
          <em className="italic">{emphasis}</em>
          {after}”
        </>
      );
    }
    return <>“{quote}”</>;
  }

  const hero = homeContent.hero ?? {};
  const pillars = homeContent.pillars ?? [];
  const metrics = homeContent.metrics ?? [];
  const featuredClients = homeContent.featuredClients ?? [];
  const supplementalSections = homeContent.sections ?? [];
  const services = homeContent.services ?? {};
  const cta = homeContent.cta ?? {};
  const joinTeam = homeContent.joinTeam ?? {};
  return (
    <div className="site-shell">
      <Header />
      <main>
        {/* Hero — matches design mockup: light canvas, mesh right, two-column, floating card */}
        <section className="relative min-h-[min(88vh,920px)] overflow-hidden bg-[#f4f6f9]">
          {/* Full-bleed hero background */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[#f4f6f9]" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/background-image-for-eti.png')] bg-cover bg-center bg-no-repeat"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex min-h-[min(88vh,920px)] w-full max-w-[1320px] items-center px-5 py-16 lg:px-10 lg:py-24">
            <div className="grid w-full gap-9 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,420px)] lg:items-center lg:gap-10 xl:gap-11">
              <div className="max-w-[min(42rem,100%)]">
                <span className="eyebrow text-[var(--color-brand-blue-deep)]">
                  {hero.eyebrow || globalContent?.legalName || 'Emerging Technologies, Inc.'}
                </span>
                <h1 className="mt-7 font-display text-[clamp(2.35rem,4.2vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-[var(--color-brand-blue-deep)]">
                  {hero.title || 'Technology decisions that shape performance.'}
                </h1>
                <p className="mt-6 max-w-[38rem] text-base leading-8 text-[var(--color-ink-muted)] sm:text-[1.0625rem]">
                  {hero.subtitle || globalContent?.description}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <PrimaryButton as="link" href={hero.primaryHref || '/rfp-wizard'}>
                    {hero.primaryLabel || 'Request a conversation'}
                  </PrimaryButton>
                  <SecondaryButton as="link" href={hero.secondaryHref || '/services'}>
                    {hero.secondaryLabel || 'Explore capabilities'}
                  </SecondaryButton>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/90 bg-white/95 p-7 shadow-[0_32px_90px_rgba(17,39,77,0.1),0_4px_24px_rgba(17,39,77,0.04)] backdrop-blur-sm lg:p-8">
                <HeroBadgeTitle title={hero.badgeTitle || 'Where ETI leads'} />
                <p className="mt-5 text-[0.9375rem] leading-7 text-[var(--color-ink-muted)]">
                  {hero.badgeBody ||
                    'We step in when leadership priorities, delivery pressure, budget constraints, and technical complexity start pulling in different directions.'}
                </p>
                <div className="mt-6 grid gap-3">
                  {(hero.badgePoints ?? []).map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl bg-[#eef1f6] px-4 py-3.5 text-sm leading-6 text-[var(--color-ink)]"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full min-h-[min(88vh,920px)] border-t border-[rgba(17,39,77,0.08)] bg-[#f0f3f7]">
          <div className="mx-auto flex min-h-[min(88vh,920px)] w-full max-w-[1320px] flex-col justify-center px-5 py-16 lg:px-10 lg:py-24">
            <div className="grid gap-5 lg:grid-cols-12 lg:items-start lg:gap-x-12 lg:gap-y-5">
              <div className="lg:col-span-12">
                <span className="eyebrow">How ETI Works</span>
              </div>
              <div className="lg:col-span-6 xl:col-span-7">
                <h2 className="section-title max-w-xl text-[var(--color-brand-blue-deep)] lg:max-w-[22rem] xl:max-w-[24rem]">
                  Strategy, methodology, and execution in one operating model.
                </h2>
              </div>
              <div className="lg:col-span-6 xl:col-span-5 lg:border-l lg:border-[rgba(17,39,77,0.08)] lg:pl-10 xl:pl-12">
                <p className="text-base leading-[1.65] text-[var(--color-ink-muted)]">
                  ETI helps leadership teams move from ambiguous priorities to practical execution without the usual handoff gaps between strategy and delivery.
                </p>
                <Link
                  href={services.viewMoreHref || '/services'}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-blue)] transition hover:text-[var(--color-brand-blue-deep)]"
                >
                  {services.viewMoreText || 'View services'}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-6">
              {pillars.slice(0, 3).map((pillar, index) => {
                const metric = metrics[index];
                return (
                  <Link
                    key={pillar.title}
                    href={pillar.href || '/services'}
                    className="group flex flex-col rounded-2xl border border-[rgba(17,39,77,0.09)] bg-white/90 p-5 shadow-[0_1px_0_rgba(17,39,77,0.04)] transition hover:border-[rgba(33,79,152,0.2)] hover:shadow-[0_12px_40px_rgba(17,39,77,0.07)]"
                  >
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                      {metric?.label || `0${index + 1}`}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)] lg:text-[1.35rem]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-[var(--color-ink-muted)]">
                      {metric?.detail || pillar.copy}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-blue)] transition group-hover:text-[var(--color-brand-blue-deep)]">
                      Explore
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Work — consulting-style image tiles (between Section 2 and Selected work) */}
        <section
          className="w-full border-t border-[rgba(17,39,77,0.08)] bg-[#f8fafc]"
          aria-labelledby="our-work-heading"
        >
          <div className="mx-auto w-full max-w-[1320px] px-5 py-12 lg:px-10 lg:py-16">
            <span className="eyebrow">Our Work</span>
            <h2
              id="our-work-heading"
              className="section-title mt-5 max-w-4xl text-[var(--color-brand-blue-deep)]"
            >
              Work that moves important initiatives forward
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-ink-muted)] sm:text-[1.0625rem]">
              Examples of how ETI supports organizations across healthcare, AI, and enterprise technology
              initiatives.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {OUR_WORK_TILES.map((tile) => (
                <Link
                  key={tile.title}
                  href={tile.href}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(17,39,77,0.1)] shadow-[0_8px_30px_rgba(17,39,77,0.06)] outline-none transition duration-300 ease-out hover:border-[rgba(17,39,77,0.16)] hover:shadow-[0_16px_48px_rgba(17,39,77,0.1)] focus-visible:ring-2 focus-visible:ring-[var(--color-brand-orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
                  aria-label={`${tile.title}. ${tile.description}`}
                >
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-[filter] duration-300 ease-out brightness-100 group-hover:brightness-[0.82]"
                    style={{ objectPosition: tile.objectPosition }}
                    priority={false}
                  />
                  {/* Strong bottom scrim + frosted title bar so white titles read on light/busy photos */}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,10,20,0.97)_0%,rgba(13,27,51,0.92)_16%,rgba(13,27,51,0.72)_34%,rgba(13,27,51,0.38)_55%,rgba(13,27,51,0.12)_78%,transparent_100%)]"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-[#0d1b33]/0 transition-colors duration-300 ease-out group-hover:bg-[#0d1b33]/18"
                    aria-hidden
                  />
                  <div className="relative flex h-full min-h-0 flex-col justify-end p-6">
                    <div className="w-full max-w-full rounded-xl bg-[#050a14]/68 px-3 py-2.5 shadow-[0_6px_28px_rgba(0,0,0,0.42)] ring-1 ring-white/[0.1] backdrop-blur-md supports-[backdrop-filter]:bg-[#050a14]/52">
                      <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_0_1px_rgba(0,0,0,0.9)] sm:text-xl">
                        {tile.title}
                      </h3>
                    </div>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
                      <div className="min-h-0 max-h-0 overflow-hidden group-hover:max-h-[min(15rem,42vh)] group-hover:overflow-y-auto group-hover:[scrollbar-color:rgba(255,255,255,0.35)_transparent]">
                        {/* Panel behind description: readable on busy photos without fading the whole image at rest */}
                        <div className="mt-2.5 rounded-xl border border-white/12 bg-[#0a1629]/92 px-3.5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md supports-[backdrop-filter]:bg-[#0a1629]/78">
                          <p className="text-[0.8125rem] leading-relaxed text-white/95 sm:text-sm">
                            {tile.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Selected work — distinct canvas vs section 2; compact */}
        <section className="w-full border-t border-[rgba(17,39,77,0.08)] bg-[#eef4fa]">
          <div className="mx-auto w-full max-w-[1320px] px-5 py-12 lg:px-10 lg:py-16">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 shrink-0 bg-[var(--color-brand-orange)]" aria-hidden />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">
                {homeContent.clients?.sectionLabel || 'Selected work'}
              </span>
            </div>
            <h2 className="section-title mt-4 max-w-4xl text-[var(--color-brand-blue-deep)] lg:mt-5 lg:max-w-5xl">
              {homeContent.clients?.sectionHeadline || 'Technology work tied to business outcomes.'}
            </h2>
            {homeContent.clients?.intro ? (
              <p className="mt-4 max-w-[min(100%,68rem)] text-[1.0625rem] leading-[1.65] text-[var(--color-ink-muted)] lg:mt-5">
                {homeContent.clients.intro}
              </p>
            ) : null}

            <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-9 lg:gap-5">
              {featuredClients.map((client) => (
                <Link
                  key={client.name}
                  href={homeContent.clients?.viewMoreHref || '/clients'}
                  className="group flex flex-col rounded-[1.25rem] border border-[rgba(17,39,77,0.07)] bg-white p-5 transition hover:border-[rgba(17,39,77,0.12)] lg:rounded-2xl lg:p-6"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                    {client.name}
                  </p>
                  <h3 className="mt-3 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.03em] text-[var(--color-brand-blue-deep)] lg:text-[1.35rem]">
                    {client.outcome}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.6] text-[var(--color-ink-muted)]">{client.summary}</p>
                </Link>
              ))}
            </div>

            <Link
              href={homeContent.clients?.viewMoreHref || '/clients'}
              className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[var(--color-brand-blue-deep)] underline decoration-[rgba(17,39,77,0.2)] underline-offset-[0.2em] transition hover:decoration-[var(--color-brand-orange)] lg:mt-9"
            >
              {homeContent.clients?.viewMoreText || 'View selected work'}
              <span aria-hidden="true" className="text-[var(--color-brand-orange)]">
                →
              </span>
            </Link>

            {clientTestimonials.length > 0 ? (
              <div className="mt-6 grid gap-4 lg:mt-8 lg:grid-cols-2 lg:gap-5">
                {clientTestimonials.slice(0, 2).map((testimonial, index) => {
                  const t = testimonial as { quote?: string; emphasizedPhrase?: string };
                  const q = t.quote ?? '';
                  return (
                    <blockquote
                      key={`${q}-${index}`}
                      className="rounded-[1.25rem] border border-[rgba(17,39,77,0.08)] bg-white p-5 lg:rounded-2xl lg:p-6"
                    >
                      <p className="font-accent text-[1.25rem] leading-[1.45] text-[var(--color-brand-blue-deep)] sm:text-[1.35rem] lg:text-[1.45rem]">
                        {renderQuoteWithEmphasis(q, t.emphasizedPhrase)}
                      </p>
                    </blockquote>
                  );
                })}
              </div>
            ) : null}
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-[1320px] px-5 lg:mt-16 lg:px-10">
          <div className="content-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <span className="eyebrow">Careers</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
              {joinTeam.title || 'Join our team'}
            </h2>
            {joinTeam.copy ? (
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">{joinTeam.copy}</p>
            ) : null}
            <SecondaryButton as="link" href={joinTeam.href || '/career'} className="mt-6">
              {joinTeam.buttonText || 'Explore opportunities'}
            </SecondaryButton>
          </div>
        </section>

        {supplementalSections.length ? <ContentBlocks blocks={supplementalSections} /> : null}

        <section className="mx-auto mt-14 w-full max-w-[1320px] px-5 lg:mt-16 lg:px-10">
          <div className="content-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <span className="eyebrow">Insights</span>
                <h2 className="section-title mt-5 text-[var(--color-brand-blue-deep)]">
                  Recent thinking from the front lines.
                </h2>
              </div>
              <Link href="/blog" className="mt-1 shrink-0 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-blue)] transition hover:text-[var(--color-brand-blue-deep)]">
                View all articles
              </Link>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/85 p-5 transition hover:-translate-y-1 hover:border-[var(--color-brand-blue)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                    {formatDate(post.date)}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink-muted)]">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 w-full max-w-[1320px] px-5 pb-6 lg:mt-16 lg:px-10 lg:pb-10">
          <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#11274d_0%,#1d4e96_42%,#224380_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(17,39,77,0.24)] sm:px-8 sm:py-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <span className="eyebrow !text-white/72 before:!bg-white/45">Start here</span>
                <h2 className="section-title mt-5 text-white">
                  {cta.title || 'Schedule a call with ETI'}
                </h2>
                {cta.subtitle ? (
                  <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">{cta.subtitle}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={cta.href || '/rfp-wizard'} className="site-button site-button-primary">
                  {cta.buttonText || 'Brainstorm with an expert'}
                </Link>
                <Link href="/services" className="site-button site-button-secondary !bg-white/10 !text-white !border-white/20 !shadow-none">
                  Review capabilities
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

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

        {/* Client trajectories — editorial layout; same band height as section 2 */}
        <section className="w-full min-h-[min(88vh,920px)] border-t border-[rgba(17,39,77,0.08)] bg-[#f0f3f7]">
          <div className="mx-auto flex min-h-[min(88vh,920px)] w-full max-w-[1320px] flex-col justify-center px-5 py-16 lg:px-10 lg:py-24">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 shrink-0 bg-[var(--color-brand-orange)]" aria-hidden />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--color-brand-orange)]">
                Client trajectories
              </span>
            </div>
            <h2 className="section-title mt-6 max-w-[22rem] text-[var(--color-brand-blue-deep)] sm:max-w-xl lg:mt-7 lg:max-w-[36rem]">
              Business outcomes, not only system deliverables.
            </h2>
            {homeContent.clients?.intro ? (
              <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.7] text-[var(--color-ink-muted)]">
                {homeContent.clients.intro}
              </p>
            ) : null}

            <div className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
              {featuredClients.map((client) => (
                <Link
                  key={client.name}
                  href={homeContent.clients?.viewMoreHref || '/clients'}
                  className="group flex flex-col rounded-[1.25rem] border border-[rgba(17,39,77,0.07)] bg-white p-6 transition hover:border-[rgba(17,39,77,0.12)] lg:rounded-2xl lg:p-7"
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-orange)]">
                    {client.name}
                  </p>
                  <h3 className="mt-4 font-display text-[1.35rem] font-semibold leading-snug tracking-[-0.03em] text-[var(--color-brand-blue-deep)] lg:text-[1.5rem]">
                    {client.outcome}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.65] text-[var(--color-ink-muted)]">{client.summary}</p>
                </Link>
              ))}
            </div>

            <Link
              href={homeContent.clients?.viewMoreHref || '/clients'}
              className="mt-12 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[var(--color-brand-blue-deep)] underline decoration-[rgba(17,39,77,0.2)] underline-offset-[0.2em] transition hover:decoration-[var(--color-brand-orange)] lg:mt-14"
            >
              {homeContent.clients?.viewMoreText || 'View client work'}
              <span aria-hidden="true" className="text-[var(--color-brand-orange)]">
                →
              </span>
            </Link>

            {clientTestimonials.length > 0 ? (
              <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-2 lg:gap-6">
                {clientTestimonials.slice(0, 2).map((testimonial, index) => (
                  <blockquote
                    key={`${testimonial.quote}-${index}`}
                    className="rounded-[1.25rem] border border-[rgba(17,39,77,0.08)] bg-white/90 p-6 lg:rounded-2xl lg:p-8"
                  >
                    <p
                      className={`font-accent text-[1.35rem] leading-[1.45] text-[var(--color-brand-blue-deep)] sm:text-[1.45rem] lg:text-[1.55rem] ${
                        index === 0 ? 'italic' : ''
                      }`}
                    >
                      “{testimonial.quote}”
                    </p>
                  </blockquote>
                ))}
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

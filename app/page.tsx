import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RichText } from '@/components/RichText';
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
  const about = homeContent.about ?? {};
  const joinTeam = homeContent.joinTeam ?? {};
  const capabilityItems = (services.items ?? []).map((item) => item.title).filter(Boolean);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="mx-auto w-full max-w-[1240px] px-5 pb-8 pt-8 lg:px-8 lg:pb-10 lg:pt-10">
          <div className="overflow-hidden rounded-[2.2rem] border border-white/80 bg-[linear-gradient(135deg,#fbfdff_0%,#eff5fb_48%,#f7fbfe_100%)] shadow-[0_30px_100px_rgba(17,39,77,0.12)]">
            <div className="grid gap-10 px-6 py-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.82fr)] lg:items-center lg:px-10 lg:py-10">
              <div className="max-w-[560px]">
                <span className="eyebrow">
                  {hero.eyebrow || globalContent?.legalName || 'Emerging Technologies, Inc.'}
                </span>
                <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(2.55rem,4.4vw,4.45rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[var(--color-brand-blue-deep)]">
                  {hero.title || 'Technology strategy for decisions that shape operations.'}
                </h1>
                <p className="mt-5 max-w-[33rem] text-[1.02rem] leading-8 text-[var(--color-ink-muted)] sm:text-lg">
                  {hero.subtitle || globalContent?.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PrimaryButton as="link" href={hero.primaryHref || '/rfp-wizard'}>
                    {hero.primaryLabel || 'Schedule a call'}
                  </PrimaryButton>
                  <SecondaryButton as="link" href={hero.secondaryHref || '/services'}>
                    {hero.secondaryLabel || 'View capabilities'}
                  </SecondaryButton>
                </div>
                <div className="mt-10 border-t border-[rgba(17,39,77,0.08)] pt-5">
                  <p className="text-sm font-semibold text-[var(--color-brand-blue-deep)]">
                    Leadership alignment, delivery discipline, and measurable outcomes.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--color-ink-muted)]">
                    {capabilityItems.slice(0, 4).map((item) => (
                      <span key={item} className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-orange)]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden rounded-[1.9rem] border border-white/80 bg-[linear-gradient(135deg,#e8f3fb_0%,#f4f7fc_48%,#edeafb_100%)] shadow-[0_24px_80px_rgba(17,39,77,0.08)]">
                <Image
                  src={homeContent.heroBanner || '/images/background-image-for-eti.png'}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover object-right opacity-100"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_38%,rgba(255,255,255,0.14)_100%)]" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
          <div className="content-card rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)] lg:items-end">
              <div>
                <span className="eyebrow">How ETI works</span>
                <h2 className="section-title mt-5 max-w-2xl text-[var(--color-brand-blue-deep)]">
                  Strategy, methodology, and execution in one operating model.
                </h2>
              </div>
              <div className="space-y-5">
                <p className="text-base leading-8 text-[var(--color-ink-muted)]">
                  ETI helps leadership teams move from ambiguous priorities to practical execution without the usual handoff gaps between strategy and delivery.
                </p>
                <Link
                  href={services.viewMoreHref || '/services'}
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-blue)] transition hover:text-[var(--color-brand-blue-deep)]"
                >
                  {services.viewMoreText || 'View services'}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {pillars.slice(0, 3).map((pillar, index) => {
                const metric = metrics[index];
                return (
                  <Link
                    key={pillar.title}
                    href={pillar.href || '/services'}
                    className="group flex h-full flex-col justify-between rounded-[1.6rem] border border-[rgba(17,39,77,0.1)] bg-white p-6 shadow-[0_16px_45px_rgba(17,39,77,0.06)] transition hover:-translate-y-1 hover:border-[rgba(33,79,152,0.18)] hover:shadow-[0_24px_60px_rgba(17,39,77,0.1)]"
                  >
                    <div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-orange)]">
                        {metric?.label || `0${index + 1}`}
                      </p>
                      <h3 className="mt-4 font-display text-[2rem] font-semibold tracking-[-0.045em] text-[var(--color-brand-blue-deep)]">
                        {pillar.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[var(--color-ink-muted)]">
                        {metric?.detail || pillar.copy}
                      </p>
                    </div>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-blue)] transition group-hover:text-[var(--color-brand-blue-deep)]">
                      Explore
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 border-t border-[rgba(17,39,77,0.08)] pt-6">
              <div className="flex flex-wrap gap-3">
                {capabilityItems.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(17,39,77,0.1)] bg-[rgba(248,251,255,0.9)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-blue)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 w-full max-w-[1240px] px-5 lg:px-8">
          <div className="content-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="eyebrow">Client trajectories</span>
                <h2 className="section-title mt-5 text-[var(--color-brand-blue-deep)]">
                  Business outcomes, not only system deliverables.
                </h2>
              </div>
              <Link
                href={homeContent.clients?.viewMoreHref || '/clients'}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]"
              >
                {homeContent.clients?.viewMoreText || 'View client work'}
              </Link>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-ink-muted)]">
              {homeContent.clients?.intro}
            </p>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {featuredClients.map((client) => (
                <article
                  key={client.name}
                  className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/84 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                    {client.name}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
                    {client.outcome}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-ink-muted)]">{client.summary}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {clientTestimonials.slice(0, 2).map((testimonial, index) => (
                <blockquote
                  key={`${testimonial.quote}-${index}`}
                  className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/82 p-5 text-sm leading-7 text-[var(--color-ink)]"
                >
                  <p className="font-accent text-xl leading-8 text-[var(--color-brand-blue-deep)]">
                    “{testimonial.quote}”
                  </p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 w-full max-w-[1240px] px-5 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="content-card rounded-[2rem] p-6 sm:p-8">
              <span className="eyebrow">Perspective</span>
              <h2 className="section-title mt-5 text-[var(--color-brand-blue-deep)]">
                {about.title || 'About ETI'}
              </h2>
              {about.copy ? <RichText source={about.copy} className="mt-6 max-w-none text-[0.98rem]" /> : null}
            </div>

            <div className="grid gap-6">
              <div className="content-card rounded-[2rem] p-6 sm:p-8">
                <span className="eyebrow">How ETI works</span>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  Strategy, methodology, and execution without handoff gaps.
                </h2>
                <div className="mt-6 space-y-4">
                  {pillars.map((pillar, index) => (
                    <div
                      key={pillar.title}
                      className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/80 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
                        {pillar.title}
                      </h3>
                      {pillar.copy ? (
                        <p className="mt-2 text-sm leading-7 text-[var(--color-ink-muted)]">{pillar.copy}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-card rounded-[2rem] p-6 sm:p-8">
                <span className="eyebrow">Careers</span>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  {joinTeam.title || 'Join our team'}
                </h2>
                {joinTeam.copy ? (
                  <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">{joinTeam.copy}</p>
                ) : null}
                <SecondaryButton as="link" href={joinTeam.href || '/career'} className="mt-6">
                  {joinTeam.buttonText || 'Explore opportunities'}
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>

        {supplementalSections.length ? <ContentBlocks blocks={supplementalSections} /> : null}

        <section className="mx-auto mt-6 w-full max-w-[1240px] px-5 lg:px-8">
          <div className="content-card rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="eyebrow">Insights</span>
                <h2 className="section-title mt-5 text-[var(--color-brand-blue-deep)]">
                  Recent thinking from the front lines.
                </h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
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

        <section className="mx-auto my-8 w-full max-w-[1240px] px-5 lg:px-8">
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

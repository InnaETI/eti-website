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

  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="mx-auto w-full max-w-[1240px] px-5 pb-8 pt-8 lg:px-8 lg:pb-10 lg:pt-12">
          <div className="overflow-hidden rounded-[2.25rem] border border-white/65 bg-[radial-gradient(circle_at_top_left,_rgba(54,107,200,0.28),_transparent_28%),radial-gradient(circle_at_85%_18%,_rgba(226,121,66,0.16),_transparent_18%),linear-gradient(145deg,#f8fbff_0%,#edf3fa_46%,#fbf6f1_100%)] shadow-[0_30px_100px_rgba(17,39,77,0.14)]">
            <div className="grid gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1.12fr)_400px] lg:px-8 lg:py-12">
              <div className="flex flex-col justify-between">
                <div>
                  <span className="eyebrow">{hero.eyebrow || globalContent?.legalName || 'Emerging Technologies, Inc.'}</span>
                  <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.9rem,7vw,5.9rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-[var(--color-brand-blue-deep)]">
                    {hero.title || 'Technology transformation when the decision surface is messy.'}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-ink-muted)]">
                    {hero.subtitle || globalContent?.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <PrimaryButton as="link" href={hero.primaryHref || '/rfp-wizard'}>
                      {hero.primaryLabel || 'Schedule a call'}
                    </PrimaryButton>
                    <SecondaryButton as="link" href={hero.secondaryHref || '/services'}>
                      {hero.secondaryLabel || 'Review capabilities'}
                    </SecondaryButton>
                  </div>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {metrics.map((metric) => (
                    <article
                      key={`${metric.value}-${metric.label}`}
                      className="rounded-[1.75rem] border border-white/75 bg-white/84 p-5 shadow-[0_16px_45px_rgba(17,39,77,0.08)]"
                    >
                      <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-[var(--color-brand-blue-deep)]">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                        {metric.label}
                      </p>
                      {metric.detail ? (
                        <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">{metric.detail}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[2rem] border border-white/80 bg-white/86 p-6 shadow-[0_20px_60px_rgba(17,39,77,0.1)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
                    {hero.badgeTitle || 'Where ETI fits'}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-ink-muted)]">
                    {hero.badgeBody ||
                      'We work where leadership intent, delivery pressure, budget reality, and technology complexity are all colliding at once.'}
                  </p>
                  <div className="mt-5 grid gap-3">
                    {(hero.badgePoints ?? []).map((point) => (
                      <div
                        key={point}
                        className="rounded-[1.25rem] border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-ink)]"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  {pillars.slice(0, 3).map((pillar, index) => (
                    <article
                      key={pillar.title}
                      className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/78 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                            {String(index + 1).padStart(2, '0')}
                          </p>
                          <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
                            {pillar.title}
                          </h2>
                        </div>
                        {pillar.href ? (
                          <Link href={pillar.href} className="text-sm font-semibold text-[var(--color-brand-blue)]">
                            Explore
                          </Link>
                        ) : null}
                      </div>
                      {pillar.copy ? (
                        <p className="mt-3 text-sm leading-7 text-[var(--color-ink-muted)]">{pillar.copy}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
          <div className="content-card rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
              <div>
                <span className="eyebrow">Capabilities</span>
                <h2 className="section-title mt-5 max-w-2xl text-[var(--color-brand-blue-deep)]">
                  Advisory work that stays close to operations, delivery, and outcomes.
                </h2>
              </div>
              <div className="space-y-5">
                <p className="text-base leading-8 text-[var(--color-ink-muted)]">
                  {services.intro}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(services.items ?? []).map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/80 p-5"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton as="link" href={services.viewMoreHref || '/services'}>
                    {services.viewMoreText || 'View services'}
                  </PrimaryButton>
                  <SecondaryButton as="link" href="/contact-us">
                    Discuss your priorities
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
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

        <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
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

        <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
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

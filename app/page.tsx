import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { RichText } from '@/components/RichText';
import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { getGlobalContent, getHomeContent, getPageContent } from '@/lib/content';
import { getLatestPosts } from '@/lib/blog';

type HomePillar = {
  title?: string;
  copy?: string;
  href?: string;
};

type HomeService = {
  title?: string;
};

type HomeData = {
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

  const pillars = homeContent.pillars ?? [];
  const services = homeContent.services ?? {};
  const cta = homeContent.cta ?? {};
  const about = homeContent.about ?? {};
  const joinTeam = homeContent.joinTeam ?? {};

  return (
    <div className="site-shell">
      <Header />
      <main>
        <PageHero
          eyebrow={globalContent?.legalName || 'Emerging Technologies, Inc.'}
          title={globalContent?.tagline || 'Executive IT and AI Advisory'}
          description={globalContent?.description}
        >
          <div className="content-card rounded-[2rem] p-6 text-[var(--color-ink)]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
              Focus areas
            </p>
            <div className="space-y-4">
              {pillars.slice(0, 3).map((pillar) => (
                <div key={pillar.title} className="rounded-3xl border border-[var(--color-border)] bg-white/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
                        {pillar.title}
                      </h2>
                      {pillar.copy ? (
                        <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">{pillar.copy}</p>
                      ) : null}
                    </div>
                    {pillar.href ? (
                      <Link href={pillar.href} className="text-sm font-semibold text-[var(--color-brand-orange)]">
                        Explore
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageHero>

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
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="content-card rounded-[2rem] p-6 sm:p-8">
              <span className="eyebrow">Perspective</span>
              <h2 className="section-title mt-5 text-[var(--color-brand-blue-deep)]">
                {about.title || 'About ETI'}
              </h2>
              {about.copy ? <RichText source={about.copy} className="mt-6 max-w-none text-[0.98rem]" /> : null}
            </div>

            <div className="grid gap-6">
              <div className="content-card rounded-[2rem] p-6 sm:p-8">
                <span className="eyebrow">Client signal</span>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  Partnerships built around decisive change.
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
                  {homeContent.clients?.intro}
                </p>
                <div className="mt-6 grid gap-4">
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
                <Link href={homeContent.clients?.viewMoreHref || '/clients'} className="mt-6 inline-flex text-sm font-semibold text-[var(--color-brand-orange)]">
                  {homeContent.clients?.viewMoreText || 'View client work'}
                </Link>
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

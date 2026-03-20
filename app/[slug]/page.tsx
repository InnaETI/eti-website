import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { RichText } from '@/components/RichText';
import { PrimaryButton, SecondaryButton } from '@/components/Button';
import { getAllPageSlugs, getGlobalContent, getPageContent, type PageContent } from '@/lib/content';
import { getPageAliases, resolvePageSlug } from '@/lib/public-pages';
import { SITE, canonicalUrl } from '@/lib/site';

type ServiceItem = {
  title?: string;
  iconUrl?: string;
  items?: string[];
  linkText?: string;
  linkHref?: string;
};

type Testimonial = {
  quote?: string;
  image?: string;
  name?: string;
  role?: string;
};

type CTAData = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  href?: string;
  text?: string;
};

type Mission = {
  title?: string;
  image?: string;
  text?: string;
};

type PublicPageData = PageContent & {
  intro?: string;
  services?: ServiceItem[];
  testimonials?: Testimonial[];
  cta?: CTAData;
  mission?: Mission;
  secondaryImage?: string;
  formNote?: string;
  contactEmail?: string;
  contactPhone?: string;
};

function getResolvedPage(slug: string): PublicPageData | null {
  return getPageContent(resolvePageSlug(slug)) as PublicPageData | null;
}

export async function generateStaticParams() {
  return [
    ...getAllPageSlugs().map((slug) => ({ slug })),
    ...getPageAliases().map(({ slug }) => ({ slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getResolvedPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.subheading || page.intro || SITE.description,
    alternates: {
      canonical: canonicalUrl(`/${slug}`),
    },
  };
}

function renderMission(mission: Mission | undefined, secondaryImage?: string) {
  if (!mission?.text && !secondaryImage) return null;

  return (
    <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        {mission?.text ? (
          <div className="content-card rounded-[2rem] p-6 sm:p-8">
            <span className="eyebrow">Mission</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
              {mission.title || 'What guides the work'}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">{mission.text}</p>
          </div>
        ) : null}
        {secondaryImage ? (
          <div className="content-card overflow-hidden rounded-[2rem]">
            <Image
              src={secondaryImage}
              alt={mission?.title || 'ETI'}
              width={1200}
              height={800}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function renderServices(services: ServiceItem[] | undefined) {
  if (!services?.length) return null;

  return (
    <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
      <div className="content-card rounded-[2rem] p-6 sm:p-8">
        <span className="eyebrow">Capabilities</span>
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
          Structured around execution, not only ideas.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/82 p-5">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
                {service.title}
              </h3>
              {service.items?.length ? (
                <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--color-ink-muted)]">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-brand-orange)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {service.linkHref && service.linkText ? (
                <a href={service.linkHref} className="mt-5 inline-flex text-sm font-semibold text-[var(--color-brand-orange)]">
                  {service.linkText}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderTestimonials(testimonials: Testimonial[] | undefined) {
  if (!testimonials?.length) return null;

  return (
    <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
      <div className="content-card rounded-[2rem] p-6 sm:p-8">
        <span className="eyebrow">Proof</span>
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
          What clients say after the work is underway.
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article key={`${testimonial.quote}-${index}`} className="rounded-[1.75rem] border border-[var(--color-border)] bg-white/84 p-5">
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name || `Client ${index + 1}`}
                  width={220}
                  height={120}
                  className="mb-5 h-12 w-auto object-contain object-left"
                />
              ) : null}
              {testimonial.quote ? (
                <p className="font-accent text-xl leading-8 text-[var(--color-brand-blue-deep)]">
                  “{testimonial.quote}”
                </p>
              ) : null}
              {testimonial.name || testimonial.role ? (
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                  {[testimonial.name, testimonial.role].filter(Boolean).join(' · ')}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderCTA(cta: CTAData | undefined) {
  if (!cta?.title && !cta?.text && !cta?.buttonText) return null;

  return (
    <section className="mx-auto my-8 w-full max-w-[1240px] px-5 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#11274d_0%,#1d4e96_42%,#224380_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(17,39,77,0.24)] sm:px-8 sm:py-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <span className="eyebrow !text-white/72 before:!bg-white/45">Next step</span>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
              {cta.title || cta.text}
            </h2>
            {cta.subtitle ? (
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/75">{cta.subtitle}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={cta.href || '/contact-us'} className="site-button site-button-primary">
              {cta.buttonText || 'Start the conversation'}
            </a>
            <a href="/contact-us" className="site-button site-button-secondary !border-white/20 !bg-white/10 !text-white !shadow-none">
              Contact ETI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderContact(page: PublicPageData, globalEmail?: string, globalPhone?: string) {
  const email = page.contactEmail || globalEmail;
  const phone = page.contactPhone || globalPhone;

  return (
    <section className="mx-auto my-8 w-full max-w-[1240px] px-5 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="content-card rounded-[2rem] p-6 sm:p-8">
          <span className="eyebrow">Reach out</span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
            Start with the current business reality.
          </h2>
          {page.formNote ? (
            <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">{page.formNote}</p>
          ) : null}
          <div className="mt-8 space-y-4 rounded-[1.5rem] border border-[var(--color-border)] bg-white/80 p-5">
            {email ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">Email</p>
                <a href={`mailto:${email}`} className="mt-1 inline-flex text-base font-medium text-[var(--color-brand-blue)]">
                  {email}
                </a>
              </div>
            ) : null}
            {phone ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">Phone</p>
                <a href={`tel:${phone}`} className="mt-1 inline-flex text-base font-medium text-[var(--color-brand-blue)]">
                  {phone}
                </a>
              </div>
            ) : null}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getResolvedPage(slug);

  if (!page) {
    notFound();
  }

  const globalContent = getGlobalContent();
  const isContact = resolvePageSlug(slug) === 'contact-us';

  return (
    <div className="site-shell">
      <Header />
      <main>
        <PageHero
          eyebrow={SITE.legalName}
          title={page.title}
          description={page.subheading || page.intro}
          backgroundImage={page.bannerImage}
        >
          <div className="content-card rounded-[2rem] p-6 text-[var(--color-ink)]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
              Page overview
            </p>
            <p className="text-sm leading-7 text-[var(--color-ink-muted)]">
              {page.intro || page.subheading || globalContent?.description}
            </p>
          </div>
        </PageHero>

        {page.body ? (
          <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
            <div className="content-card rounded-[2rem] p-6 sm:p-8">
              <RichText source={page.body} />
            </div>
          </section>
        ) : null}

        {renderMission(page.mission, page.secondaryImage)}
        {renderServices(page.services)}
        {renderTestimonials(page.testimonials)}
        {isContact ? renderContact(page, globalContent?.contactEmail, globalContent?.contactPhone) : null}
        {!isContact ? renderCTA(page.cta) : null}
      </main>
      <Footer />
    </div>
  );
}

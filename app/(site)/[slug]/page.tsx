import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { RichText } from '@/components/RichText';
import { getAllPageSlugs, getGlobalContent, getPageContent, type PageContent } from '@/lib/content';
import { getPageAliases, resolvePageSlug } from '@/lib/public-pages';
import { SITE, canonicalUrl } from '@/lib/site';
import { ContentBlocks, type ContentBlock } from '@/components/ContentBlocks';
import TeamPage from '@/components/TeamPage';
import AboutPage from '@/components/AboutPage';
import ClientsPage from '@/components/ClientsPage';
import ClientsLabPage from '@/components/ClientsLabPage';
import { ServicesOverviewSection } from '@/components/ServicesOverviewSection';
import { ServicesValueDeliverSection } from '@/components/ServicesValueDeliverSection';

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

type ServicesOverview = {
  title: string;
  intro: string;
  columns: string[];
};

type ValueDeliver = {
  title: string;
  items: string[];
};

type PublicPageData = PageContent & {
  intro?: string;
  servicesOverview?: ServicesOverview;
  valueDeliver?: ValueDeliver;
  services?: ServiceItem[];
  testimonials?: Testimonial[];
  cta?: CTAData;
  mission?: Mission;
  secondaryImage?: string;
  formNote?: string;
  contactEmail?: string;
  contactPhone?: string;
  sections?: ContentBlock[];
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
  const resolved = resolvePageSlug(slug);
  const page = getResolvedPage(slug);

  if (!page) {
    return {};
  }

  if (resolved === 'team') {
    return {
      title: page.title || 'Team',
      description:
        'ETI brings executive leadership, delivery discipline, and practical technology judgment to complex initiatives.',
      alternates: {
        canonical: canonicalUrl(`/${slug}`),
      },
    };
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
            <span className="inline-flex items-center gap-[0.55rem] text-xs font-bold uppercase tracking-[0.24em] text-white">
              <span className="block h-px w-7 shrink-0 bg-white" aria-hidden />
              Next step
            </span>
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
          </div>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-white">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="text-white">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function renderContact(page: PublicPageData, globalEmail?: string, globalPhone?: string) {
  const email = page.contactEmail || globalEmail;
  const phone = page.contactPhone || globalPhone;
  const telHref = phone ? phone.replace(/[^\d+]/g, '') : '';

  return (
    <section className="mx-auto my-8 w-full max-w-[1320px] px-5 lg:my-10 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:items-start lg:gap-12">
        <div className="lg:pt-1">
          <h2 className="section-title text-[var(--color-brand-blue-deep)]">
            Let&apos;s start the conversation
          </h2>
          <p className="mt-5 max-w-xl text-base leading-[1.7] text-[var(--color-ink-muted)] sm:text-[1.0625rem]">
            {page.intro ||
              'Tell us what initiative you are planning, where the complexity sits, and how ETI can help.'}
          </p>
          {page.formNote ? (
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-muted)]">{page.formNote}</p>
          ) : null}

          <div className="mt-10 space-y-8">
            {email ? (
              <div className="flex gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-blue)] shadow-[0_8px_24px_rgba(33,79,152,0.25)]"
                  aria-hidden
                >
                  <MailIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-1 block text-base font-semibold text-[var(--color-brand-blue-deep)] transition hover:text-[var(--color-brand-blue)]"
                  >
                    {email}
                  </a>
                </div>
              </div>
            ) : null}
            {phone ? (
              <div className="flex gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-blue)] shadow-[0_8px_24px_rgba(33,79,152,0.25)]"
                  aria-hidden
                >
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    Phone
                  </p>
                  <a
                    href={telHref ? `tel:${telHref}` : undefined}
                    className="mt-1 block text-base font-semibold text-[var(--color-brand-blue-deep)] transition hover:text-[var(--color-brand-blue)]"
                  >
                    {phone}
                  </a>
                </div>
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
  const resolved = resolvePageSlug(slug);
  const isContact = resolved === 'contact-us';
  const isTeam = resolved === 'team';
  const isAbout = resolved === 'about-us' || resolved === 'about';
  const isClients = resolved === 'clients';
  const isClientsLab = resolved === 'clients-lab';
  const isServices = resolved === 'services';

  return isTeam ? (
    <TeamPage />
  ) : isAbout ? (
    <AboutPage page={page} />
  ) : isClients ? (
    <ClientsLabPage page={page} />
  ) : isClientsLab ? (
    <ClientsLabPage page={page} />
  ) : (
    <>
      <PageHero
        eyebrow={isContact ? undefined : SITE.legalName}
        title={page.title}
        description={
          isContact
            ? page.subheading || globalContent?.tagline || globalContent?.description
            : page.subheading || page.intro
        }
        backgroundImage={page.bannerImage}
        compact={isContact}
        thin={isServices}
        backgroundSoft={isContact}
      >
        {!isContact && !isServices ? (
          <div className="content-card rounded-[2rem] p-6 text-[var(--color-ink)]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
              Page overview
            </p>
            <p className="text-sm leading-7 text-[var(--color-ink-muted)]">
              {page.intro || page.subheading || globalContent?.description}
            </p>
          </div>
        ) : null}
      </PageHero>

      {isServices && page.servicesOverview?.columns?.length ? (
        <ServicesOverviewSection
          title={page.servicesOverview.title}
          intro={page.servicesOverview.intro}
          columns={page.servicesOverview.columns}
        />
      ) : null}

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
      {page.sections?.length ? <ContentBlocks blocks={page.sections} /> : null}
      {isContact ? renderContact(page, globalContent?.contactEmail, globalContent?.contactPhone) : null}
      {isServices && page.valueDeliver?.items?.length ? (
        <ServicesValueDeliverSection title={page.valueDeliver.title} items={page.valueDeliver.items} />
      ) : null}
      {!isContact ? renderCTA(page.cta) : null}
    </>
  );
}

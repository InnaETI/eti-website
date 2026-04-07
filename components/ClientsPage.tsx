import Image from 'next/image';
import Link from 'next/link';
import type { PageContent } from '@/lib/content';

type ClientStory = {
  name: string;
  logo: string;
  logoAlt: string;
  sector: string;
  logoCaptionTitle?: string;
  logoCaptionText?: string;
  summary: string;
  bullets: string[];
  techLine?: string;
};

type Testimonial = {
  quote?: string;
  image?: string;
  name?: string;
  role?: string;
};

type ClientsPageProps = {
  page: PageContent & {
    intro?: string;
    testimonials?: Testimonial[];
  };
};

const featuredStories: ClientStory[] = [
  {
    name: 'Integrated Surgical Solutions',
    logo: '/wp-content/uploads/2017/11/ipg-small.jpg',
    logoAlt: 'Integrated Surgical Solutions logo',
    sector: 'Surgical cost management solutions',
    logoCaptionTitle: 'Growth & Acquisition',
    logoCaptionText:
      'From $11M to $375M+ acquisition through modernized technology and strategic execution',
    summary:
      'Integrated Surgical Solutions grew from an entrepreneurial surgical cost management business into a scaled platform with stronger operations, broader market reach, and deeper health plan integration. ETI supported the company through modernization work tied directly to operational execution and expansion.',
    bullets: [
      'Helped streamline internal processes and communication as the business expanded.',
      'Supported stronger health plan integration and technology modernization tied to growth.',
      'The growth story included a major TPG investment in 2021 and an Evolent acquisition exceeding $375M in the following year.',
    ],
    techLine: 'Technology footprint: Azure, .NET, SQL Server, Angular, React, Power BI',
  },
  {
    name: 'Oak Street Health',
    logo: '/wp-content/uploads/2017/11/Oak20Street20Health20-202445015771.jpg',
    logoAlt: 'Oak Street Health logo',
    sector: 'Primary care for Medicare patients with complex conditions',
    logoCaptionTitle: 'Scale & Public Success',
    logoCaptionText:
      'Public healthcare leader scaled from 17 to 150+ clinics, acquired for $10.6B',
    summary:
      'Oak Street Health built a differentiated care model around full-risk Medicare contracting and scaled rapidly across markets. ETI partnered with Sales and Outreach leadership to modernize custom systems that improved prospect generation, patient support, and clinic growth operations.',
    bullets: [
      'Built a custom ecosystem to extend supplemental health coverage during regular patient visits.',
      'Modernized outreach systems and grassroots prospect workflows to improve conversion to patients.',
      'The company scaled from 17 clinics in 2016 to more than 150 and was later acquired by CVS Health for $10.6B.',
    ],
    techLine: 'Technology footprint: .NET Core, SQL Server, Angular, REST APIs, CI/Jenkins',
  },
];

const supportingStories: ClientStory[] = [
  {
    name: 'Healthcare Payment Specialists',
    logo: '/wp-content/uploads/2017/12/HPSlogo.png',
    logoAlt: 'Healthcare Payment Specialists logo',
    sector: 'Healthcare reimbursement and payment integrity',
    summary:
      'Healthcare Payment Specialists provides eligibility, reimbursement, and compliance solutions to hospitals and healthcare systems nationwide.',
    bullets: [
      'ETI assessed the Stingray platform and identified improvement opportunities.',
      'Recommended automation and process improvements were implemented with the client team.',
    ],
    techLine: 'Tech: .NET, SQL Server, JavaScript/CSS, ASP.NET MVC',
  },
  {
    name: 'ExplORer Surgical',
    logo: '/wp-content/uploads/2017/12/explORer_surgical1.jpg',
    logoAlt: 'ExplORer Surgical logo',
    sector: 'Surgical workflow and operating room coordination',
    summary:
      'ExplORer Surgical is an interactive surgical playbook designed to improve teamwork, workflow consistency, and learning inside the operating room.',
    bullets: [
      'Supported a product focused on safer, more efficient surgery.',
      'Helped reinforce workflows that improve coordination across surgical teams.',
    ],
  },
  {
    name: 'Trainerly',
    logo: '/wp-content/uploads/2017/11/trainerly-white-logo-1024x1024.png',
    logoAlt: 'Trainerly logo',
    sector: 'Live online fitness and group workout delivery',
    summary:
      'Trainerly connected clients and fitness professionals through real-time two-way video and live group training experiences.',
    bullets: [
      'Supported a lower-cost interactive group fitness model.',
      'Helped the business scale a real-time remote service experience.',
    ],
    techLine: 'Tech: SQL Server, AWS, ASP.NET MVC, microservices',
  },
  {
    name: 'StratusVue',
    logo: '/wp-content/uploads/2017/12/stratusvue.jpg',
    logoAlt: 'StratusVue logo',
    sector: 'Collaborative software for construction teams',
    summary:
      'StratusVue provides collaborative software for commercial and institutional construction teams with a product-led delivery model.',
    bullets: [
      'Supported software centered on field collaboration and client coordination.',
      'Helped reinforce both the product experience and the customer support model.',
    ],
  },
];

const testimonialDetails: Testimonial[] = [
  {
    quote:
      "At ETI, their work goes beyond system upgrades; they've constructed a technology platform that now stands as an invaluable asset for our company.",
    image: '/wp-content/uploads/2017/11/ipg-small.jpg',
    name: 'Stakeholder',
    role: 'Post-Project Completion',
  },
  {
    quote:
      'The team showed a great degree of expertise, professionalism, and flexibility while making sure the business owners were fully understood.',
    image: '/wp-content/uploads/2017/11/Oak20Street20Health20-202445015771.jpg',
    name: 'John Woolley',
    role: 'SVP, Growth and Business Development · Oak Street Health',
  },
  {
    quote:
      "Working with Emerging Technologies was more of a partnership rather than a vendor relationship.",
    image: '/wp-content/uploads/2017/11/trainerly-white-logo-1024x1024.png',
    name: 'Leon Axcelrud',
    role: 'Owner / President · Trainerly',
  },
];

function FeaturedCaseStudy({ story, reverse = false }: { story: ClientStory; reverse?: boolean }) {
  return (
    <article className="grid gap-10 border-t border-[var(--color-border)] py-10 first:border-t-0 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-14">
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="flex min-h-[230px] items-center justify-center lg:min-h-[280px]">
          <Image
            src={story.logo}
            alt={story.logoAlt}
            width={380}
            height={260}
            className={`h-auto w-full object-contain ${
              story.name === 'Integrated Surgical Solutions' ? 'max-w-[290px]' : 'max-w-[330px]'
            }`}
          />
        </div>
        {(story.logoCaptionTitle || story.logoCaptionText) && (
          <div className="mx-auto mt-6 max-w-[28rem] border-t border-[rgba(17,39,77,0.08)] pt-5 text-center lg:text-left">
            {story.logoCaptionTitle ? (
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-orange)]">
                {story.logoCaptionTitle}
              </p>
            ) : null}
            {story.logoCaptionText ? (
              <p className="mt-2 text-base leading-7 text-[var(--color-brand-blue-deep)]">{story.logoCaptionText}</p>
            ) : null}
          </div>
        )}
      </div>

      <div className={reverse ? 'lg:order-1' : ''}>
        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
          {story.sector}
        </p>
        <h3 className="mt-3 font-display text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--color-brand-blue-deep)] sm:text-[2.5rem]">
          {story.name}
        </h3>
        <p className="mt-5 max-w-3xl text-[1.02rem] leading-8 text-[var(--color-ink-muted)]">{story.summary}</p>

        <ul className="mt-7 space-y-4">
          {story.bullets.map((item) => (
            <li key={item} className="flex gap-4 text-[0.98rem] leading-7 text-[var(--color-ink-muted)]">
              <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {story.techLine ? (
          <p className="mt-7 border-t border-[rgba(17,39,77,0.08)] pt-5 text-sm leading-7 text-[var(--color-ink-muted)]">
            <span className="font-semibold text-[var(--color-brand-blue-deep)]">Technology:</span> {story.techLine.replace(/^Technology footprint:\s*/, '')}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function SupportingCard({ story }: { story: ClientStory }) {
  return (
    <article className="flex h-full flex-col rounded-[1.8rem] border border-[var(--color-border)] bg-white/92 px-6 py-7 shadow-[0_18px_50px_rgba(17,39,77,0.06)]">
      <div className="flex min-h-[132px] items-center justify-start">
        <Image
          src={story.logo}
          alt={story.logoAlt}
          width={240}
          height={140}
          className={`h-auto w-auto object-contain ${
            story.name === 'Healthcare Payment Specialists'
              ? 'max-h-[112px] max-w-[205px]'
              : story.name === 'Trainerly'
              ? 'max-h-[106px] max-w-[214px]'
              : story.name === 'ExplORer Surgical'
              ? 'max-h-[108px] max-w-[214px]'
              : 'max-h-[108px] max-w-[214px]'
          }`}
        />
      </div>
      <p className="mt-5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-orange)]">
        {story.sector}
      </p>
      <h3 className="mt-3 font-display text-[1.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
        {story.name}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-ink-muted)]">{story.summary}</p>
      <ul className="mt-5 space-y-3">
        {story.bullets.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-[var(--color-ink-muted)]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {story.techLine ? (
        <p className="mt-auto pt-5 text-[0.82rem] leading-6 text-[var(--color-ink-muted)]">
          <span className="font-semibold text-[var(--color-brand-blue-deep)]">Technology:</span> {story.techLine.replace(/^Tech:\s*/, '')}
        </p>
      ) : null}
    </article>
  );
}

export default function ClientsPage({ page }: ClientsPageProps) {
  const intro =
    page.intro ||
    'We partner with organizations across healthcare, services, and technology to modernize systems, improve operations, and create measurable business outcomes.';
  const testimonials = testimonialDetails;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/55 bg-[linear-gradient(135deg,#17345E_0%,#1F3B68_58%,#214f98_100%)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          aria-hidden
          style={{
            background:
              'radial-gradient(circle at 16% 18%, rgba(255,255,255,0.12), transparent 24%), linear-gradient(120deg, rgba(255,255,255,0.05), transparent 36%), repeating-linear-gradient(160deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 26px)',
          }}
        />
        <div className="mx-auto w-full max-w-[1320px] px-5 py-14 lg:px-10 lg:py-16">
          <div className="relative z-10 max-w-3xl">
            <span className="eyebrow text-white before:bg-white/45">Client Work</span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
              Client impact through strategy, execution, and technology transformation
            </h1>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-white/82">{intro}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="grid gap-8 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <span className="eyebrow">How ETI Shows Up</span>
            <h2 className="mt-5 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.045em] text-[var(--color-brand-blue-deep)] sm:text-[3rem]">
              Selected engagements where ETI’s role, pace, and business impact are easiest to see.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[var(--color-ink-muted)]">
            ETI is hired when the work spans strategy, systems, and operational execution. The strongest engagements show measurable change in scale, modernization, and business value.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-4 w-full max-w-[1320px] px-5 lg:px-10">
        {featuredStories.map((story, index) => (
          <FeaturedCaseStudy key={story.name} story={story} reverse={index % 2 === 1} />
        ))}
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-t border-[var(--color-border)] pt-10">
          <div>
            <span className="eyebrow">Additional Client Work</span>
            <h2 className="mt-5 font-display text-[2.2rem] font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)] lg:text-[2.45rem]">
              Supporting work across adjacent industries and operating models.
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {supportingStories.map((story) => (
            <SupportingCard key={story.name} story={story} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="rounded-[2.25rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,246,251,0.98))] px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-3xl">
            <span className="eyebrow">Client Perspectives</span>
            <h2 className="mt-5 font-display text-[2.25rem] font-semibold tracking-[-0.045em] text-[var(--color-brand-blue-deep)] lg:text-[2.85rem]">
              What clients say when the work is complex and the outcome matters.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name || 'client'}-${index}`}
                className="flex h-full flex-col rounded-[1.8rem] border border-[var(--color-border)] bg-white px-6 py-6 shadow-[0_16px_48px_rgba(17,39,77,0.07)]"
              >
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(17,39,77,0.03)]">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name || `Client ${index + 1}`}
                        width={96}
                        height={96}
                        className="h-auto w-auto max-h-10 max-w-12 object-contain"
                      />
                    </div>
                  ) : null}
                  <div>
                    {testimonial.name ? (
                      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-blue-deep)]">
                        {testimonial.name}
                      </p>
                    ) : null}
                    {testimonial.role ? (
                      <p className="mt-1 text-xs leading-5 text-[var(--color-ink-muted)]">{testimonial.role}</p>
                    ) : null}
                  </div>
                </div>

                <p className="mt-6 font-accent text-[1.18rem] leading-8 text-[var(--color-brand-blue-deep)]">
                  “{testimonial.quote}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto my-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] bg-[linear-gradient(135deg,#11274d_0%,#17345E_54%,#214f98_100%)] px-7 py-8 text-white shadow-[0_28px_90px_rgba(17,39,77,0.22)] sm:px-10 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="eyebrow text-white before:bg-white/45">Next Step</span>
              <h2 className="mt-5 max-w-3xl font-display text-[2.5rem] font-semibold tracking-[-0.045em] text-white sm:text-[3rem]">
                Need a partner who can lead and execute?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/76">
                ETI helps organizations modernize systems, improve operations, and deliver results when the work matters.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact-us" className="site-button site-button-primary">
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

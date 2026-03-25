import Image from 'next/image';
import Link from 'next/link';
import type { PageContent } from '@/lib/content';

type ClientStory = {
  name: string;
  logo: string;
  logoAlt: string;
  sector: string;
  summary: string;
  outcome: string;
  role: string[];
  techLine?: string;
};

type Testimonial = {
  quote?: string;
  image?: string;
  name?: string;
  role?: string;
};

type ClientsLabPageProps = {
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
    summary:
      'Integrated Surgical Solutions grew from an entrepreneurial surgical cost management business into a scaled platform with stronger operations, better communication, and deeper health plan integration. ETI supported that expansion through modernization work tied directly to business execution.',
    outcome: 'Growth & Acquisition: from roughly $11M to a $375M+ acquisition through modernized technology and strategic execution.',
    role: [
      'Supported internal process and communication improvements as the company scaled.',
      'Helped deepen health plan integration and operational alignment.',
      'The growth path included a major TPG investment and a subsequent Evolent acquisition.',
    ],
    techLine: 'Azure, .NET, SQL Server, Angular, React, Power BI',
  },
  {
    name: 'Oak Street Health',
    logo: '/wp-content/uploads/2017/11/Oak20Street20Health20-202445015771.jpg',
    logoAlt: 'Oak Street Health logo',
    sector: 'Primary care for Medicare patients with complex conditions',
    summary:
      'Oak Street Health built a differentiated care model around full-risk Medicare contracting and scaled rapidly across markets. ETI partnered with Sales and Outreach leadership to modernize systems that improved prospect generation, patient support, and clinic growth operations.',
    outcome: 'Scale & Public Success: expanded from 17 to 150+ clinics and was later acquired by CVS Health for $10.6B.',
    role: [
      'Built a custom ecosystem to support supplemental health coverage during patient visits.',
      'Modernized outreach systems tied to a grassroots growth model.',
      'Improved conversion from prospects to patients through better operational tooling.',
    ],
    techLine: '.NET Core, SQL Server, Angular, REST APIs, CI/Jenkins',
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
    outcome: 'Platform assessment and improvements that strengthened reimbursement operations and workflow efficiency.',
    role: [
      'Performed a full Stingray platform assessment.',
      'Identified and implemented automation and process improvements.',
    ],
    techLine: '.NET, SQL Server, JavaScript/CSS, ASP.NET MVC',
  },
  {
    name: 'ExplORer Surgical',
    logo: '/wp-content/uploads/2017/12/explORer_surgical1.jpg',
    logoAlt: 'ExplORer Surgical logo',
    sector: 'Surgical workflow and operating room coordination',
    summary:
      'ExplORer Surgical is an interactive surgical playbook designed to improve teamwork, workflow consistency, and learning inside the operating room.',
    outcome: 'Workflow support for safer, more efficient surgery and stronger operating room coordination.',
    role: [
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
    outcome: 'Helped scale a real-time remote service model for interactive group fitness.',
    role: [
      'Supported a lower-cost live group fitness experience.',
      'Helped the business scale remote delivery for sessions and classes.',
    ],
    techLine: 'SQL Server, AWS, ASP.NET MVC, microservices',
  },
  {
    name: 'StratusVue',
    logo: '/wp-content/uploads/2017/12/stratusvue.jpg',
    logoAlt: 'StratusVue logo',
    sector: 'Collaborative software for construction teams',
    summary:
      'StratusVue provides collaborative software solutions for commercial and institutional construction teams with a strong customer support model.',
    outcome: 'Product and support reinforcement for software centered on collaboration and team delivery.',
    role: [
      'Supported software built around field collaboration and coordination.',
      'Helped strengthen the product and customer support experience.',
    ],
  },
];

const testimonials: Testimonial[] = [
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

function FeaturedStory({ story }: { story: ClientStory }) {
  return (
    <article className="grid gap-8 rounded-[2rem] border border-[var(--color-border)] bg-white/92 px-6 py-7 shadow-[0_20px_60px_rgba(17,39,77,0.06)] lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-8">
      <div>
        <div className="flex min-h-[220px] items-center justify-center rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(17,39,77,0.03),rgba(17,39,77,0.015))]">
          <Image
            src={story.logo}
            alt={story.logoAlt}
            width={360}
            height={240}
            className={`h-auto w-full object-contain ${story.name === 'Integrated Surgical Solutions' ? 'max-w-[250px]' : 'max-w-[300px]'}`}
          />
        </div>
        <div className="mt-5 rounded-[1.2rem] bg-[var(--color-canvas)] px-5 py-4">
          <p className="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-orange)]">
            Outcome
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--color-brand-blue-deep)]">{story.outcome}</p>
        </div>
      </div>

      <div>
        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-orange)]">
          {story.sector}
        </p>
        <h3 className="mt-3 font-display text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--color-brand-blue-deep)] sm:text-[2.55rem]">
          {story.name}
        </h3>
        <p className="mt-5 max-w-3xl text-[1.02rem] leading-8 text-[var(--color-ink-muted)]">{story.summary}</p>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
          <ul className="space-y-4">
            {story.role.map((item) => (
              <li key={item} className="flex gap-4 text-[0.98rem] leading-7 text-[var(--color-ink-muted)]">
                <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {story.techLine ? (
            <div className="rounded-[1.1rem] border border-[rgba(17,39,77,0.08)] bg-[rgba(17,39,77,0.025)] px-4 py-3 text-sm leading-6 text-[var(--color-ink-muted)] lg:max-w-[18rem]">
              <span className="font-semibold text-[var(--color-brand-blue-deep)]">Technology</span>
              <p className="mt-1">{story.techLine}</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SupportingStory({ story }: { story: ClientStory }) {
  return (
    <article className="flex h-full flex-col rounded-[1.7rem] border border-[var(--color-border)] bg-white/90 px-6 py-6 shadow-[0_18px_50px_rgba(17,39,77,0.05)]">
      <div className="flex min-h-[124px] items-center justify-start">
        <Image
          src={story.logo}
          alt={story.logoAlt}
          width={240}
          height={140}
          className={`h-auto w-auto object-contain ${
            story.name === 'Healthcare Payment Specialists'
              ? 'max-h-[110px] max-w-[205px]'
              : story.name === 'Trainerly'
                ? 'max-h-[145px] max-w-[300px]'
                : story.name === 'ExplORer Surgical'
                  ? 'max-h-[188px] max-w-[390px]'
                  : 'max-h-[156px] max-w-[330px]'
          }`}
        />
      </div>
      <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-orange)]">
        {story.sector}
      </p>
      <h3 className="mt-3 font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
        {story.name}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-ink-muted)]">{story.summary}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--color-brand-blue-deep)]">{story.outcome}</p>
      <ul className="mt-5 space-y-3">
        {story.role.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-[var(--color-ink-muted)]">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {story.techLine ? (
        <p className="mt-auto pt-5 text-[0.82rem] leading-6 text-[var(--color-ink-muted)]">
          <span className="font-semibold text-[var(--color-brand-blue-deep)]">Technology:</span> {story.techLine}
        </p>
      ) : null}
    </article>
  );
}

export default function ClientsLabPage({ page }: ClientsLabPageProps) {
  const intro =
    page.intro ||
    'We partner with organizations across healthcare, services, and technology to modernize systems, improve operations, and create measurable business outcomes.';
  const heroStyle = page.bannerImage
    ? {
        backgroundImage: `linear-gradient(135deg, rgba(7, 19, 40, 0.78), rgba(18, 61, 126, 0.54)), url('${page.bannerImage}')`,
      }
    : undefined;

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-white/55 bg-[linear-gradient(135deg,#11274d_0%,#17345E_52%,#214f98_100%)] bg-cover bg-center bg-no-repeat text-white"
        style={heroStyle}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          aria-hidden
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.1), transparent 22%), linear-gradient(125deg, rgba(255,255,255,0.04), transparent 36%), linear-gradient(180deg, rgba(7,19,40,0.18), rgba(7,19,40,0.22))',
          }}
        />
        <div className="mx-auto w-full max-w-[1320px] px-5 py-14 lg:px-10 lg:py-16">
          <div className="relative z-10 max-w-4xl">
            <span className="eyebrow text-white before:bg-white/45">Clients</span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.2rem]">
              Client impact through strategy, execution, and technology transformation
            </h1>
            <p className="mt-5 max-w-3xl text-[1.02rem] leading-8 text-white/88 [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]">
              {intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="grid gap-8 border-b border-[var(--color-border)] pb-10 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:items-start">
          <div>
            <span className="eyebrow">Featured Work</span>
            <h2 className="mt-5 max-w-3xl font-display text-[1.95rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--color-brand-blue-deep)] sm:text-[2.25rem]">
              Selected engagements where ETI’s role, pace, and business impact are easiest to see.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-[var(--color-ink-muted)]">
            This direction emphasizes ETI as a transformation partner: fewer interface elements, stronger story hierarchy, and clearer proof of outcome.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-6 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="grid gap-8">
          {featuredStories.map((story) => (
            <FeaturedStory key={story.name} story={story} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-t border-[var(--color-border)] pt-10">
          <div>
            <span className="eyebrow">Additional Client Work</span>
            <h2 className="mt-5 font-display text-[2.15rem] font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)] lg:text-[2.4rem]">
              Supporting work across adjacent industries and operating models.
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {supportingStories.map((story) => (
            <SupportingStory key={story.name} story={story} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="rounded-[2.2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,246,251,0.98))] px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-3xl">
            <span className="eyebrow">Client Perspectives</span>
            <h2 className="mt-5 font-display text-[2.2rem] font-semibold tracking-[-0.045em] text-[var(--color-brand-blue-deep)] lg:text-[2.8rem]">
              Trust built through execution, not just recommendations.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name || 'client'}-${index}`}
                className="flex h-full flex-col rounded-[1.75rem] border border-[var(--color-border)] bg-white px-6 py-6 shadow-[0_16px_48px_rgba(17,39,77,0.06)]"
              >
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(17,39,77,0.03)]">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name || `Client ${index + 1}`}
                        width={88}
                        height={88}
                        className="h-auto w-auto max-h-9 max-w-12 object-contain"
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
                <p className="mt-6 font-accent text-[1.16rem] leading-8 text-[var(--color-brand-blue-deep)]">
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
              <h2 className="mt-5 max-w-3xl font-display text-[2.4rem] font-semibold tracking-[-0.045em] text-white sm:text-[2.9rem]">
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

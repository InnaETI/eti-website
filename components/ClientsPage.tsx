import Image from 'next/image';
import Link from 'next/link';
import type { PageContent } from '@/lib/content';

type ClientStory = {
  name: string;
  logo: string;
  logoAlt: string;
  href?: string;
  sector: string;
  summary: string;
  impact?: string[];
  role: string[];
  technologies?: string[];
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
    href: 'https://www.ipg.com/',
    sector: 'Surgical cost management solutions',
    summary:
      "IPG stands as a leading provider of Surgical Cost Management solutions. Founded in 2007 by private investors, the company grew from roughly $11 million in revenue in 2008 to about $100 million by 2020. ETI supported that trajectory through ongoing technology innovation, process streamlining, stronger communication, and deeper health plan integration.",
    impact: [
      'Revenue expanded from about $11M in 2008 to about $100M by 2020.',
      'The business extended beyond its core base into new markets.',
      'Growth milestones included a major TPG investment in 2021 and an Evolent Health acquisition of more than $375M the following year.',
    ],
    role: [
      'Supported technology modernization tied directly to operational growth.',
      'Helped streamline internal processes and communication across the organization.',
      'Improved health plan integration to support expansion and execution.',
    ],
    technologies: [
      'Azure Cognetive Services',
      'Azure Functions',
      'Azure Logic Apps',
      'SaaS',
      'Cosmos DB',
      'Microsoft Dynamics 365',
      '.NET',
      'SQL Server',
      'Angular',
      'Rest API',
      'Git',
      'CI Jenkins',
      'Amazon Webservices Cloud',
      'Microsoft Azure Cloud',
      'React',
      'PowerBI',
    ],
  },
  {
    name: 'Oak Street Health',
    logo: '/wp-content/uploads/2017/11/Oak20Street20Health20-202445015771.jpg',
    logoAlt: 'Oak Street Health logo',
    sector: 'Primary care for Medicare patients with complex conditions',
    summary:
      'Oak Street Health is a multi-payor primary care provider built around full-risk Medicare contracting. ETI partnered with its Sales and Outreach teams to build and modernize custom systems that improved how the business supported existing patients and generated new prospects.',
    impact: [
      'Expanded from 17 clinics in 2016 to more than 150 by the time the company went public in 2020.',
      'The company was ultimately acquired by CVS Health for $10.6B in early 2023.',
      'ETI-supported system improvements helped increase conversion from prospects to patients across Oak Street clinics.',
    ],
    role: [
      'Built a custom ecosystem to offer supplemental health coverage during regular patient visits.',
      'Modernized outreach systems to support a grassroots growth model.',
      'Created custom solutions for obtaining and converting new prospects more effectively.',
    ],
    technologies: ['.NET Core', 'SQL Server', 'Angular', 'JavaScript/CSS', 'Rest API', 'Git', 'CI Jenkins', 'ASP .NET MVC'],
  },
];

const supportingStories: ClientStory[] = [
  {
    name: 'Healthcare Payment Specialists',
    logo: '/wp-content/uploads/2017/12/HPSlogo.png',
    logoAlt: 'Healthcare Payment Specialists logo',
    href: 'https://www.healthcarepayment.com/',
    sector: 'Healthcare reimbursement and payment integrity',
    summary:
      'Healthcare Payment Specialists provides technology-enabled eligibility, reimbursement, and compliance solutions to hospitals and healthcare systems nationwide. ETI assessed the Stingray Platform, identified automation and process improvements, and helped implement the recommended changes.',
    role: [
      'Performed a full platform assessment.',
      'Identified opportunities to improve and automate core workflows.',
      'Worked directly with the client to address the identified improvements.',
    ],
    technologies: ['.NET', 'SQL Server', 'JavaScript/CSS', 'ASP .NET MVC'],
  },
  {
    name: 'ExplORer Surgical',
    logo: '/wp-content/uploads/2017/12/explORer_surgical1.jpg',
    logoAlt: 'ExplORer Surgical logo',
    sector: 'Surgical workflow and operating room coordination',
    summary:
      'ExplORer is an interactive surgical playbook designed to improve teamwork in the operating room. Best practices are embedded into surgeon-customized workflows, and surgical activity can be tracked and adjusted as part of a learning health system.',
    role: [
      'Supported a product built around safer, more efficient surgery.',
      'Helped reinforce workflows that improve coordination in the operating room.',
    ],
  },
  {
    name: 'Trainerly',
    logo: '/wp-content/uploads/2017/11/trainerly-white-logo-1024x1024.png',
    logoAlt: 'Trainerly logo',
    href: 'http://www.trainer.ly/',
    sector: 'Live online fitness and group workout delivery',
    summary:
      'Trainerly connects clients with fitness professionals across the globe through real-time two-way video. The platform introduced live group workout classes that made interactive training more accessible from home, office, or hotel environments.',
    role: [
      'Supported a lower-cost interactive group fitness offering.',
      'Helped the business scale a real-time service model for remote sessions.',
    ],
    technologies: ['SQL Server', 'Amazon Webservices Cloud', 'ASP .NET MVC', 'Microservices'],
  },
  {
    name: 'StratusVue',
    logo: '/wp-content/uploads/2017/12/stratusvue.jpg',
    logoAlt: 'StratusVue logo',
    href: 'https://www.stratusvue.com/',
    sector: 'Collaborative software for construction teams',
    summary:
      'StratusVue provides collaborative software solutions for the commercial and institutional construction industry. Based in the Chicago area, the company serves clients with product-led collaboration and a strong customer support model.',
    role: [
      'Supported a software business focused on collaboration and team delivery.',
      'Helped reinforce the product and customer support experience offered to client teams.',
    ],
  },
];

const trustPoints = [
  'Healthcare, reimbursement, surgery, fitness, and construction platforms',
  'Strategy, modernization, integration, and delivery execution',
  'Relationships built around real systems, measurable results, and operating pace',
];

const testimonialDetails = [
  {
    quote:
      "At ETI, their work goes beyond system upgrades; they've constructed a technology platform that now stands as an invaluable asset for our company. We have seen an increase in our market value, facilitating successful company sales. The System Modernization project has been an investment in our company's future success.",
    image: '/wp-content/uploads/2017/11/ipg-small.jpg',
    name: 'Stakeholder',
    role: 'Post-Project Completion',
  },
  {
    quote:
      "The team at Emerging Technologies were wonderful to work with. They did a tremendous job managing the process and the business owners to make sure they really understood the business. They showed a great degree of expertise, professionalism, and flexibility.",
    image: '/wp-content/uploads/2017/11/Oak20Street20Health20-202445015771.jpg',
    name: 'John Woolley',
    role: 'SVP, Growth and Business Development · Oak Street Health',
  },
  {
    quote:
      "The team understood the company's direction, its challenges and best use of available technology. Working with Emerging Technologies was more of a partnership rather than vendor.",
    image: '/wp-content/uploads/2017/11/trainerly-white-logo-1024x1024.png',
    name: 'Leon Axcelrud',
    role: 'Owner / President · Trainerly',
  },
];

function StoryTags({ technologies }: { technologies?: string[] }) {
  if (!technologies?.length) return null;

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {technologies.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[var(--color-border)] bg-[rgba(17,39,77,0.04)] px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-blue-deep)]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function StoryLink({ href }: { href?: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-blue)] transition hover:text-[var(--color-brand-blue-deep)]"
    >
      Visit client site
      <span aria-hidden>↗</span>
    </a>
  );
}

export default function ClientsPage({ page }: ClientsPageProps) {
  const intro =
    page.intro ||
    'We partner with organizations across healthcare, services, and technology to modernize systems, improve operations, and create measurable business outcomes.';
  const testimonials = testimonialDetails;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/55 bg-[linear-gradient(135deg,#17345E_0%,#1F3B68_54%,#214f98_100%)] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
          style={{
            background:
              'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.16), transparent 26%), radial-gradient(circle at 84% 12%, rgba(229,141,73,0.14), transparent 24%), linear-gradient(115deg, rgba(255,255,255,0.06), transparent 38%), repeating-linear-gradient(160deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 22px)',
          }}
        />
        <div className="mx-auto grid w-full max-w-[1320px] gap-10 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10 lg:py-20">
          <div className="relative z-10 max-w-4xl">
            <span className="eyebrow text-white before:bg-white/45">Selected Work</span>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-[4.6rem]">
              Client impact through strategy, execution, and technology transformation
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82">
              {intro}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.4rem] border border-white/14 bg-white/8 px-4 py-4 text-sm leading-6 text-white/84 backdrop-blur-[2px]"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <aside className="relative z-10 self-end rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_22px_70px_rgba(10,20,40,0.2)] backdrop-blur-[8px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/78">Where ETI fits</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/62">Featured case studies</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">2</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/62">Additional client stories</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">4</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/10 px-4 py-4">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/62">What the page shows</p>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  Real client names, the work delivered, supporting technologies, and the outcomes that mattered.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <div className="content-card rounded-[2rem] p-7 sm:p-9">
            <span className="eyebrow">Client relationships</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)] lg:text-[2.75rem]">
              Partnerships built around difficult work and real business stakes.
            </h2>
          </div>
          <div className="rounded-[2rem] border border-[var(--color-border)] bg-white/82 px-7 py-8 shadow-[var(--shadow-soft)] sm:px-9">
            <p className="text-base leading-8 text-[var(--color-ink-muted)] sm:text-[1.05rem]">
              ETI works where leadership teams need more than technical advice. The work often sits at the intersection of
              modernization, operations, growth, and execution discipline. Across these client stories, the pattern is
              consistent: ETI helps turn ambiguity into systems, programs, and delivery that move the business forward.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Featured client stories</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)] lg:text-[3rem]">
              Two engagements where ETI’s role is easiest to see.
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-8">
          {featuredStories.map((story, index) => (
            <article
              key={story.name}
              className="content-card overflow-hidden rounded-[2.2rem] border border-white/80 p-0"
            >
              <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div className="flex items-center justify-center border-b border-[var(--color-border)] bg-[linear-gradient(180deg,#fbfdff_0%,#edf3fa_100%)] px-8 py-10 lg:min-h-[100%] lg:border-b-0 lg:border-r">
                  <div className="flex w-full max-w-[210px] items-center justify-center rounded-[1.8rem] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(17,39,77,0.08)]">
                    <Image
                      src={story.logo}
                      alt={story.logoAlt}
                      width={260}
                      height={180}
                      className={`h-auto w-full object-contain ${index === 0 ? 'max-w-[170px]' : 'max-w-[190px]'}`}
                    />
                  </div>
                </div>

                <div className="px-7 py-8 sm:px-9 sm:py-9">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-3xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                        {story.sector}
                      </p>
                      <h3 className="mt-3 font-display text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                        {story.name}
                      </h3>
                    </div>
                    <StoryLink href={story.href} />
                  </div>

                  <p className="mt-5 max-w-4xl text-base leading-8 text-[var(--color-ink-muted)]">{story.summary}</p>

                  <div className="mt-7 grid gap-5 lg:grid-cols-2">
                    <div className="rounded-[1.55rem] border border-[var(--color-border)] bg-[rgba(17,39,77,0.03)] px-5 py-5">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
                        ETI role
                      </p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-ink-muted)]">
                        {story.role.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[1.55rem] border border-[var(--color-border)] bg-white px-5 py-5">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-blue)]">
                        Business impact
                      </p>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-ink-muted)]">
                        {story.impact?.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-blue)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <StoryTags technologies={story.technologies} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Additional client stories</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)] lg:text-[2.7rem]">
              Supporting work across adjacent industries and operating models.
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {supportingStories.map((story) => (
            <article key={story.name} className="content-card flex h-full flex-col rounded-[1.9rem] p-6">
              <div className="flex h-[120px] items-center justify-center rounded-[1.4rem] border border-[var(--color-border)] bg-white">
                <Image
                  src={story.logo}
                  alt={story.logoAlt}
                  width={180}
                  height={120}
                  className={`h-auto w-auto object-contain ${
                    story.name === 'Healthcare Payment Specialists'
                      ? 'max-h-[68px] max-w-[150px]'
                      : story.name === 'StratusVue'
                        ? 'max-h-[70px] max-w-[138px]'
                        : story.name === 'Trainerly'
                          ? 'max-h-[70px] max-w-[124px]'
                          : 'max-h-[82px] max-w-[138px]'
                  }`}
                />
              </div>
              <div className="mt-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-orange)]">
                  {story.sector}
                </p>
                <h3 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
                  {story.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-ink-muted)]">{story.summary}</p>
              </div>
              <div className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-ink-muted)]">
                {story.role.map((item) => (
                  <p key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-orange)]" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <StoryTags technologies={story.technologies} />
                <div className="mt-5">
                  <StoryLink href={story.href} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(239,245,251,0.98))] px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-3xl">
            <span className="eyebrow">Client perspectives</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)] lg:text-[2.85rem]">
              What clients said after the work was underway.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.name || 'client'}-${index}`}
                className="rounded-[1.8rem] border border-[var(--color-border)] bg-white/90 p-6 shadow-[0_20px_60px_rgba(17,39,77,0.08)]"
              >
                <div className="flex items-center gap-4">
                  {testimonial.image ? (
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
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
                <p className="mt-6 font-accent text-[1.28rem] leading-8 text-[var(--color-brand-blue-deep)]">
                  “{testimonial.quote}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto my-12 w-full max-w-[1320px] px-5 lg:px-10">
        <div className="overflow-hidden rounded-[2.2rem] bg-[linear-gradient(135deg,#11274d_0%,#17345E_48%,#214f98_100%)] px-7 py-8 text-white shadow-[0_28px_90px_rgba(17,39,77,0.24)] sm:px-10 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="eyebrow text-white before:bg-white/45">Next step</span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                If your next initiative needs to support growth, scale, or transformation, let’s talk.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/76">
                ETI works best when the work is complex, the pace matters, and execution needs to match the business case.
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

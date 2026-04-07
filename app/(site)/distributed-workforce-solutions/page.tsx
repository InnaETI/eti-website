import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { ServicesOverviewSection } from '@/components/ServicesOverviewSection';
import { canonicalUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Distributed Workforce Solutions',
  description:
    'ETI helps organizations move distributed workforce initiatives from ad hoc remote work to structured execution, visibility, and sustainable operating discipline.',
  alternates: {
    canonical: canonicalUrl('/distributed-workforce-solutions'),
  },
};

const concerns = [
  'Are employees actually working during business hours?',
  'How much time is going into assignments and responsibilities?',
  'Should productivity be monitored continuously or through defined checkpoints?',
  'How should productivity, quality, and accountability be measured?',
  'Will communication break down because of technical or coordination issues?',
  'Can the work be done effectively from home or distributed locations?',
  'How do teams get clarity on procedures, ownership, and assignments?',
  'How do we preserve collaboration and delivery quality at scale?',
] as const;

const impediments = [
  'Email used as the default for every workflow and decision.',
  'Systems and support models not designed for virtual work.',
  'Heavy dependence on in-person technical support.',
  'Requirements buried in large, unstructured documents.',
  'Tool suites adopted inconsistently across teams.',
  'No standardized onboarding, training, or operating support.',
  'Training methods built only for the classroom.',
] as const;

const engagements = [
  'Implement methodology and technology that support successful execution of enterprise initiatives.',
  'Automate and streamline workflows so employees can focus on the highest-value work.',
  'Create dashboards and reporting that make ownership, progress, and blockers visible.',
  'Build collaborative distributed teams with a model that is sustainable and repeatable.',
] as const;

const framework = [
  {
    title: 'Project ramp-up and onboarding',
    copy: 'We establish an outcomes-based delivery model with clear expectations for deliverables, timelines, and work quality before scale introduces confusion.',
  },
  {
    title: 'Tools and technologies',
    copy: 'Distributed teams need a coherent productivity stack for communication, collaboration, project controls, and knowledge management.',
  },
  {
    title: 'Software automation',
    copy: 'We use automation and DevOps discipline to increase consistency, surface errors quickly, and reduce avoidable delivery disruption.',
  },
  {
    title: 'Business process automation',
    copy: 'ETI helps organize, simplify, and automate workflows and rules so teams can work with less friction and stronger consistency.',
  },
  {
    title: 'Performance reporting',
    copy: 'We develop KPI-based dashboards that give leadership timely visibility into progress, risk, and results.',
  },
  {
    title: 'Workforce policies and training',
    copy: 'We help HR and operating leaders update workforce policies and train teams on how to apply them in a distributed model.',
  },
  {
    title: 'Mentorship and skill building',
    copy: 'We coach product owners, managers, and individual contributors so distributed execution improves instead of weakening over time.',
  },
  {
    title: 'Security and data access',
    copy: 'We incorporate identity, access, security, and compliance practices that protect systems and data without creating unnecessary drag.',
  },
] as const;

const benefits = [
  'Expanded access to talent without geographic limits.',
  'Stronger communication methods and more consistent operating rhythm.',
  'Better visibility into day-to-day progress and blockers.',
  'Steadier productivity focused on deliverables and measurable results.',
  'More predictable estimates, timelines, and scope management.',
  'Faster response to business changes through tighter coordination.',
  'Greater process adoption and confidence across the organization.',
] as const;

export default function DistributedWorkforceSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Distributed Workforce Solutions"
        description="ETI helps organizations shift from ad hoc remote work to a structured distributed workforce model with clearer accountability, better visibility, and stronger execution discipline."
        backgroundImage="/wp-content/uploads/2020/05/shutterstock-banner_1692360436.jpg"
        compact
      >
        <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_20px_60px_rgba(5,14,32,0.22)] backdrop-blur-sm">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/70">Focus areas</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-white/88">
            <li>Distributed operating model design</li>
            <li>Remote execution visibility</li>
            <li>Workflow and tool standardization</li>
            <li>Training, onboarding, and adoption support</li>
          </ul>
        </div>
      </PageHero>

      <ServicesOverviewSection
        title="Shift to distributed workforce at scale"
        intro="Organizations are rethinking where work happens, how teams collaborate, and what operating model is required to sustain performance outside a traditional office. ETI helps leadership teams move this shift from a temporary response into a durable model that can actually hold up under delivery pressure."
        columns={[
          'Demand for remote enablement has grown because of technology advances, the need for skilled labor, and the cost of office operations. But flexibility without structure leaves leadership with poor visibility and inconsistent execution.',
          'Recent shutdowns and workforce changes made it clear that remote work is no longer just an optional perk. It requires better tools, better management rhythm, and clearer standards for accountability, quality, and collaboration.',
        ]}
      />

      <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <article className="content-card rounded-[2rem] p-6 sm:p-8">
            <span className="eyebrow">Leadership concerns</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
              Common concerns and impediments
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
              These are the questions executives and managers raise most often when work shifts across locations, schedules, and communication channels.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-ink-muted)]">
              {concerns.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-brand-orange)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="content-card rounded-[2rem] p-6 sm:p-8">
            <span className="eyebrow">Operational realities</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
              Where distributed models usually break down
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
              Many organizations discover that their existing practices do not translate well to remote or hybrid execution. ETI helps fix the underlying model, not just the symptoms.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--color-ink-muted)]">
              {impediments.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-brand-orange)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.86fr)]">
          <div className="content-card rounded-[2rem] p-6 sm:p-8">
            <span className="eyebrow">Execution experience</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
              Remote execution has to work in the context of real business initiatives
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
              ETI delivers distributed workforce services in the context of actual projects and enterprise initiatives, not theoretical classroom exercises. We work with leadership across operations, finance, HR, technology, supply chain, and functional teams to keep execution aligned to business priorities.
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--color-ink-muted)]">
              Our approach uses streamlined workflows, centralized business rules, strong check-ins, and practical conflict remediation so teams ramp faster, standardize sooner, and adopt better ways of working that last beyond the immediate project.
            </p>
          </div>

          <div className="content-card overflow-hidden rounded-[2rem]">
            <Image
              src="/wp-content/uploads/2020/07/access-to-work-doubled-since-2011.png"
              alt="Access to work from home benefits has doubled since 2011"
              width={502}
              height={312}
              className="h-full min-h-[320px] w-full object-contain bg-white p-6"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1240px] px-5 lg:px-8">
        <div className="content-card rounded-[2rem] p-6 sm:p-8">
          <span className="eyebrow">DWS framework</span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--color-brand-blue-deep)]">
            Best practices, tools, and techniques organized into one operating framework
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-ink-muted)]">
            ETI&apos;s Distributed Workforce Framework brings together the components needed to make remote and hybrid execution durable. Each element is interdependent, which is why partial adoption usually creates friction instead of improvement.
          </p>

          <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-white">
            <div className="relative h-[220px] sm:h-[260px] lg:h-[300px]">
              <Image
                src="/wp-content/uploads/2020/07/DWS-Framework.png"
                alt="Distributed Workforce Solutions framework"
                fill
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-contain bg-white p-5 sm:p-6"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {framework.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-[var(--color-border)] bg-white/84 p-5">
                <h3 className="font-display text-[1.25rem] font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-ink-muted)]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto my-8 w-full max-w-[1240px] px-5 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#11274d_0%,#1d4e96_42%,#224380_100%)] px-6 py-8 text-white shadow-[0_28px_90px_rgba(17,39,77,0.24)] sm:px-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-[0.55rem] text-xs font-bold uppercase tracking-[0.24em] text-white">
                <span className="block h-px w-7 shrink-0 bg-white" aria-hidden />
                Objective benefits achieved
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                Better visibility, stronger productivity, and a model that holds up
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/78">
                Clients that shift successfully to a distributed workforce typically gain stronger coordination, more predictable delivery, faster response to change, and higher confidence across the organization because progress is visible and the process is repeatable.
              </p>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-white/84 sm:grid-cols-2">
                {benefits.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-brand-orange)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact-us" className="site-button site-button-primary">
                Turn Remote Work Into Results
              </Link>
              <Link href="/services" className="site-button site-button-secondary">
                Back to Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

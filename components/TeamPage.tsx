'use client';

import Image from 'next/image';
import { useState } from 'react';

type Leader = {
  id: string;
  name: string;
  title: string;
  summary: string;
  bio: string;
  focusAreas?: string[];
  impactNotes?: string[];
  image: string;
};

const LEADERS: Leader[] = [
  {
    id: 'inna-berkovich',
    name: 'Inna Berkovich',
    title: 'Co-Founder and Chief Information Officer',
    summary:
      'Transforms technology into enterprise value through scalable platforms, modernization strategy, and leadership across growth, M&A, and complex healthcare initiatives.',
    bio: 'Inna Berkovich is Co-Founder and Chief Information Officer of Emerging Technologies. She helps organizations grow stronger, faster, and more valuable through well-architected, high-impact technology solutions. As a Healthcare CIO/CTO and AI strategist, she has led enterprise-wide transformations that contributed to successful acquisitions, improved company valuation, and long-term scalability. Her work spans platform modernization, intelligent automation, and data-driven decision support, always aligned to strategic business objectives. She works closely with executive leadership and boards to ensure technology investments drive performance, unlock new opportunity, and create measurable enterprise value.',
    impactNotes: [
      'Addus HomeCare: Led technology modernization and acquisition integration through a period of major growth.',
      'AIM Specialty Health: Led technology strategy through expansion and acquisition by WellPoint.',
      'IPG: Led strategy and planning for workflow modernization across multiple acquisitions.',
      'Oak Street Health: Directed a custom outreach platform that supported major clinic growth ahead of a CVS Health acquisition.',
    ],
    focusAreas: ['Enterprise Value Creation', 'Scalable Growth Platforms', 'M&A Technology Leadership'],
    image: '/images/team/inna-berkovich.jpg',
  },
  {
    id: 'paul-berkovich',
    name: 'Paul Berkovich',
    title: 'Co-Founder and President',
    summary:
      'Provides strategic leadership for client engagements and multi-platform solutions, bridging business priorities and technology execution.',
    bio: 'Paul Berkovich is Co-Founder and President of Emerging Technologies. He brings extensive experience in technology consulting, business analysis, project leadership, and implementation of cost-effective business solutions across complex environments.',
    focusAreas: ['Technology Consulting', 'Business Analysis', 'Complex Environment Delivery'],
    image: '/images/team/paul-berkovich.jpg',
  },
  {
    id: 'russ-berkun',
    name: 'Russ Berkun',
    title: 'Senior Partner and Solutions Architect',
    summary:
      'Leads AI and intelligent systems initiatives, translating complex business and technical requirements into practical execution.',
    bio: 'Russ Berkun is Senior Partner and Solutions Architect at Emerging Technologies. He supports IT strategy, operational execution, and solution architecture, with a focus on quality, timeliness, and scalable delivery.',
    focusAreas: ['IT Strategy', 'Solution Architecture', 'Scalable Delivery'],
    image: '/images/team/russ-berkun.jpg',
  },
];

function LeaderPhoto({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[1.125rem] bg-slate-100">
      <Image
        src={src}
        alt={`${name}, portrait`}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 400px"
        className="object-cover object-top"
      />
    </div>
  );
}

function TechBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,255,255,0.95) 0%, transparent 55%),
            radial-gradient(circle at 18% 40%, rgba(33, 79, 152, 0.09) 0%, transparent 42%),
            radial-gradient(circle at 88% 55%, rgba(226, 121, 66, 0.07) 0%, transparent 38%),
            linear-gradient(180deg, #e9f2fa 0%, #dfeaf5 42%, #e4eef7 100%)
          `,
        }}
      />
    </div>
  );
}

function ExpandedBio({ leader }: { leader: Leader }) {
  return (
    <article className="rounded-2xl border border-slate-200/90 bg-white px-6 py-8 shadow-[0_4px_24px_rgba(17,39,77,0.06)] ring-1 ring-slate-900/[0.03] sm:px-10 sm:py-10">
      <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-[var(--color-brand-blue-deep)]">
        {leader.name}
      </h3>
      <p className="mt-2 text-base font-medium leading-snug text-[var(--color-brand-blue)]">{leader.title}</p>
      <p className="mt-6 text-[1.02rem] leading-[1.75] text-[var(--color-ink-muted)]">{leader.bio}</p>

      {leader.impactNotes?.length ? (
        <div className="mt-8 border-t border-slate-100 pt-8">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]">
            Selected enterprise impact
          </p>
          <ul className="mt-4 space-y-3 text-[0.96rem] leading-[1.65] text-[var(--color-ink-muted)]">
            {leader.impactNotes.map((note, idx) => (
              <li key={`${leader.id}-impact-${idx}`} className="flex gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand-orange)]/80" aria-hidden />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {leader.focusAreas?.length ? (
        <ul className="mt-8 flex flex-wrap gap-2">
          {leader.focusAreas.map((area) => (
            <li
              key={`${leader.id}-${area}`}
              className="rounded-full border border-slate-200/90 bg-slate-50/90 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[var(--color-ink-muted)]"
            >
              {area}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function TeamPage() {
  const [activeLeaderId, setActiveLeaderId] = useState<string | null>(null);
  const activeLeader = LEADERS.find((leader) => leader.id === activeLeaderId) ?? null;

  function toggleLeader(id: string) {
    setActiveLeaderId((current) => (current === id ? null : id));
  }

  return (
    <>
      <section className="relative border-b border-[rgba(17,39,77,0.06)]">
        <TechBackdrop />
        <div className="relative mx-auto max-w-[1320px] px-5 pb-18 pt-20 text-center lg:px-10 lg:pb-24 lg:pt-28">
          <h1 className="mx-auto max-w-[40rem] font-display text-[clamp(2rem,4.5vw,3.125rem)] font-semibold leading-[1.12] tracking-[-0.038em] text-[var(--color-brand-blue-deep)]">
            Leadership with deep healthcare and technology experience
          </h1>
          <p className="mx-auto mt-7 max-w-[38rem] text-lg leading-[1.65] text-[var(--color-ink-muted)] sm:text-[1.125rem] sm:leading-[1.7]">
            ETI brings executive leadership, delivery discipline, and practical technology judgment to complex
            initiatives.
          </p>
        </div>
      </section>

      <section className="relative -mt-px bg-[linear-gradient(180deg,#e6eff7_0%,#f2f7fb_38%,#f6f9fc_100%)] px-5 py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">
            {LEADERS.map((leader) => {
              const isActive = activeLeaderId === leader.id;

              return (
                <article
                  id={leader.id}
                  key={leader.id}
                  className={`flex w-full max-w-[420px] flex-col overflow-hidden rounded-[1.125rem] border bg-white ring-1 transition duration-200 sm:max-w-none ${
                    isActive
                      ? 'border-[var(--color-brand-blue)]/30 shadow-[0_16px_48px_rgba(17,39,77,0.12)] ring-[rgba(33,79,152,0.14)]'
                      : 'border-slate-200/85 ring-slate-900/[0.03]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleLeader(leader.id)}
                    aria-expanded={isActive}
                    aria-controls="team-expanded-bio-panel"
                    className="cursor-pointer text-left"
                  >
                    <LeaderPhoto src={leader.image} name={leader.name} />
                    <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7 sm:pb-8 sm:pt-7">
                      <h2 className="font-display text-[1.375rem] font-semibold leading-tight tracking-[-0.03em] text-[var(--color-brand-blue-deep)] sm:text-2xl sm:text-[1.65rem]">
                        {leader.name}
                      </h2>
                      <p className="mt-2 text-[0.9375rem] font-semibold leading-snug text-[var(--color-brand-blue)] sm:text-base">
                        {leader.title}
                      </p>
                      <p className="mt-4 flex-1 text-[0.9375rem] leading-[1.65] text-[var(--color-ink-muted)] sm:text-[1rem] sm:leading-relaxed">
                        {leader.summary}
                      </p>
                    </div>
                  </button>
                  <div className="px-6 pb-7 sm:px-7 sm:pb-8">
                    <button
                      type="button"
                      onClick={() => toggleLeader(leader.id)}
                      aria-expanded={isActive}
                      aria-controls="team-expanded-bio-panel"
                      className="inline-flex cursor-pointer items-center gap-2 text-[0.9375rem] font-semibold text-[var(--color-brand-blue)] underline decoration-slate-300/80 underline-offset-[0.2em]"
                    >
                      {isActive ? 'Hide full bio' : 'View full bio'}
                      <span aria-hidden className="text-[var(--color-brand-orange)]">
                        {isActive ? '↑' : '→'}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <div id="team-expanded-bio-panel" className="mt-10 lg:mt-12">
            {activeLeader ? <ExpandedBio leader={activeLeader} /> : null}
          </div>
        </div>
      </section>
    </>
  );
}

export { TeamPage };
export default TeamPage;

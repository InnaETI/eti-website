import Image from 'next/image';

type Leader = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
};

const INTRO =
  'Our team represents the spirit and vision of the company. We are self-motivated, committed, and dedicated to helping clients grow with clarity and confidence. ETI strives to build a workforce that is team-oriented, talented, well-rounded, and always ready to go the extra mile for our clients.';

const LEADERS: Leader[] = [
  {
    id: 'inna-berkovich',
    name: 'Inna Berkovich',
    title: 'Chief Information Officer',
    image: '/images/team/inna-berkovich.jpg',
    imageAlt: 'Portrait of Inna Berkovich',
    bio: "Inna Berkovich is a Co-Founder and Chief Information Officer of Emerging Technologies, Inc. where she oversees client engagements and provides vision and direction across company initiatives. From 2012 to 2016, Inna also served as Chief Information Officer at Addus HomeCare Corporation and Addus HealthCare Inc., one of the nation's largest providers of personal home care and support services. At Addus, she served as a member of the executive management team, provided strategic leadership for the company's information systems, and directed the execution of technology programs and initiatives. Prior to Addus, Inna served as Senior Vice President and Chief Information Officer at AIM Specialty Health, a division of Anthem, for 13 years. Inna Berkovich received her MBA, with emphasis on Management Information Systems, from DePaul University and her Bachelor of Science degree in Computer Science, Mathematics and Statistics from the University of Illinois.",
  },
  {
    id: 'paul-berkovich',
    name: 'Paul Berkovich',
    title: 'Senior Partner',
    image: '/images/team/paul-berkovich.jpg',
    imageAlt: 'Portrait of Paul Berkovich',
    imageClassName: 'object-[center_18%]',
    bio: 'Paul Berkovich is a Co-Founder and President of Emerging Technologies, Inc. Paul is an accomplished professional consultant bringing more than 20 years of experience innovating, designing, developing, implementing, and directing cost-effective, high-performance technology and business solutions. He is a strong leader with a proven record of achieving cost reductions, improved profitability, and measurable process improvements in information systems and technology. Paul works with both business teams and technical experts to execute business requirements using business analysis and project management discipline across in-house and offshore resources and projects. Paul Berkovich received his MBA, with emphasis on Management Information Systems, from DePaul University and his Bachelor of Science degree in Computer Science, Mathematics and Statistics from the University of Illinois.',
  },
  {
    id: 'russ-berkun',
    name: 'Russ Berkun',
    title: 'Senior Partner',
    image: '/images/team/russ-berkun.jpg',
    imageAlt: 'Portrait of Russ Berkun',
    bio: "Russ Berkun is a Senior Partner and Solutions Architect at Emerging Technologies, Inc. He brings more than 17 years of experience working with major corporations and consulting organizations. A technologist at heart with a deep understanding of lean principles, Russ applies disciplined execution to help ETI deliver software with strong timeliness, cost control, and quality. He helps define and implement IT strategy to support innovation and growth objectives and works directly with clients to share practical methods, tools, and implementation experience. Russ Berkun received his Bachelor of Science degree in Computer Science from DePaul University.",
  },
];

function TeamMemberRow({
  leader,
  muted = false,
  animationDelayMs = 0,
}: {
  leader: Leader;
  muted?: boolean;
  /** Stagger slide-down animation per row */
  animationDelayMs?: number;
}) {
  return (
    <section className={muted ? 'bg-[#f0f4f8]' : 'bg-white'}>
      <div className="mx-auto max-w-[1180px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col items-stretch lg:flex-row lg:items-start">
          <div className="relative z-0 mx-auto w-full max-w-[300px] shrink-0 lg:mx-0 lg:w-[min(100%,320px)] lg:max-w-[320px]">
            <div className="overflow-hidden bg-[#d7e0ea] shadow-[0_6px_24px_rgba(17,39,77,0.1)]">
              <Image
                src={leader.image}
                alt={leader.imageAlt}
                width={640}
                height={800}
                className={`aspect-[4/5] h-auto w-full object-cover grayscale ${leader.imageClassName || 'object-center'}`}
                sizes="(max-width: 1024px) 300px, 320px"
              />
            </div>
          </div>

          <article
            className="team-bio-slide-in relative z-10 mt-8 w-full border border-black/[0.04] bg-white p-8 shadow-[0_10px_36px_rgba(17,39,77,0.1)] sm:p-10 lg:mt-[6.25rem] lg:-ml-3 lg:min-w-0 lg:flex-1 lg:self-stretch"
            style={{ animationDelay: `${animationDelayMs}ms` }}
          >
            <h2 className="font-sans text-[clamp(1.15rem,2.2vw,1.5rem)] font-bold uppercase tracking-[0.06em] text-black">
              {leader.name}
            </h2>
            <p className="mt-2 font-sans text-sm font-medium text-[#c9a227] sm:text-base">{leader.title}</p>
            <p className="mt-6 max-w-[68ch] text-[0.95rem] leading-[1.75] text-[#333333]">{leader.bio}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[rgba(17,39,77,0.08)] bg-[var(--color-brand-blue-deep)]">
        <div className="absolute inset-0">
          <Image
            src="/wp-content/uploads/2020/05/shutterstock-banner_1692360436.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,20,38,0.72)_0%,rgba(10,20,38,0.42)_42%,rgba(10,20,38,0.58)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-[1160px] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-[44rem]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/72">Leadership and Team</p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[0.97] tracking-[-0.05em] text-white">
              Experienced leadership with practical execution discipline.
            </h1>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(17,39,77,0.08)] bg-white">
        <div className="mx-auto max-w-[1160px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="max-w-[58rem]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-blue)]">
              Leadership and Team
            </p>
            <p className="mt-5 text-[1rem] leading-8 text-[var(--color-ink-muted)]">{INTRO}</p>
          </div>
        </div>
      </section>

      <TeamMemberRow leader={LEADERS[0]} muted animationDelayMs={0} />
      <TeamMemberRow leader={LEADERS[1]} animationDelayMs={90} />
      <TeamMemberRow leader={LEADERS[2]} muted animationDelayMs={180} />
    </>
  );
}

export { TeamPage };
export default TeamPage;

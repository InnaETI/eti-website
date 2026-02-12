export function HeroOverlayClassic({
  label,
  text,
  href,
}: {
  label: string;
  text: string;
  href: string;
}) {
  return (
    <div className="absolute left-12 top-1/2 z-20 w-[520px] max-w-[calc(100%-96px)] -translate-y-1/2 sm:left-5 sm:max-w-[calc(100%-40px)]">
      <div className="inline-block -translate-x-5 rounded-[2px] bg-[#f57c2a] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
        {label}
      </div>

      <div className="mt-3 rounded-[2px] bg-[rgba(14,44,90,0.85)] px-7 py-6 text-white sm:px-5 sm:py-5">
        <p className="text-sm leading-6">{text}</p>
      </div>

      <a
        href={href}
        className="mt-4 inline-block rounded-[2px] bg-[#111] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[#ff6b35]"
      >
        Read more
      </a>
    </div>
  );
}

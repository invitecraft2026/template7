import cornerImg from "@/assets/corner.png";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="gold-rule w-16 sm:w-24" />
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="text-gold">
        <path
          d="M12 2c1.6 4 4.4 6.8 8.4 8.4-4 1.6-6.8 4.4-8.4 8.4-1.6-4-4.4-6.8-8.4-8.4C7.6 8.8 10.4 6 12 2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        />
      </svg>
      <span className="gold-rule w-16 sm:w-24" />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  script,
}: {
  eyebrow?: string;
  title: string;
  script?: boolean;
}) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p className="tracking-luxe text-[0.62rem] uppercase text-gold sm:text-[0.7rem]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={
          script
            ? "font-script mt-3 text-4xl leading-tight text-gold-gradient sm:text-5xl"
            : "mt-3 text-2xl font-light tracking-[0.14em] uppercase text-deep sm:text-3xl"
        }
      >
        {title}
      </h2>
      <Divider className="mt-4" />
    </div>
  );
}

export function CornerFrame() {
  return (
    <>
      <img
        src={cornerImg}
        alt=""
        aria-hidden
        loading="lazy"
        width={768}
        height={768}
        className="pointer-events-none absolute -left-6 -top-6 w-28 opacity-55 sm:w-40"
      />
      <img
        src={cornerImg}
        alt=""
        aria-hidden
        loading="lazy"
        width={768}
        height={768}
        className="pointer-events-none absolute -right-6 -bottom-6 w-28 rotate-180 opacity-55 sm:w-40"
      />
    </>
  );
}

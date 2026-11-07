import type { CSSProperties } from "react";

import { wedding } from "@/config/wedding";

// 👉 TEMPORARILY DISABLED: swan illustration (see the commented block below)
// import swanIllustration from "@/assets/swan-illustration.png";

// 👉 Save your two flower images here (or change these paths)
import flowersLeft from "@/assets/flowers-left.png";
import flowersRight from "@/assets/flowers-right.png";

import { Reveal } from "./Reveal";

// Soft fade on the top and bottom edges of each flower image.
// Increase 18% for a longer, softer fade.
const fadeEnds: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
};

export function InvitationMessage() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f2ebe1] px-[13%] py-16">
      {/* Left flowers: FULL image, vertically centered.
          Width 40% gives it the same height as the right image (25%),
          because the left image is shorter and wider than the right one. */}
      <img
        src={flowersLeft}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={fadeEnds}
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-auto w-[40%] max-w-none -translate-y-1/2 select-none"
      />

      {/* Right flowers: FULL image, vertically centered (same position as
          the left, so the two sides mirror each other). */}
      <img
        src={flowersRight}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={fadeEnds}
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-auto w-[25%] max-w-none -translate-y-1/2 select-none"
      />

      {/* Text layer: z-10 keeps ALL text above the flowers.
          The cream glow keeps words readable where they overlap a flower. */}
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center text-center [text-shadow:0_0_6px_#f2ebe1,0_0_14px_#f2ebe1]">
        {/* Swan illustration: TEMPORARILY HIDDEN so the full flower images
            can be checked. To bring it back, uncomment this block AND the
            import at the top.

            NOTE: when you restore it, remove "z-10" from this wrapper div
            and the text-shadow class, otherwise the swan's white box comes
            back (z-index breaks mix-blend-multiply).

        <Reveal>
          <img
            src={swanIllustration}
            alt=""
            draggable={false}
            className="mx-auto w-40 select-none mix-blend-multiply"
          />
        </Reveal>
        */}

        {/* Heading */}
        <Reveal delay={0.08}>
          <h3 className="mx-auto max-w-[10em] text-[1.75rem] leading-[1.1] text-[#4d1f29]">
            {wedding.welcomeLine}
          </h3>
        </Reveal>

        {/* Names only (no parents) */}
        <Reveal delay={0.14}>
          <p className="font-script mt-6 flex flex-wrap items-baseline justify-center gap-x-3 text-[2rem] leading-tight text-[#4d1f29]">
            <span>{wedding.bride.firstName}</span>
            <span className="text-xl text-[#a7833d]">&amp;</span>
            <span>{wedding.groom.firstName}</span>
          </p>
        </Reveal>

        {/* Invitation message */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-sm text-[0.9rem] leading-[1.75] text-[#513640]">
            {wedding.invitationMessage}
          </p>
        </Reveal>

        {/* Quote (delete this block if you want it even simpler) */}
        <Reveal delay={0.26}>
          <p className="font-script mx-auto mt-6 max-w-sm text-lg italic leading-relaxed text-[#702b3b]">
            {wedding.quote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
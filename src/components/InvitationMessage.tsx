import { wedding } from "@/config/wedding";

// 👉 Save the swan line illustration here (or change this path)
import swanIllustration from "@/assets/swan-illustration.png";

import { Reveal } from "./Reveal";

export function InvitationMessage() {
  return (
    <section className="bg-[#f2ebe1] px-6 py-14 sm:py-24">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* Swan illustration.
            mix-blend-multiply makes the image's light background disappear
            into the page color, so only the burgundy lines show. */}
        <Reveal>
          <img
            src={swanIllustration}
            alt=""
            draggable={false}
            className="mx-auto w-44 select-none mix-blend-multiply sm:w-56"
          />
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.08}>
          <h3 className="mx-auto mt-6 max-w-[10em] text-3xl leading-[1.1] text-[#4d1f29] sm:text-4xl">
            {wedding.welcomeLine}
          </h3>
        </Reveal>

        {/* Names only (no parents) */}
        <Reveal delay={0.14}>
          <p className="font-script mt-6 flex flex-wrap items-baseline justify-center gap-x-3 text-4xl leading-tight text-[#4d1f29] sm:text-5xl">
            <span>{wedding.bride.firstName}</span>
            <span className="text-2xl text-[#a7833d] sm:text-3xl">&amp;</span>
            <span>{wedding.groom.firstName}</span>
          </p>
        </Reveal>

        {/* Invitation message */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-sm text-[0.95rem] leading-[1.8] text-[#513640] sm:text-base">
            {wedding.invitationMessage}
          </p>
        </Reveal>

        {/* Quote (delete this block if you want it even simpler) */}
        <Reveal delay={0.26}>
          <p className="font-script mx-auto mt-6 max-w-sm text-xl italic leading-relaxed text-[#702b3b] sm:text-2xl">
            {wedding.quote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
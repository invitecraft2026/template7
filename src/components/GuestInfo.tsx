import { wedding } from "@/config/wedding";

import { SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";

export function GuestInfo() {
  return (
    <section
      className="relative bg-transparent px-6 py-20"
      style={{
        background: "transparent",
        backgroundColor: "transparent",
        backgroundImage: "none",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
      }}
    >
      <div className="relative mx-auto max-w-md">
        <Reveal>
          <SectionHeading
            eyebrow="Good to know"
            title="For Our Wonderful Guests"
            script
          />
        </Reveal>

        <div className="mt-10 space-y-4">
          {wedding.guestInformation.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article
                className="
                  rounded-xl
                  border
                  border-white/25
                  bg-[#5f2432]/25
                  px-5
                  py-5
                  shadow-[0_8px_25px_rgba(30,8,15,0.18)]
                "
              >
                <h3
                  className="
                    text-[0.65rem]
                    uppercase
                    tracking-[0.24em]
                    text-champagne
                    drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-[#fff3e6]/90
                    drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]
                  "
                >
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
import { wedding, type WeddingEvent } from "@/config/wedding";

import archIllustration from "@/assets/Welcome Drinks.png";
import mehndiIllustration from "@/assets/Wedding Ceremony.png";
import ringsIllustration from "@/assets/Reception.png";
import dinnerIllustration from "@/assets/Farewell Brunch.png";

import { SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";

const illustrationByIcon: Record<WeddingEvent["icon"], string> = {
  crescent: archIllustration,
  rings: ringsIllustration,
  lantern: mehndiIllustration,
  dinner: dinnerIllustration,
};

export function EventTimeline() {
  return (
    <section className="relative bg-[#f2ebe1] px-6 py-20">
      <div className="relative mx-auto max-w-md">
        <Reveal>
          <SectionHeading
            eyebrow="The celebrations"
            title="Wedding Timeline"
            script
          />
        </Reveal>

        <div className="relative mt-14">
          {/* Center vertical line - antique gold */}
          <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#b8934a] to-transparent" />

          <div className="flex flex-col gap-14">
            {wedding.events.map((event, i) => {
              const imageLeft = i % 2 === 0;

              return (
                <Reveal key={event.id} delay={i * 0.08}>
                  <div className="relative grid grid-cols-2 items-center gap-4">
                    {/* Center diamond marker */}
                    <span
                      className="
                        absolute
                        top-1/2
                        left-1/2
                        h-2.5
                        w-2.5
                        -translate-x-1/2
                        -translate-y-1/2
                        rotate-45
                        border
                        border-[#b8934a]
                        bg-[#4d1f29]
                        shadow-[0_0_8px_rgba(184,147,74,0.5)]
                      "
                    />

                    {imageLeft ? (
                      <>
                        {/* Illustration */}
                        <div className="flex justify-end pr-3">
                          <img
                            src={illustrationByIcon[event.icon]}
                            alt=""
                            className="
                              h-24
                              w-24
                              object-contain
                              drop-shadow-[0_4px_10px_rgba(77,31,41,0.25)]
                              sm:h-28
                              sm:w-28
                            "
                          />
                        </div>

                        {/* Event info */}
                        <div className="pl-3 text-left">
                          <p className="font-script text-2xl text-[#4d1f29] drop-shadow-[0_0_8px_rgba(242,235,225,0.9)] sm:text-3xl">
                            {event.time}
                          </p>

                          <h3 className="mt-1 text-sm font-bold uppercase leading-snug tracking-[0.1em] text-[#3f4a2c] drop-shadow-[0_0_8px_rgba(242,235,225,0.9)] sm:text-base">
                            {event.title}
                          </h3>

                          <p className="mt-1 text-sm font-medium leading-snug text-[#4a5535] drop-shadow-[0_0_8px_rgba(242,235,225,0.9)]">
                            {event.venue}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Event info */}
                        <div className="pr-3 text-right">
                          <p className="font-script text-2xl text-[#4d1f29] drop-shadow-[0_0_8px_rgba(242,235,225,0.9)] sm:text-3xl">
                            {event.time}
                          </p>

                          <h3 className="mt-1 text-sm font-bold uppercase leading-snug tracking-[0.1em] text-[#3f4a2c] drop-shadow-[0_0_8px_rgba(242,235,225,0.9)] sm:text-base">
                            {event.title}
                          </h3>

                          <p className="mt-1 text-sm font-medium leading-snug text-[#4a5535] drop-shadow-[0_0_8px_rgba(242,235,225,0.9)]">
                            {event.venue}
                          </p>
                        </div>

                        {/* Illustration */}
                        <div className="flex justify-start pl-3">
                          <img
                            src={illustrationByIcon[event.icon]}
                            alt=""
                            className="
                              h-24
                              w-24
                              object-contain
                              drop-shadow-[0_4px_10px_rgba(77,31,41,0.25)]
                              sm:h-28
                              sm:w-28
                            "
                          />
                        </div>
                      </>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
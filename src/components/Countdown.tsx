import { wedding } from "@/config/wedding";
import { useCountdown } from "@/hooks/useCountdown";
import countdownBg from "@/assets/countdown-bg-vertical.jpg";

import { Reveal } from "./Reveal";

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown() {
  const c = useCountdown(wedding.dateISO);

  const units = c
    ? [
        { label: "Days", value: c.days.toString() },
        { label: "Hours", value: pad(c.hours) },
        { label: "Minutes", value: pad(c.minutes) },
        { label: "Seconds", value: pad(c.seconds) },
      ]
    : [
        { label: "Days", value: "--" },
        { label: "Hours", value: "--" },
        { label: "Minutes", value: "--" },
        { label: "Seconds", value: "--" },
      ];

  return (
    <section className="bg-[#f2ebe1] px-0 py-6 sm:px-6 sm:py-16">
      {/* 4:3 on mobile (crops the sides evenly, ribbon frame stays visible),
          16:9 on larger screens (the full image) */}
      <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] sm:max-w-3xl">
        {/* Background image */}
        <img
          src={countdownBg}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover object-center"
        />

        {/* Content, centered inside the ribbon frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[70%] text-center sm:w-[52%]">
            <Reveal>
              <p className="text-[0.5rem] uppercase tracking-[0.3em] text-[#a7833d] sm:text-[0.65rem]">
                Counting the moments
              </p>
              <h3 className="font-script mt-1 text-xl leading-tight text-[#4d1f29] sm:mt-2 sm:text-4xl">
                The Celebration Begins In
              </h3>
            </Reveal>

            <Reveal delay={0.1}>
              {c?.isPast ? (
                <p className="font-script mt-4 text-3xl text-[#4d1f29] sm:mt-6 sm:text-5xl">
                  Today Is The Day ♡
                </p>
              ) : (
                <div className="mt-3 grid grid-cols-4 sm:mt-6">
                  {units.map((u, i) => (
                    <div
                      key={u.label}
                      className={`px-1 text-center ${
                        i > 0 ? "border-l border-[#b8934a]/40" : ""
                      }`}
                    >
                      <p className="tabular text-2xl font-light leading-none text-[#4d1f29] sm:text-4xl">
                        {u.value}
                      </p>
                      <p className="mt-1.5 text-[0.45rem] uppercase tracking-[0.18em] text-[#a7833d] sm:mt-2 sm:text-[0.62rem]">
                        {u.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
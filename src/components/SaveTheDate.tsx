import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import countdownBg from "@/assets/countdown-bg-vertical.png";

import { Reveal } from "./Reveal";

function getTimeLeft(targetDate: string) {
  const target = new Date(targetDate).getTime();

  if (Number.isNaN(target)) {
    console.error("Invalid wedding date:", targetDate);

    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const now = Date.now();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

/** Vertical position of the text block on the image (50 = exact center).
 *  Lower it to move the text up, raise it to move the text down. */
const CONTENT_Y = 50;

/** Top and bottom edges of the image melt into the page color (in %) */
const EDGE_FADE = 5;
const edgeFade = `linear-gradient(to bottom, transparent 0%, #000 ${EDGE_FADE}%, #000 ${
  100 - EDGE_FADE
}%, transparent 100%)`;

const numberClass =
  "tabular font-light leading-none text-[#4d1f29]";

const labelClass =
  "font-medium uppercase text-[#a7833d]";

export function SaveTheDate() {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(wedding.dateISO)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(wedding.dateISO));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f2ebe1] px-0 py-0 sm:px-6 sm:py-16">
      {/* Full width on mobile (edge to edge), a smaller centered card on
          bigger screens. Text sizes use cqw (1cqw = 1% of this box's width),
          so everything scales with the image. */}
      <div
        className="relative mx-auto w-full sm:max-w-[24rem]"
        style={{ containerType: "inline-size" }}
      >
        {/* Background image */}
        <img
          src={countdownBg}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none block h-auto w-full select-none"
          style={{
            WebkitMaskImage: edgeFade,
            maskImage: edgeFade,
          }}
        />

        {/* Content, centered inside the ribbon frame */}
        <div
          className="absolute left-1/2 text-center"
          style={{
            top: `${CONTENT_Y}%`,
            width: "54cqw",
            translate: "-50% -50%",
          }}
        >
          {/* Title: small line on top, big script word below */}
          <Reveal>
            <p
              className="font-medium uppercase text-[#a7833d]"
              style={{
                fontSize: "max(6px, 2.4cqw)",
                letterSpacing: "0.28em",
              }}
            >
              The Celebration
            </p>

            <h3
              className="font-script leading-none text-[#4d1f29]"
              style={{ fontSize: "11cqw", marginTop: "1.2cqw" }}
            >
              Begins
            </h3>

            {/* Small gold divider */}
            <div
              className="mx-auto flex items-center justify-center"
              style={{ gap: "1.6cqw", marginTop: "2.4cqw" }}
            >
              <span
                className="bg-[#b8934a]/60"
                style={{ width: "8cqw", height: "1px" }}
              />
              <span
                className="rotate-45 bg-[#b8934a]"
                style={{ width: "1.2cqw", height: "1.2cqw" }}
              />
              <span
                className="bg-[#b8934a]/60"
                style={{ width: "8cqw", height: "1px" }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="grid grid-cols-4"
              style={{ marginTop: "3.4cqw" }}
            >
              {units.map((u, i) => (
                <div
                  key={u.label}
                  className={i > 0 ? "border-l border-[#b8934a]/40" : ""}
                >
                  <p className={numberClass} style={{ fontSize: "6.2cqw" }}>
                    {u.value}
                  </p>
                  <p
                    className={labelClass}
                    style={{
                      fontSize: "max(5px, 1.7cqw)",
                      letterSpacing: "0.1em",
                      marginTop: "1.4cqw",
                    }}
                  >
                    {u.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Time line */}
            <p
              className="font-medium italic text-[#702b3b]"
              style={{ fontSize: "max(8px, 2.8cqw)", marginTop: "3.4cqw" }}
            >
              {wedding.time}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
import venueImg from "@/assets/venue-illustration.png";
import { wedding } from "@/config/wedding";
import { mapsDirectionsUrl } from "@/utils/calendar";

import { SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";

export function VenueSection() {
  return (
    <section className="relative bg-[#f2ebe1] px-6 py-20">
      <div className="relative mx-auto max-w-md">
        <Reveal>
          <SectionHeading
            eyebrow="Where we celebrate"
            title="The Venue"
            script
          />
        </Reveal>

        <Reveal delay={0.1}>
          {/* Watercolor illustration - no frame, blends into the page */}
          <div className="mt-8 flex justify-center">
            <img
              src={venueImg}
              alt="Watercolor illustration of the wedding venue"
              loading="lazy"
              width={1200}
              height={1044}
              className="h-auto w-full max-w-[17rem] mix-blend-multiply sm:max-w-[20rem]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-6 text-center">
            {/* Venue name - deep burgundy */}
            <h3 className="text-lg font-semibold uppercase tracking-[0.2em] text-[#4d1f29]">
              {wedding.venue.name}
            </h3>

            {/* Address - dark olive */}
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#3f4a2c]">
              {wedding.venue.address}
            </p>

            {/* Button - solid burgundy, ivory text, gold border */}
            <a
              href={mapsDirectionsUrl(wedding.venue.mapsQuery)}
              target="_blank"
              rel="noreferrer"
              className="
                mt-6
                inline-block
                rounded-md
                border
                border-[#b8934a]
                bg-[#4d1f29]
                px-6
                py-3
                text-[0.62rem]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#fbf5e6]
                shadow-[0_6px_20px_rgba(77,31,41,0.30)]
                transition-all
                duration-300
                hover:bg-[#3a1620]
              "
            >
              Get Directions
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
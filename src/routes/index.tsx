import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { DressCode } from "@/components/DressCode";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { EventTimeline } from "@/components/EventTimeline";
import { Footer } from "@/components/Footer";
import { GlobalVideoBackground } from "@/components/GlobalVideoBackground";
import { GuestInfo } from "@/components/GuestInfo";
import { HeroSection } from "@/components/HeroSection";
import { InvitationMessage } from "@/components/InvitationMessage";
import { MusicControl } from "@/components/MusicControl";
import { SaveTheDate } from "@/components/SaveTheDate";
import { ScratchReveal } from "@/components/ScratchReveal";
import { VenueSection } from "@/components/VenueSection";
import { wedding } from "@/config/wedding";
// import { Countdown } from "@/components/Countdown";

const title = `${wedding.bride.firstName} & ${wedding.groom.firstName} — Wedding Invitation`;

const description = `Join us to celebrate the ${wedding.welcomeTitle} of ${wedding.bride.firstName} and ${wedding.groom.firstName} on ${wedding.date}. Open the envelope for details, timings, venue and RSVP.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },

      {
        name: "description",
        content: description,
      },

      {
        property: "og:title",
        content: title,
      },

      {
        property: "og:description",
        content: description,
      },

      {
        property: "og:type",
        content: "website",
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* =====================================================
          GLOBAL VIDEO

          Completely outside the scrolling page.
          Never scrolls with Hero or other sections.
          ===================================================== */}

      <GlobalVideoBackground />

      {/* =====================================================
          WEBSITE
          ===================================================== */}

      <main
        className="
          relative
          z-10
          min-h-screen
          overflow-x-clip
          bg-transparent
        "
      >
        {/* Envelope intro */}

        {!introDone && (
          <EnvelopeIntro
            onComplete={() => {
              setIntroDone(true);
            }}
          />
        )}

        {/* Main invitation */}

        <div
          className={`
            relative
            bg-transparent
            transition-opacity
            duration-700

            ${
              introDone
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        >
          <HeroSection start={introDone} />

          <InvitationMessage />

          <ScratchReveal />

          

          <EventTimeline />

          <SaveTheDate />
          {/* <Countdown/> */}

          <VenueSection />

          <DressCode />

          {/* <GuestInfo /> */}

          <Footer />
        </div>

        {introDone && <MusicControl />}
      </main>
    </>
  );
}
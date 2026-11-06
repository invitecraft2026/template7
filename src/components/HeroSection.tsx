import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";

// 👉 Replace src/assets/hero-section-image.jpg with the new image
//    (the sage lace one with the oval and the ivory strip at the bottom)
import floralBackground from "@/assets/hero-section-image.jpg";

/**
 * IMAGE GEOMETRY (measured on the 1438 x 2576 image)
 * The text is placed in % of the image and sized in cqw (1cqw = 1% of the
 * image width), so it always stays inside the white oval on every screen.
 * If you ever swap the image, only change the numbers below.
 */
const IMG_W = 1438;
const IMG_H = 2576;

const OVAL_CX = 722; // horizontal center of the oval
const OVAL_CY = 1065; // vertical center of the oval
const STRIP_START = 2194; // where the flat ivory strip at the bottom begins

/** Website background color: the bottom of the image fades into this */
const PAGE_BG = "#f2ebe1";

/**
 * BOTTOM FADE (in % of the image height)
 * The image is fully visible down to FADE_START, then melts into the page
 * background and is completely gone at FADE_END. The oval (it ends at about
 * 71%) is never touched. Only the bottom of the image fades.
 */
const FADE_START = 74;
const FADE_END = 92;

const bottomFade = `linear-gradient(to bottom, #000 0%, #000 ${FADE_START}%, transparent ${FADE_END}%)`;

export function HeroSection({ start }: { start: boolean }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: PAGE_BG }}
    >
      {/* Image + everything on it share one box, so positions stay exact */}
      <div
        className="relative mx-auto w-full max-w-[560px]"
        style={{ containerType: "inline-size" }}
      >
        {/* Background image: full clarity, only the bottom edge fades out */}
        <img
          src={floralBackground}
          alt=""
          draggable={false}
          className="pointer-events-none block h-auto w-full select-none"
          style={{
            WebkitMaskImage: bottomFade,
            maskImage: bottomFade,
          }}
        />

        {/* Title block: centered inside the oval */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: start ? 1 : 0,
            y: start ? 0 : 16,
          }}
          transition={{
            duration: 0.9,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute flex flex-col items-center text-center"
          style={{
            left: `${(OVAL_CX / IMG_W) * 100}%`,
            top: `${(OVAL_CY / IMG_H) * 100}%`,
            width: "56cqw",
            translate: "-50% -50%",
          }}
        >
          <p
            className="font-medium uppercase tracking-luxe text-[#7a5a14]"
            style={{ fontSize: "max(8px, 2.3cqw)" }}
          >
            {wedding.welcomeLine}
          </p>

          <h1
            className="font-script whitespace-nowrap leading-[1.05] text-[#4d1f29]"
            style={{ fontSize: "7.4cqw", marginTop: "1.8cqw" }}
          >
            {wedding.welcomeTitle}
          </h1>

          <p
            className="font-medium italic tracking-wide text-[#3f4a2c]"
            style={{ fontSize: "max(9px, 2.8cqw)", marginTop: "1cqw" }}
          >
            {wedding.welcomeJoin}
          </p>

          <div
            className="flex flex-col items-center"
            style={{ marginTop: "2.4cqw" }}
          >
            {/* Bride */}
            <h2
              className="font-script leading-none text-[#4d1f29]"
              style={{ fontSize: "10.5cqw" }}
            >
              {wedding.bride.firstName}
            </h2>

            <p
              className="text-balance mx-auto font-medium italic leading-snug text-[#3f4a2c]"
              style={{
                fontSize: "max(8px, 2.3cqw)",
                marginTop: "1.6cqw",
                maxWidth: "40cqw",
              }}
            >
              {wedding.bride.parents}
            </p>

            <span
              className="font-script text-[#8a6a1c]"
              style={{ fontSize: "5.2cqw", margin: "1.6cqw 0 0.6cqw" }}
            >
              &amp;
            </span>

            {/* Groom */}
            <h2
              className="font-script leading-none text-[#4d1f29]"
              style={{ fontSize: "10.5cqw" }}
            >
              {wedding.groom.firstName}
            </h2>

            <p
              className="text-balance mx-auto font-medium italic leading-snug text-[#3f4a2c]"
              style={{
                fontSize: "max(8px, 2.3cqw)",
                marginTop: "1.6cqw",
                maxWidth: "40cqw",
              }}
            >
              {wedding.groom.parents}
            </p>
          </div>
        </motion.div>

        {/* Scroll hint: sits in the faded area at the bottom of the image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: start ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute inset-x-0 flex flex-col items-center"
          style={{
            top: `${((STRIP_START + 90) / IMG_H) * 100}%`,
          }}
        >
          <p
            className="font-medium uppercase tracking-[0.28em] text-[#3f4a2c]"
            style={{ fontSize: "max(8px, 2cqw)" }}
          >
            Scroll to discover
          </p>

          <motion.svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="text-[#7a5a14]"
            style={{
              width: "max(14px, 4cqw)",
              height: "max(14px, 4cqw)",
              marginTop: "1cqw",
            }}
            animate={start ? { y: [0, 6, 0] } : { y: 0 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
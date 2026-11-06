import { wedding } from "@/config/wedding";

import { Divider } from "./Ornament";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="relative bg-[#f2ebe1] px-6 pt-16 pb-14 text-center">
      <Reveal>
        <Divider />

        {/* Sign-off - antique gold */}
        <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-[#7a5a14]">
          {wedding.footer.signOff}
        </p>

        {/* Initials - deep burgundy */}
        <p className="font-script mt-3 text-4xl text-[#4d1f29] sm:text-5xl">
          {wedding.initials}
        </p>

        {/* Thanks - dark olive */}
        <p className="mt-4 text-sm font-medium text-[#3f4a2c]">
          {wedding.footer.thanks}
        </p>

        {/* Date - muted olive */}
        <p className="mt-8 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[#556040]">
          {wedding.date}
        </p>
      </Reveal>
    </footer>
  );
}
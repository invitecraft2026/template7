import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { wedding } from "@/config/wedding";

import { SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";

// 👉 Your transparent frame image (use frame_transparent.png, 2752 x 1442)
import scratchBackground from "@/assets/frame_scratch.png";

/**
 * IMAGE GEOMETRY (in image pixels)
 * Measured from the 2752 x 1442 transparent frame. The circles are placed
 * with percentages of these numbers, so they stay inside the frame opening
 * at every screen size. If you ever swap the image for one with a different
 * size or opening, only change the numbers below.
 */
const IMG_W = 2752;
const IMG_H = 1442;

const CIRCLE_CY = 729; // vertical center of all 3 circles
const CIRCLE_R = 220; // radius of the scratch circle
const CIRCLE_CX = [854, 1376, 1898]; // horizontal centers: left, middle, right

/** Width of the gold rim around each circle (image pixels) */
const RIM_PX = 26;
const RIM = (RIM_PX / IMG_W) * 100; // as % of container width (cqw)

/** Website background color: used here so this section never shows white */
const PAGE_BG = "#f2ebe1";

/** Paper color shown under the scratch coating (soft cream, not white) */
const PAPER = "#fbf6ea";

/** Share of the circle that must be scratched before it auto-reveals */
const THRESHOLD = 0.5;

function ScratchBox({
  label,
  value,
  cx,
}: {
  label: string;
  value: string;
  cx: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const drawing = useRef(false);
  const lastWidth = useRef(0);

  const last = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const [revealed, setRevealed] = useState(false);

  /** Champagne-gold foil with a blush glow, matching the gold frame */
  const paintCoating = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const w = canvas.width;
      const h = canvas.height;

      ctx.save();
      ctx.globalCompositeOperation = "source-over";

      // Paint only inside the circle
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
      ctx.clip();

      // Base gold foil gradient
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "#d6b565");
      base.addColorStop(0.35, "#f3e4b4");
      base.addColorStop(0.65, "#e2c27a");
      base.addColorStop(1, "#b98d42");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // Soft blush tint, echoing the pink flowers of the frame
      const blush = ctx.createRadialGradient(
        w * 0.72,
        h * 0.78,
        0,
        w * 0.72,
        h * 0.78,
        w * 0.55
      );
      blush.addColorStop(0, "rgba(236,170,170,0.28)");
      blush.addColorStop(1, "rgba(236,170,170,0)");
      ctx.fillStyle = blush;
      ctx.fillRect(0, 0, w, h);

      // Fine concentric rings (like a polished gold disc)
      ctx.strokeStyle = "rgba(255,248,220,0.28)";
      ctx.lineWidth = Math.max(1, w * 0.004);

      for (let r = w * 0.04; r < w / 2; r += w * 0.025) {
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Small leaf sprig in the center, like the frame's emblem
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.strokeStyle = "rgba(140,100,30,0.35)";
      ctx.fillStyle = "rgba(140,100,30,0.22)";
      ctx.lineWidth = Math.max(1.5, w * 0.008);
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(0, w * 0.18);
      ctx.lineTo(0, -w * 0.12);
      ctx.stroke();

      const leaf = (y: number, side: number, s: number) => {
        ctx.save();
        ctx.translate(0, y);
        ctx.rotate(side * 0.7);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(w * 0.09 * s, -w * 0.05 * s, 0, -w * 0.13 * s);
        ctx.quadraticCurveTo(-w * 0.09 * s, -w * 0.05 * s, 0, 0);
        ctx.fill();
        ctx.restore();
      };

      leaf(w * 0.1, 1, 0.9);
      leaf(w * 0.1, -1, 0.9);
      leaf(w * 0.02, 1, 1);
      leaf(w * 0.02, -1, 1);
      leaf(-w * 0.06, 1, 0.8);
      leaf(-w * 0.06, -1, 0.8);
      leaf(-w * 0.12, 0, 0.7);
      ctx.restore();

      // Glitter (warm gold and white sparkles)
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const s = (Math.random() * 1.4 + 0.5) * (w / 180);

        ctx.fillStyle =
          Math.random() > 0.5
            ? `rgba(255,250,235,${0.3 + Math.random() * 0.5})`
            : `rgba(255,225,150,${0.3 + Math.random() * 0.4})`;
        ctx.fillRect(x, y, s, s);
      }

      // Soft light highlight
      const light = ctx.createRadialGradient(
        w * 0.3,
        h * 0.3,
        0,
        w * 0.3,
        h * 0.3,
        w * 0.65
      );
      light.addColorStop(0, "rgba(255,255,255,0.45)");
      light.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = light;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;

    if (!canvas || !wrap) return;

    const setupCanvas = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      const rect = wrap.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      // Only repaint when the width really changed,
      // so a half-scratched circle is not reset by tiny layout shifts
      if (Math.abs(rect.width - lastWidth.current) < 1) return;
      lastWidth.current = rect.width;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      paintCoating(canvas);
    };

    setupCanvas();

    const observer = new ResizeObserver(setupCanvas);
    observer.observe(wrap);

    return () => observer.disconnect();
  }, [paintCoating]);

  /** Share of the circle (not the square) that is already scratched */
  const scratchedRatio = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return 0;

    const w = canvas.width;
    const h = canvas.height;

    const data = ctx.getImageData(0, 0, w, h).data;

    const step = Math.max(2, Math.round(w / 60));
    const r = w / 2;

    let clear = 0;
    let total = 0;

    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const dx = x - w / 2;
        const dy = y - h / 2;

        if (dx * dx + dy * dy > r * r) continue;

        total++;

        if (data[(y * w + x) * 4 + 3] < 16) {
          clear++;
        }
      }
    }

    return total === 0 ? 0 : clear / total;
  };

  const erase = (
    e: React.PointerEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;

    const x = (e.clientX - rect.left) * scale;
    const y = (e.clientY - rect.top) * scale;

    // Brush size follows the circle size, so it feels the same on any screen
    const radius = canvas.width * 0.13;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = radius * 2;

    if (last.current) {
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    last.current = { x, y };
  };

  const onDown = (
    e: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (revealed) return;

    drawing.current = true;
    last.current = null;

    e.currentTarget.setPointerCapture(e.pointerId);

    erase(e);
  };

  const onMove = (
    e: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!drawing.current || revealed) return;

    erase(e);
  };

  const onUp = () => {
    if (!drawing.current) return;

    drawing.current = false;
    last.current = null;

    if (!revealed && scratchedRatio() >= THRESHOLD) {
      setRevealed(true);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="absolute select-none rounded-full"
      style={{
        left: `${(cx / IMG_W) * 100}%`,
        top: `${(CIRCLE_CY / IMG_H) * 100}%`,
        width: `${((CIRCLE_R * 2) / IMG_W) * 100}%`,
        aspectRatio: "1 / 1",
        transform: "translate(-50%, -50%)",
        backgroundColor: PAPER,
        // Gold rim: light inner band, darker outer band, soft drop shadow
        boxShadow: `0 0 0 ${RIM * 0.55}cqw #efdca0, 0 0 0 ${RIM}cqw #c49a4a, 0 ${
          RIM * 0.6
        }cqw ${RIM * 1.6}cqw rgba(110,80,20,0.3)`,
      }}
    >
      {/* Revealed value, sits on soft cream paper */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-full text-center"
        style={{ backgroundColor: PAPER }}
      >
        <p
          className="font-semibold uppercase tracking-[0.2em] text-[#8a6a1c]"
          style={{ fontSize: "max(7px, 1.25cqw)" }}
        >
          {label}
        </p>

        <p
          className="font-script leading-none text-[#4d1f29]"
          style={{
            fontSize:
              value.length > 3
                ? "max(15px, 3.6cqw)"
                : "max(18px, 4.5cqw)",
            marginTop: "0.5cqw",
          }}
        >
          {value}
        </p>
      </div>

      {/* Scratch coating */}
      <motion.canvas
        ref={canvasRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onPointerCancel={onUp}
        animate={{
          opacity: revealed ? 0 : 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="absolute inset-0 h-full w-full touch-none rounded-full"
        style={{
          pointerEvents: revealed ? "none" : "auto",
        }}
      />
    </div>
  );
}

export function ScratchReveal() {
  const items = [
    { label: "Day", value: wedding.dayNumber },
    { label: "Month", value: wedding.monthName },
    { label: "Year", value: wedding.year },
  ];

  return (
    <section
      className="relative -mt-10 pb-16 pt-0"
      style={{
        backgroundColor: PAGE_BG,
        backgroundImage: "none",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
      }}
    >
      {/* Title: plain, no background image */}
      <div className="mx-auto max-w-md px-6 text-center">
        <Reveal>
          <SectionHeading title="The Date" script />
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#4d1f29]">
            ✦ Scratch to reveal the date ✦
          </p>
        </Reveal>
      </div>

      {/* Scratch card image + circles */}
      <Reveal delay={0.15}>
        <div
          className="relative mx-auto mt-8 w-full max-w-3xl"
          style={{ containerType: "inline-size" }}
        >
          <img
            src={scratchBackground}
            alt=""
            draggable={false}
            className="pointer-events-none relative z-10 block h-auto w-full select-none"
          />

          {items.map((item, i) => (
            <ScratchBox
              key={item.label}
              label={item.label}
              value={item.value}
              cx={CIRCLE_CX[i]}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
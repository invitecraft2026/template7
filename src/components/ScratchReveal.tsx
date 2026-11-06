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

// 👉 Your scratch card image (white circle centers)
import scratchBackground from "@/assets/scratch-background.png";

/**
 * IMAGE GEOMETRY (in image pixels)
 * Measured from the 1376 x 768 image. The scratch circles are placed with
 * percentages of these numbers, so they stay glued to the pearl frames at
 * every screen size. If your image has a different size or the circles are
 * in a slightly different spot, only change the numbers below.
 */
const IMG_W = 1376;
const IMG_H = 768;

const CIRCLE_CY = 385; // vertical center of all 3 circles
const CIRCLE_R = 127; // radius of the white inner circle
const CIRCLE_CX = [288, 688, 1088]; // horizontal centers: left, middle, right

/** Website background color: used here so this section never shows white */
const PAGE_BG = "#f2ebe1";

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

  /** Pearlescent sage + champagne foil, matching the invitation */
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

      // Base foil gradient
      const base = ctx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, "#b7c9b4");
      base.addColorStop(0.5, "#e6e8d6");
      base.addColorStop(1, "#cdbf9c");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      // Fine concentric rings (like a polished disc)
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = Math.max(1, w * 0.004);

      for (let r = w * 0.04; r < w / 2; r += w * 0.025) {
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Glitter
      for (let i = 0; i < 280; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const s = (Math.random() * 1.4 + 0.5) * (w / 180);

        ctx.fillStyle = `rgba(255,255,255,${
          0.25 + Math.random() * 0.5
        })`;
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
      light.addColorStop(0, "rgba(255,255,255,0.4)");
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
      className="absolute select-none overflow-hidden rounded-full bg-white"
      style={{
        left: `${(cx / IMG_W) * 100}%`,
        top: `${(CIRCLE_CY / IMG_H) * 100}%`,
        width: `${((CIRCLE_R * 2) / IMG_W) * 100}%`,
        aspectRatio: "1 / 1",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Revealed value, sits on pure white */}
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-white text-center">
        <p
          className="font-semibold uppercase tracking-[0.2em] text-[#8a6a1c]"
          style={{ fontSize: "max(7px, 1.4cqw)" }}
        >
          {label}
        </p>

        <p
          className="font-script leading-none text-[#4d1f29]"
          style={{
            fontSize:
              value.length > 3
                ? "max(15px, 4.2cqw)"
                : "max(18px, 5.2cqw)",
            marginTop: "0.6cqw",
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
            className="pointer-events-none block h-auto w-full select-none"
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
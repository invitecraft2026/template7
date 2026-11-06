import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import envelopeClosed from "@/assets/frist-frame.jpg";
import envelopeOpening from "@/assets/Wedding_invitation.mp4";

export type IntroState = "closed" | "opening" | "complete";

export function EnvelopeIntro({ onComplete }: { onComplete: () => void }) {
  const [state, setState] = useState<IntroState>("closed");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock scrolling for as long as the intro is on screen.
  useEffect(() => {
    document.documentElement.classList.add("is-locked");
    document.body.classList.add("is-locked");
    return () => {
      document.documentElement.classList.remove("is-locked");
      document.body.classList.remove("is-locked");
    };
  }, []);

  const finishRef = useRef<() => void>(() => {});

  const finish = () => {
    setState("complete");
    // Let the crossfade breathe before the intro unmounts.
    window.setTimeout(onComplete, 650);
  };
  finishRef.current = finish;

  const open = () => {
    if (state !== "closed") return;
    setState("opening");
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      // If playback can't start, don't trap the guest on the envelope.
      void v.play().catch(() => finishRef.current());
    } else {
      finish();
    }
  };


  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#F6E4E4]"
      role="button"
      tabIndex={0}
      aria-label="Open the invitation"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") open();
      }}
      animate={{ opacity: state === "complete" ? 0 : 1 }}
      transition={{ duration: 0.65, ease: "easeInOut" }}
      style={{ minHeight: "100svh", cursor: state === "closed" ? "pointer" : "default" }}
    >
      <img
        src={envelopeClosed}
        alt="Sealed wedding envelope"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ opacity: state === "closed" ? 1 : 0, transition: "opacity 120ms linear" }}
      />
      <video
        ref={videoRef}
        src={envelopeOpening}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        onEnded={finish}
        onError={finish}
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ opacity: state === "closed" ? 0 : 1, transition: "opacity 180ms linear" }}
      />
    </motion.div>
  );
}


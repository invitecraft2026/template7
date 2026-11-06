import { useEffect, useRef, useState } from "react";

import { wedding } from "@/config/wedding";

/** Renders only when a music file is configured in src/config/wedding.ts */
export function MusicControl() {
  const src = wedding.musicSrc;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    return () => a?.pause();
  }, []);

  if (!src) return null;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="card-luxe fixed right-4 bottom-4 z-40 grid h-11 w-11 place-items-center rounded-full text-gold"
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path d="M9 5v14M15 5v14" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5l11 7-11 7V5z" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        )}
      </button>
    </>
  );
}

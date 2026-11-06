import { useEffect, useState } from "react";

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

function diff(target: number): Countdown {
  const ms = target - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    isPast: false,
  };
}

export function useCountdown(dateISO: string): Countdown | null {
  const [value, setValue] = useState<Countdown | null>(null);

  useEffect(() => {
    const target = new Date(dateISO).getTime();
    setValue(diff(target));
    const id = window.setInterval(() => setValue(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [dateISO]);

  return value;
}

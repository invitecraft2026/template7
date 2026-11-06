import { useState } from "react";
import { z } from "zod";

import { SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(80, "Name is too long"),
  guests: z.coerce.number().int().min(1, "At least one guest").max(20, "Please contact us directly"),
  message: z.string().trim().max(300, "Please keep it under 300 characters"),
});

type Errors = Record<string, string | undefined>;

const STORAGE_KEY = "wedding-rsvp";

export function RSVP() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, guests: attending === "yes" ? guests : 1, message });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    try {
      const prev = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
      const list = Array.isArray(prev) ? prev : [];
      list.push({ ...parsed.data, attending, at: new Date().toISOString() });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* storage unavailable — the confirmation still shows */
    }
    setDone(true);
  };

  const field =
    "mt-2 w-full rounded-sm border border-champagne/60 bg-soft-white px-4 py-3 text-sm text-deep outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold";
  const label = "block text-[0.6rem] tracking-[0.22em] uppercase text-gold";

  return (
    <section className="bg-ivory px-6 py-20">
      <div className="mx-auto max-w-md">
        <Reveal>
          <SectionHeading eyebrow="Kindly respond" title="RSVP" script />
        </Reveal>

        {done ? (
          <Reveal>
            <div className="card-luxe mt-10 rounded-sm px-6 py-10 text-center">
              <p className="font-script text-3xl text-gold-gradient">Thank you</p>
              <p className="mt-3 text-sm leading-relaxed text-deep/85">
                {attending === "yes"
                  ? "Your response is noted — we can't wait to celebrate with you."
                  : "We will miss you dearly, and we thank you for letting us know."}
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-6 text-[0.6rem] tracking-[0.22em] uppercase text-gold underline underline-offset-4"
              >
                Send another response
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <form onSubmit={submit} noValidate className="card-luxe mt-10 rounded-sm px-5 py-6">
              <div className="grid grid-cols-2 gap-3">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAttending(v)}
                    aria-pressed={attending === v}
                    className={
                      attending === v
                        ? "rounded-sm border border-gold bg-champagne/25 px-3 py-3 text-[0.6rem] tracking-[0.2em] uppercase text-deep"
                        : "rounded-sm border border-champagne/50 px-3 py-3 text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground"
                    }
                  >
                    {v === "yes" ? "Joyfully accept" : "Regretfully decline"}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <label className={label} htmlFor="rsvp-name">
                  Your name
                </label>
                <input
                  id="rsvp-name"
                  className={field}
                  value={name}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Full name"
                  onChange={(e) => setName(e.target.value)}
                />
                {errors["name"] ? (
                  <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>
                ) : null}
              </div>

              {attending === "yes" ? (
                <div className="mt-4">
                  <label className={label} htmlFor="rsvp-guests">
                    Number of guests
                  </label>
                  <input
                    id="rsvp-guests"
                    className={field}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                  {errors["guests"] ? (
                    <p className="mt-1 text-xs text-destructive">{errors["guests"]}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-4">
                <label className={label} htmlFor="rsvp-message">
                  A note for the couple (optional)
                </label>
                <textarea
                  id="rsvp-message"
                  className={`${field} min-h-24 resize-none`}
                  value={message}
                  maxLength={300}
                  placeholder="Share a short message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                {errors["message"] ? (
                  <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
                ) : null}
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-sm border border-gold bg-champagne/30 px-4 py-3 text-[0.62rem] tracking-[0.24em] uppercase text-deep transition-colors hover:bg-champagne/50"
              >
                Send response
              </button>
              <p className="mt-3 text-center text-[0.6rem] leading-relaxed text-muted-foreground">
                Responses are stored on this device. Connect a backend later to collect them
                centrally.
              </p>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

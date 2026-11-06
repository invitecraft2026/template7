import { useEffect, useState } from "react";

import { Divider, SectionHeading } from "./Ornament";
import { Reveal } from "./Reveal";

type Wish = { name: string; text: string; at: string };

const STORAGE_KEY = "wedding-wishes";

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) setWishes(parsed as Wish[]);
    } catch {
      /* ignore unreadable storage */
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanText = text.trim();
    if (cleanName.length < 2 || cleanText.length < 3) {
      setError("Please add your name and a short wish.");
      return;
    }
    setError("");
    const next = [
      { name: cleanName.slice(0, 60), text: cleanText.slice(0, 300), at: new Date().toISOString() },
      ...wishes,
    ].slice(0, 50);
    setWishes(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setName("");
    setText("");
  };

  const field =
    "mt-2 w-full rounded-sm border border-champagne/60 bg-soft-white px-4 py-3 text-sm text-deep outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold";

  return (
    <section className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-md">
        <Reveal>
          <SectionHeading eyebrow="Blessings" title="Wishes for the Couple" script />
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="card-luxe mt-10 rounded-sm px-5 py-6">
            <label
              className="block text-[0.6rem] tracking-[0.22em] uppercase text-gold"
              htmlFor="wish-name"
            >
              Your name
            </label>
            <input
              id="wish-name"
              className={field}
              value={name}
              maxLength={60}
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
            />
            <label
              className="mt-4 block text-[0.6rem] tracking-[0.22em] uppercase text-gold"
              htmlFor="wish-text"
            >
              Your wish
            </label>
            <textarea
              id="wish-text"
              className={`${field} min-h-24 resize-none`}
              value={text}
              maxLength={300}
              placeholder="Write a blessing for the couple"
              onChange={(e) => setText(e.target.value)}
            />
            {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
            <button
              type="submit"
              className="mt-5 w-full rounded-sm border border-gold bg-champagne/30 px-4 py-3 text-[0.62rem] tracking-[0.24em] uppercase text-deep transition-colors hover:bg-champagne/50"
            >
              Leave a wish
            </button>
          </form>
        </Reveal>

        {wishes.length > 0 ? (
          <>
            <Divider className="mt-12" />
            <ul className="mt-8 space-y-4">
              {wishes.map((w) => (
                <li key={`${w.at}-${w.name}`} className="card-luxe rounded-sm px-5 py-4">
                  <p className="text-sm leading-relaxed text-deep/85 italic">“{w.text}”</p>
                  <p className="mt-2 text-[0.6rem] tracking-[0.2em] uppercase text-gold">
                    {w.name}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </section>
  );
}

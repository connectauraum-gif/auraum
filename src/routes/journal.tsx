import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ripples from "@/assets/ripples.jpg";
import gong from "@/assets/gong.jpg";
import ritual from "@/assets/ritual.jpg";
import shadows from "@/assets/shadows.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — AURAUM" },
      {
        name: "description",
        content: "Notes on resonance, stillness and the acoustics of everyday rooms.",
      },
      { property: "og:title", content: "Journal — AURAUM" },
      {
        property: "og:description",
        content: "Notes on resonance, stillness and the acoustics of everyday rooms.",
      },
    ],
  }),
  component: JournalPage,
});

const posts = [
  {
    t: "Why a room can feel loud in silence",
    tag: "Resonance",
    date: "March 2026",
    img: ripples,
    d: "Hard surfaces hold sound long after it stops. A note on the physics of unease.",
  },
  {
    t: "The gong is not an instrument",
    tag: "Practice",
    date: "February 2026",
    img: gong,
    d: "On tools that move air rather than play melody, and why the difference matters.",
  },
  {
    t: "Smoke, stone and the slow hour",
    tag: "Ritual",
    date: "January 2026",
    img: ritual,
    d: "What we keep from older traditions, and what we quietly leave behind.",
  },
  {
    t: "Light as a second acoustic",
    tag: "Space",
    date: "December 2025",
    img: shadows,
    d: "Shadow softens a room the way felt softens a mallet.",
  },
];

const tags = ["All", "Resonance", "Practice", "Ritual", "Space"];

function JournalPage() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? posts : posts.filter((p) => p.tag === active);

  return (
    <section className="px-5 pb-24 pt-32 md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
            Journal
          </p>
          <h1 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl">
            Notes on <em>resonance</em>
          </h1>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              data-active={active === t}
              className="rounded-full border border-border px-4 py-2 text-[0.6rem] uppercase tracking-brand text-muted-foreground transition-all duration-500 hover:border-gold hover:text-foreground data-[active=true]:border-gold data-[active=true]:bg-gold/10 data-[active=true]:text-foreground"
            >
              {t}
            </button>
          ))}
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {visible.map((p, i) => (
            <Reveal key={p.t} delay={i * 100}>
              <article className="group cursor-pointer">
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.t}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="h-64 w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 sm:h-80"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-[0.6rem] uppercase tracking-brand text-muted-foreground">
                  <span className="text-gold">{p.tag}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                </div>
                <h2 className="font-display mt-3 text-2xl transition-colors duration-500 group-hover:text-gold sm:text-3xl">
                  {p.t}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            Nothing filed under this yet.
          </p>
        )}
      </div>
    </section>
  );
}

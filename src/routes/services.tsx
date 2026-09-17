import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import gong from "@/assets/gong.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AURAUM" },
      {
        name: "description",
        content:
          "Spatial clearing, home harmonisation and private sound rituals for homes and studios.",
      },
      { property: "og:title", content: "Services — AURAUM" },
      {
        property: "og:description",
        content: "Clear. Balance. Harmonise. Restore. Belong.",
      },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    t: "Spatial clearing",
    len: "90 minutes",
    d: "A full acoustic sweep of a room or apartment using bowls, gong and voice to break up stagnant resonance.",
  },
  {
    t: "Home harmonisation",
    len: "Half day",
    d: "Room-by-room tuning across a whole home, with placement notes so the balance holds after we leave.",
  },
  {
    t: "Private ritual",
    len: "60 minutes",
    d: "A seated session for one or two people. Sound directed at the body rather than the architecture.",
  },
  {
    t: "Studio & retail",
    len: "Bespoke",
    d: "Commercial spaces where people linger. We tune for calm, focus and a reason to stay.",
  },
];

const faqs = [
  {
    q: "Do I need to prepare the space?",
    a: "Only open the windows an hour before. We work around furniture and everyday life.",
  },
  {
    q: "How long does the effect last?",
    a: "Most clients feel the shift for eight to twelve weeks. Seasonal sessions keep it steady.",
  },
  {
    q: "Can you travel?",
    a: "Yes. Sessions outside the city are arranged as half or full day visits.",
  },
];

function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="grain relative flex min-h-[60vh] items-end overflow-hidden">
        <img
          src={gong}
          alt="Bronze gong and felt mallet"
          width={1024}
          height={1024}
          className="animate-drift absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 md:px-10 md:pb-20">
          <Reveal>
            <p className="text-[0.6rem] uppercase tracking-brand text-foreground/70">
              What we do
            </p>
            <h1 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl">
              The ritual, in four forms
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px] divide-y divide-border border-y border-border">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <div className="group grid gap-3 py-8 transition-colors duration-500 hover:bg-card/60 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8 md:px-6">
                <span className="font-display text-gold text-xl">0{i + 1}</span>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                    {s.t}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>
                </div>
                <span className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
                  {s.len}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">Questions</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-xl">{f.q}</span>
                  <span
                    className={`shrink-0 text-gold transition-transform duration-500 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    openFaq === i ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link to="/book" className="btn-ritual">
              Book a session
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

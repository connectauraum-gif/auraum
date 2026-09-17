import { createFileRoute, Link } from "@tanstack/react-router";
import ritual from "@/assets/ritual.jpg";
import shadows from "@/assets/shadows.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Isa — AURAUM" },
      {
        name: "description",
        content:
          "Isa Barari founded Auraum at the intersection of sound, space and acoustic architecture.",
      },
      { property: "og:title", content: "About Isa — AURAUM" },
      {
        property: "og:description",
        content: "Sound is the bridge between what is seen and what is felt.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { n: "01", t: "Listen first", d: "Every room already speaks. We begin by hearing it." },
  { n: "02", t: "Work with matter", d: "Stone, water, brass, air — resonance needs a body." },
  { n: "03", t: "Leave no trace", d: "The change should feel like memory, not decoration." },
];

function AboutPage() {
  return (
    <>
      <section className="grain relative flex min-h-[70vh] items-end overflow-hidden">
        <img
          src={shadows}
          alt="Olive branch shadows on a warm plaster wall"
          width={1920}
          height={768}
          className="animate-drift absolute inset-0 h-full w-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 md:px-10 md:pb-24">
          <Reveal>
            <p className="text-[0.6rem] uppercase tracking-brand text-foreground/70">
              Meet Isa
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-6xl md:text-7xl">
              Sound is the bridge between what is <em>seen</em> and what is felt
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:items-center">
          <Reveal className="overflow-hidden">
            <img
              src={ritual}
              alt="Incense bowl and olive plant on a stone ledge"
              loading="lazy"
              width={1024}
              height={768}
              className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-105"
            />
          </Reveal>
          <Reveal delay={120} className="space-y-6">
            <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
              The practitioner
            </p>
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              Founder and spatial sound practitioner.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Isa works at the intersection of sound, space and architecture, quieting
              environments that feel dense, unsettled or simply loud. The practice grew out of
              ten years spent tuning rooms for musicians — and noticing that the people inside
              them changed too.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Sessions are slow, physical and precise: bowls, gongs, breath and long silences,
              placed where the room needs them rather than where they look best.
            </p>
            <Link to="/services" className="btn-ritual">
              Our approach
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px] grid gap-10 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i * 120} className="group">
              <p className="font-display text-gold text-2xl">{v.n}</p>
              <h2 className="font-display mt-3 text-2xl">{v.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              <div className="gold-line mt-6 w-0 transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

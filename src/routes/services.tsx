import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import gong from "@/assets/gong.jpg";
import ripples from "@/assets/ripples.jpg";
import ritual from "@/assets/ritual.jpg";
import shadows from "@/assets/shadows.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Practice — AURAUM" },
      {
        name: "description",
        content:
          "Restore, Receive, Perform and Places of Exchange — sound-led sessions for homes, hospitality, workspaces and commercial spaces.",
      },
      { property: "og:title", content: "Our Practice — AURAUM" },
      {
        property: "og:description",
        content: "Every place carries its own rhythm. AURAUM sessions are created around it.",
      },
    ],
  }),
  component: ServicesPage,
});

type Service = {
  key: string;
  name: string;
  sub?: string;
  tagline?: string;
  body: string[];
  suitable: string[];
  img: string;
  alt: string;
};

const services: Service[] = [
  {
    key: "restore",
    name: "RESTORE",
    tagline: "A calmer home. A lighter you.",
    body: [
      "For homes and residences that feel unsettled, heavy, recently changed, or simply in need of renewed energy.",
    ],
    suitable: [
      "New homes",
      "After renovation",
      "Periods of transition",
      "Before or after significant life changes",
      "When a home no longer feels quite as it once did",
      "New beginnings",
      "Before marriage",
      "When a property has been difficult to sell",
      "When a property has been difficult to rent",
      "When you simply feel that something within the space is stagnant, blocked or no longer flowing as it should",
    ],
    img: ritual,
    alt: "Incense bowl and olive plant on a stone ledge",
  },
  {
    key: "receive",
    name: "RECEIVE",
    tagline: "Elevated guest experiences.",
    body: [
      "For hotels, restaurants and other spaces created to receive and welcome people.",
      "AURAUM offers sound-led sessions designed to encourage a sense of calm, presence and harmony within the environment, while helping to release stagnant energy that may have accumulated over time.",
      "The intention is to create a space that feels lighter, clearer and more welcoming, allowing guests to experience a greater sense of peace, ease and clarity.",
    ],
    suitable: [
      "Openings and launches",
      "Reopenings",
      "Seasonal renewal",
      "After significant events or periods of high activity",
      "When a space no longer feels quite as it once did",
      "New intentions",
    ],
    img: ripples,
    alt: "Golden water ripples",
  },
  {
    key: "perform",
    name: "PERFORM",
    sub: "Workspaces",
    tagline: "Clarity for greater flow.",
    body: [
      "The places where we work shape far more than productivity.",
      "They influence focus, communication, energy and the way people experience and interact with one another.",
      "AURAUM works with offices, studios and private workspaces to create environments that feel clearer, more grounded and more considered, supporting greater focus, flow and harmony within the space.",
    ],
    suitable: [
      "New openings",
      "New beginnings or intentions",
      "Changes within a team or organisation",
      "Periods of transition",
      "When a workspace feels stagnant or unsettled",
      "When a space no longer feels quite as it once did",
    ],
    img: gong,
    alt: "Bronze gong with a felt mallet",
  },
  {
    key: "places-of-exchange",
    name: "PLACES OF EXCHANGE",
    sub: "Commercial Spaces",
    tagline: "For spaces shaped by people, movement and purpose.",
    body: [
      "Commercial spaces like boutiques, galleries, showrooms, salons, spaces each carry their own rhythm. AURAUM uses sound to recalibrate these environments, bringing greater clarity, balance and presence to the way they are experienced.",
    ],
    suitable: ["Openings", "Transitions", "Renovations", "Moments of renewal"],
    img: shadows,
    alt: "Olive branch shadows on warm plaster",
  },
];

function ServicesPage() {
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
            <p className="text-[0.6rem] uppercase tracking-brand text-foreground/70">Services</p>
            <h1 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl">Our Practice</h1>
          </Reveal>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl space-y-7 text-center">
          <Reveal>
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              Every place carries its own rhythm.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm leading-loose text-muted-foreground">
              AURAUM sessions are created around the space, the people within it, and the moment
              they are moving through.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-sm leading-loose text-muted-foreground">
              Through sound, vibration and intention, we help bring greater clarity, ease and
              balance into the places where we live, work, gather, or any other space that may
              need a little love to open the door to a new chapter.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="text-sm leading-loose text-muted-foreground">
              By helping to release stagnant energy, we create space for renewal, movement and new
              beginnings.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="gold-line mx-auto mt-10 w-40" />
          </Reveal>
        </div>
      </section>

      {/* Quick index */}
      <section className="px-5 pb-8 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-center gap-2">
          {services.map((s) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="rounded-full border border-border px-4 py-2 text-[0.6rem] uppercase tracking-brand text-muted-foreground transition-all duration-500 hover:border-gold hover:text-foreground"
            >
              {s.name}
            </a>
          ))}
        </div>
      </section>

      {services.map((s, i) => (
        <ServiceBlock key={s.key} service={s} index={i} />
      ))}

      <section className="px-5 pb-24 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-3xl sm:text-4xl">Not sure which session fits?</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell us a little about your space and how we can support you. We will guide you from
            there.
          </p>
          <Link to="/book" className="btn-ritual mt-8">
            Experience Auraum
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(true);
  const flip = index % 2 === 1;

  return (
    <section
      id={service.key}
      className="scroll-mt-24 border-t border-border px-5 py-16 md:px-10 md:py-24"
    >
      <div
        className={`mx-auto grid max-w-[1400px] items-start gap-10 md:grid-cols-2 md:gap-16 ${
          flip ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Reveal className="overflow-hidden">
          <img
            src={service.img}
            alt={service.alt}
            loading="lazy"
            width={1024}
            height={900}
            className="h-72 w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 md:h-[34rem]"
          />
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <p className="font-display text-gold text-xl">0{index + 1}</p>
          <h2 className="font-display mt-2 text-4xl leading-tight tracking-[0.12em] sm:text-5xl">
            {service.name}
          </h2>
          {service.sub && (
            <p className="mt-3 text-[0.6rem] uppercase tracking-brand text-muted-foreground">
              {service.sub}
            </p>
          )}
          {service.tagline && (
            <p className="font-display mt-4 text-2xl italic text-foreground/85 sm:text-3xl">
              {service.tagline}
            </p>
          )}

          <div className="mt-6 space-y-4">
            {service.body.map((p) => (
              <p key={p} className="text-sm leading-loose text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-[0.6rem] uppercase tracking-brand text-foreground/80">
                Suitable for
              </span>
              <span
                className={`text-gold transition-transform duration-500 ${open ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <ul className="overflow-hidden">
                <li className="h-5" aria-hidden />
                {service.suitable.map((item, i) => (
                  <li
                    key={item}
                    style={{ transitionDelay: `${i * 40}ms` }}
                    className="group flex gap-3 border-b border-border/60 py-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 hover:text-foreground"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold transition-transform duration-500 group-hover:scale-150" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            to="/book"
            search={{ service: service.key }}
            className="btn-ritual mt-8 w-full sm:w-auto"
          >
            Experience Auraum
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

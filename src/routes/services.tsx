import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import gong from "@/assets/gong.jpg";
import aura from "@/assets/aura.jpg";
import ritual from "@/assets/ritual.jpg";
import shadows from "@/assets/shadows.jpg";
import soundbath from "@/assets/soundbath.jpg";
import chakra from "@/assets/chakra.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — AURAUM" },
      {
        name: "description",
        content:
          "Home, Hospitality, Workplace, Retail and Occasion & Transition — sound-led sessions for the places where we live, work and gather.",
      },
      { property: "og:title", content: "Our Services — AURAUM" },
      {
        property: "og:description",
        content:
          "Every space has its own rhythm. AURAUM creates sound-led sessions shaped around the space, the people who use it and the moment they are moving through.",
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
  buttonText: string;
  bookServiceKey: string;
  img: string;
  alt: string;
};

const services: Service[] = [
  {
    key: "home",
    name: "Home Sound Clearing",
    sub: "For houses, apartments and private residences.",
    tagline: "A calmer home. A lighter you.",
    body: [
      "For homes, residences that feel unsettled, heavy, newly changed, or simply in need of renewal energy. Sessions can also be arranged for properties being prepared for sale or rent.",
    ],
    suitable: [
      "New homes",
      "After renovation",
      "Periods of transition",
      "Before or after significant life changes",
      "Simply when a home no longer feels quite as it once did",
      "For new beginnings",
      "Before marriage",
      "If you can’t sell your property",
      "If you can’t rent your property",
      "Or if you feel that some things are off",
    ],
    buttonText: "Enquire about a home session",
    bookServiceKey: "home",
    img: ritual,
    alt: "Incense bowl and olive plant on a stone ledge",
  },
  {
    key: "hospitality",
    name: "Hospitality Sound Clearing",
    sub: "For hotels, restaurants, clubs and guest spaces.",
    tagline: "The atmosphere of a place shapes how people feel when they enter it.",
    body: ["The atmosphere of a place shapes how people feel when they enter it."],
    suitable: [
      "Openings and launches",
      "Reopenings",
      "Seasonal renewal",
      "After significant events or periods of high activity",
      "When a space no longer feels quite as it once did",
      "New intentions",
    ],
    buttonText: "Enquire about a hospitality session",
    bookServiceKey: "hospitality",
    img: aura,
    alt: "Soft golden light waves drifting through mist",
  },
  {
    key: "workplace",
    name: "Workplace Sound Clearing",
    sub: "For offices, studios, practices and shared workspaces.",
    tagline: "A workplace holds the energy of the people and activities within it.",
    body: [
      "A workplace holds the energy of the people and activities within it. Influencing focus, communication, energy and the way people experience one another.",
    ],
    suitable: [
      "New openings",
      "New beginnings or intentions",
      "Changes within a team or organisation",
      "Periods of transition",
      "When a workspace feels stagnant or unsettled",
      "When a space no longer feels quite as it once did",
    ],
    buttonText: "Enquire about a workplace session",
    bookServiceKey: "workplace",
    img: chakra,
    alt: "Golden concentric mandala of light",
  },
  {
    key: "retail",
    name: "Retail Sound Clearing",
    sub: "For boutiques, bookshops, galleries, showrooms and other commercial spaces.",
    body: [
      "Using sound and intention, Isa works to bring a greater sense of balance, clarity and presence to the environment.",
    ],
    suitable: [
      "New openings",
      "New beginnings or intentions",
      "Changes within a team or organisation",
      "Periods of transition",
      "When a workspace feels stagnant or unsettled",
      "When a space no longer feels quite as it once did",
    ],
    buttonText: "Enquire about a retail session",
    bookServiceKey: "retail",
    img: shadows,
    alt: "Olive branch shadows on warm plaster",
  },
  {
    key: "occasion",
    name: "Occasion & Transition Sound Session",
    sub: "For meaningful moments, gatherings and new beginnings.",
    body: [
      "Some sessions are centred on an occasion rather than a particular kind of property. This might be a marriage, a new business, a private gathering, a retreat, a move or another significant life change.",
      "Tell Isa what you are marking and where it will take place. She will consider an approach suited to the occasion, the space and the people involved.",
    ],
    suitable: [
      "Marriages and unions",
      "New businesses and launches",
      "Private gatherings and retreats",
      "Moves and significant life transitions",
      "Moments deserving sacred intention",
    ],
    buttonText: "Enquire about an occasion session",
    bookServiceKey: "occasion",
    img: gong,
    alt: "Sacred singing bowls and gong in warm candlelight",
  },
];

function ServicesPage() {
  return (
    <>
      <section className="grain relative flex min-h-[60vh] items-end overflow-hidden">
        <img
          src={soundbath}
          alt="Crystal singing bowls glowing in candlelight"
          width={1280}
          height={960}
          className="animate-drift absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 md:px-10 md:pb-20">
          <Reveal>
            <p className="text-[0.6rem] uppercase tracking-brand text-foreground/70">Auraum</p>
            <h1 className="font-display mt-4 text-4xl sm:text-6xl md:text-7xl">OUR SERVICES</h1>
          </Reveal>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl space-y-7 text-center">
          <Reveal>
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              Every space has its own rhythm.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm leading-loose text-muted-foreground">
              AURAUM creates sound-led sessions for the places where we live, work and gather,
              shaped around the space, the people who use it and the moment they are moving through.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-sm leading-loose text-muted-foreground">
              Explore the services below and choose the setting that best describes yours. Isa will
              discuss your needs before recommending an approach.
            </p>
          </Reveal>
          <Reveal delay={280}>
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
            Book a session
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
          <h2 className="font-display mt-2 text-3xl leading-tight tracking-[0.08em] sm:text-4xl md:text-5xl">
            {service.name}
          </h2>
          {service.sub && (
            <p className="mt-3 text-[0.65rem] uppercase tracking-brand text-muted-foreground">
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

          {service.suitable.length > 0 && (
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
          )}

          <Link
            to="/book"
            search={{ service: service.bookServiceKey }}
            className="btn-ritual mt-8 w-full sm:w-auto"
          >
            {service.buttonText}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

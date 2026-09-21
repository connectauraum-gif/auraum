import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import ripples from "@/assets/ripples.jpg";
import soundbath from "@/assets/soundbath.jpg";
import meditation from "@/assets/meditation.jpg";
import chakra from "@/assets/chakra.jpg";
import shadows from "@/assets/shadows.jpg";
import ritual from "@/assets/ritual.jpg";
import vortex from "@/assets/vortex.jpg";
import { Reveal, useInView } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURAUM — Every space holds something" },
      {
        name: "description",
        content:
          "Spatial cleaning through sound. Auraum clears, balances and harmonises homes and studios.",
      },
      { property: "og:title", content: "AURAUM — Every space holds something" },
      {
        property: "og:description",
        content: "Spatial cleaning through sound. Clear. Balance. Harmonise. Restore. Belong.",
      },
    ],
  }),
  component: Index,
});

const words = ["CLEAN", "BALANCE", "HARMONISE", "RESTORE", "BELONG"];

function Index() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <Manifesto />
      <ShadowBand />
      <QuoteBand />
      <Closing />
    </>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent">
      <div className="h-full bg-gold/80 transition-[width] duration-150" style={{ width: `${p}%` }} />
    </div>
  );
}

function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={hero}
        alt="Stone terrace with a brass singing bowl overlooking the sea at sunset"
        width={1920}
        height={1200}
        style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.1)` }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="veil absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-10 px-5 pb-20 pt-32 md:grid-cols-[1fr_auto] md:px-10 md:pb-24">
        <div>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-7xl md:text-8xl">
            <span className="mask-rise">
              <span style={{ animationDelay: "2.3s" }}>Every space</span>
            </span>
            <span className="mask-rise">
              <span style={{ animationDelay: "2.45s" }}>
                holds <em className="text-gold">something</em>
              </span>
            </span>
          </h1>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="text-[0.6rem] uppercase leading-relaxed tracking-brand text-foreground/80">
              Spatial cleaning
              <br />
              through sound
            </p>
          </div>

          <Link to="/book" className="btn-ritual mt-10">
            Begin the ritual
          </Link>
        </div>

        <ul className="space-y-2 text-right md:space-y-3">
          {words.map((w, i) => (
            <li
              key={w}
              style={{ animationDelay: `${2.6 + i * 0.12}s` }}
              className="animate-fade-in text-[0.6rem] tracking-brand text-foreground/70 opacity-0 [animation-fill-mode:forwards] transition-colors duration-500 hover:text-gold"
            >
              {w}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="text-[0.55rem] tracking-brand text-foreground/60">SCROLL</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}

function Manifesto() {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  return (
    <section ref={ref} className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr_1fr]">
      <div className="relative h-56 overflow-hidden md:h-[34rem]">
        <img
          src={ripples}
          alt="Golden water ripples"
          loading="lazy"
          width={1024}
          height={1024}
          className={`h-full w-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "scale-100" : "scale-125"
          }`}
        />
      </div>

      <div className="grain flex flex-col items-center justify-center gap-6 bg-sand px-8 py-16 text-center text-sand-foreground md:py-0">
        <Reveal>
          <p className="font-display text-3xl tracking-brand sm:text-4xl">AURAUM</p>
          <p className="mt-2 text-[0.55rem] uppercase tracking-brand opacity-70">
            The ritual of space
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto max-w-xs text-xs leading-loose opacity-80">
            We work with the unseen. Through sound, intention and presence, we clear what no
            longer belongs and return spaces to their natural harmony.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="text-[0.6rem] uppercase tracking-brand">
            Spaces hold more than we see
          </p>
        </Reveal>
      </div>

      <div className="relative h-56 overflow-hidden md:h-[34rem]">
        <img
          src={gong}
          alt="Bronze gong with a felt mallet"
          loading="lazy"
          width={1024}
          height={1024}
          className={`h-full w-full object-cover transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "scale-100" : "scale-125"
          }`}
        />
      </div>
    </section>
  );
}

function ShadowBand() {
  return (
    <section className="relative h-64 overflow-hidden md:h-[26rem]">
      <img
        src={shadows}
        alt="Olive branch shadows on warm plaster"
        loading="lazy"
        width={1920}
        height={768}
        className="animate-drift absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Reveal>
          <p className="font-display px-6 text-center text-2xl italic text-ink/80 sm:text-4xl">
            More than a space. A higher frequency.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className="grain bg-sand px-5 py-20 text-sand-foreground md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 md:grid-cols-[1fr_1.1fr_1fr]">
        <Reveal>
          <blockquote className="font-display text-3xl italic leading-snug sm:text-4xl">
            Sound is the bridge between what is seen and what is felt
          </blockquote>
          <p className="mt-5 text-[0.55rem] uppercase tracking-brand opacity-70">— Isa, Auraum</p>
        </Reveal>

        <Reveal delay={150} className="overflow-hidden">
          <img
            src={ritual}
            alt="Incense bowl and olive plant on a stone ledge"
            loading="lazy"
            width={1024}
            height={768}
            className="h-72 w-full object-cover transition-transform duration-[1400ms] hover:scale-105 md:h-[26rem]"
          />
        </Reveal>

        <Reveal delay={300}>
          <p className="text-[0.55rem] uppercase tracking-brand opacity-70">Meet Isa</p>
          <p className="mt-4 max-w-xs text-xs leading-loose opacity-80">
            Founder and spatial sound practitioner. Isa works at the intersection of sound,
            space and architecture, creating environments that feel different — because they
            are.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-block border border-sand-foreground/40 px-5 py-3 text-[0.55rem] uppercase tracking-brand transition-colors duration-500 hover:border-sand-foreground hover:bg-sand-foreground hover:text-sand"
          >
            Our approach
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="grain relative flex h-[70vh] items-center justify-center overflow-hidden">
      <img
        src={vortex}
        alt="Golden water spiral at sunset"
        loading="lazy"
        width={1920}
        height={912}
        className="animate-drift absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/35" />
      <Reveal className="relative text-center">
        <p className="font-display text-2xl tracking-[0.2em] sm:text-4xl md:text-5xl">
          A QUIETER SPACE.
        </p>
        <p className="font-display mt-2 text-2xl tracking-[0.2em] sm:text-4xl md:text-5xl">
          A FULLER LIFE.
        </p>
        <Link to="/book" className="btn-ritual mt-10">
          Begin the ritual
        </Link>
      </Reveal>
    </section>
  );
}

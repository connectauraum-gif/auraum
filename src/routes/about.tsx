import { createFileRoute, Link } from "@tanstack/react-router";
import ritual from "@/assets/ritual.jpg";
import shadows from "@/assets/shadows.jpg";
import chakra from "@/assets/chakra.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AURAUM & Isa Barao — The Ritual of Space" },
      {
        name: "description",
        content:
          "AURAUM works with the unseen dimension of our surroundings. Founded by Isa Barao — Ayurveda, medical yoga teacher and sound practitioner.",
      },
      { property: "og:title", content: "About AURAUM — The Ritual of Space" },
      {
        property: "og:description",
        content:
          "Through sound, intention and presence, designed to cleanse, harmonise and restore balance to the places in which we live and work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    n: "01",
    t: "Release",
    d: "Letting go of what a space has gathered and no longer needs to hold.",
  },
  {
    n: "02",
    t: "Restore",
    d: "Returning an environment to a sense of equilibrium and ease.",
  },
  {
    n: "03",
    t: "Renew",
    d: "Leaving an atmosphere that feels lighter, calmer and more present.",
  },
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
              About Auraum
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-6xl md:text-7xl">
              The Ritual of Space
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ABOUT AURAUM */}
      <section className="px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.1fr_1fr] md:items-start">
          <Reveal className="space-y-7">
            <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
              About Auraum
            </p>
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              Every space holds something: the presence of those who pass through it, the
              conversations that unfold within it, and the seasons of celebration, change,
              pressure, rest, thoughts and renewal.
            </p>
            <div className="max-w-xl space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Over time, an environment can begin to feel different, even when nothing
                visible has changed.
              </p>
              <p>
                AURAUM works with this unseen dimension of our surroundings. Through sound,
                intention and presence, designed to cleanse, harmonise and restore balance to
                the places in which we live and work.
              </p>
              <p>
                The purpose is simple: to help each environment return to a state of clarity,
                ease and natural harmony.
              </p>
              <p className="font-display text-xl not-italic leading-snug text-foreground/85">
                We release what no longer belongs, restore equilibrium and allow the
                atmosphere to settle into something lighter, calmer and more present, creating
                space for whatever comes next.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/services" className="btn-ritual">
                Our practice
              </Link>
            </div>
          </Reveal>

          <Reveal delay={160} className="overflow-hidden">
            <img
              src={chakra}
              alt="Golden concentric mandala of light"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-72 w-full object-cover transition-transform duration-[1400ms] hover:scale-105 md:h-[34rem]"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.n} delay={i * 120} className="group">
              <p className="font-display text-gold text-2xl">{v.n}</p>
              <h3 className="font-display mt-3 text-2xl">{v.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              <div className="gold-line mt-6 w-0 transition-all duration-700 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT ISA */}
      <section className="grain border-t border-border bg-sand px-5 py-20 text-sand-foreground md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="text-[0.6rem] uppercase tracking-brand opacity-70">About Isa</p>
            <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.15] sm:text-5xl md:text-6xl">
              Isa Barao
              <span className="mt-4 block text-[0.6rem] uppercase tracking-brand opacity-70">
                Founder of Auraum
              </span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-start">
            <Reveal delay={120} className="overflow-hidden">
              <img
                src={ritual}
                alt="Incense bowl and olive plant on a stone ledge"
                loading="lazy"
                width={1024}
                height={768}
                className="h-80 w-full object-cover transition-transform duration-[1400ms] hover:scale-105 md:h-[34rem]"
              />
            </Reveal>

            <Reveal delay={240} className="space-y-6 text-sm leading-relaxed opacity-85">
              <p className="font-display text-2xl leading-snug opacity-100 sm:text-3xl">
                AURAUM was founded by Isa Barao, an Ayurveda, medical yoga teacher and sound
                practitioner.
              </p>
              <p>
                Her personal relationship with yoga began in her teenage years and has
                continued to this day. After completing her formal training in 2015, she went
                on to devote more than a decade to teaching and guiding others through the
                practice.
              </p>
              <p>
                Her work has since evolved through continued study of Ayurveda, medical yoga
                and other traditions devoted to balance, presence and wellbeing. Over time,
                her path moved increasingly towards sound, not simply as something to hear,
                but as something that can transform the feeling of a place and, in turn, how
                we feel within it.
              </p>
              <p>
                Today, Isa works with sound, vibration and intention, creating deeply personal
                experiences shaped by the same calm, care and presence she has cultivated
                throughout her own journey.
              </p>
              <p className="font-display text-xl leading-snug opacity-100 sm:text-2xl">
                For Isa, this work is more than a practice. It is her way of helping others
                find a quieter place within themselves, one where they may rest more deeply,
                feel more clearly and return, gently, to who they are.
              </p>
              <div className="pt-2">
                <Link
                  to="/book"
                  className="inline-block border border-sand-foreground/40 px-5 py-3 text-[0.55rem] uppercase tracking-brand transition-colors duration-500 hover:border-sand-foreground hover:bg-sand-foreground hover:text-sand"
                >
                  Book a session
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

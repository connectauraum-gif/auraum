import { createFileRoute, Link } from "@tanstack/react-router";
import ritual from "@/assets/ritual.jpg";
import shadows from "@/assets/shadows.jpg";
import ripples from "@/assets/ripples.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Isa Barao — AURAUM, The Ritual of Space" },
      {
        name: "description",
        content:
          "Isa Barao is the founder of AURAUM — an Ayurveda practitioner, medical yoga teacher and sound practitioner working with the atmosphere of the spaces we live and gather in.",
      },
      { property: "og:title", content: "About Isa Barao — AURAUM" },
      {
        property: "og:description",
        content:
          "Sound, intention and presence, used to tend to the atmosphere of a space — so it feels clearer, calmer and more present.",
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
              About Isa
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-6xl md:text-7xl">
              Sound is not only something we hear. It is something we <em>feel</em>.
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
              Isa Barao — Founder of Auraum
            </p>
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              Ayurveda practitioner, medical yoga teacher and sound practitioner.
            </p>
            <div className="max-w-md space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                Yoga has been part of Isa&rsquo;s life for as long as she can remember. In 2015
                she began her formal training, and in the decade since she has taught and
                guided others through practice, stillness and the quieter work of returning to
                oneself.
              </p>
              <p>
                Her study has continued ever since — Ayurveda, medical yoga, sound and
                vibration, and the older traditions built around balance, presence and
                wellbeing.
              </p>
              <p>
                That path led her naturally toward sound. Not sound as something we simply
                hear, but as something that shapes the feeling of a space — and, in turn, how
                we experience ourselves within it.
              </p>
              <p className="font-display text-xl not-italic leading-snug text-foreground/85">
                Her work is an invitation: to rest more deeply, to feel more clearly, and to
                return gently to yourself.
              </p>
            </div>
            <Link to="/services" className="btn-ritual">
              Our practice
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="grain border-t border-border bg-sand px-5 py-20 text-sand-foreground md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="text-[0.6rem] uppercase tracking-brand opacity-70">
              About Auraum
            </p>
            <h2 className="font-display mt-4 max-w-3xl text-3xl leading-[1.15] sm:text-5xl md:text-6xl">
              The ritual of space
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-start">
            <Reveal delay={120} className="space-y-6 text-sm leading-relaxed opacity-85">
              <p className="font-display text-2xl leading-snug opacity-100 sm:text-3xl">
                AURAUM is a practice concerned with the relationship between people and the
                spaces they inhabit.
              </p>
              <p>
                Every space carries traces of what has passed through it — the people,
                conversations and emotions, the activity and the rest, the transitions,
                celebrations, pressure and change. Nothing visible needs to alter for an
                environment to begin to feel different.
              </p>
              <p>
                Through sound, intention, vibration and presence, we tend to that atmosphere
                consciously. The intention is simple: to release what no longer serves the
                space, restore a sense of equilibrium, and leave an environment that feels
                clearer, calmer, more balanced and renewed.
              </p>
              <Link
                to="/book"
                className="inline-block border border-sand-foreground/40 px-5 py-3 text-[0.55rem] uppercase tracking-brand transition-colors duration-500 hover:border-sand-foreground hover:bg-sand-foreground hover:text-sand"
              >
                Book a session
              </Link>
            </Reveal>

            <Reveal delay={240} className="overflow-hidden">
              <img
                src={ripples}
                alt="Golden water ripples"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-72 w-full object-cover transition-transform duration-[1400ms] hover:scale-105 md:h-[30rem]"
              />
            </Reveal>
          </div>
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
    </>
  );
}

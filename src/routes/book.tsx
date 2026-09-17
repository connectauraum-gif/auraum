import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a session — AURAUM" },
      {
        name: "description",
        content: "Request a spatial clearing, home harmonisation or private sound ritual.",
      },
      { property: "og:title", content: "Book a session — AURAUM" },
      {
        property: "og:description",
        content: "Tell us about your space and we will answer within two days.",
      },
    ],
  }),
  component: BookPage,
});

const options = ["Spatial clearing", "Home harmonisation", "Private ritual", "Studio & retail"];

function BookPage() {
  const [service, setService] = useState(options[0]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1200);
  };

  return (
    <section className="grain relative px-5 pb-24 pt-32 md:px-10 md:pt-44">
      <span className="animate-breathe pointer-events-none absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
            Begin the ritual
          </p>
          <h1 className="font-display mt-4 text-4xl sm:text-6xl">Book a session</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell us a little about the space. We reply within two working days with a proposed
            time.
          </p>
        </Reveal>

        {sent ? (
          <Reveal className="mt-14 border border-gold/40 bg-card/50 p-10 text-center">
            <div className="relative mx-auto grid h-24 w-24 place-items-center">
              <span className="animate-ripple absolute h-16 w-16 rounded-full border border-gold/50" />
              <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_20px_var(--gold)]" />
            </div>
            <h2 className="font-display mt-4 text-3xl">Received</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Thank you. Your request for <span className="text-gold">{service}</span> is with us.
            </p>
            <button type="button" onClick={() => setSent(false)} className="btn-ritual mt-8">
              Send another
            </button>
          </Reveal>
        ) : (
          <Reveal delay={100}>
            <form onSubmit={onSubmit} className="mt-14 space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@email.com" />
              </div>
              <Field label="City / space" name="city" placeholder="Where is the space?" />

              <div>
                <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
                  Service
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setService(o)}
                      data-active={service === o}
                      className="rounded-full border border-border px-4 py-2 text-[0.6rem] uppercase tracking-brand text-muted-foreground transition-all duration-500 hover:border-gold hover:text-foreground data-[active=true]:border-gold data-[active=true]:bg-gold/10 data-[active=true]:text-foreground"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-[0.6rem] uppercase tracking-brand text-muted-foreground"
                >
                  Anything we should know
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="The room, the feeling, the timing…"
                  className="mt-3 w-full resize-none border-b border-input bg-transparent pb-3 text-sm outline-none transition-colors duration-500 placeholder:text-muted-foreground/60 focus:border-gold"
                />
              </div>

              <button type="submit" disabled={sending} className="btn-ritual w-full sm:w-auto">
                {sending ? "Sending…" : "Send request"}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[0.6rem] uppercase tracking-brand text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-3 w-full border-b border-input bg-transparent pb-3 text-sm outline-none transition-colors duration-500 placeholder:text-muted-foreground/60 focus:border-gold"
      />
    </div>
  );
}

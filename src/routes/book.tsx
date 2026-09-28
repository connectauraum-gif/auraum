import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";

type ServiceOption = {
  key: string;
  name: string;
  sub: string;
  isOperatingBusiness?: boolean;
};

const SERVICES: ServiceOption[] = [
  {
    key: "home",
    name: "Home Sound Session",
    sub: "For houses, apartments and private residences.",
  },
  {
    key: "hospitality",
    name: "Hospitality Sound Session",
    sub: "For hotels, restaurants, clubs and guest spaces.",
    isOperatingBusiness: true,
  },
  {
    key: "workplace",
    name: "Workplace Sound Session",
    sub: "For offices, studios, practices and shared workspaces.",
    isOperatingBusiness: true,
  },
  {
    key: "retail",
    name: "Retail & Gallery Sound Session",
    sub: "For boutiques, bookshops, galleries, showrooms and commercial spaces.",
    isOperatingBusiness: true,
  },
  {
    key: "occasion",
    name: "Occasion & Transition Session",
    sub: "For meaningful moments, gatherings and new beginnings.",
  },
];

const ALIASES: Record<string, string> = {
  home: "home",
  "home-sound-clearing": "home",
  "home sound clearing": "home",
  "home-sound-session": "home",
  "home sound session": "home",
  restore: "home",

  hospitality: "hospitality",
  "hospitality-sound-clearing": "hospitality",
  "hospitality sound clearing": "hospitality",
  "hospitality-sound-session": "hospitality",
  "hospitality sound session": "hospitality",
  receive: "hospitality",

  workplace: "workplace",
  "workplace-sound-clearing": "workplace",
  "workplace sound clearing": "workplace",
  "workplace-sound-session": "workplace",
  "workplace sound session": "workplace",
  perform: "workplace",

  retail: "retail",
  "retail-sound-clearing": "retail",
  "retail sound clearing": "retail",
  "retail-gallery": "retail",
  "retail & gallery": "retail",
  "retail-and-gallery": "retail",
  "retail & gallery sound session": "retail",
  "retail & gallery session": "retail",
  "places-of-exchange": "retail",
  "places of exchange": "retail",

  occasion: "occasion",
  "occasion-transition": "occasion",
  "occasion & transition": "occasion",
  "occasion-and-transition": "occasion",
  "occasion & transition sound session": "occasion",
  "occasion & transition session": "occasion",
  reopenings: "occasion",
};

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = typeof search["service"] === "string" ? search["service"].toLowerCase() : "";
    const key = ALIASES[raw];
    return key ? { service: key } : {};
  },
  head: () => ({
    meta: [
      { title: "Book a Session — AURAUM" },
      {
        name: "description",
        content:
          "Tell us a little about your space and what has brought you to AURAUM. Choose the option that best describes your enquiry, then complete the short form.",
      },
      { property: "og:title", content: "Book a Session — AURAUM" },
      {
        property: "og:description",
        content:
          "Home, Hospitality, Workplace, Retail or Occasion & Transition — request a sound session.",
      },
    ],
  }),
  component: BookPage,
});

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const phoneRe = /^[+]?[\d\s()-]{7,20}$/;

function BookPage() {
  const search = Route.useSearch();
  const preselected = "service" in search ? search.service : undefined;
  const [activeKey, setActiveKey] = useState<string | null>(preselected ?? null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const activeService = SERVICES.find((c) => c.key === activeKey) ?? null;

  const choose = (key: string) => {
    setActiveKey(key);
    setErrors({});
    setSent(false);
  };

  const handleFieldChange = (name: string, val: string) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeKey) {
      setErrors({ service: "Please choose a service option above." });
      return;
    }

    const errs: Record<string, string> = {};
    if (!values.name?.trim()) errs.name = "Please enter your name.";
    if (!values.email?.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!emailRe.test(values.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!values.phone?.trim()) {
      errs.phone = "Please enter your telephone or WhatsApp number.";
    } else if (!phoneRe.test(values.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (!values.city?.trim()) errs.city = "Please enter your city and country.";

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus?.();
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  return (
    <section className="grain relative px-5 pb-24 pt-32 md:px-10 md:pt-44">
      <span className="animate-breathe pointer-events-none absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
            Experience Auraum
          </p>
          <h1 className="font-display mt-4 text-4xl tracking-[0.1em] sm:text-6xl">
            BOOK A SESSION
          </h1>
          <div className="mx-auto mt-7 max-w-xl space-y-4 text-sm leading-loose text-muted-foreground">
            <p>
              Tell us a little about your space and what has brought you to{" "}
              <span className="text-foreground">AURAUM</span>. Choose the option that best describes
              your enquiry, then complete the short form. Isa will review it and contact you
              personally to discuss the session.
            </p>
          </div>
        </Reveal>

        {sent ? (
          <Reveal className="mt-14 border border-gold/40 bg-card/50 p-8 text-center sm:p-12">
            <div className="relative mx-auto grid h-24 w-24 place-items-center">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 1.6}s` }}
                  className="animate-ripple absolute h-16 w-16 rounded-full border border-gold/50"
                />
              ))}
              <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_20px_var(--gold)]" />
            </div>
            <p className="font-display mt-6 text-2xl leading-relaxed sm:text-3xl">
              Thank you. Your request has been received. The AURAUM team will be in touch with you
              shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setActiveKey(null);
                setValues({});
              }}
              className="btn-ritual mt-10"
            >
              Send another request
            </button>
          </Reveal>
        ) : (
          <>
            <Reveal delay={100} className="mt-16">
              <p className="text-center text-[0.65rem] uppercase tracking-brand text-foreground/80">
                Choose a service:
              </p>
              {errors.service && (
                <p className="mt-2 text-center text-xs text-destructive">{errors.service}</p>
              )}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => {
                  const on = s.key === activeKey;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => choose(s.key)}
                      aria-pressed={on}
                      className={`group border p-5 text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on
                          ? "border-gold bg-card/60"
                          : "border-border hover:border-gold/60 hover:bg-card/30"
                      } ${s.key === "occasion" ? "sm:col-span-2" : ""}`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                            on ? "bg-gold shadow-[0_0_14px_var(--gold)]" : "bg-border"
                          }`}
                        />
                        <span className="font-display text-xl tracking-[0.08em]">{s.name}</span>
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                        {s.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {activeService && (
              <Reveal key={activeService.key} delay={80} className="mt-14">
                <div className="gold-line w-full" />
                <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl tracking-[0.08em] sm:text-4xl">
                    {activeService.name}
                  </h2>
                  <span className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
                    {activeService.sub}
                  </span>
                </div>

                <form onSubmit={onSubmit} noValidate className="mt-12 space-y-14">
                  {/* Section 1: Your details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl tracking-[0.06em] text-foreground">
                        Your details
                      </h3>
                      <div className="gold-line mt-2 w-16" />
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                      <FormField
                        name="name"
                        label="Name"
                        required
                        value={values.name ?? ""}
                        placeholder="Your full name"
                        autoComplete="name"
                        error={errors.name}
                        onChange={(v) => handleFieldChange("name", v)}
                      />

                      <FormField
                        name="email"
                        label="Email"
                        type="email"
                        required
                        value={values.email ?? ""}
                        placeholder="you@email.com"
                        autoComplete="email"
                        error={errors.email}
                        onChange={(v) => handleFieldChange("email", v)}
                      />

                      <FormField
                        name="phone"
                        label="Telephone / WhatsApp"
                        type="tel"
                        required
                        value={values.phone ?? ""}
                        placeholder="+91 99588 82810"
                        autoComplete="tel"
                        error={errors.phone}
                        onChange={(v) => handleFieldChange("phone", v)}
                      />

                      <FormField
                        name="city"
                        label="City and country"
                        required
                        value={values.city ?? ""}
                        placeholder="e.g. London, UK / Mumbai, India"
                        error={errors.city}
                        onChange={(v) => handleFieldChange("city", v)}
                      />

                      <FormField
                        name="period"
                        label="Preferred date or period"
                        value={values.period ?? ""}
                        placeholder="e.g. Late October, or a specific date"
                        full
                        onChange={(v) => handleFieldChange("period", v)}
                      />
                    </div>
                  </div>

                  {/* Section 2: Tell us about the session */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-2xl tracking-[0.06em] text-foreground">
                        Tell us about the session
                      </h3>
                      <div className="gold-line mt-2 w-16" />
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                      <FormField
                        name="spaceOrOccasion"
                        label="What type of space or occasion is this?"
                        value={values.spaceOrOccasion ?? ""}
                        placeholder="e.g. Private apartment, restaurant, creative office, gallery, wedding…"
                        full
                        onChange={(v) => handleFieldChange("spaceOrOccasion", v)}
                      />

                      <FormField
                        name="intention"
                        label="What would you like the session to address or mark?"
                        type="textarea"
                        value={values.intention ?? ""}
                        placeholder="Tell us what you would like to shift, restore, clear or celebrate within the space…"
                        full
                        onChange={(v) => handleFieldChange("intention", v)}
                      />

                      <FormField
                        name="sizeAndFloors"
                        label="Approximate size of the space and number of floors, if applicable"
                        value={values.sizeAndFloors ?? ""}
                        placeholder="e.g. 250 m² / 2 floors"
                        onChange={(v) => handleFieldChange("sizeAndFloors", v)}
                      />

                      <FormField
                        name="people"
                        label="Approximate number of people who use the space or will attend"
                        value={values.people ?? ""}
                        placeholder="e.g. 4 residents, 15 team members, or 50 guests"
                        onChange={(v) => handleFieldChange("people", v)}
                      />

                      <FormField
                        name="recentChange"
                        label="Is there a recent change, opening or event we should know about?"
                        type="textarea"
                        value={values.recentChange ?? ""}
                        placeholder="e.g. Recent renovation, upcoming opening, team transition, sale preparation…"
                        full
                        onChange={(v) => handleFieldChange("recentChange", v)}
                      />

                      <FormField
                        name="operatingHours"
                        label="For hospitality and other operating businesses, please also tell us whether you would prefer the session before, during or outside operating hours."
                        value={values.operatingHours ?? ""}
                        placeholder="e.g. Before operating hours, outside operating hours, or flexible"
                        full
                        onChange={(v) => handleFieldChange("operatingHours", v)}
                      />

                      <FormField
                        name="anythingElse"
                        label="Is there anything else you would like Isa to know?"
                        type="textarea"
                        value={values.anythingElse ?? ""}
                        placeholder="Any additional details, intentions, or notes for Isa…"
                        full
                        onChange={(v) => handleFieldChange("anythingElse", v)}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-ritual w-full sm:w-auto"
                    >
                      {sending ? "Sending…" : "Book a session"}
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}

const fieldClass =
  "mt-3 w-full border-b bg-transparent pb-3 text-sm outline-none transition-colors duration-500 placeholder:text-muted-foreground/60 focus:border-gold [color-scheme:dark]";

function FormField({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  placeholder = "",
  autoComplete = "off",
  full = false,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  full?: boolean;
}) {
  const border = error ? "border-destructive" : "border-input";
  const isArea = type === "textarea";

  return (
    <div className={`min-w-0 ${full ? "sm:col-span-2" : ""}`}>
      <label
        htmlFor={name}
        className="text-[0.6rem] uppercase tracking-brand text-muted-foreground"
      >
        {label}
        {required ? " *" : ""}
      </label>
      {isArea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          maxLength={1000}
          value={value}
          placeholder={placeholder}
          aria-invalid={!!error}
          data-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} resize-none ${border}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          data-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} ${border}`}
        />
      )}
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

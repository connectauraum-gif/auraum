import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";

type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  full?: boolean;
};

type Category = {
  key: string;
  name: string;
  sub: string;
  intro?: string[];
  fields: FieldDef[];
};

const NAME: FieldDef = {
  name: "name",
  label: "Name",
  required: true,
  placeholder: "Your full name",
  autoComplete: "name",
};
const EMAIL: FieldDef = {
  name: "email",
  label: "Email",
  type: "email",
  required: true,
  placeholder: "you@email.com",
  autoComplete: "email",
};
const PHONE: FieldDef = {
  name: "phone",
  label: "Telephone / WhatsApp",
  type: "tel",
  required: true,
  placeholder: "+00 000 000 000",
  autoComplete: "tel",
};
const CITY: FieldDef = {
  name: "city",
  label: "City & Country",
  required: true,
  placeholder: "City, Country",
};
const SIZE: FieldDef = { name: "size", label: "Size of the Space", placeholder: "Approximate m² / sq ft" };
const FLOORS: FieldDef = { name: "floors", label: "Number of Floors", placeholder: "e.g. 2" };
const PERIOD: FieldDef = {
  name: "period",
  label: "Preferred Date or Period",
  placeholder: "e.g. Late October, or a specific date",
};
const ANYTHING: FieldDef = {
  name: "anythingElse",
  label: "Anything Else You Would Like Isa to Know?",
  type: "textarea",
  full: true,
};

const CATEGORIES: Category[] = [
  {
    key: "restore",
    name: "RESTORE",
    sub: "For private homes, apartments and residences.",
    fields: [
      NAME,
      EMAIL,
      PHONE,
      CITY,
      { name: "homeType", label: "Type of Home", placeholder: "Apartment, villa, townhouse…" },
      SIZE,
      FLOORS,
      { name: "people", label: "Number of People Living There", placeholder: "e.g. 4" },
      { name: "brought", label: "What has brought you to AURAUM?", type: "textarea", full: true },
      {
        name: "history",
        label:
          "Is there anything significant about the home or its recent history that you feel is relevant?",
        type: "textarea",
        full: true,
      },
      PERIOD,
      ANYTHING,
    ],
  },
  {
    key: "receive",
    name: "RECEIVE",
    sub: "For hotels, restaurants, clubs and spaces created to receive others.",
    fields: [
      NAME,
      { name: "company", label: "Company / Property", placeholder: "Name of the property" },
      { name: "role", label: "Role", placeholder: "Your role" },
      EMAIL,
      PHONE,
      CITY,
      { name: "propertyType", label: "Type of Property", placeholder: "Hotel, restaurant, club…" },
      SIZE,
      FLOORS,
      {
        name: "operating",
        label: "Is the Property Currently Operating?",
        placeholder: "Yes / No / Opening soon",
      },
      {
        name: "support",
        label: "What would you like the session to support?",
        type: "textarea",
        full: true,
      },
      {
        name: "occasion",
        label: "Is this connected to an opening, reopening or particular occasion?",
        type: "textarea",
        full: true,
      },
      PERIOD,
      {
        name: "hours",
        label: "Would the session take place before, during or outside operating hours?",
        full: true,
      },
      ANYTHING,
    ],
  },
  {
    key: "perform",
    name: "PERFORM",
    sub: "For offices, studios, practices and other places where people create and work together.",
    intro: [
      "Tell us about your environment, your team, and what you would like to shift or invite into the space.",
    ],
    fields: [
      NAME,
      { name: "company", label: "Company", placeholder: "Company name" },
      { name: "role", label: "Role", placeholder: "Your role" },
      EMAIL,
      PHONE,
      CITY,
      { name: "workspaceType", label: "Type of Workspace", placeholder: "Office, studio, practice…" },
      SIZE,
      FLOORS,
      {
        name: "people",
        label: "Approximate Number of People Using the Space",
        placeholder: "e.g. 20",
      },
      { name: "brought", label: "What has brought you to AURAUM?", type: "textarea", full: true },
      PERIOD,
      ANYTHING,
    ],
  },
  {
    key: "reopenings",
    name: "REOPENINGS",
    sub: "For moments that do not belong inside a box.",
    intro: [
      "A new home. A marriage. A new business. A private gathering. A retreat. A significant transition. Or simply a moment that deserves to be marked with intention.",
      "Tell us what you are creating, changing or stepping into.",
    ],
    fields: [
      NAME,
      EMAIL,
      PHONE,
      CITY,
      {
        name: "occasion",
        label: "What is the occasion or intention?",
        type: "textarea",
        full: true,
      },
      SIZE,
      FLOORS,
      {
        name: "people",
        label: "Approximate Number of People Using the Space",
        placeholder: "e.g. 30",
      },
      { name: "brought", label: "What has brought you to AURAUM?", type: "textarea", full: true },
      PERIOD,
      ANYTHING,
    ],
  },
  {
    key: "places-of-exchange",
    name: "PLACES OF EXCHANGE",
    sub: "For spaces that hold people, energy and purpose.",
    intro: [
      "A bookshop. A boutique. A showroom. A retail environment. Or any other commercial space that would benefit from greater balance, clarity and presence.",
      "Tell us about the space, how it is used, and what you would like to shift, restore or create within it.",
    ],
    fields: [
      NAME,
      EMAIL,
      PHONE,
      { name: "company", label: "Company / Organisation", placeholder: "Name of the business" },
      CITY,
      {
        name: "commercialType",
        label: "Type of Commercial Space",
        placeholder: "Boutique, gallery, showroom…",
      },
      SIZE,
      FLOORS,
      {
        name: "people",
        label: "Approximate Number of People Using the Space",
        placeholder: "e.g. 15",
      },
      {
        name: "address",
        label: "What Would You Like to Address or Create Within the Space?",
        type: "textarea",
        full: true,
      },
      { name: "brought", label: "What Has Brought You to AURAUM?", type: "textarea", full: true },
      PERIOD,
      ANYTHING,
    ],
  },
];

const ALIASES: Record<string, string> = {
  restore: "restore",
  receive: "receive",
  perform: "perform",
  reopenings: "reopenings",
  "places of exchange": "places-of-exchange",
  "places-of-exchange": "places-of-exchange",
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
          "Tell us a little about the space, the people within it, and what has brought you to AURAUM.",
      },
      { property: "og:title", content: "Book a Session — AURAUM" },
      {
        property: "og:description",
        content: "Restore, Receive, Perform, Reopenings or Places of Exchange — request a session.",
      },
    ],
  }),
  component: BookPage,
});

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const phoneRe = /^[+]?[\d\s()-]{7,20}$/;

function validate(cat: Category, v: Record<string, string>): Record<string, string> {
  const e: Record<string, string> = {};
  for (const f of cat.fields) {
    const value = (v[f.name] ?? "").trim();
    if (f.required && !value) {
      e[f.name] = `Please enter your ${f.label.toLowerCase()}.`;
      continue;
    }
    if (!value) continue;
    if (f.type === "email" && !emailRe.test(value)) e[f.name] = "Please enter a valid email address.";
    if (f.type === "tel" && !phoneRe.test(value)) e[f.name] = "Please enter a valid phone number.";
    const max = f.type === "textarea" ? 1000 : 200;
    if (value.length > max) e[f.name] = `Please keep this under ${max} characters.`;
  }
  return e;
}

function BookPage() {
  const search = Route.useSearch();
  const preselected = "service" in search ? search.service : undefined;
  const [activeKey, setActiveKey] = useState<string | null>(preselected ?? null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const active = CATEGORIES.find((c) => c.key === activeKey) ?? null;

  const choose = (key: string) => {
    setActiveKey(key);
    setValues({});
    setErrors({});
    setSent(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!active) return;
    const found = validate(active, values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus?.();
      return;
    }
    setSending(true);
    // Ready for future email / CRM integration — payload: { category: active.key, ...values }
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
              Every place is different, and every session begins with understanding what is already
              there.
            </p>
            <p>
              Tell us a little about the space, the people within it, and what has brought you to{" "}
              <span className="text-foreground">AURAUM</span>.
            </p>
            <p>
              From there, Isa will consider the most appropriate approach for your session and
              contact you personally.
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
              <p className="text-center text-[0.6rem] uppercase tracking-brand text-foreground/80">
                Choose what best describes your space
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {CATEGORIES.map((c) => {
                  const on = c.key === activeKey;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => choose(c.key)}
                      aria-pressed={on}
                      className={`group border p-5 text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        on
                          ? "border-gold bg-card/60"
                          : "border-border hover:border-gold/60 hover:bg-card/30"
                      } ${c.key === "places-of-exchange" ? "sm:col-span-2" : ""}`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                            on ? "bg-gold shadow-[0_0_14px_var(--gold)]" : "bg-border"
                          }`}
                        />
                        <span className="font-display text-xl tracking-[0.12em]">{c.name}</span>
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                        {c.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {active && (
              <Reveal key={active.key} delay={80} className="mt-14">
                <div className="gold-line w-full" />
                <h2 className="font-display mt-10 text-3xl tracking-[0.12em] sm:text-4xl">
                  {active.name}
                </h2>
                <p className="mt-3 text-sm italic text-foreground/80">{active.sub}</p>
                {active.intro?.map((p) => (
                  <p key={p} className="mt-4 text-sm leading-loose text-muted-foreground">
                    {p}
                  </p>
                ))}
                <p className="mt-8 text-[0.6rem] uppercase tracking-brand text-muted-foreground">
                  Please share
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-6 space-y-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    {active.fields.map((f) => (
                      <Field
                        key={f.name}
                        def={f}
                        value={values[f.name] ?? ""}
                        error={errors[f.name]}
                        onChange={(val) => {
                          setValues((prev) => ({ ...prev, [f.name]: val }));
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next[f.name];
                            return next;
                          });
                        }}
                      />
                    ))}
                  </div>

                  <button type="submit" disabled={sending} className="btn-ritual w-full sm:w-auto">
                    {sending ? "Sending…" : "Book a session"}
                  </button>
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

function Field({
  def,
  value,
  onChange,
  error,
}: {
  def: FieldDef;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
}) {
  const border = error ? "border-destructive" : "border-input";
  const isArea = def.type === "textarea";
  return (
    <div className={`min-w-0 ${def.full || isArea ? "sm:col-span-2" : ""}`}>
      <label
        htmlFor={def.name}
        className="text-[0.6rem] uppercase tracking-brand text-muted-foreground"
      >
        {def.label}
        {def.required ? " *" : ""}
      </label>
      {isArea ? (
        <textarea
          id={def.name}
          name={def.name}
          rows={3}
          maxLength={1000}
          value={value}
          aria-invalid={!!error}
          data-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} resize-none ${border}`}
        />
      ) : (
        <input
          id={def.name}
          name={def.name}
          type={def.type ?? "text"}
          value={value}
          placeholder={def.placeholder ?? ""}
          autoComplete={def.autoComplete ?? "off"}
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

import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";

const SERVICES = ["Restore", "Receive", "Perform", "Places of Exchange"] as const;

const SPACE_TYPES = [
  "Home / Residence",
  "Hotel",
  "Restaurant",
  "Office / Workspace",
  "Studio",
  "Boutique",
  "Gallery",
  "Showroom",
  "Salon",
  "Other",
] as const;

export const Route = createFileRoute("/book")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = typeof search.service === "string" ? search.service.toLowerCase() : "";
    const match = SERVICES.find((s) => s.toLowerCase() === raw);
    return match ? { service: match } : {};
  },
  head: () => ({
    meta: [
      { title: "Book a Session — AURAUM" },
      {
        name: "description",
        content: "Tell us a little about your space and how we can support you.",
      },
      { property: "og:title", content: "Book a Session — AURAUM" },
      {
        property: "og:description",
        content: "Request a Restore, Receive, Perform or Places of Exchange session.",
      },
    ],
  }),
  component: BookPage,
});

type Values = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  spaceType: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const phoneRe = /^[+]?[\d\s()-]{7,20}$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.fullName.trim()) e.fullName = "Please enter your full name.";
  else if (v.fullName.trim().length > 100) e.fullName = "Name must be under 100 characters.";

  if (!v.phone.trim()) e.phone = "Please enter a phone number.";
  else if (!phoneRe.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";

  if (!v.email.trim()) e.email = "Please enter an email address.";
  else if (!emailRe.test(v.email.trim())) e.email = "Please enter a valid email address.";
  else if (v.email.trim().length > 255) e.email = "Email must be under 255 characters.";

  if (!v.address.trim()) e.address = "Please enter an address.";
  else if (v.address.trim().length > 200) e.address = "Address must be under 200 characters.";

  if (!v.spaceType) e.spaceType = "Please select a type of space.";
  if (!v.service) e.service = "Please select a service.";
  if (v.message.trim().length > 1000) e.message = "Message must be under 1000 characters.";
  return e;
}

function BookPage() {
  const { service: preselected } = Route.useSearch();
  const [values, setValues] = useState<Values>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    spaceType: "",
    service: preselected ?? "",
    date: "",
    time: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Values) => (val: string) => {
    setValues((prev) => ({ ...prev, [k]: val }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus?.();
      return;
    }
    setSending(true);
    // Ready for future email / CRM integration — payload shape kept stable.
    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1100);
  };

  return (
    <section className="grain relative px-5 pb-24 pt-32 md:px-10 md:pt-44">
      <span className="animate-breathe pointer-events-none absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
            Experience Auraum
          </p>
          <h1 className="font-display mt-4 text-4xl tracking-[0.1em] sm:text-6xl">
            BOOK A SESSION
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell us a little about your space and how we can support you.
          </p>
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
                setValues((v) => ({ ...v, message: "" }));
              }}
              className="btn-ritual mt-10"
            >
              Send another request
            </button>
          </Reveal>
        ) : (
          <Reveal delay={100}>
            <form onSubmit={onSubmit} noValidate className="mt-14 space-y-9">
              <div className="grid gap-9 sm:grid-cols-2">
                <Field
                  label="Full Name *"
                  name="fullName"
                  value={values.fullName}
                  onChange={set("fullName")}
                  error={errors.fullName}
                  placeholder="Your full name"
                  autoComplete="name"
                />
                <Field
                  label="Phone Number *"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                  placeholder="+00 000 000 000"
                  autoComplete="tel"
                />
                <Field
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={set("email")}
                  error={errors.email}
                  placeholder="you@email.com"
                  autoComplete="email"
                />
                <Field
                  label="Address *"
                  name="address"
                  value={values.address}
                  onChange={set("address")}
                  error={errors.address}
                  placeholder="Where is the space?"
                  autoComplete="street-address"
                />
                <Select
                  label="Type of Space *"
                  name="spaceType"
                  value={values.spaceType}
                  onChange={set("spaceType")}
                  error={errors.spaceType}
                  options={[...SPACE_TYPES]}
                  placeholder="Select a space"
                />
                <Select
                  label="Service *"
                  name="service"
                  value={values.service}
                  onChange={set("service")}
                  error={errors.service}
                  options={[...SERVICES]}
                  placeholder="Select a service"
                />
                <Field
                  label="Preferred Date"
                  name="date"
                  type="date"
                  value={values.date}
                  onChange={set("date")}
                />
                <Field
                  label="Preferred Time"
                  name="time"
                  type="time"
                  value={values.time}
                  onChange={set("time")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-[0.6rem] uppercase tracking-brand text-muted-foreground"
                >
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  value={values.message}
                  onChange={(e) => set("message")(e.target.value)}
                  placeholder="The space, the feeling, the timing…"
                  className="mt-3 w-full resize-none border-b border-input bg-transparent pb-3 text-sm outline-none transition-colors duration-500 placeholder:text-muted-foreground/60 focus:border-gold"
                />
                {errors.message && <ErrorText>{errors.message}</ErrorText>}
              </div>

              <button type="submit" disabled={sending} className="btn-ritual w-full sm:w-auto">
                {sending ? "Sending…" : "Book a session"}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ErrorText({ children }: { children: string }) {
  return <p className="mt-2 text-xs text-destructive">{children}</p>;
}

const fieldClass =
  "mt-3 w-full border-b bg-transparent pb-3 text-sm outline-none transition-colors duration-500 placeholder:text-muted-foreground/60 focus:border-gold [color-scheme:dark]";

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="min-w-0">
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
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        data-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} ${error ? "border-destructive" : "border-input"}`}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="text-[0.6rem] uppercase tracking-brand text-muted-foreground"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        aria-invalid={!!error}
        data-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldClass} appearance-none ${error ? "border-destructive" : "border-input"} ${
          value ? "text-foreground" : "text-muted-foreground/60"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-card text-foreground">
            {o}
          </option>
        ))}
      </select>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

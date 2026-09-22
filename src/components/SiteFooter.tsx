import { Link } from "@tanstack/react-router";
import markAsset from "@/assets/mark.png.asset.json";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  return (
    <footer className="grain border-t border-border px-5 py-16 md:px-10">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={markAsset.url}
                alt=""
                loading="lazy"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="font-display text-lg tracking-brand">AURAUM</span>
            </div>
            <p className="mt-5 max-w-sm font-display text-2xl leading-snug text-foreground/80">
              A quieter space. A fuller life.
            </p>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/75">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/journal", label: "Journal" },
                { to: "/book", label: "Book a session" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-brand text-muted-foreground">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/75">
              <li>
                <a href="mailto:hello@auraum.in" className="link-underline hover:text-gold">
                  hello@auraum.in
                </a>
              </li>
              <li>
                <a href="tel:+919958882810" className="link-underline hover:text-gold">
                  +91 99588 82810
                </a>
              </li>
              <li className="text-muted-foreground">By appointment only</li>
            </ul>
          </div>
        </div>

        <div className="gold-line mt-14 w-full" />
        <div className="mt-6 flex flex-col gap-2 text-[0.6rem] uppercase tracking-brand text-muted-foreground sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Auraum</span>
          <span>The ritual of space</span>
        </div>
      </Reveal>
    </footer>
  );
}

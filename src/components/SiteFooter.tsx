import { Link } from "@tanstack/react-router";
import markAsset from "@/assets/mark.png.asset.json";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  return (
    <footer className="grain border-t border-stone/80 bg-stone px-5 py-16 text-charcoal md:px-10">
      <Reveal className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="./favicon.png"
                alt="AURAUM"
                loading="lazy"
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="font-display text-lg tracking-brand text-charcoal">AURAUM</span>
            </div>
            <p className="mt-5 max-w-sm font-display text-2xl leading-snug text-charcoal/85">
              A quieter space. A fuller life.
            </p>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-brand text-sage font-medium">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-charcoal/75">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/journal", label: "Journal" },
                { to: "/book", label: "Book a session" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline hover:text-charcoal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] uppercase tracking-brand text-sage font-medium">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-charcoal/75">
              <li>
                <a href="mailto:hello@auraum.in" className="link-underline hover:text-charcoal">
                  hello@auraum.in
                </a>
              </li>
              <li>
                <a href="tel:+919958882810" className="link-underline hover:text-charcoal">
                  +91 99588 82810
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/919958882810?text=${encodeURIComponent(
                    "Hello AURAUM, I would like to know more about booking a session for my space.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline hover:text-charcoal"
                >
                  WhatsApp: +91 99588 82810
                </a>
              </li>
              <li className="text-charcoal/60">By appointment only</li>
            </ul>
          </div>
        </div>

        <div className="gold-line mt-14 w-full" />
        <div className="mt-6 flex flex-col gap-2 text-[0.6rem] uppercase tracking-brand text-charcoal/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Auraum</span>
          <span>The ritual of space</span>
        </div>
      </Reveal>
    </footer>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import markAsset from "@/assets/mark.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-border/80 bg-background/90 backdrop-blur-xl shadow-xs"
            : "border-b border-border/40 bg-background/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 md:px-10">
          <Link to="/" className="flex min-w-0 items-center gap-3 group">
            <img
              src="/logo.png"
              alt="AURAUM"
              className="h-10 w-auto object-contain transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.classList.remove('sr-only');
              }}
            />
            <span className="font-display truncate text-lg sm:text-xl tracking-brand text-foreground">
              AURAUM
            </span>
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="link-underline text-[0.65rem] uppercase tracking-brand text-foreground/75 transition-colors hover:text-foreground"
                  data-active={pathname === l.to}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/book" className="btn-ritual">
                Book a session
              </Link>
            </nav>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-50 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background/50 hover:border-gold/50 hover:bg-background/80 transition-colors"
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute h-px w-5 bg-foreground transition-all duration-500 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-foreground transition-all duration-500 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-foreground transition-all duration-500 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay menu */}
      <div
        className={`fixed inset-0 z-40 grain bg-background/95 backdrop-blur-2xl transition-all duration-700 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8 md:px-20 max-w-[1400px] mx-auto">
          <span className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
          <ul className="relative space-y-5 md:space-y-7">
            {[...links, { to: "/book", label: "Book a session" } as const].map((l, i) => (
              <li
                key={l.to}
                style={{ transitionDelay: `${open ? 120 + i * 80 : 0}ms` }}
                className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display block text-4xl md:text-6xl text-foreground/90 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="gold-line relative mt-10 w-full max-w-md" />
          <p className="relative mt-6 text-[0.6rem] md:text-xs uppercase tracking-brand text-muted-foreground">
            Space clearing trough sound
          </p>
        </div>
      </div>
    </>
  );
}

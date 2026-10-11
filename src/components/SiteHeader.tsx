import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import markAsset from "@/assets/mark.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/journal", label: "Journal" },
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
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3.5 md:px-10">
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

          <div className="flex items-center gap-2.5 sm:gap-6 md:gap-8">
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
              className="relative z-[60] grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background/80 hover:border-gold/50 hover:bg-background transition-colors md:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span
                className={`absolute h-[1.5px] w-5 bg-foreground transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-foreground transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-foreground transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay menu - mobile only */}
      <div
        className={`fixed inset-0 z-[120] flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-[#171412] text-[#f2eee9] transition-all duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100 visible" : "pointer-events-none opacity-0 invisible"
        }`}
      >
        {/* Top bar inside overlay with branding and explicit Close button */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#f2eee9]/10 px-5 sm:px-8">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AURAUM"
              className="h-9 w-auto object-contain"
            />
            <span className="font-display text-lg tracking-brand text-[#f2eee9]">
              AURAUM
            </span>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-full border border-gold/50 bg-gold/15 px-4 py-1.5 text-gold hover:bg-gold/25 transition-colors"
          >
            <span className="text-[0.7rem] font-medium uppercase tracking-brand text-gold">Close</span>
            <span className="text-sm font-semibold text-gold">✕</span>
          </button>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-10 py-8 flex flex-col">
          <div className="my-auto py-4">
            <ul className="space-y-6 sm:space-y-8">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-display block text-3xl sm:text-4xl text-[#f2eee9] transition-colors hover:text-gold active:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="font-display block text-3xl sm:text-4xl text-[#f2eee9] transition-colors hover:text-gold active:text-gold"
                >
                  Book a session
                </Link>
              </li>
            </ul>

            <div className="mt-10 h-px w-full max-w-xs bg-gradient-to-r from-gold/40 to-transparent" />
            <p className="mt-4 text-[0.65rem] uppercase tracking-brand text-[#f2eee9]/60">
              Space clearing through sound
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

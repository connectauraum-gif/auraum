import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 550);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        done ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative grid h-40 w-40 place-items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 1.2}s` }}
            className="animate-ripple absolute h-24 w-24 rounded-full border border-gold/50"
          />
        ))}
        <span className="animate-breathe absolute h-24 w-24 rounded-full bg-gold/10 blur-xl" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_24px_var(--gold)]" />
      </div>

      <p className="font-display shimmer-text mt-6 text-2xl tracking-brand">AURAUM</p>
      <p className="mt-3 text-[0.6rem] tracking-brand text-muted-foreground">
        TUNING THE SPACE
      </p>

      <div className="mt-8 h-px w-44 overflow-hidden bg-border sm:w-64">
        <span
          className="block h-full bg-gold transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 font-display text-sm text-muted-foreground tabular-nums">
        {progress}
      </p>
    </div>
  );
}

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

// Module-level audio reference so sound persists and resonates even after Preloader finishes
let persistentAudio: HTMLAudioElement | null = null;
let soundPlayedOnce = false;

function playPreloaderAudio() {
  if (typeof window === "undefined" || soundPlayedOnce) return;

  if (!persistentAudio) {
    persistentAudio = new Audio("/healing-sound.mp3");
    persistentAudio.preload = "auto";
  }
  persistentAudio.volume = 0.4;

  const promise = persistentAudio.play();
  if (promise !== undefined) {
    promise
      .then(() => {
        soundPlayedOnce = true;
        cleanupListeners();
      })
      .catch(() => {
        // Autoplay policy prevented immediate playback; waiting for first interaction
      });
  }
}

function handleFirstInteraction() {
  if (!soundPlayedOnce) {
    playPreloaderAudio();
  }
}

function setupListeners() {
  if (typeof window === "undefined" || soundPlayedOnce) return;
  const events = ["pointerdown", "mousedown", "touchstart", "click", "keydown"] as const;
  events.forEach((evt) => {
    window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
  });
}

function cleanupListeners() {
  if (typeof window === "undefined") return;
  const events = ["pointerdown", "mousedown", "touchstart", "click", "keydown"] as const;
  events.forEach((evt) => {
    window.removeEventListener(evt, handleFirstInteraction, true);
  });
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setupListeners();
    playPreloaderAudio();

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (transitioning) {
      document.body.style.overflow = "";
    }
  }, [transitioning]);

  useEffect(() => {
    const DURATION = 3000; // Exactly 3 seconds
    let animationFrameId: number;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const currentProgress = Math.min(100, (elapsed / DURATION) * 100);
      setProgress(currentProgress);

      if (elapsed < DURATION) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setProgress(100);
        setTransitioning(true);
        onComplete?.();
        setTimeout(() => {
          setDone(true);
        }, 1000);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  if (done) return null;

  const ritualPhase =
    progress < 35
      ? "AWAKENING FREQUENCIES"
      : progress < 75
      ? "CLEAR  •  BALANCE  •  HARMONISE"
      : "ENTERING THE SANCTUARY";

  const circumference = 452.39; // 2 * Math.PI * 72

  return (
    <>
      <div
        id="intro"
        aria-hidden={transitioning}
        onPointerDown={handleFirstInteraction}
        onClick={handleFirstInteraction}
        className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          transitioning
            ? "pointer-events-none invisible opacity-0 scale-[1.04] blur-[4px]"
            : "pointer-events-auto visible opacity-100 scale-100 blur-0"
        }`}
        style={{
          backgroundColor: "var(--background)",
          backgroundImage:
            "radial-gradient(circle at center, color-mix(in oklab, var(--gold) 6%, var(--background)) 0%, var(--background) 70%, color-mix(in oklab, var(--ink) 85%, var(--background)) 100%)",
        }}
      >
        {/* Ambient Breathing Gold Aura */}
        <span className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-md">
          {/* Centered Circular Progress Around Logo */}
          <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 my-2">
            {/* Subtle Outer Dash Guide Ring */}
            <div className="absolute inset-2 rounded-full border border-dashed border-gold/20 animate-spin-slow pointer-events-none" />

            {/* SVG Circular Progress Tracing Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 160 160"
            >
              {/* Background circular track */}
              <circle
                cx="80"
                cy="80"
                r="72"
                className="stroke-gold/15"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Active gold progress stroke */}
              <circle
                cx="80"
                cy="80"
                r="72"
                className="stroke-gold"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (circumference * progress) / 100}
                strokeLinecap="round"
                fill="none"
                style={{
                  filter: "drop-shadow(0 0 6px rgba(230, 195, 140, 0.6))",
                }}
              />
            </svg>

            {/* Center Logo */}
            <div className="relative z-10 flex flex-col items-center justify-center p-4">
              <img
                src="/logo.png"
                alt="AURAUM"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(230,195,140,0.35)]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Brand Typography */}
          <div className="mt-4 flex flex-col items-center">
            <h2 className="font-display text-2xl sm:text-3xl tracking-[0.32em] text-foreground font-light">
              AURAUM
            </h2>
            <p className="text-[0.62rem] uppercase tracking-[0.38em] text-gold/80 mt-1.5 font-light">
              The Ritual of Space
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mt-5 flex flex-col items-center gap-1.5">
            <span className="font-display text-sm tracking-[0.2em] text-gold/90 tabular-nums">
              {Math.round(progress)}%
            </span>
            <span className="text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground font-light">
              {ritualPhase}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

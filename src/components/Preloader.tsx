import { useEffect, useRef, useState } from "react";

export function Preloader() {
  const [entered, setEntered] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  const audioPlayed = useRef(false);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current && !audioPlayed.current) {
        try {
          audioRef.current.volume = 0.35;
          await audioRef.current.play();
          audioPlayed.current = true;
          document.removeEventListener("click", playAudio);
          document.removeEventListener("touchstart", playAudio);
          document.removeEventListener("scroll", playAudio);
        } catch (error) {
          // Autoplay blocked until interaction
        }
      }
    };

    document.addEventListener("click", playAudio);
    document.addEventListener("touchstart", playAudio);
    document.addEventListener("scroll", playAudio, { passive: true });

    // Attempt immediately
    playAudio();

    return () => {
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
      document.removeEventListener("scroll", playAudio);
    };
  }, []);

  useEffect(() => {
    const duration = 2000; // 2 seconds loading
    const interval = 20;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setEntered(true);
          }, 300);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);



  const ritualPhase =
    progress < 35
      ? "AWAKENING FREQUENCIES"
      : progress < 75
      ? "CLEAR  •  BALANCE  •  HARMONISE"
      : "ENTERING THE SANCTUARY";

  return (
    <>
      {/* INTRO SCREEN */}
      <div
        id="intro"
        aria-hidden={entered}
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-[1200ms] ease-out ${
          entered
            ? "pointer-events-none invisible opacity-0 scale-105"
            : "pointer-events-auto visible opacity-100 scale-100"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(198, 156, 109, 0.12) 0%, rgba(18, 16, 14, 0.98) 60%, #080808 100%)",
        }}
      >
        {/* Ambient Breathing Gold Aura */}
        <span className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-md">
          {/* Central Sacred Resonance Mandala */}
          <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 my-2">
            {/* Concentric Expanding Acoustic Sound Wave Rings */}
            <div
              className="absolute inset-0 rounded-full border border-gold/40 animate-ring-expand pointer-events-none"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute inset-0 rounded-full border border-gold/30 animate-ring-expand pointer-events-none"
              style={{ animationDelay: "1.1s" }}
            />
            <div
              className="absolute inset-0 rounded-full border border-gold/20 animate-ring-expand pointer-events-none"
              style={{ animationDelay: "2.2s" }}
            />

            {/* Rotating Sacred Geometry Outer Dashed Ring */}
            <div className="absolute inset-4 rounded-full border border-dashed border-gold/30 animate-spin-slow pointer-events-none" />

            {/* Counter-rotating Inner Orbital Ring */}
            <div className="absolute inset-8 rounded-full border border-gold/20 animate-spin-reverse pointer-events-none">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(230,195,140,0.9)]" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/60" />
            </div>

            {/* SVG Circular Progress Tracing Ring */}
            <svg
              className="absolute inset-6 w-[calc(100%-3rem)] h-[calc(100%-3rem)] -rotate-90 pointer-events-none"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-gold/15"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-gold transition-all duration-150 ease-linear"
                strokeWidth="2"
                strokeDasharray={276.46}
                strokeDashoffset={276.46 - (276.46 * progress) / 100}
                strokeLinecap="round"
                fill="none"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(230, 195, 140, 0.6))",
                }}
              />
            </svg>

            {/* Central Singing Bowl / AURAUM Emblem */}
            <div className="relative z-10 flex flex-col items-center justify-center p-6 transition-transform duration-700">
              <img
                src="/logo.png"
                alt="AURAUM"
                className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(230,195,140,0.35)] transition-transform duration-500 hover:scale-105"
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

          {/* Acoustic Harmonic Frequency Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-8 mt-6">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
              <span
                key={idx}
                className="w-[2px] rounded-full bg-gradient-to-t from-gold/30 via-gold to-gold/80"
                style={{
                  animation: "sound-wave 1.3s ease-in-out infinite alternate",
                  animationDelay: `${idx * 0.14}s`,
                }}
              />
            ))}
          </div>

          {/* Poetic Ritual Phase State */}
          <div className="mt-5 h-5 flex items-center justify-center">
            <span
              key={ritualPhase}
              className="text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground animate-fade-in font-light transition-opacity duration-500"
            >
              {ritualPhase}
            </span>
          </div>
        </div>
      </div>

      {/* HEALING SOUND - Plays once at the start, does not replay */}
      <audio ref={audioRef} id="healingSound" preload="auto">
        <source
          src="/freesound_community-e-flat-tibetan-singing-bowl-struck-38746.mp3"
          type="audio/mpeg"
        />
        <source src="/healing-sound.mp3" type="audio/mpeg" />
        <source src="/healing-sound.wav" type="audio/wav" />
        Your browser does not support audio.
      </audio>
    </>
  );
}

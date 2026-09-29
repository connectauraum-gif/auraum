import { useEffect, useRef, useState } from "react";

export function Preloader() {
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  useEffect(() => {
    // Attempt playback on load if allowed by browser policy
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {
        // Will play upon clicking Enter Experience
      });
    }
  }, []);

  const handleEnter = async () => {
    setEntered(true);
    if (audioRef.current && audioRef.current.paused) {
      try {
        audioRef.current.volume = 0.35;
        await audioRef.current.play();
      } catch (error) {
        console.log("Audio could not start:", error);
      }
    }
  };

  return (
    <>
      {/* INTRO SCREEN */}
      <div
        id="intro"
        aria-hidden={entered}
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center text-center transition-all duration-[1200ms] ease-out ${
          entered
            ? "pointer-events-none invisible opacity-0"
            : "pointer-events-auto visible opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 45%), #0b0b0b",
        }}
      >
        <span className="animate-breathe pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center px-6">
          <div className="logo font-display mb-4 text-4xl tracking-[10px] text-white sm:text-5xl sm:tracking-[14px] md:text-6xl">
            AURAUM
          </div>

          <div className="tagline mb-10 text-xs uppercase tracking-[3px] text-white/70 sm:text-sm">
            ENTER YOUR FREQUENCY
          </div>

          <button
            id="enterBtn"
            type="button"
            onClick={handleEnter}
            className="cursor-pointer rounded-full border border-white/50 bg-transparent px-9 py-3.5 text-xs tracking-[2px] text-white outline-none transition-all duration-300 hover:bg-white hover:text-[#0b0b0b] sm:text-sm"
          >
            ENTER EXPERIENCE
          </button>
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

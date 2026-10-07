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

  useEffect(() => {
    // Attempt playback on load if allowed by browser policy
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by the browser until user interaction
      });
    }

    const duration = 2000; // 2 seconds loading
    const interval = 20;
    const step = (100 / duration) * interval;
    
    let audioAllowed = false;
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().then(() => {
        audioAllowed = true;
      }).catch(() => {
        audioAllowed = false;
      });
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // If audio played successfully, enter automatically.
          // Otherwise wait for user interaction to play the audio.
          if (audioAllowed) {
            setTimeout(() => {
              setEntered(true);
            }, 300);
          }
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.35;
        await audioRef.current.play();
      } catch (e) {
        console.log("Audio still blocked", e);
      }
    }
    setEntered(true);
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

        <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm">
          <div className="logo font-display mb-8 text-4xl tracking-[10px] text-white sm:text-5xl sm:tracking-[14px] md:text-6xl flex items-center justify-center flex-col gap-6">
            <img src="/logo.png" alt="AURAUM" className="w-48 h-auto object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <span className="sr-only">AURAUM</span>
          </div>

          <div className={`w-full transition-opacity duration-500 ${progress >= 100 ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 mt-8'}`}>
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 text-xs tracking-[3px] text-white/50 uppercase">
              Loading Space...
            </div>
          </div>

          <div className={`transition-all duration-700 ${progress >= 100 ? 'opacity-100 translate-y-0 mt-8' : 'opacity-0 translate-y-4 pointer-events-none absolute'}`}>
            <button
              onClick={handleEnter}
              className="cursor-pointer rounded-full border border-white/50 bg-transparent px-9 py-3.5 text-xs tracking-[2px] text-white outline-none transition-all duration-300 hover:bg-white hover:text-[#0b0b0b] sm:text-sm"
            >
              ENTER EXPERIENCE
            </button>
            <div className="mt-4 text-[0.6rem] uppercase tracking-[2px] text-white/40">
              Interaction required for sound
            </div>
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

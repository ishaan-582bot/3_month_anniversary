import { useState, useRef, useEffect, useMemo } from 'react';
import Hero from './components/Hero';
import PasswordGate from './components/PasswordGate';
import Timeline from './components/Timeline';
import PolaroidGallery from './components/PolaroidGallery';
import Envelopes from './components/Envelopes';
import LoveCards from './components/LoveCards';
import Letter from './components/Letter';
import AudioButton from './components/AudioButton';
import ReasonsWall from './components/ReasonsWall';
import Footer from './components/Footer';
import CONFIG from './config';

/* ═══════════════════════════════════════════════════════════════
   FLOATING HEARTS BACKGROUND
   ═══════════════════════════════════════════════════════════════ */
function FloatingHearts() {
  const hearts = useMemo(() =>
    [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 18,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.2,
      symbol: ['❤️', '🤍', '💛', '🌹', '✨'][Math.floor(Math.random() * 5)],
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            bottom: '-30px',
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING ROSE PETALS
   ═══════════════════════════════════════════════════════════════ */
function FloatingPetals() {
  const petals = useMemo(() =>
    [...Array(10)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 10,
      duration: 12 + Math.random() * 15,
      delay: Math.random() * 15,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="floating-petal"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          🌹
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MUSIC TOGGLE BUTTON
   ═══════════════════════════════════════════════════════════════ */
function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  // Try to autoplay on first user interaction
  useEffect(() => {
    if (!CONFIG.backgroundMusicUrl) return;

    const tryPlay = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {});
      }
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };

    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });

    return () => {
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };
  }, [hasInteracted]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      setHasInteracted(true);
    }
  };

  if (!CONFIG.backgroundMusicUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={CONFIG.backgroundMusicUrl} loop />
      <button
        onClick={toggle}
        className={`
          fixed bottom-6 right-6 z-50
          w-12 h-12 rounded-full
          bg-dark-surface/80 backdrop-blur-md
          border border-gold/30
          flex items-center justify-center
          shadow-lg cursor-pointer
          transition-all duration-300
          hover:border-gold/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]
          ${isPlaying ? 'music-toggle' : ''}
        `}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gold/60" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )}
      </button>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative min-h-screen bg-dark-bg">
      {/* Background decorations — always visible */}
      <FloatingHearts />
      <FloatingPetals />

      {/* Music toggle */}
      <MusicToggle />

      {/* Hero always visible */}
      <Hero />

      {/* Password gate */}
      {!unlocked && (
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      )}

      {/* Gated content */}
      {unlocked && (
        <main>
          <Timeline />
          <PolaroidGallery />
          <Envelopes />
          <LoveCards />
          <Letter />
          <AudioButton />
          <ReasonsWall />
          <Footer />
        </main>
      )}
    </div>
  );
}

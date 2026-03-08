import { useState, useRef } from 'react';
import CONFIG from '../config';
import { useInView } from '../hooks/useInView';

export default function AudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [sectionRef, isInView] = useInView();

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`
        relative py-20 px-4 z-10 text-center
        transition-all duration-700
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      {CONFIG.audioMessageUrl && (
        <audio ref={audioRef} src={CONFIG.audioMessageUrl} onEnded={() => setIsPlaying(false)} />
      )}

      <p className="text-cream/60 mb-6 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
        A message for you 🎙️
      </p>

      <button
        onClick={togglePlay}
        className={`
          relative w-20 h-20 md:w-24 md:h-24 rounded-full
          bg-gradient-to-br from-gold to-gold-light
          flex items-center justify-center mx-auto
          shadow-[0_0_30px_rgba(212,175,55,0.4)]
          hover:shadow-[0_0_50px_rgba(212,175,55,0.6)]
          transition-all duration-300 cursor-pointer
          ${isPlaying ? 'spin-slow' : ''}
        `}
        aria-label={isPlaying ? 'Pause audio message' : 'Play audio message'}
      >
        {isPlaying ? (
          <svg className="w-8 h-8 text-dark-bg" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-dark-bg ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {!CONFIG.audioMessageUrl && (
        <p className="text-cream/30 text-sm mt-4" style={{ fontFamily: 'var(--font-body)' }}>
          audio file coming soon...
        </p>
      )}
    </section>
  );
}

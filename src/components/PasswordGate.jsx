import { useState, useRef } from 'react';
import CONFIG from '../config';

export default function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const cardRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === CONFIG.passwordAnswer.toLowerCase()) {
      setShowBurst(true);
      setUnlocked(true);
      setTimeout(() => onUnlock(), 1200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <section id="password-gate" className="relative min-h-screen flex items-center justify-center px-4 z-10">
      {/* Heart burst overlay */}
      {showBurst && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute text-4xl heart-burst"
              style={{
                animationDelay: `${i * 0.08}s`,
                transform: `rotate(${i * 30}deg) translateX(${60 + i * 15}px)`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      <div
        ref={cardRef}
        className={`
          w-full max-w-md p-8 md:p-10 rounded-2xl text-center
          bg-dark-surface/80 backdrop-blur-md
          border border-gold/20
          shadow-[0_0_40px_rgba(212,175,55,0.1)]
          transition-all duration-300
          ${error ? 'shake border-red-accent/60 shadow-[0_0_30px_rgba(230,57,70,0.3)]' : ''}
          ${unlocked ? 'scale-110 opacity-0 transition-all duration-700' : ''}
        `}
      >
        {/* Lock icon */}
        <div className="text-5xl mb-6">🔒</div>

        <h2
          className="text-2xl md:text-3xl text-gold mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Before you enter...
        </h2>

        <p className="text-cream/70 mb-8 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
          {CONFIG.passwordQuestion}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            className={`
              w-full px-5 py-3 rounded-xl
              bg-dark-bg/60 border text-cream text-center text-lg
              placeholder:text-cream/30
              focus:outline-none focus:ring-2 focus:ring-gold/40
              transition-all duration-300
              ${error ? 'border-red-accent' : 'border-gold/30'}
            `}
            style={{ fontFamily: 'var(--font-body)' }}
            autoFocus
          />
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl font-semibold text-lg
              bg-gradient-to-r from-gold/80 to-gold
              text-dark-bg hover:from-gold hover:to-gold-light
              transition-all duration-300 cursor-pointer
              shadow-[0_0_20px_rgba(212,175,55,0.3)]
              hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
            "
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Unlock My Heart 💛
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-accent text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            That's not it, love... try again 💔
          </p>
        )}
      </div>
    </section>
  );
}

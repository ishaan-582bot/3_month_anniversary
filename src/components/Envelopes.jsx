import { useState } from 'react';
import CONFIG from '../config';
import { useInView } from '../hooks/useInView';

function Envelope({ envelope, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Envelope container */}
      <div
        className="relative cursor-pointer group w-52 md:w-60 mx-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Envelope body */}
        <div className="relative bg-red-accent rounded-lg pt-8 pb-6 px-4 shadow-lg transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(230,57,70,0.3)]">
          {/* Flap */}
          <div
            className={`
              absolute -top-0.5 left-0 right-0 h-16
              overflow-hidden
            `}
            style={{ perspective: '500px' }}
          >
            <div
              className={`
                w-full h-full bg-red-accent
                transition-transform duration-500 ease-out
                border-b border-red-accent
              `}
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                transformOrigin: 'top center',
                transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                background: isOpen ? '#c62834' : '#e63946',
              }}
            />
          </div>

          {/* Wax seal */}
          <div className={`
            absolute top-8 left-1/2 -translate-x-1/2 z-10
            w-10 h-10 rounded-full
            bg-gradient-to-br from-gold to-gold-light
            flex items-center justify-center text-dark-bg text-lg
            shadow-[0_2px_10px_rgba(212,175,55,0.5)]
            transition-all duration-300
            ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          `}>
            ❤️
          </div>

          {/* Label */}
          <p
            className="text-center text-cream text-sm mt-6 leading-snug"
            style={{ fontFamily: 'var(--font-cursive)', fontSize: '1rem' }}
          >
            {envelope.label}
          </p>

          {/* Hint */}
          <p className="text-center text-cream/40 text-xs mt-2">
            {isOpen ? 'tap to close' : 'tap to open'}
          </p>
        </div>
      </div>

      {/* Letter content */}
      {isOpen && (
        <div className="mt-4 mx-auto w-52 md:w-60 letter-slide-up">
          <div className="bg-cream rounded-lg p-5 shadow-xl border-t-4 border-red-accent relative">
            <p
              className="text-dark-bg text-sm leading-relaxed whitespace-pre-line"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {envelope.letter}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Envelopes() {
  const [titleRef, titleInView] = useInView();

  return (
    <section className="relative py-20 md:py-32 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2
            className="text-4xl md:text-6xl text-gold mb-3"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            Open When...
          </h2>
          <p className="text-cream/50" style={{ fontFamily: 'var(--font-body)' }}>
            sealed with love — open only when you need to 💌
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {CONFIG.envelopes.map((env, i) => (
            <Envelope key={i} envelope={env} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

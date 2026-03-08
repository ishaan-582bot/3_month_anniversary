import { useState, useEffect, useRef, useCallback } from 'react';
import CONFIG from '../config';

function ReasonCard({ reason, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay based on index within viewport batch
          setTimeout(() => setIsVisible(true), (index % 4) * 80);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [index]);

  // Cycle through card color variants
  const variants = [
    'bg-[#1a0505] border-gold/30',
    'bg-[#ffffff0d] border-red-accent/30',
    'bg-[#2a0a0a] border-gold/30',
  ];
  const variant = variants[index % 3];

  return (
    <div
      ref={ref}
      className={`
        relative rounded-2xl px-4 py-3 md:px-5 md:py-4
        border backdrop-blur-sm
        transition-all duration-300
        ${variant}
        ${isVisible ? 'reason-pop' : 'opacity-0'}
        ${isHovered ? 'shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.03] -translate-y-1' : ''}
        cursor-default
      `}
      style={{
        animationDelay: isVisible ? `${(index % 4) * 0.08}s` : '0s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-2">
        {/* Number */}
        <span
          className="text-gold/50 font-bold text-xs mt-0.5 shrink-0"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {index + 1}.
        </span>

        {/* Hover heart */}
        <span
          className={`
            text-sm shrink-0 transition-all duration-300
            ${isHovered ? 'opacity-100 scale-110 pulse-heart' : 'opacity-0 scale-75'}
          `}
        >
          ❤️
        </span>

        {/* Reason text */}
        <p
          className="text-cream/80 text-sm md:text-base leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {reason}
        </p>
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = useRef(
    [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 10,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 1,
      color: ['#d4af37', '#e63946', '#fff8e7', '#f0d060', '#c62834'][Math.floor(Math.random() * 5)],
      shape: Math.random() > 0.5 ? '❤️' : '✨',
    }))
  ).current;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: '-20px',
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}

export default function ReasonsWall() {
  const [showFinale, setShowFinale] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const finaleRef = useRef(null);
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  // Title observer
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTitleVisible(true); obs.unobserve(el); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Finale observer - triggers after last card
  useEffect(() => {
    const el = finaleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShowFinale(true);
        setShowConfetti(true);
        obs.unobserve(el);
        // Stop confetti after animation
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-20 md:py-32 px-4 z-10 overflow-hidden">
      {/* Subtle gold shimmer background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulseHeart ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2
            className="text-4xl md:text-6xl shimmer-text mb-3"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            100 Reasons I Love You, Qaseeda 🤍
          </h2>
          <p className="text-cream/40 text-sm md:text-base" style={{ fontFamily: 'var(--font-body)' }}>
            scroll slowly, every one is true
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {CONFIG.hundredReasons.map((reason, i) => (
            <div key={i} className="break-inside-avoid">
              <ReasonCard reason={reason} index={i} />
            </div>
          ))}
        </div>

        {/* Finale trigger and message */}
        <div ref={finaleRef} className="mt-16 md:mt-24 text-center min-h-[200px] flex items-center justify-center">
          {showFinale && (
            <p
              className="text-3xl md:text-5xl text-gold/90 max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: 'var(--font-cursive)',
                animation: 'shimmer 3s ease-in-out infinite',
                opacity: 0,
                animationFillMode: 'forwards',
                animationDelay: '0.5s',
              }}
            >
              <span style={{ animation: 'fadeInSlow 2s ease-out 0.5s forwards', opacity: 0, display: 'inline-block' }}>
                {CONFIG.finalReasonsMessage}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </section>
  );
}

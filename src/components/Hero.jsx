import CONFIG from '../config';

export default function Hero() {
  const scrollDown = () => {
    const next = document.getElementById('password-gate');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 z-10">
      {/* Accent text */}
      <p
        className="text-3xl md:text-5xl mb-4 text-gold"
        style={{ fontFamily: 'var(--font-cursive)' }}
      >
        {CONFIG.heroAccent}
      </p>

      {/* Main name */}
      <h1
        className="text-5xl md:text-8xl font-bold shimmer-text mb-6"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {CONFIG.herName}
      </h1>

      {/* Subtitle */}
      <p
        className="text-xl md:text-2xl text-cream/80 mb-12"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {CONFIG.heroSubtitle}
      </p>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="bounce-arrow cursor-pointer mt-8 text-gold/70 hover:text-gold transition-colors"
        aria-label="Scroll down"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </button>
    </section>
  );
}

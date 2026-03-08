import CONFIG from '../config';
import { useInView } from '../hooks/useInView';

export default function Footer() {
  const [ref, isInView] = useInView();

  return (
    <footer
      ref={ref}
      className={`
        relative py-20 md:py-32 px-4 z-10 text-center
        transition-all duration-1000
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="max-w-2xl mx-auto">
        {/* Closing message */}
        <h2
          className="text-3xl md:text-5xl text-gold mb-6"
          style={{ fontFamily: 'var(--font-cursive)' }}
        >
          {CONFIG.closingMessage}
        </h2>

        {/* Pulsing heart */}
        <div className="text-4xl mb-8 pulse-heart">❤️</div>

        {/* Credit */}
        <p className="text-cream/40 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
          {CONFIG.closingCredit}
        </p>

        {/* Bottom spacer */}
        <div className="mt-16 w-16 h-px bg-gold/20 mx-auto" />
      </div>
    </footer>
  );
}

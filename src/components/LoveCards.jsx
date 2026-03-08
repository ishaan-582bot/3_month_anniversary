import CONFIG from '../config';
import { useInView } from '../hooks/useInView';

function LoveCard({ item, index }) {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`
        stagger-card
        ${isInView ? 'visible' : ''}
        group relative p-6 md:p-8 rounded-2xl
        bg-dark-surface/70 backdrop-blur-sm
        border border-transparent
        hover:border-gold/40
        shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]
        transition-all duration-500
        cursor-default
      `}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Gold top border on hover */}
      <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

      {/* Number */}
      <span
        className="text-gold/40 text-sm font-bold tracking-widest"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Emoji */}
      <div className="text-3xl my-3">{item.emoji}</div>

      {/* Reason */}
      <p
        className="text-cream/80 leading-relaxed"
        style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem' }}
      >
        {item.reason}
      </p>
    </div>
  );
}

export default function LoveCards() {
  const [titleRef, titleInView] = useInView();

  return (
    <section className="relative py-20 md:py-32 px-4 z-10">
      <div className="max-w-5xl mx-auto">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2
            className="text-4xl md:text-6xl text-gold mb-3"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            Reasons I Love You
          </h2>
          <p className="text-cream/50" style={{ fontFamily: 'var(--font-body)' }}>
            just a few of the infinite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.loveReasons.map((item, i) => (
            <LoveCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

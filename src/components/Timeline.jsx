import CONFIG from '../config';
import { useInView } from '../hooks/useInView';

function TimelineItem({ milestone, index }) {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`
        relative flex items-center w-full mb-12
        md:mb-16
        ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
        flex-col md:flex-row
      `}
    >
      {/* Content card */}
      <div
        className={`
          w-full md:w-5/12
          p-6 rounded-xl
          bg-dark-surface/60 backdrop-blur-sm
          border border-gold/15
          shadow-[0_0_20px_rgba(212,175,55,0.05)]
          transition-all duration-700 ease-out
          hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]
          ${isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-12' : 'translate-x-12'} md:${isLeft ? '-translate-x-12' : 'translate-x-12'}`}
        `}
        style={{ transitionDelay: '0.2s' }}
      >
        <span
          className="text-sm text-gold/70 uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {milestone.date}
        </span>
        <h3
          className="text-xl md:text-2xl text-cream mt-2 mb-3"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {milestone.title}
        </h3>
        <p className="text-cream/65 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          {milestone.description}
        </p>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex w-2/12 justify-center">
        <div
          className={`
            w-5 h-5 rounded-full bg-gold timeline-dot
            transition-all duration-500
            ${isInView ? 'scale-100' : 'scale-0'}
          `}
        />
      </div>

      {/* Spacer */}
      <div className="hidden md:block w-5/12" />

      {/* Mobile dot */}
      <div
        className={`
          md:hidden absolute left-0 top-6
          w-4 h-4 rounded-full bg-gold timeline-dot
          transition-all duration-500
          ${isInView ? 'scale-100' : 'scale-0'}
        `}
      />
    </div>
  );
}

export default function Timeline() {
  const [titleRef, titleInView] = useInView();

  return (
    <section className="relative py-20 md:py-32 px-4 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 md:mb-24 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2
            className="text-4xl md:text-6xl text-gold mb-3"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            Our Story
          </h2>
          <p className="text-cream/50" style={{ fontFamily: 'var(--font-body)' }}>
            every chapter worth reading
          </p>
        </div>

        {/* Timeline line */}
        <div className="relative">
          {/* Vertical gold line - desktop center, mobile left */}
          <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

          <div className="pl-8 md:pl-0">
            {CONFIG.milestones.map((milestone, i) => (
              <TimelineItem key={i} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

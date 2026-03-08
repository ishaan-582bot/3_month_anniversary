import { useState } from 'react';
import CONFIG from '../config';
import { useInView } from '../hooks/useInView';

function Polaroid({ polaroid, index }) {
  const [flipped, setFlipped] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.1 });

  // Slight random rotation for scattered effect
  const rotations = [-6, 3, -4, 5, -3, 4];
  const rotation = rotations[index % rotations.length];

  // Gradient placeholders for photos
  const gradients = [
    'linear-gradient(135deg, #2a0a0a 0%, #1a0505 50%, #d4af3720 100%)',
    'linear-gradient(135deg, #1a0505 0%, #0f0202 50%, #e6394620 100%)',
    'linear-gradient(135deg, #d4af3710 0%, #1a0505 50%, #2a0a0a 100%)',
    'linear-gradient(135deg, #0f0202 0%, #2a0a0a 50%, #d4af3715 100%)',
    'linear-gradient(135deg, #2a0a0a 0%, #e6394610 50%, #1a0505 100%)',
    'linear-gradient(135deg, #1a0505 0%, #d4af3715 50%, #0f0202 100%)',
  ];

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out cursor-pointer
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
      style={{
        transform: isInView && !flipped ? `rotate(${rotation}deg)` : 'rotate(0deg)',
        transitionDelay: `${index * 0.1}s`,
        perspective: '1000px',
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`
          relative w-56 h-72 md:w-64 md:h-80
          transition-transform duration-500 hover:scale-105 hover:rotate-0
          hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className={`polaroid-inner ${flipped ? 'flipped' : ''}`}>
          {/* FRONT */}
          <div className="polaroid-front bg-cream rounded-sm p-3 pb-14 shadow-xl">
            {/* Photo area */}
            <div
              className="w-full h-full rounded-sm flex items-center justify-center text-4xl"
              style={{
                background: polaroid.imageUrl
                  ? `url(${polaroid.imageUrl}) center/cover`
                  : gradients[index % gradients.length],
              }}
            >
              {!polaroid.imageUrl && (
                <span className="opacity-30">📷</span>
              )}
            </div>
            {/* Caption */}
            <p
              className="absolute bottom-3 left-0 right-0 text-center text-dark-bg text-sm px-2"
              style={{ fontFamily: 'var(--font-cursive)', fontSize: '1.1rem' }}
            >
              {polaroid.caption}
            </p>
          </div>

          {/* BACK */}
          <div className="polaroid-back bg-cream rounded-sm p-6 shadow-xl flex items-center justify-center">
            <div className="text-center">
              <p
                className="text-dark-bg leading-relaxed text-sm md:text-base"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {polaroid.backNote}
              </p>
              <span className="block mt-4 text-red-accent text-2xl">❤️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PolaroidGallery() {
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
            Our Moments
          </h2>
          <p className="text-cream/50" style={{ fontFamily: 'var(--font-body)' }}>
            tap to flip — there's a message on the back 💌
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {CONFIG.polaroids.map((p, i) => (
            <Polaroid key={i} polaroid={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

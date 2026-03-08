import { useState, useEffect, useRef } from 'react';
import CONFIG from '../config';
import { useInView } from '../hooks/useInView';

export default function Letter() {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [sectionRef, isInView] = useInView({ threshold: 0.1 });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      setIsTyping(true);

      const fullText = CONFIG.letterText;
      let i = 0;

      const interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setIsDone(true);
        }
      }, 18); // Speed of typing

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 px-4 z-10">
      <div className="max-w-3xl mx-auto">
        {/* Paper background */}
        <div className="bg-cream/95 rounded-2xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Decorative top border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-accent via-gold to-red-accent" />

          {/* Letter title */}
          <h2
            className="text-3xl md:text-4xl text-red-accent mb-8 text-center"
            style={{ fontFamily: 'var(--font-cursive)' }}
          >
            A Letter For You
          </h2>

          {/* Typed letter */}
          <div
            className="text-dark-bg leading-loose whitespace-pre-line text-base md:text-lg min-h-[200px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {displayedText}
            {isTyping && <span className="typewriter-cursor" />}
          </div>

          {/* Signature */}
          {isDone && (
            <div className="mt-10 text-right">
              <p
                className="text-2xl md:text-3xl text-dark-bg whitespace-pre-line"
                style={{
                  fontFamily: 'var(--font-cursive)',
                  animation: 'fadeIn 1s ease-out',
                }}
              >
                {CONFIG.letterSignature}
              </p>
            </div>
          )}

          {/* Subtle paper texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M0 20h40M20 0v40\' stroke=\'%23000\' stroke-width=\'.5\' opacity=\'.1\'/%3E%3C/svg%3E")' }}
          />
        </div>
      </div>
    </section>
  );
}

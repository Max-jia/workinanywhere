import { useEffect, useRef, useState } from 'react';
import './BlurText.css';

export default function BlurText({
  text = '',
  delay = 80,
  animateBy = 'words',
  className = '',
  style = {},
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const segments = animateBy === 'words'
    ? text.split(/(\s+)/).filter(Boolean)
    : text.split('').filter(Boolean);

  return (
    <p ref={containerRef} className={`blur-text ${className}`} style={style}>
      {segments.map((seg, i) =>
        seg.trim() === '' ? (
          <span key={i} className="blur-word" style={{ marginRight: 0 }}>&nbsp;</span>
        ) : (
          <span
            key={i}
            className={`blur-word ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * delay}ms` }}
            onTransitionEnd={() => {
              if (i === segments.length - 1) onAnimationComplete?.();
            }}
          >
            {animateBy === 'characters' ? seg : seg}
          </span>
        )
      )}
    </p>
  );
}

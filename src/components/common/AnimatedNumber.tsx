import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  formatWithCommas?: boolean;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1800,
  prefix = '',
  suffix = '',
  formatWithCommas = false,
  className = '',
}) => {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = performance.now();

            const step = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic curve
              const eased = 1 - Math.pow(1 - progress, 3);
              const nextVal = Math.floor(eased * value);
              setCurrent(nextVal);

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setCurrent(value);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formattedNumber = formatWithCommas
    ? current.toLocaleString('en-IN')
    : current.toString();

  return (
    <span ref={elementRef} className={`tabular-nums transition-all ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

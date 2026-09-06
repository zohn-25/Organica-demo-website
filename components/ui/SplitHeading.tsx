'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitHeadingProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  stagger?: number;
  delay?: number;
}

export function SplitHeading({
  children,
  as: Component = 'h2',
  className = '',
  stagger = 0.035,
  delay = 0,
}: SplitHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll<HTMLElement>('.word-inner');
      if (!words.length) return;

      gsap.fromTo(
        words,
        {
          y: '115%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, delay]);

  // Split string into words while preserving whitespace
  const words = children.split(' ');

  return (
    <Component ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="word-mask">
          <span className="word-inner">{word}</span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}

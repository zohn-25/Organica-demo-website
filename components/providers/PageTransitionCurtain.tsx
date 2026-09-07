'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function PageTransitionCurtain() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip curtain sweep on initial page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Respect prefers-reduced-motion: instant transition, no curtain sweep
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const curtain = curtainRef.current;
    const logo = logoRef.current;
    if (!curtain || !logo) return;

    // Reset initial positions
    gsap.set(curtain, { y: '100%', display: 'flex' });
    gsap.set(logo, { opacity: 0, scale: 0.82 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(curtain, { y: '100%', display: 'none' });
        ScrollTrigger.refresh();
      },
    });

    // Step 1: Curtain sweeps up from bottom to cover screen (280ms)
    tl.to(curtain, {
      y: '0%',
      duration: 0.28,
      ease: 'power3.inOut',
    })
      // Step 2: Organica Brand Mark pulses in center (160ms)
      .to(
        logo,
        {
          opacity: 1,
          scale: 1,
          duration: 0.16,
          ease: 'back.out(2)',
        },
        '-=0.08'
      )
      // Step 3: Logo subtly pulses out (120ms)
      .to(logo, {
        opacity: 0,
        scale: 1.06,
        duration: 0.12,
        ease: 'power2.in',
      })
      // Step 4: Curtain sweeps out toward the top to reveal new page (280ms)
      .to(curtain, {
        y: '-100%',
        duration: 0.28,
        ease: 'power3.inOut',
      });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[99999] pointer-events-none hidden items-center justify-center bg-[#141412] text-[#FAF8F3] overflow-hidden select-none"
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      {/* Decorative Warm Organic Accent Wave on Curtain Edge */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2E5A36] via-[#F2B705] to-[#2E5A36]" />

      {/* Centered Branded Emblem */}
      <div
        ref={logoRef}
        className="flex flex-col items-center gap-2.5 opacity-0 px-4"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="/images/logo.jpg"
            alt="Organica"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>
        <span className="text-[10px] sm:text-xs font-body tracking-[0.3em] text-[#A6A295] uppercase font-semibold">
          Clean Eating • Guwahati
        </span>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SIGNATURE_BOWLS } from '@/features/menu/data/menu-data';
import { BowlHighlightCard } from '@/features/menu/components/BowlHighlightCard';
import { Sparkles } from 'lucide-react';
import { SplitHeading } from '@/components/ui/SplitHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SignatureBowlsSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.signature-bowl-card');
      if (cards.length) {
        gsap.fromTo(
          cards,
          {
            scale: 0.85,
            rotate: 4,
            opacity: 0,
            y: 40,
          },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.4)',
            stagger: 0.14,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="signature-bowls"
      className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E8E3D8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF9E6] border border-[#F2B705]/30 text-[#B88800] text-xs font-body font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F2B705]" />
            <span>Chef&apos;s Crafted Masterpieces</span>
          </div>

          <SplitHeading className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#141412] tracking-tight">
            Our Signature Bowls
          </SplitHeading>

          <p className="text-sm sm:text-base text-[#6B685F] font-body leading-relaxed">
            Meticulously balanced macro profiles engineered for peak athletic performance,
            clean satiety, and unbeatable culinary depth.
          </p>
        </div>

        {/* 3 Highlight Cards with subtle overshoot bounce */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SIGNATURE_BOWLS.map((bowl) => (
            <div key={bowl.id} className="signature-bowl-card">
              <BowlHighlightCard bowl={bowl} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Flame, Sprout, PackageCheck } from 'lucide-react';
import { ScatterStrawberry, ScatterBasil, ScatterTomato } from '@/components/ui/ScatterElements';
import { SplitHeading } from '@/components/ui/SplitHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function WhatsOnPlate() {
  const shouldReduceMotion = useReducedMotion();

  // 4 Process Cards matching the exact layout of the reference design:
  // Card 1: White, Card 2: Near-Black (#141412), Card 3: White, Card 4: White
  // with REAL authentic Organica content
  const processCards = [
    {
      step: '01',
      tag: 'Macro Target',
      title: 'Nutritional Calibration',
      description: 'Select precise high-protein, keto, or vegan macro counts verified by sports nutritionists.',
      isDark: false,
      icon: Target,
    },
    {
      step: '02',
      tag: 'Clean Cooking',
      title: 'Zero Seed-Oil Prep',
      description: 'Cooked strictly in cold-pressed virgin coconut, mustard oil, or grass-fed A2 cultured ghee.',
      isDark: true, // The standout dark slate card from the reference
      icon: Flame,
    },
    {
      step: '03',
      tag: 'Farm Harvest',
      title: '12h Direct Sourcing',
      description: 'Fresh organic greens and heirloom vegetables cut from partner Assam & Northeast farms daily.',
      isDark: false,
      icon: Sprout,
    },
    {
      step: '04',
      tag: 'Compostable',
      title: 'Zero-Plastic Delivery',
      description: 'Dispatched warm in 100% biodegradable sugarcane bagasse meal containers within 35 mins.',
      isDark: false,
      icon: PackageCheck,
    },
  ];

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll('.process-card-item');
      if (cards.length) {
        gsap.fromTo(
          cards,
          {
            x: -30,
            opacity: 0,
            clipPath: 'inset(0% 40% 0% 0%)',
          },
          {
            x: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="py-20 lg:py-32 bg-[#FFFFFF] relative overflow-hidden select-none">
      {/* ── Background Subtle Ambient Fluid Geometry ── */}
      <div className="absolute -top-10 -right-20 w-[600px] h-[600px] pointer-events-none opacity-20">
        <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
          <circle cx="300" cy="300" r="280" stroke="#E8E3D8" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="210" stroke="#2E5A36" strokeWidth="1" strokeOpacity="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ══════════════════════════════════════════════════════════════════════
            PART 1: EDITORIAL FOOD HERO SPLIT (REFERENCE DESIGN SECTION 2)
            Left: Massive overflowing gourmet bowl + Floating Strawberries
            Center: Real Headline & Description + 'More' pill button
            Right: Floating satellite bowl + Cherry Tomato
           ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-24 lg:mb-32">
          {/* ── Left Column: Large Gourmet Salad Bowl with Floating Strawberries ── */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-start">
            {/* The Main Circular Top-Down Bowl (Overflowing Left Edge) */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -40 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] lg:-ml-12 rounded-full overflow-hidden shadow-[0_30px_70px_-15px_rgba(20,20,18,0.22)] border-4 sm:border-8 border-white group"
            >
              <Image
                src="/images/section2-large-bowl.jpg"
                alt="Organica Signature Grilled Chicken & Avocado Salad Bowl"
                fill
                priority
                sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 460px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

            {/* Floating Organic Ripe Strawberries with Leaves (Direct Reference Match) */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 sm:-top-8 left-36 sm:left-56 lg:left-64 z-20 pointer-events-none"
            >
              <ScatterStrawberry size={64} />
            </motion.div>

            {/* Subtle Basil Leaf Accent */}
            <div className="absolute -bottom-4 left-6 sm:left-12 z-20 pointer-events-none opacity-85 hidden sm:block">
              <ScatterBasil size={46} />
            </div>
          </div>

          {/* ── Center Column: Real Headline, Description & 'More' Pill Button ── */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-4 sm:space-y-5 px-2 sm:px-0">
            {/* Real Kicker Subtitle */}
            <span className="text-xs sm:text-sm font-body font-bold text-[#2E5A36] uppercase tracking-[0.25em] block">
              Organic Integrity • Guwahati
            </span>

            {/* Real Headline */}
            <SplitHeading className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#141412] leading-[1.14] tracking-tight">
              Honest, Clean Food. Zero Hidden Oils.
            </SplitHeading>

            {/* Real Description */}
            <p className="font-body text-xs sm:text-sm lg:text-base text-[#6B685F] leading-relaxed max-w-md mx-auto lg:mx-0">
              Most takeout compromises with refined seed oils and chemical thickeners. Organica crafts
              100% clean, macro-counted bowls from non-GMO Assam heirloom farms.
            </p>

            {/* Sleek Minimalist 'More' Pill Button (Matching Reference) */}
            <div className="pt-2 sm:pt-3">
              <Link
                href="/menu"
                className="cursor-pointer inline-flex items-center justify-center px-9 py-3 rounded-full bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] font-body font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                More
              </Link>
            </div>
          </div>

          {/* ── Right Column: Floating Satellite Bowl (Matching Reference) ── */}
          <div className="lg:col-span-3 hidden lg:flex items-center justify-end relative">
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="relative w-44 h-44 xl:w-52 xl:h-52 rounded-full overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image
                src="/images/basa-bowl.jpg"
                alt="Pan-Seared Freshwater Basa & Rainbow Quinoa"
                fill
                sizes="208px"
                className="object-cover"
              />
            </motion.div>

            {/* Floating cherry tomato garnish */}
            <div className="absolute -top-3 right-4 z-20 pointer-events-none">
              <ScatterTomato size={38} />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            PART 2: 4 PROCESS STEP CARDS (REFERENCE DESIGN SECTION 3)
            Card 1 (White) ─ • ─ Card 2 (Black #141412) ─ • ─ Card 3 (White) ─ • ─ Card 4 (White)
            + Floating Mini Plate on the right
            ALL with REAL authentic Organica content!
           ══════════════════════════════════════════════════════════════════════ */}
        <div className="relative pt-6">
          {/* Section Header */}
          <div className="mb-10 sm:mb-14 text-center lg:text-left">
            <span className="text-xs sm:text-sm font-body font-bold text-[#6B685F] uppercase tracking-[0.25em] block mb-2">
              Our Process
            </span>
            <SplitHeading as="h3" className="font-heading font-black text-2xl sm:text-3xl text-[#141412] tracking-tight">
              Simple, transparent, from soil to table
            </SplitHeading>
          </div>

          {/* 4 Connected Cards Grid */}
          <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch relative">
            {processCards.map((card, index) => {
              const IconComp = card.icon;

              return (
                <div key={card.step} className="process-card-item relative flex flex-col">
                  {/* Card Container */}
                  <div
                    className={`h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                      card.isDark
                        ? 'bg-[#141412] text-[#FAF8F3] shadow-2xl ring-1 ring-[#2A2924] lg:scale-[1.03]'
                        : 'bg-[#FFFFFF] text-[#141412] border border-[#E8E3D8] shadow-sm hover:shadow-md hover:-translate-y-1'
                    }`}
                  >
                    {/* Top: Icon & Step Tag */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        {/* Red/Orange Circle Icon Badge echoing reference */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            card.isDark
                              ? 'bg-[#FF5E36] text-white shadow-md shadow-[#FF5E36]/30'
                              : 'bg-[#FFF0EB] text-[#FF5E36]'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>

                        {/* Minimal Step Identifier */}
                        <span
                          className={`text-[11px] font-mono font-bold tracking-widest ${
                            card.isDark ? 'text-[#FAF8F3]/60' : 'text-[#6B685F]'
                          }`}
                        >
                          STEP {card.step}
                        </span>
                      </div>

                      {/* Subtitle tag */}
                      <span
                        className={`text-[11px] font-body font-bold uppercase tracking-[0.2em] block ${
                          card.isDark ? 'text-[#F2B705]' : 'text-[#2E5A36]'
                        }`}
                      >
                        {card.tag}
                      </span>

                      {/* Card Title */}
                      <h4
                        className={`font-heading font-extrabold text-base sm:text-lg leading-snug ${
                          card.isDark ? 'text-[#FAF8F3]' : 'text-[#141412]'
                        }`}
                      >
                        {card.title}
                      </h4>

                      {/* Clean Description */}
                      <p
                        className={`text-xs font-body leading-relaxed ${
                          card.isDark ? 'text-[#FAF8F3]/70' : 'text-[#6B685F]'
                        }`}
                      >
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Indicator Bar (Echoing the horizontal dash in reference cards) */}
                    <div className="pt-6 mt-4 border-t border-current/10 flex items-center justify-between">
                      <div
                        className={`h-1 rounded-full ${
                          card.isDark ? 'w-10 bg-[#FF5E36]' : 'w-8 bg-[#E8E3D8]'
                        }`}
                      />
                      <span
                        className={`text-[10px] font-mono ${
                          card.isDark ? 'text-[#FAF8F3]/50' : 'text-[#9C988D]'
                        }`}
                      >
                        0{index + 1}/04
                      </span>
                    </div>
                  </div>

                  {/* Desktop Horizontal Connector Pill between cards (Except last) */}
                  {index < processCards.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3.5 z-20 -translate-y-1/2 items-center pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-[#141412]/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating mini garnish dish on the far right of the 4 cards (Matching Reference) */}
          <div className="hidden xl:block absolute -bottom-6 -right-12 pointer-events-none z-10 opacity-90">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-3 border-white">
              <Image
                src="/images/momos-plate.jpg"
                alt="Steamed Himalayan Herb Dumplings"
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

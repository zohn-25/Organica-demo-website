'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Check, Sparkles, ShoppingBag, Award } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { formatINR } from '@/lib/utils';
import { ScatterBasil } from '@/components/ui/ScatterElements';
import { SplitHeading } from '@/components/ui/SplitHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function CustomFoodBanner() {
  const { addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const showcaseItems = [
    {
      id: 'french-toast-spec',
      name: 'Caramelized Brioche French Toast',
      kicker: 'Artisanal Breakfast • Limited Batch',
      tagline: 'Slow-fermented sourdough brioche, A2 grass-fed butter & wild blueberries.',
      description:
        'Slow-fermented sourdough brioche soaked in pasture-raised country eggs and grass-fed A2 cultured butter. Caramelized to crisp golden perfection and topped with wild forest honey, fresh organic bananas, and handpicked mountain blueberries.',
      price: 340,
      calories: 420,
      protein: 18,
      isVeg: true,
      image: '/images/french-toast.jpg',
      badge: 'Chef’s Breakfast Special',
      highlights: [
        { label: 'Zero Refined Seed Oils', desc: 'A2 grass-fed cultured butter' },
        { label: '24h Cold-Ferment', desc: 'Gut-friendly sourdough' },
        { label: '18g Clean Protein', desc: 'Pasture-raised eggs' },
      ],
      review: {
        stars: 5,
        quote: 'The best clean-cheat breakfast in Guwahati. Truly wholesome, zero seed oils, and unbelievable caramelization on the crust.',
        author: 'Chef Rohan Verma',
        role: 'Executive Pastry Chef & Clean Food Critic',
      },
    },
    {
      id: 'grilled-chicken-spec',
      name: 'Herb-Crusted Farmhouse Chicken',
      kicker: 'High-Protein Power Plate • Chef’s Reserve',
      tagline: 'Antibiotic-free pasture-raised chicken breast with cold-pressed rosemary emulsion.',
      description:
        'Succulent antibiotic-free chicken breast crusted in crushed mountain rosemary, thyme, and cold-pressed extra virgin mustard-olive emulsion. Served alongside charred organic broccolini and garlic-herbed heirloom roots.',
      price: 395,
      calories: 520,
      protein: 48,
      isVeg: false,
      image: '/images/grilled-chicken.jpg',
      badge: 'High Protein Favorite',
      highlights: [
        { label: '48g High Protein', desc: 'Lean antibiotic-free breast' },
        { label: 'Cold-Pressed Oils', desc: 'Zero industrial seed oils' },
        { label: 'Farm-Fresh Broccolini', desc: '12h harvest from Assam farms' },
      ],
      review: {
        stars: 5,
        quote: 'Phenomenal clean protein. You can taste the purity of cold-pressed virgin oils and pasture-raised chicken. Never dry, always bursting with flavor.',
        author: 'Pooja Kashyap',
        role: 'Strength & Sports Nutritionist, Guwahati',
      },
    },
  ];

  const current = showcaseItems[selectedItemIdx];

  const handleBuy = () => {
    addToCart({
      id: current.id,
      name: current.name,
      category: 'power-plates',
      price: current.price,
      description: current.tagline,
      isVeg: current.isVeg,
      calories: current.calories,
      protein: current.protein,
      image: current.image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const sweepContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const sweep = sweepContainerRef.current;
    if (!el || !sweep) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Horizontal wipe reveal: background panel sweeping in from left to right as section enters viewport
      gsap.fromTo(
        sweep,
        {
          clipPath: 'inset(0% 100% 0% 0%)',
          opacity: 0.8,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-[#FAF8F3] relative overflow-hidden select-none border-b border-[#E8E3D8]"
    >
      {/* ── Horizontal Sweep Decorative Background Layer ── */}
      <div
        ref={sweepContainerRef}
        className="absolute inset-0 bg-gradient-to-r from-[#F4EFE6] via-[#FAF8F3] to-[#F4EFE6] pointer-events-none z-0"
        style={{ willChange: 'clip-path' }}
      />

      {/* Subtle ambient botanical accent */}
      <div className="absolute top-10 right-8 pointer-events-none opacity-40 hidden lg:block z-0">
        <ScatterBasil size={54} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Top Header & Dish Switcher Tabs ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E8E3D8]/80">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-body font-bold text-[#2E5A36] uppercase tracking-[0.25em] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Chef&apos;s Table • Signature Spotlight</span>
            </span>
            <SplitHeading className="font-heading font-black text-3xl sm:text-4xl text-[#141412] tracking-tight">
              Culinary Artistry, Zero Compromise.
            </SplitHeading>
          </div>

          {/* Interactive Dish Selector Tabs */}
          <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-full border border-[#E8E3D8] shadow-xs self-start sm:self-auto">
            {showcaseItems.map((item, idx) => {
              const isSelected = selectedItemIdx === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItemIdx(idx)}
                  className={`cursor-pointer px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-body font-bold transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#141412] text-[#FAF8F3] shadow-md scale-[1.02]'
                      : 'text-[#6B685F] hover:text-[#141412] hover:bg-[#FAF8F3]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#F2B705]' : 'bg-[#9C988D]'}`} />
                  <span>{item.name.split(' ')[0]} {item.name.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Showcase Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left Column: Editorial Culinary Narrative & Buying Action ── */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Dish Kicker & Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-body font-extrabold uppercase tracking-[0.2em] text-[#2E5A36] bg-[#EBF4ED] px-3 py-1 rounded-full">
                      {current.kicker}
                    </span>
                    <span className="text-[11px] font-body font-bold text-[#6B685F] bg-white px-2.5 py-1 rounded-full border border-[#E8E3D8]">
                      {current.isVeg ? '🌱 100% Vegetarian' : '🍗 Clean Poultry'}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#141412] tracking-tight leading-[1.12]">
                    {current.name}
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#2E5A36] font-semibold leading-snug">
                    {current.tagline}
                  </p>
                </div>

                {/* Narrative Paragraph */}
                <p className="font-body text-xs sm:text-sm lg:text-[15px] text-[#52504A] leading-relaxed">
                  {current.description}
                </p>

                {/* 3 Sourcing & Purity Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {current.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="bg-white p-3.5 rounded-2xl border border-[#E8E3D8] shadow-2xs space-y-1"
                    >
                      <span className="font-heading font-bold text-xs text-[#141412] block">
                        {h.label}
                      </span>
                      <span className="text-[11px] text-[#6B685F] font-body block leading-tight">
                        {h.desc}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price, Macros & Buy Action */}
                <div className="pt-4 border-t border-[#E8E3D8]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-black text-3xl sm:text-4xl text-[#141412]">
                        {formatINR(current.price)}
                      </span>
                      <span className="text-xs text-[#6B685F] font-body">
                        / single serving
                      </span>
                    </div>
                    <p className="text-[11px] text-[#2E5A36] font-bold font-body">
                      ⚡ {current.protein}g Protein • {current.calories} kcal • Zero Seed Oils
                    </p>
                  </div>

                  <button
                    onClick={handleBuy}
                    className="cursor-pointer px-8 py-4 rounded-full bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] font-body font-extrabold text-sm shadow-md hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5"
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#F2B705]" />
                        <span>Added to Order</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#F2B705]" />
                        <span>Buy This Creation</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right Column: Food Showcase Frame & Tasting Note Card ── */}
          <div className="lg:col-span-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-80 sm:h-[420px] lg:h-[460px] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl border border-[#E8E3D8] bg-[#141412] group"
              >
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141412]/60 via-transparent to-transparent" />

                {/* Top Badge on Photo */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
                    <Star className="w-3.5 h-3.5 text-[#F2B705] fill-[#F2B705]" />
                    <span>{current.badge}</span>
                  </span>
                </div>

                {/* Floating Tasting Note Card */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 border border-[#E8E3D8] shadow-2xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-extrabold text-xs sm:text-sm text-[#141412] flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#2E5A36]" />
                        <span>Chef&apos;s Tasting Note</span>
                      </span>

                      <div className="flex items-center gap-1 text-[#FF5E36]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#4A4843] font-body leading-relaxed italic">
                      &ldquo;{current.review.quote}&rdquo;
                    </p>

                    <div className="pt-2 border-t border-[#E8E3D8]/80 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#141412] font-heading">{current.review.author}</span>
                      <span className="text-[#2E5A36] font-bold bg-[#EBF4ED] px-2 py-0.5 rounded-full">
                        Verified Tasting
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

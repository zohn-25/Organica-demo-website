'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Clock, Phone, Sparkles } from 'lucide-react';
import {
  ScatterBasil,
  ScatterTomato,
  ScatterAvocado,
  ScatterSpiceSpoon,
  ScatterPeppercorns,
} from '@/components/ui/ScatterElements';
import { useCart } from '@/features/cart/CartContext';
import { SIGNATURE_BOWLS } from '@/features/menu/data/menu-data';
import { HeroImageSkeleton } from '@/components/ui/skeletons/HeroImageSkeleton';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const heroItem = SIGNATURE_BOWLS[0];

  useEffect(() => {
    // After entrance animation settles, trigger gentle idle float
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  // ── Entrance Variants ──
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const fromTopLeft: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: -140, y: -100, rotate: -25 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const fromTopRight: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, x: 150, y: -120, rotate: 25 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const fromBottom: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 120, rotate: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  const plateVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, scale: 0.72, rotate: -35 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 72,
        damping: 16,
        delay: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F3] w-full min-h-[640px] max-h-[850px] lg:h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 pb-4 lg:pb-6 select-none">
      {/* ── Background Organic Contours & Dark Slate Panel ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle Organic Background Wave Contour on Left (giving rich organic feel, not plain) */}
        <div className="absolute top-1/4 -left-20 w-[580px] h-[580px] pointer-events-none opacity-40 z-0">
          <svg viewBox="0 0 600 600" fill="none" className="w-full h-full">
            <path
              d="M 50,300 C 120,180 280,140 400,240 C 520,340 580,480 480,560 C 380,640 200,580 120,480 C 40,380 -20,420 50,300 Z"
              fill="#F2ECE1"
            />
            <path
              d="M 120,320 C 180,220 320,180 420,270 C 520,360 540,460 450,520 C 360,580 220,530 160,440 C 100,350 60,420 120,320 Z"
              fill="#FAF4EB"
            />
          </svg>
        </div>

        {/* The Black Slate Panel on the right: extended height (-top-6 to -bottom-24) and wider (62%) to cover cards seamlessly */}
        <div
          className="absolute -top-6 -bottom-24 right-0 w-full lg:w-[62%] xl:w-[60%] bg-[#141412] shadow-2xl overflow-hidden"
          style={{
            clipPath: 'polygon(26% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        >
          {/* Tall Gourmet Culinary Backdrop: Red chilies, leafy radishes, zucchini discs, sweet corn & deep slate */}
          <div className="absolute inset-0 opacity-95">
            <Image
              src="/images/hero-culinary-backdrop.jpg"
              alt="Fresh Organic Culinary Ingredients on Black Slate"
              fill
              priority
              className="object-cover object-right"
            />
            {/* Soft gradient fade on the left transition */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141412] via-[#141412]/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* ── Main Hero Content Area (Centered vertically in viewport) ── */}
      <div className="flex-1 flex items-center w-full relative z-10 my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* ── Left Column: Headline, Description & Buy Button (Matching Reference Exactly) ── */}
            <motion.div variants={textVariants} className="lg:col-span-6 space-y-4 lg:space-y-5">
              {/* Kicker Subtitle */}
              <span className="text-xs sm:text-sm font-body font-bold text-[#2E5A36] uppercase tracking-[0.25em] block">
                Organic • Seed-Oil Free • Guwahati
              </span>

              {/* Bold Headline */}
              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#141412] leading-[1.12] tracking-tight">
                Clean Eating, Perfected for You.
              </h1>

              {/* Authentic Description */}
              <p className="font-body text-xs sm:text-sm lg:text-base text-[#6B685F] leading-relaxed max-w-md">
                Chef-crafted harvest bowls, verified sports macro counts, and zero industrial seed oils.
                Fresh heirloom produce harvested daily from partner organic farms in Assam.
              </p>

              {/* Price & Buy Button Row */}
              <div className="pt-1 sm:pt-2 flex items-center gap-5 sm:gap-6">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-body font-semibold text-[#6B685F] line-through">
                    10$ (₹350)
                  </span>
                  <span className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#141412]">
                    7,25$ <span className="text-base sm:text-lg font-bold text-[#2E5A36]">(₹295)</span>
                  </span>
                </div>

                <button
                  onClick={() =>
                    addToCart({
                      id: heroItem.id,
                      name: heroItem.name,
                      category: 'power-plates',
                      price: heroItem.price,
                      description: heroItem.description,
                      isVeg: heroItem.isVeg,
                      calories: heroItem.calories,
                      protein: heroItem.protein,
                      image: '/images/hero-salad-bowl.jpg',
                    })
                  }
                  className="cursor-pointer px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] font-body font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  Buy
                </button>
              </div>
            </motion.div>

            {/* ── Right Column: Central Gourmet Salad Bowl & Flying Herbs ── */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
              {/* Wooden Spice Spoon top-left */}
              <motion.div
                variants={fromTopLeft}
                className="absolute -top-3 -left-4 sm:-left-8 z-30 pointer-events-none"
              >
                <motion.div
                  animate={
                    entranceComplete && !shouldReduceMotion
                      ? { y: [0, -5, 0] }
                      : undefined
                  }
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ScatterSpiceSpoon size={95} />
                </motion.div>
              </motion.div>

              {/* Cherry Tomato top-right */}
              <motion.div
                variants={fromTopRight}
                className="absolute -top-4 right-4 sm:right-6 z-30 pointer-events-none"
              >
                <motion.div
                  animate={
                    entranceComplete && !shouldReduceMotion
                      ? { y: [0, -7, 0], rotate: [0, 8, 0] }
                      : undefined
                  }
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                >
                  <ScatterTomato size={44} />
                </motion.div>
              </motion.div>

              {/* Fresh Basil leaf bottom-right */}
              <motion.div
                variants={fromBottom}
                className="absolute -bottom-4 right-6 sm:right-10 z-30 pointer-events-none"
              >
                <motion.div
                  animate={
                    entranceComplete && !shouldReduceMotion
                      ? { y: [0, -6, 0], rotate: [-15, -8, -15] }
                      : undefined
                  }
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                >
                  <ScatterBasil size={48} />
                </motion.div>
              </motion.div>

              {/* Creamy Avocado slice bottom-left */}
              <motion.div
                variants={fromBottom}
                className="absolute -bottom-6 -left-3 sm:-left-5 z-30 pointer-events-none"
              >
                <motion.div
                  animate={
                    entranceComplete && !shouldReduceMotion
                      ? { y: [0, -7, 0], rotate: [10, 16, 10] }
                      : undefined
                  }
                  transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <ScatterAvocado size={54} />
                </motion.div>
              </motion.div>

              {/* Sea Salt & Peppercorn Cluster */}
              <motion.div
                variants={fromTopLeft}
                className="absolute top-16 -left-4 z-30 pointer-events-none opacity-80"
              >
                <ScatterPeppercorns size={38} />
              </motion.div>

              {/* ── Signature Round Black Salad Bowl (Spins & Scales into view) ── */}
              <motion.div
                variants={plateVariants}
                className="relative z-20 w-64 h-64 sm:w-76 sm:h-76 lg:w-[350px] lg:h-[350px] xl:w-[380px] xl:h-[380px] rounded-full overflow-hidden shadow-2xl border-4 border-[#141412] bg-[#FAF8F3]"
              >
                <div
                  className={`absolute inset-0 z-0 transition-opacity duration-300 ${
                    heroImageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <HeroImageSkeleton />
                </div>
                <Image
                  src="/images/hero-salad-bowl.jpg"
                  alt="Organica Gourmet Chef Salad Bowl"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 304px, 380px"
                  className={`object-cover z-10 transition-opacity duration-300 ${
                    heroImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setHeroImageLoaded(true)}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 3 Floating Info Cards (Positioned gracefully above the wave) ── */}
      <div className="w-full relative z-30 px-4 sm:px-6 lg:px-8 pt-2 pb-2 sm:pb-3">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Card 1: Express Delivery */}
          <div className="bg-[#FFFFFF] py-3.5 px-4 sm:py-4 sm:px-5 rounded-2xl sm:rounded-3xl border border-[#E8E3D8] shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center space-y-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF5E36] text-white flex items-center justify-center shadow-sm mb-0.5">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#141412] leading-tight">
              30–40 Min Delivery
            </h4>
            <p className="text-[10px] sm:text-xs text-[#6B685F] font-body">
              Cooked fresh upon order
            </p>
          </div>

          {/* Card 2: 100% Seed-Oil Free */}
          <div className="bg-[#FFFFFF] py-3.5 px-4 sm:py-4 sm:px-5 rounded-2xl sm:rounded-3xl border border-[#E8E3D8] shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center space-y-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF5E36] text-white flex items-center justify-center shadow-sm mb-0.5">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#141412] leading-tight">
              Zero Seed-Oil Kitchen
            </h4>
            <p className="text-[10px] sm:text-xs text-[#6B685F] font-body">
              Cold-pressed oils &amp; A2 ghee
            </p>
          </div>

          {/* Card 3: Nutrition Concierge */}
          <div className="bg-[#FFFFFF] py-3.5 px-4 sm:py-4 sm:px-5 rounded-2xl sm:rounded-3xl border border-[#E8E3D8] shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center space-y-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF5E36] text-white flex items-center justify-center shadow-md mb-0.5">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#141412] leading-tight">
              +91 98450 12345
            </h4>
            <p className="text-[10px] sm:text-xs text-[#6B685F] font-body">
              Nutrition Concierge (8am–11pm)
            </p>
          </div>
        </div>
      </div>

      {/* ── Prominent Multi-Layered Organic Background Wave with Drop-Shadow ── */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-20 sm:h-28 lg:h-32"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          fill="none"
          style={{ filter: 'drop-shadow(0 -8px 20px rgba(20, 20, 18, 0.08))' }}
        >
          {/* Layer 1: Warm Organic Accent Wave for Visual Contrast & Depth */}
          <path
            d="M 0,75 C 160,20 340,115 540,55 C 740,-5 940,85 1140,135 C 1280,152 1370,158 1440,160 L 1440,160 L 0,160 Z"
            fill="#ECE5D8"
            opacity="0.95"
          />
          {/* Layer 2: Soft Cream Intermediate Wave */}
          <path
            d="M 0,55 C 180,110 380,25 580,70 C 780,115 980,120 1180,148 C 1300,156 1380,159 1440,160 L 1440,160 L 0,160 Z"
            fill="#F6F1E7"
          />
          {/* Layer 3: Main Organic Fluid White Wave - tapers gracefully to 0 height at right edge (y=160) so corn & dark slate are 100% visible */}
          <path
            d="M 0,40 C 170,90 350,15 550,55 C 750,95 940,125 1140,150 C 1260,158 1360,160 1440,160 L 1440,160 L 0,160 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}

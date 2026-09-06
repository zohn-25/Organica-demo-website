'use client';

import React from 'react';
import { MenuGrid } from '@/features/menu/components/MenuGrid';
import { ScatterGrain, ScatterBasil } from '@/components/ui/ScatterElements';

export function MenuSection() {
  return (
    <section
      id="menu-section"
      className="pt-28 pb-32 sm:pt-36 sm:pb-40 lg:pt-40 lg:pb-44 bg-[#FAF8F3] relative select-none overflow-hidden"
    >
      {/* ── Top Multi-Layer Organic Wave Divider (White flowing into Cream) ── */}
      <div className="absolute -top-[1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-16 sm:h-24 lg:h-28"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          fill="none"
          style={{ filter: 'drop-shadow(0 6px 16px rgba(20, 20, 18, 0.04))' }}
        >
          {/* Layer 1: Warm Sand/Earthy Accent Contour for Depth */}
          <path
            d="M 0,0 L 1440,0 L 1440,35 C 1240,80 1020,25 780,65 C 540,105 340,30 160,75 C 90,88 40,84 0,86 Z"
            fill="#ECE5D8"
            opacity="0.85"
          />
          {/* Layer 2: Soft Cream Intermediate Wave */}
          <path
            d="M 0,0 L 1440,0 L 1440,24 C 1220,68 990,16 750,52 C 510,88 320,20 140,62 C 70,74 30,70 0,72 Z"
            fill="#F6F1E7"
          />
          {/* Layer 3: Pure White Fluid Organic Wave (Seamless connection to WhatsOnPlate) */}
          <path
            d="M 0,0 L 1440,0 L 1440,16 C 1200,56 970,8 720,40 C 470,72 290,12 120,48 C 60,58 20,54 0,56 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* ── Soft Top Ambient Gradient Overlay (Smooth feathering) ── */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F3]/60 to-transparent pointer-events-none z-10" />

      {/* ── Botanical Culinary Sketch Pattern with Vertical Gradient Fade Mask ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-75"
        style={{
          backgroundImage: "url('/images/culinary-doodle-pattern.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '560px 560px',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 40px, rgba(0,0,0,0.3) 100px, black 200px, black calc(100% - 200px), rgba(0,0,0,0.3) calc(100% - 100px), transparent calc(100% - 40px), transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 40px, rgba(0,0,0,0.3) 100px, black 200px, black calc(100% - 200px), rgba(0,0,0,0.3) calc(100% - 100px), transparent calc(100% - 40px), transparent 100%)',
        }}
      />

      {/* Decorative botanical scatter around edges */}
      <div className="absolute top-24 right-10 pointer-events-none opacity-80 hidden md:block z-10">
        <ScatterGrain size={54} />
      </div>
      <div className="absolute bottom-28 left-6 pointer-events-none opacity-80 hidden md:block z-10">
        <ScatterBasil size={46} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MenuGrid />
      </div>

      {/* ── Soft Bottom Ambient Gradient Overlay (Smooth feathering) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#FFFFFF] via-[#FAF8F3]/60 to-transparent pointer-events-none z-10" />

      {/* ── Bottom Multi-Layer Organic Wave Divider (Cream flowing into White) ── */}
      <div className="absolute -bottom-[1px] left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-16 sm:h-24 lg:h-28"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          fill="none"
          style={{ filter: 'drop-shadow(0 -6px 16px rgba(20, 20, 18, 0.04))' }}
        >
          {/* Layer 1: Warm Sand/Earthy Accent Contour */}
          <path
            d="M 0,42 C 200,10 400,75 660,35 C 920,-5 1140,65 1320,28 C 1370,18 1410,24 1440,26 L 1440,110 L 0,110 Z"
            fill="#ECE5D8"
            opacity="0.85"
          />
          {/* Layer 2: Soft Cream Intermediate Wave */}
          <path
            d="M 0,54 C 220,22 420,85 680,47 C 940,9 1160,77 1340,40 C 1385,30 1420,34 1440,36 L 1440,110 L 0,110 Z"
            fill="#F6F1E7"
          />
          {/* Layer 3: Pure White Fluid Organic Wave (Seamless bridge into TestimonialsSection) */}
          <path
            d="M 0,66 C 240,34 440,95 700,58 C 960,22 1180,88 1360,52 C 1400,42 1430,45 1440,47 L 1440,110 L 0,110 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}

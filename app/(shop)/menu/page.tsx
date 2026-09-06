'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Utensils, Sparkles } from 'lucide-react';
import { MenuGrid } from '@/features/menu/components/MenuGrid';
import { SignatureBowlsSection } from '@/components/sections/SignatureBowlsSection';

export default function FullMenuPage() {
  return (
    <div className="w-full bg-[#FAF8F3] min-h-screen py-10 lg:py-16 relative overflow-hidden">
      {/* ── Botanical Culinary Sketch Line-Art Pattern (Direct Reference Match) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage: "url('/images/culinary-doodle-pattern.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '560px 560px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-body text-[#6B685F]">
          <Link href="/" className="hover:text-[#2E5A36] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#141412] font-bold">Seasonal Menu</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4ED] border border-[#2E5A36]/20 text-[#2E5A36] text-xs font-body font-bold">
            <Utensils className="w-3.5 h-3.5" />
            <span>Complete Farm-Fresh Catalog</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#141412] tracking-tight">
            The Organica Menu
          </h1>

          <p className="text-base text-[#6B685F] font-body leading-relaxed max-w-xl mx-auto">
            From sunrise power bowls to slow-roasted evening feasts. Every dish is cooked in cold-pressed
            oils with transparent macro profiles.
          </p>
        </div>

        {/* Highlighted Signature Bowls */}
        <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#E8E3D8] shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#F2B705]" />
            <h2 className="font-heading font-bold text-2xl text-[#141412]">
              Chef&apos;s Signature Spotlight
            </h2>
          </div>
          <SignatureBowlsSection />
        </div>

        {/* Complete Filterable Grid */}
        <div className="pt-6">
          <MenuGrid />
        </div>
      </div>
    </div>
  );
}

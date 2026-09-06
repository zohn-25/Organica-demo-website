import React from 'react';

export function BowlHighlightSkeleton() {
  return (
    <div
      className="bg-[#FFFFFF] rounded-3xl p-6 lg:p-7 border border-[#E8E3D8] shadow-xs flex flex-col justify-between overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Top Banner Tag Line */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-28 rounded-full skeleton" />
        <div className="h-5 w-24 rounded-full skeleton" />
      </div>

      {/* Bowl Image Container (Exact h-56 sm:h-64) */}
      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden skeleton mb-5">
        {/* Macro Pill Overlay Placeholder */}
        <div className="absolute bottom-3 left-3 right-3 h-12 bg-white/40 rounded-xl" />
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="h-6 w-3/4 rounded-md skeleton" />

        <div className="space-y-1.5">
          <div className="h-3.5 w-full rounded skeleton" />
          <div className="h-3.5 w-4/5 rounded skeleton" />
        </div>

        {/* Ingredients tag cloud placeholders */}
        <div className="flex flex-wrap gap-1.5 pt-2 mb-6">
          <div className="h-5 w-16 rounded-md skeleton" />
          <div className="h-5 w-20 rounded-md skeleton" />
          <div className="h-5 w-14 rounded-md skeleton" />
          <div className="h-5 w-18 rounded-md skeleton" />
        </div>
      </div>

      {/* Bottom Pricing & CTA */}
      <div className="pt-4 border-t border-[#E8E3D8] flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 w-12 rounded skeleton" />
          <div className="h-6 w-16 rounded-md skeleton" />
        </div>
        <div className="h-10 w-28 rounded-full skeleton" />
      </div>
    </div>
  );
}

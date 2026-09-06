import React from 'react';
import { MenuCardSkeleton } from '@/components/ui/skeletons/MenuCardSkeleton';
import { BowlHighlightSkeleton } from '@/components/ui/skeletons/BowlHighlightSkeleton';

export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-28 pb-20 select-none" aria-busy="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header Skeleton */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="h-6 w-44 mx-auto rounded-full skeleton" />
          <div className="h-10 w-72 mx-auto rounded-xl skeleton" />
          <div className="h-4 w-96 mx-auto rounded skeleton" />
        </div>

        {/* 3 Signature Bowl Skeletons */}
        <div className="bg-white/95 rounded-3xl p-6 sm:p-10 border border-[#E8E3D8] space-y-6">
          <div className="h-7 w-56 rounded-lg skeleton" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <BowlHighlightSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Header & Category Tabs Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#E8E3D8]/60">
          <div className="space-y-2.5">
            <div className="h-4 w-40 rounded-full skeleton" />
            <div className="h-9 sm:h-11 w-64 sm:w-80 rounded-xl skeleton" />
          </div>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-full skeleton" />
            ))}
          </div>
        </div>

        {/* 8 Menu Card Skeletons matching destination grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <MenuCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export function MenuCardSkeleton() {
  return (
    <div
      className="bg-[#FFFFFF] rounded-3xl p-4 sm:p-5 border border-[#E8E3D8] shadow-2xs flex flex-col justify-between overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Exact Image Container Dimension & Border Radius */}
      <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 skeleton">
        {/* Floating Tag Placeholder Top-Left */}
        <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-white/40" />
        {/* Floating Rating Placeholder Top-Right */}
        <div className="absolute top-3 right-3 w-10 h-5 rounded-full bg-white/40" />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title & Price Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="h-5 w-3/5 rounded-md skeleton" />
            <div className="h-5 w-14 rounded-md skeleton" />
          </div>

          {/* 5 Stars Rating Row */}
          <div className="h-3.5 w-24 rounded skeleton mt-1" />

          {/* 2-Line Description */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded skeleton" />
            <div className="h-3 w-4/5 rounded skeleton" />
          </div>
        </div>

        {/* Nutritional Pill & Add Button */}
        <div className="pt-3 border-t border-[#E8E3D8]/60 flex items-center justify-between">
          <div className="h-6 w-20 rounded-full skeleton" />
          <div className="h-7 w-16 rounded-full skeleton" />
        </div>
      </div>
    </div>
  );
}

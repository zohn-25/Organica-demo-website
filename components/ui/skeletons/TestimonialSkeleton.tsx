import React from 'react';

export function TestimonialAvatarSkeleton() {
  return (
    <div
      className="w-11 h-11 rounded-full skeleton shrink-0"
      aria-hidden="true"
    />
  );
}

export function TestimonialCardSkeleton() {
  return (
    <div
      className="w-[310px] sm:w-[350px] shrink-0 bg-[#FAF8F3] rounded-[24px] p-5 sm:p-6 border border-[#E8E3D8] shadow-2xs flex flex-col justify-between space-y-4 select-none"
      aria-hidden="true"
    >
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2.5">
          <div className="space-y-1.5 w-3/5">
            <div className="h-4 w-full rounded skeleton" />
            <div className="h-3.5 w-20 rounded-md skeleton" />
          </div>
          <div className="h-5 w-14 rounded-full skeleton shrink-0" />
        </div>

        {/* Quote Lines */}
        <div className="space-y-1.5 pt-2">
          <div className="h-3 w-full rounded skeleton" />
          <div className="h-3 w-full rounded skeleton" />
          <div className="h-3 w-3/4 rounded skeleton" />
        </div>
      </div>

      {/* Author Row */}
      <div className="pt-3.5 border-t border-[#E8E3D8]/80 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full skeleton shrink-0" />
          <div className="space-y-1">
            <div className="h-3.5 w-24 rounded skeleton" />
            <div className="h-2.5 w-16 rounded skeleton" />
          </div>
        </div>
        <div className="h-4 w-14 rounded-full skeleton" />
      </div>
    </div>
  );
}

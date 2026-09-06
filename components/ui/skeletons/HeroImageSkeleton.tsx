import React from 'react';

export function HeroImageSkeleton() {
  return (
    <div
      className="w-full h-full rounded-full skeleton overflow-hidden"
      aria-hidden="true"
    >
      {/* Internal concentric subtle shimmer rings mirroring plate depth */}
      <div className="w-full h-full rounded-full border border-white/30 flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full border border-white/20" />
      </div>
    </div>
  );
}

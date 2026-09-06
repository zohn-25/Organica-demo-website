import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'veg' | 'non-veg' | 'macro' | 'mustard' | 'green' | 'dark' | 'outline';
}

export function VegIndicator({ isVeg, className = '' }: { isVeg: boolean; className?: string }) {
  if (isVeg) {
    return (
      <span
        title="100% Pure Vegetarian"
        className={cn("inline-flex items-center justify-center w-4 h-4 border border-[#2E5A36] bg-white rounded-xs p-[2px]", className)}
      >
        <span className="w-2 h-2 rounded-full bg-[#2E5A36]" />
      </span>
    );
  }

  return (
    <span
      title="Non-Vegetarian / Farm-Raised"
      className={cn("inline-flex items-center justify-center w-4 h-4 border border-[#B53424] bg-white rounded-xs p-[2px]", className)}
    >
      <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-[#B53424]" />
    </span>
  );
}

export function Badge({ className, variant = 'green', children }: BadgeProps) {
  const variants = {
    veg: 'bg-[#EBF4ED] text-[#2E5A36] border border-[#2E5A36]/20',
    'non-veg': 'bg-[#FDF0EE] text-[#B53424] border border-[#B53424]/20',
    macro: 'bg-[#F4EFE6] text-[#141412] font-semibold',
    mustard: 'bg-[#FFF9E6] text-[#B88800] border border-[#F2B705]/30 font-bold',
    green: 'bg-[#2E5A36] text-[#FAF8F3]',
    dark: 'bg-[#141412] text-[#FAF8F3]',
    outline: 'bg-transparent border border-[#E8E3D8] text-[#6B685F]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-body font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

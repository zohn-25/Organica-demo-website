'use client';

import React from 'react';
import {
  Utensils,
  SunMedium,
  Flame,
  GlassWater,
  HeartPulse,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { MenuCategoryId } from '../types';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  Utensils,
  SunMedium,
  Flame,
  GlassWater,
  HeartPulse,
  Sparkles,
};

interface CategoryChipProps {
  id: MenuCategoryId;
  label: string;
  iconName: string;
  isActive: boolean;
  count?: number;
  onClick: () => void;
}

export function CategoryChip({
  label,
  iconName,
  isActive,
  count,
  onClick,
}: CategoryChipProps) {
  const IconComponent = ICON_MAP[iconName] || Utensils;

  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        'group flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-body font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none',
        isActive
          ? 'bg-[#141412] text-[#FAF8F3] shadow-md scale-[1.02]'
          : 'bg-[#FFFFFF] text-[#141412] hover:bg-[#F4EFE6] border border-[#E8E3D8] hover:border-[#141412]/20'
      )}
    >
      <span
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200',
          isActive
            ? 'bg-[#2E5A36] text-[#FAF8F3]'
            : 'bg-[#FAF8F3] text-[#2E5A36] group-hover:bg-[#EBF4ED]'
        )}
      >
        <IconComponent className="w-4 h-4" />
      </span>

      <span>{label}</span>

      {typeof count === 'number' ? (
        <span
          className={cn(
            'text-xs px-2 py-0.5 rounded-full font-mono font-medium',
            isActive ? 'bg-[#242420] text-[#FAF8F3]' : 'bg-[#F4EFE6] text-[#6B685F]'
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Plus, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { VegIndicator } from '@/components/ui/Badge';
import { formatINR } from '@/lib/utils';
import { useCart } from '@/features/cart/CartContext';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group relative bg-[#FFFFFF] rounded-3xl p-4 sm:p-5 border border-[#E8E3D8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      {/* Top Image Preview with Rounded Corner (Echoing Reference Design) */}
      <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-[#FAF8F3] mb-4">
        {/* Shimmer Skeleton placeholder while decoding */}
        {!imageLoaded && <div className="absolute inset-0 skeleton z-0" />}

        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`object-cover transition-all duration-500 group-hover:scale-108 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F4EFE6] text-[#6B685F] text-xs font-body">
            Freshly Prepared
          </div>
        )}

        {/* Veg/Non-Veg Tag floating on top left */}
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-xs rounded-full px-2 py-1 flex items-center gap-1.5 shadow-sm">
          <VegIndicator isVeg={item.isVeg} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#141412]">
            {item.isVeg ? 'Pure Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Badge or Rating floating top right */}
        {item.badge ? (
          <div className="absolute top-3 right-3 z-10 bg-[#141412]/85 text-[#FAF8F3] backdrop-blur-xs rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide shadow-sm">
            {item.badge}
          </div>
        ) : (
          <div className="absolute top-3 right-3 z-10 bg-white/90 text-[#141412] backdrop-blur-xs rounded-full px-2 py-1 text-[11px] font-bold flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 text-[#F2B705] fill-current" />
            <span>{item.rating || '4.9'}</span>
          </div>
        )}
      </div>

      {/* Content Area matching reference food cards */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-bold text-base text-[#141412] leading-snug group-hover:text-[#2E5A36] transition-colors duration-200 line-clamp-1">
              {item.name}
            </h3>
            <span className="font-heading font-black text-base text-[#141412] shrink-0">
              {formatINR(item.price)}
            </span>
          </div>

          {/* 5 Orange Stars matching reference */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-[#FF5E36] fill-[#FF5E36]" />
            ))}
            <span className="text-[11px] text-[#9C988D] ml-1 font-body">({item.rating || '4.9'})</span>
          </div>

          <p className="text-xs text-[#6B685F] font-body line-clamp-2 leading-relaxed pt-1">
            {item.description}
          </p>
        </div>

        {/* Nutritional Pill & Add Button */}
        <div className="pt-3 mt-3 border-t border-[#E8E3D8]/60 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#2E5A36] uppercase tracking-wider bg-[#EBF4ED] px-2.5 py-1 rounded-full">
            {item.protein ? `${item.protein}g Protein` : `${item.calories} kcal`}
          </span>

          <button
            onClick={handleAdd}
            className={`cursor-pointer inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full font-body font-bold text-xs transition-all duration-200 ${
              justAdded
                ? 'bg-[#2E5A36] text-[#FAF8F3] scale-95 shadow-inner'
                : 'bg-[#141412] text-[#FAF8F3] hover:bg-[#2E5A36] shadow-sm hover:shadow-md'
            }`}
            aria-label={`Add ${item.name} to order`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Plus } from 'lucide-react';
import { SignatureBowl } from '../types';
import { formatINR } from '@/lib/utils';
import { VegIndicator } from '@/components/ui/Badge';
import { useCart } from '@/features/cart/CartContext';

interface BowlHighlightCardProps {
  bowl: SignatureBowl;
}

export function BowlHighlightCard({ bowl }: BowlHighlightCardProps) {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: bowl.id,
      name: bowl.name,
      category: 'power-plates',
      price: bowl.price,
      description: bowl.description,
      isVeg: bowl.isVeg,
      protein: bowl.protein,
      calories: bowl.calories,
      image: bowl.image,
    });
  };

  return (
    <div className="group relative bg-[#FFFFFF] rounded-3xl p-6 lg:p-7 border border-[#E8E3D8] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <VegIndicator isVeg={bowl.isVeg} />
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E5A36]">
            {bowl.tagline}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#FFF9E6] text-[#B88800] px-3 py-1 rounded-full text-xs font-bold border border-[#F2B705]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Signature Bowl</span>
        </div>
      </div>

      {/* Bowl Image with Subtle Zoom */}
      <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#FAF8F3] mb-5">
        {/* Shimmer Skeleton placeholder while decoding */}
        {!imageLoaded && <div className="absolute inset-0 skeleton z-0" />}

        <Image
          src={bowl.image}
          alt={bowl.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Macro Pill Overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#141412]/85 text-[#FAF8F3] backdrop-blur-md rounded-xl p-2.5 flex items-center justify-around text-center text-xs z-10">
          <div>
            <span className="block font-heading font-bold text-[#F2B705] text-sm">{bowl.protein}g</span>
            <span className="text-[10px] text-[#FAF8F3]/70 uppercase">Protein</span>
          </div>
          <div className="w-px h-6 bg-white/15" />
          <div>
            <span className="block font-heading font-bold text-white text-sm">{bowl.calories}</span>
            <span className="text-[10px] text-[#FAF8F3]/70 uppercase">Calories</span>
          </div>
          <div className="w-px h-6 bg-white/15" />
          <div>
            <span className="block font-heading font-bold text-white text-sm">{bowl.carbs}g</span>
            <span className="text-[10px] text-[#FAF8F3]/70 uppercase">Carbs</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div>
        <h3 className="font-heading font-extrabold text-xl lg:text-2xl text-[#141412] mb-2 leading-tight">
          {bowl.name}
        </h3>
        <p className="text-sm text-[#6B685F] font-body leading-relaxed mb-4">
          {bowl.description}
        </p>

        {/* Ingredients tag cloud */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {bowl.ingredients.map((ing, i) => (
            <span
              key={i}
              className="text-[11px] bg-[#FAF8F3] border border-[#E8E3D8] text-[#141412] font-medium px-2.5 py-1 rounded-md"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Pricing & CTA */}
      <div className="pt-4 border-t border-[#E8E3D8] flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#6B685F] block font-medium">Chef&apos;s Cut</span>
          <span className="font-heading font-black text-2xl text-[#141412]">
            {formatINR(bowl.price)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          className="cursor-pointer inline-flex items-center gap-2 bg-[#F2B705] text-[#141412] hover:bg-[#D49E00] px-5 py-2.5 rounded-full font-body font-bold text-sm shadow-md transition-all duration-200 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Order</span>
        </button>
      </div>
    </div>
  );
}

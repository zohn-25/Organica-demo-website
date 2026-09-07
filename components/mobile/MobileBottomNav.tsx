'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Heart, ShoppingBag, MapPin } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';

interface MobileBottomNavProps {
  activeTab?: 'home' | 'favorites' | 'order' | 'kitchen';
  onTabChange?: (tab: 'home' | 'favorites' | 'order' | 'kitchen') => void;
  favoritesCount?: number;
}

export function MobileBottomNav({
  activeTab = 'home',
  onTabChange,
  favoritesCount = 0,
}: MobileBottomNavProps) {
  const router = useRouter();
  const { totalCount, setIsCartOpen } = useCart();
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabClick = (tab: 'home' | 'favorites' | 'order' | 'kitchen') => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }

    if (tab === 'order') {
      router.push('/checkout');
    } else if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'kitchen') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 select-none pb-safe">
      {/* Frosted Glass Container matching reference */}
      <div className="bg-[#FAF8F3]/95 backdrop-blur-xl border-t border-[#E8E3D8] px-3 sm:px-6 py-2 sm:py-2.5 shadow-[0_-8px_24px_rgba(20,20,18,0.06)]">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          {/* Home Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 cursor-pointer ${
              currentTab === 'home' ? 'text-[#2E5A36] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                currentTab === 'home' ? 'bg-[#2E5A36] text-[#FAF8F3] shadow-xs' : 'bg-transparent'
              }`}
            >
              <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-body font-bold">Home</span>
          </button>

          {/* Favorites Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('favorites')}
            className={`relative flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 cursor-pointer ${
              currentTab === 'favorites' ? 'text-[#2E5A36] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                currentTab === 'favorites' ? 'bg-[#2E5A36] text-[#FAF8F3] shadow-xs' : 'bg-transparent'
              }`}
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            {favoritesCount > 0 && (
              <span className="absolute top-0 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#B53424] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
            <span className="text-[9px] sm:text-[10px] font-body font-bold">Favorite</span>
          </button>

          {/* Order / Bag Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('order')}
            className={`relative flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 cursor-pointer ${
              currentTab === 'order' ? 'text-[#2E5A36] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                currentTab === 'order' ? 'bg-[#2E5A36] text-[#FAF8F3] shadow-xs' : 'bg-transparent'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            {totalCount > 0 && (
              <span className="absolute top-0 right-0 sm:right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[#F2B705] text-[#141412] text-[9px] sm:text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {totalCount}
              </span>
            )}
            <span className="text-[9px] sm:text-[10px] font-body font-bold">Order</span>
          </button>

          {/* Kitchen / Location Desk */}
          <button
            type="button"
            onClick={() => handleTabClick('kitchen')}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 cursor-pointer ${
              currentTab === 'kitchen' ? 'text-[#2E5A36] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                currentTab === 'kitchen' ? 'bg-[#2E5A36] text-[#FAF8F3] shadow-xs' : 'bg-transparent'
              }`}
            >
              <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-body font-bold">Kitchen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

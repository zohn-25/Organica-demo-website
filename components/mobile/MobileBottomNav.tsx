'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Heart, ShoppingBag, MapPin } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { useFavorites } from '@/features/favorites/FavoritesContext';

interface MobileBottomNavProps {
  activeTab?: 'home' | 'favorites' | 'order' | 'kitchen';
  onTabChange?: (tab: 'home' | 'favorites' | 'order' | 'kitchen') => void;
}

export function MobileBottomNav({
  activeTab = 'home',
  onTabChange,
}: MobileBottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { totalCount } = useCart();
  const { favoritesCount } = useFavorites();

  const [currentTab, setCurrentTab] = useState(activeTab);

  const active =
    pathname === '/favorites'
      ? 'favorites'
      : pathname === '/checkout'
      ? 'order'
      : pathname === '/'
      ? currentTab
      : currentTab;

  const handleTabClick = (tab: 'home' | 'favorites' | 'order' | 'kitchen') => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }

    if (tab === 'order') {
      router.push('/checkout');
    } else if (tab === 'favorites') {
      router.push('/favorites');
    } else if (tab === 'home') {
      if (pathname !== '/') {
        router.push('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (tab === 'kitchen') {
      if (pathname !== '/') {
        router.push('/#contact');
      } else {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  if (pathname?.startsWith('/dish') || pathname === '/checkout') {
    return null;
  }

  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40 select-none bg-[#FAF8F3]/95 backdrop-blur-xl border-t border-[#E8E3D8] shadow-[0_-8px_24px_rgba(20,20,18,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="px-3 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          {/* Home Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 cursor-pointer ${
              active === 'home' ? 'text-[#1FA882] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                active === 'home' ? 'bg-[#1FA882] text-white shadow-xs' : 'bg-transparent'
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
              active === 'favorites' ? 'text-[#E11D48] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                active === 'favorites' ? 'bg-[#FFF1F2] text-[#E11D48] shadow-xs' : 'bg-transparent'
              }`}
            >
              <Heart
                className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                  active === 'favorites' ? 'fill-[#E11D48] text-[#E11D48]' : ''
                }`}
              />
            </div>
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 right-0.5 sm:right-1 w-4 h-4 rounded-full bg-[#E11D48] text-white text-[8px] sm:text-[9px] font-extrabold flex items-center justify-center shadow-2xs">
                {favoritesCount}
              </span>
            )}
            <span className="text-[9px] sm:text-[10px] font-body font-bold">Favorites</span>
          </button>

          {/* Order / Bag Tab */}
          <button
            type="button"
            onClick={() => handleTabClick('order')}
            className={`relative flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 cursor-pointer ${
              active === 'order' ? 'text-[#1FA882] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                active === 'order' ? 'bg-[#1FA882] text-white shadow-xs' : 'bg-transparent'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 right-0 sm:right-1 w-4 h-4 rounded-full bg-[#C2820B] text-white text-[8px] sm:text-[9px] font-extrabold flex items-center justify-center shadow-2xs">
                {totalCount}
              </span>
            )}
            <span className="text-[9px] sm:text-[10px] font-body font-bold">Bag</span>
          </button>

          {/* Kitchen / Location Desk */}
          <button
            type="button"
            onClick={() => handleTabClick('kitchen')}
            className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all duration-200 cursor-pointer ${
              active === 'kitchen' ? 'text-[#1FA882] scale-105' : 'text-[#6B685F] hover:text-[#141412]'
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${
                active === 'kitchen' ? 'bg-[#1FA882] text-white shadow-xs' : 'bg-transparent'
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

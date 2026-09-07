'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Heart,
  Star,
  Plus,
  Check,
  ShoppingBag,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { useCart } from '@/features/cart/CartContext';
import { formatINR } from '@/lib/utils';
import { VegIndicator } from '@/components/ui/Badge';
import { MenuItem } from '@/features/menu/types';
import { DishDetailModal } from '@/components/mobile/DishDetailModal';
import { useToast } from '@/components/providers/ToastProvider';

export default function FavoritesPage() {
  const router = useRouter();
  const { favoriteItems, favoritesCount, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [selectedDishForModal, setSelectedDishForModal] = useState<MenuItem | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);

    showToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${item.name} added to your clean bag.`,
      duration: 2500,
    });
  };

  const openDishDetail = (dish: MenuItem) => {
    setSelectedDishForModal(dish);
    setIsDishModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-14 pb-32 select-none">
      {/* ── TOP STICKY APP BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E8E3D8] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 rounded-full bg-white border border-[#E8E3D8] flex items-center justify-center text-[#141412] hover:bg-[#F4EFE6] transition-colors cursor-pointer shadow-xs active:scale-95"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </button>

          <div className="text-center">
            <h1 className="font-heading font-black text-sm sm:text-base text-[#141412] flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 fill-[#E11D48] text-[#E11D48]" />
              <span>Saved Favorites</span>
            </h1>
            <span className="text-[10px] font-body text-[#6B685F]">
              {favoritesCount} {favoritesCount === 1 ? 'dish' : 'dishes'} saved
            </span>
          </div>

          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-4 space-y-4">
        {favoriteItems.length > 0 ? (
          <>
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="font-heading font-black text-base sm:text-lg text-[#141412]">
                  Your Clean Favorites
                </h2>
                <span className="text-[11px] text-[#6B685F] font-body">
                  Instant 1-tap reordering from Beltola kitchen
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#1FA882] bg-[#EBF4ED] px-2.5 py-1 rounded-full">
                {favoritesCount} Saved
              </span>
            </div>

            {/* 2-Column Grid of Favorite Dishes */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {favoriteItems.map((item) => {
                const isFav = isFavorite(item.id);
                const isAdded = !!addedItemIds[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => openDishDetail(item)}
                    className="bg-white rounded-xl sm:rounded-2xl border border-[#E8E3D8] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group cursor-pointer active:scale-98"
                  >
                    {/* Food Thumbnail Container */}
                    <div className="relative w-full aspect-[4/3] bg-[#FAF8F3] overflow-hidden">
                      <Image
                        src={item.image || '/images/hero-bowl.jpg'}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Remove / Toggle Favorite Heart Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id, item.name);
                        }}
                        className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-7 h-7 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#E11D48] shadow-xs transition-transform hover:scale-110 active:scale-90 cursor-pointer z-10"
                        aria-label={`Remove ${item.name} from favorites`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFav ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#8C887B]'
                          }`}
                        />
                      </button>

                      {/* Prep Time Tag */}
                      <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#141412]/80 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-mono font-medium">
                        <Clock className="w-2.5 h-2.5 text-[#F2B705]" />
                        <span>20-25 Mins</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-2.5 sm:p-3 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <VegIndicator isVeg={item.isVeg} className="scale-75 origin-left" />
                          <h3 className="font-heading font-bold text-xs sm:text-sm text-[#141412] line-clamp-1 leading-snug">
                            {item.name}
                          </h3>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#6B685F]">
                          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F2B705] fill-[#F2B705]" />
                          <span className="font-bold text-[#141412]">{item.rating || 4.9}</span>
                          <span>({item.reviewsCount || 150})</span>
                        </div>

                        {/* Macro pill */}
                        {item.protein && (
                          <span className="inline-block text-[9px] sm:text-[10px] font-mono font-semibold text-[#1FA882] bg-[#EBF4ED] px-1.5 py-0.5 rounded-md">
                            {item.protein}g Protein
                          </span>
                        )}
                      </div>

                      {/* Bottom Bar: Price & Add Button */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#E8E3D8]/60">
                        <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#1FA882] text-white font-heading font-extrabold text-[11px] sm:text-xs shadow-2xs">
                          {formatINR(item.price)}
                        </span>

                        {/* Quick Add Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                          aria-label={`Add ${item.name} to bag`}
                          className={`cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${
                            isAdded
                              ? 'bg-[#1FA882] text-white scale-95'
                              : 'bg-white border border-[#E8E3D8] hover:border-[#1FA882] text-[#141412] hover:bg-[#FAF8F3] shadow-xs active:scale-95'
                          }`}
                        >
                          {isAdded ? (
                            <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1FA882]" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* ── EMPTY FAVORITES STATE ── */
          <div className="bg-white rounded-3xl border border-[#E8E3D8] p-8 shadow-xs text-center space-y-5 my-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF1F2] text-[#E11D48] mx-auto flex items-center justify-center shadow-xs">
              <Heart className="w-8 h-8 fill-[#E11D48]" />
            </div>

            <div className="space-y-1">
              <h2 className="font-heading font-black text-xl text-[#141412]">
                No Favorites Saved Yet
              </h2>
              <p className="text-xs sm:text-sm text-[#6B685F] font-body max-w-xs mx-auto">
                Tap the heart icon on any clean bowl or plate to keep your favorite harvest meals handy for quick ordering.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1FA882] hover:bg-[#188B6B] text-white font-heading font-extrabold text-sm shadow-md transition-all active:scale-98"
            >
              <span>Explore Clean Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* ── DISH DETAIL MODAL ── */}
      <DishDetailModal
        dish={selectedDishForModal}
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        onGoToCheckout={() => {
          setIsDishModalOpen(false);
          router.push('/checkout');
        }}
      />
    </div>
  );
}

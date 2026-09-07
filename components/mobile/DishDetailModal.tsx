'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Star, Minus, Plus, Check, Sparkles, Heart } from 'lucide-react';
import { MenuItem } from '@/features/menu/types';
import { useCart, DishAddOn } from '@/features/cart/CartContext';
import { DEFAULT_DISH_ADDONS } from '@/features/menu/data/addons-data';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';
import { useFavorites } from '@/features/favorites/FavoritesContext';

interface DishDetailModalProps {
  dish: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onGoToCheckout?: () => void;
}

export function DishDetailModal({
  dish,
  isOpen,
  onClose,
  onGoToCheckout,
}: DishDetailModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({});
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Reset state when dish changes or opens
  React.useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedAddOns({});
      setIsAddedSuccess(false);
    }
  }, [isOpen, dish?.id]);

  if (!isOpen || !dish) return null;

  // Toggle add-on
  const toggleAddOn = (addonId: string) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [addonId]: !prev[addonId],
    }));
  };

  // Calculate active add-ons list and total price
  const activeAddOnsList: DishAddOn[] = DEFAULT_DISH_ADDONS.filter(
    (addon) => selectedAddOns[addon.id]
  );
  const addOnsTotal = activeAddOnsList.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = dish.price + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(dish, quantity, activeAddOnsList);
    setIsAddedSuccess(true);

    showToast({
      type: 'success',
      title: 'Added to Bag!',
      message: `${quantity}x ${dish.name} customized and ready.`,
      duration: 3500,
    });

    setTimeout(() => {
      if (onGoToCheckout) {
        onGoToCheckout();
      } else {
        router.push('/checkout');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center select-none overflow-hidden bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 sm:p-4">
      {/* Mobile Shell / Card mimicking reference mockup */}
      <div className="relative w-full sm:max-w-md h-[100dvh] sm:h-auto sm:max-h-[90vh] bg-[#1FA882] sm:rounded-[36px] overflow-hidden flex flex-col shadow-2xl">
        {/* ── SCROLLABLE MIDDLE AREA (Hero + Content) ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar flex flex-col">
          {/* ── TOP SECTION: Vibrant Teal Hero with Food Plate ── */}
          <div className="relative w-full pt-4 pb-3 sm:pt-8 sm:pb-5 px-4 sm:px-5 flex flex-col items-center justify-between bg-gradient-to-b from-[#188B6B] via-[#1FA882] to-[#25BA91] shrink-0">
            {/* Top Bar Navigation */}
            <div className="w-full flex items-center justify-between z-20">
              {/* Back Arrow Button matching reference */}
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-xs"
                aria-label="Back to menu"
              >
                <ChevronLeft className="w-5 h-5 -ml-0.5 stroke-[2.5]" />
              </button>

              {/* Micro dietary badge */}
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-heading font-extrabold flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#F2B705]" />
                <span>{dish.isVeg ? '🌱 100% Pure Veg' : '🍗 High Protein Clean Eat'}</span>
              </div>

              {/* Favorite button */}
              <button
                type="button"
                onClick={() => toggleFavorite(dish.id, dish.name)}
                className="w-9 h-9 rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer active:scale-95 shadow-xs"
                aria-label="Add to favorites"
              >
                <Heart
                  className={`w-4.5 h-4.5 ${
                    isFavorite(dish.id) ? 'fill-[#E11D48] text-[#E11D48]' : 'text-white'
                  }`}
                />
              </button>
            </div>

            {/* Centered Glowing Plate & Hero Food Image */}
            <div className="relative w-44 h-44 xs:w-48 xs:h-48 sm:w-56 sm:h-56 my-2 sm:my-3.5 flex items-center justify-center z-10 shrink-0">
              {/* Soft Radial Ambient Glow matching reference plate */}
              <div className="absolute inset-0 rounded-full bg-white/25 blur-xl scale-95 pointer-events-none" />
              <div className="absolute inset-2 rounded-full bg-[#34D399]/40 blur-md pointer-events-none" />

              {/* Floating Hero Image Container */}
              <div className="relative w-40 h-40 xs:w-44 xs:h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.22)] border-4 border-white/40 group">
                <Image
                  src={dish.image || '/images/hero-bowl.jpg'}
                  alt={dish.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 200px, 240px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ── BOTTOM SECTION: Curved White Card matching reference ── */}
          <div className="w-full bg-white rounded-t-[30px] sm:rounded-t-[34px] px-4 sm:px-6 pt-4 sm:pt-5 pb-6 shadow-[0_-10px_28px_rgba(0,0,0,0.08)] flex-1 flex flex-col -mt-3 sm:-mt-4 z-20">
            <div className="space-y-3 sm:space-y-3.5">
              {/* Row 1: Rating Badge on Left, Price on Right */}
              <div className="flex items-center justify-between">
                {/* Rating Pill matching reference teal pill with yellow star */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1FA882] text-white shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-[#F2B705] text-[#F2B705]" />
                  <span className="font-heading font-black text-xs sm:text-sm tracking-wide">
                    {dish.rating || 4.9}
                  </span>
                </div>

                {/* Price in Gold/Amber Typography matching reference */}
                <div className="font-heading font-black text-xl sm:text-2xl text-[#C2820B] tracking-tight">
                  {formatINR(dish.price)}
                </div>
              </div>

              {/* Row 2: Dish Name & Quantity Stepper */}
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="font-heading font-black text-lg sm:text-xl text-[#141412] leading-snug">
                    {dish.name}
                  </h2>
                  {dish.protein && (
                    <span className="text-[11px] font-mono font-bold text-[#1FA882]">
                      {dish.protein}g Clean Protein • {dish.calories || 420} kcal
                    </span>
                  )}
                </div>

                {/* Quantity Stepper matching reference teal circle buttons */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full border border-[#1FA882] text-[#1FA882] hover:bg-[#1FA882]/10 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <span className="font-heading font-black text-base text-[#141412] min-w-4 text-center font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full border border-[#1FA882] text-[#1FA882] hover:bg-[#1FA882]/10 flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Row 3: Description Paragraph matching reference */}
              <p className="text-xs sm:text-[13px] text-[#6B685F] font-body leading-relaxed">
                {dish.description ||
                  'Prepared fresh with hand-picked farm greens, cold-pressed oils, and zero refined sugar or artificial preservatives. Plated hot in Guwahati.'}
              </p>

              {/* Row 4: "Add Ons" Section matching reference 3 cards with + icons */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-sm text-[#141412]">
                    Add Ons
                  </h3>
                  <span className="text-[10px] font-body text-[#6B685F]">Optional</span>
                </div>

                {/* 3 Horizontal Cards matching reference layout */}
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {DEFAULT_DISH_ADDONS.map((addon) => {
                    const isSelected = !!selectedAddOns[addon.id];

                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`relative rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 border text-center ${
                          isSelected
                            ? 'bg-[#F0FDF4] border-[#1FA882] shadow-xs ring-1 ring-[#1FA882]/30 scale-102'
                            : 'bg-[#FAF8F3] border-[#E8E3D8] hover:border-[#1FA882]/50 shadow-2xs'
                        }`}
                      >
                        {/* Add-on Thumbnail */}
                        <div className="relative w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden mb-1.5 bg-white shadow-2xs">
                          <Image
                            src={addon.image || '/images/hero-bowl.jpg'}
                            alt={addon.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>

                        {/* Add-on Name & Price */}
                        <span className="text-[10px] font-heading font-bold text-[#141412] line-clamp-1 leading-tight w-full">
                          {addon.name}
                        </span>
                        <span className="text-[9px] font-body font-extrabold text-[#C2820B] mt-0.5">
                          +{formatINR(addon.price)}
                        </span>

                        {/* Floating Green Circle (+) Button matching reference */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAddOn(addon.id);
                          }}
                          className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                            isSelected
                              ? 'bg-[#1FA882] text-white scale-110'
                              : 'bg-[#1FA882] text-white hover:scale-105'
                          }`}
                          aria-label={`Toggle ${addon.name}`}
                        >
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PINNED STICKY BOTTOM ACTION BAR: 100% VISIBLE ON ALL PHONES ── */}
        <div className="shrink-0 w-full bg-white/95 backdrop-blur-md px-4 sm:px-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-[#E8E3D8]/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-3.5 sm:py-4 rounded-2xl sm:rounded-full font-heading font-extrabold text-sm sm:text-base text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
              isAddedSuccess
                ? 'bg-[#141412] scale-98'
                : 'bg-[#1FA882] hover:bg-[#188B6B] shadow-[0_8px_20px_rgba(31,168,130,0.35)]'
            }`}
          >
            {isAddedSuccess ? (
              <>
                <Check className="w-5 h-5 text-[#34D399]" />
                <span>Proceeding to Checkout...</span>
              </>
            ) : (
              <span>
                Add To Cart • {formatINR(totalPrice)}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

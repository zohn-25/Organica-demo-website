'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Flame,
  Dumbbell,
  Leaf,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { formatINR } from '@/lib/utils';
import { VegIndicator } from './Badge';

export function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
    totalCalories,
    totalProtein,
  } = useCart();

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    router.push('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#141412]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Sheet Container: Mobile slides from bottom with rounded top; Desktop slides from right */}
      <div className="absolute inset-x-0 bottom-0 sm:inset-y-0 sm:left-auto sm:right-0 w-full sm:max-w-md max-h-[92vh] sm:max-h-full bg-[#FAF8F3] shadow-2xl rounded-t-[32px] sm:rounded-t-none sm:rounded-l-[32px] flex flex-col justify-between border-t sm:border-t-0 sm:border-l border-[#E8E3D8] overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-right duration-300">
        
        {/* Mobile Grab Handle */}
        <div className="sm:hidden w-full flex items-center justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-[#D4CFBF]" />
        </div>

        {/* ── HEADER ── */}
        <div className="px-5 sm:px-6 py-4 bg-white border-b border-[#E8E3D8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF4ED] text-[#1FA882] flex items-center justify-center shadow-2xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-[#141412] tracking-tight">
                  Your Clean Bag
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#EBF4ED] text-[#1FA882] text-[10px] font-mono font-extrabold">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'}
                </span>
              </div>
              <p className="text-[11px] text-[#6B685F] font-body flex items-center gap-1">
                <Leaf className="w-3 h-3 text-[#1FA882]" />
                <span>100% Zero Seed-Oils • Beltola Hub</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] font-body font-bold text-[#6B685F] hover:text-[#B53424] px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-[#FAF8F3] hover:bg-[#E8E3D8] text-[#141412] flex items-center justify-center transition-colors cursor-pointer active:scale-95 shadow-2xs"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── CART ITEMS SCROLLABLE CONTENT ── */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3.5">
          {cart.length > 0 ? (
            <>
              {/* Free Delivery Banner Progress */}
              <div className="bg-gradient-to-r from-[#EBF4ED] to-[#FAF8F3] border border-[#1FA882]/30 rounded-2xl p-3 flex items-center gap-2.5 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-[#1FA882] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-heading font-extrabold text-xs text-[#141412] block truncate">
                    Free Guwahati Delivery Unlocked!
                  </span>
                  <span className="text-[10px] text-[#6B685F] font-body">
                    Beltola &amp; Dispur Express dispatch (~25 mins)
                  </span>
                </div>
              </div>

              {/* Clean Nutrition Macro Bar */}
              <div className="grid grid-cols-3 gap-2 bg-white rounded-2xl p-3 border border-[#E8E3D8] shadow-xs">
                <div className="flex flex-col items-center justify-center text-center p-1">
                  <div className="flex items-center gap-1 text-[#1FA882] mb-0.5">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span className="font-heading font-black text-sm sm:text-base">
                      {totalProtein}g
                    </span>
                  </div>
                  <span className="text-[9px] font-body uppercase tracking-wider text-[#6B685F] font-bold">
                    Protein
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center p-1 border-x border-[#E8E3D8]/80">
                  <div className="flex items-center gap-1 text-[#141412] mb-0.5">
                    <Flame className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span className="font-heading font-black text-sm sm:text-base">
                      {totalCalories}
                    </span>
                  </div>
                  <span className="text-[9px] font-body uppercase tracking-wider text-[#6B685F] font-bold">
                    Calories
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center p-1">
                  <div className="flex items-center gap-1 text-[#C2820B] mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="font-heading font-black text-sm sm:text-base">
                      0%
                    </span>
                  </div>
                  <span className="text-[9px] font-body uppercase tracking-wider text-[#6B685F] font-bold">
                    Seed Oils
                  </span>
                </div>
              </div>

              {/* Dish Items */}
              <div className="space-y-2.5">
                {cart.map(({ cartLineId, item, quantity, selectedAddOns }) => {
                  const lineKey = cartLineId || item.id;
                  const addOnsPrice = (selectedAddOns || []).reduce(
                    (s, a) => s + a.price,
                    0
                  );
                  const unitPrice = item.price + addOnsPrice;
                  const lineTotal = unitPrice * quantity;

                  return (
                    <div
                      key={lineKey}
                      className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#E8E3D8] hover:border-[#1FA882]/40 transition-all shadow-xs flex gap-3 group"
                    >
                      {/* Food Thumbnail */}
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-[#FAF8F3] shrink-0 border border-[#E8E3D8]/60">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="72px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#EBF4ED] flex items-center justify-center text-xs text-[#1FA882] font-bold">
                            Organic
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <VegIndicator isVeg={item.isVeg} className="scale-75 origin-left" />
                                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#141412] truncate">
                                  {item.name}
                                </h4>
                              </div>

                              {/* Add-ons line */}
                              {selectedAddOns && selectedAddOns.length > 0 && (
                                <p className="text-[10px] text-[#6B685F] font-body truncate">
                                  + {selectedAddOns.map((a) => a.name).join(', ')}
                                </p>
                              )}
                            </div>

                            {/* Trash Button */}
                            <button
                              onClick={() => removeFromCart(lineKey)}
                              className="w-6 h-6 rounded-full hover:bg-rose-50 text-[#8C887B] hover:text-[#B53424] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Price & Stepper Row */}
                        <div className="flex items-center justify-between pt-1.5 border-t border-[#E8E3D8]/50 mt-1">
                          <div>
                            <span className="font-heading font-black text-xs sm:text-sm text-[#C2820B]">
                              {formatINR(lineTotal)}
                            </span>
                            {item.protein && (
                              <span className="text-[9px] text-[#6B685F] font-mono ml-1.5 hidden sm:inline">
                                ({item.protein * quantity}g Protein)
                              </span>
                            )}
                          </div>

                          {/* Stepper Pill */}
                          <div className="flex items-center gap-2 bg-[#FAF8F3] border border-[#E8E3D8] rounded-full px-2 py-0.5 shadow-2xs">
                            <button
                              onClick={() => updateQuantity(lineKey, -1)}
                              className="text-[#141412] hover:text-[#1FA882] p-0.5 cursor-pointer active:scale-90"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                            <span className="font-mono font-black text-xs min-w-3 text-center text-[#141412]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(lineKey, 1)}
                              className="text-[#141412] hover:text-[#1FA882] p-0.5 cursor-pointer active:scale-90"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF4ED] text-[#1FA882] flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-black text-lg text-[#141412]">
                  Your Clean Bag is Empty
                </h4>
                <p className="text-xs text-[#6B685F] font-body max-w-xs mx-auto">
                  Add signature protein bowls, cold-pressed refreshers, or wholesome plates to build your clean feast.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push('/menu');
                }}
                className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1FA882] text-white font-heading font-extrabold text-xs shadow-md hover:bg-[#188B6B] transition-all active:scale-98"
              >
                <span>Explore Clean Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* ── FOOTER CHECKOUT BAR ── */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#E8E3D8] space-y-3 shadow-[0_-8px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-xs text-[#6B685F] font-body">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#1FA882]" />
                <span>Beltola Tiniali Dispatch (~25 mins)</span>
              </span>
              <span className="text-[#1FA882] font-heading font-bold">FREE DELIVERY</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-body font-bold text-[#6B685F] uppercase tracking-wider block">
                  Total To Pay
                </span>
                <span className="font-heading font-black text-xl sm:text-2xl text-[#C2820B] tracking-tight">
                  {formatINR(totalPrice)}
                </span>
              </div>

              {/* Clean Emerald/Teal Primary CTA Button */}
              <button
                onClick={handleProceedToCheckout}
                className="cursor-pointer py-3.5 px-6 rounded-2xl sm:rounded-full bg-[#1FA882] hover:bg-[#188B6B] text-white font-heading font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(31,168,130,0.3)] transition-all active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-[#6B685F] text-center pt-1 border-t border-[#E8E3D8]/60">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1FA882] shrink-0" />
              <span>100% Bagasse Compostable Bowls • Zero Chemical Leaching</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

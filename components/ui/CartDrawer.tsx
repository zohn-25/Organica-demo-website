'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { formatINR } from '@/lib/utils';
import { VegIndicator } from './Badge';
import { useToast } from '@/components/providers/ToastProvider';

export function CartDrawer() {
  const router = useRouter();
  const { showToast } = useToast();
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

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] shadow-2xl flex flex-col justify-between border-l border-[#E8E3D8]">
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#E8E3D8] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#EBF4ED] flex items-center justify-center text-[#2E5A36]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#141412]">Your Clean Bag</h3>
                <p className="text-xs text-[#6B685F] font-body">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} • 100% Organic Prep
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-[#FAF8F3] hover:bg-[#E8E3D8] flex items-center justify-center text-[#141412] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length > 0 ? (
              <>
                {/* Macro Nutrition Summary Banner */}
                <div className="bg-[#FFFFFF] border border-[#E8E3D8] rounded-2xl p-3.5 flex items-center justify-around text-center shadow-xs">
                  <div>
                    <span className="block font-heading font-extrabold text-[#2E5A36] text-base">
                      {totalProtein}g
                    </span>
                    <span className="text-[10px] text-[#6B685F] uppercase tracking-wider font-semibold">Total Protein</span>
                  </div>
                  <div className="w-px h-7 bg-[#E8E3D8]" />
                  <div>
                    <span className="block font-heading font-extrabold text-[#141412] text-base">
                      {totalCalories}
                    </span>
                    <span className="text-[10px] text-[#6B685F] uppercase tracking-wider font-semibold">Total Calories</span>
                  </div>
                  <div className="w-px h-7 bg-[#E8E3D8]" />
                  <div>
                    <span className="block font-heading font-extrabold text-[#F2B705] text-base">
                      0%
                    </span>
                    <span className="text-[10px] text-[#6B685F] uppercase tracking-wider font-semibold">Refined Oils</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cart.map(({ cartLineId, item, quantity, selectedAddOns }) => {
                    const lineKey = cartLineId || item.id;
                    const addOnsPrice = (selectedAddOns || []).reduce((s, a) => s + a.price, 0);
                    const lineTotal = (item.price + addOnsPrice) * quantity;

                    return (
                      <div
                        key={lineKey}
                        className="bg-white rounded-2xl p-3.5 border border-[#E8E3D8] flex gap-3 shadow-xs"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF8F3] shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#EBF4ED] flex items-center justify-center text-xs text-[#2E5A36]">
                              Bowl
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <VegIndicator isVeg={item.isVeg} className="scale-75 origin-left" />
                                <h4 className="font-heading font-bold text-sm text-[#141412] line-clamp-1">
                                  {item.name}
                                </h4>
                              </div>
                              <span className="text-xs font-heading font-extrabold text-[#2E5A36]">
                                {formatINR(lineTotal)}
                              </span>

                              {/* Selected Add-ons Pill */}
                              {selectedAddOns && selectedAddOns.length > 0 && (
                                <p className="text-[10px] text-[#6B685F] font-body mt-0.5 line-clamp-1">
                                  + {selectedAddOns.map((a) => a.name).join(', ')}
                                </p>
                              )}
                            </div>

                            <button
                              onClick={() => removeFromCart(lineKey)}
                              className="text-[#6B685F] hover:text-[#B53424] p-1 cursor-pointer transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-[#6B685F] font-mono">
                              {item.protein ? `${item.protein * quantity}g Protein` : 'Fresh Clean Eat'}
                            </span>

                            <div className="flex items-center gap-2 bg-[#FAF8F3] border border-[#E8E3D8] rounded-full px-2 py-0.5">
                              <button
                                onClick={() => updateQuantity(lineKey, -1)}
                                className="text-[#141412] hover:text-[#2E5A36] p-0.5 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-xs font-mono min-w-3 text-center text-[#141412]">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(lineKey, 1)}
                                className="text-[#141412] hover:text-[#2E5A36] p-0.5 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={clearCart}
                  className="text-xs text-[#6B685F] hover:text-[#B53424] underline cursor-pointer w-full text-center pt-2"
                >
                  Clear Bag
                </button>
              </>
            ) : (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#EBF4ED] flex items-center justify-center text-[#2E5A36] mb-4">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#141412] mb-1">Your bag is empty</h4>
                <p className="text-xs text-[#6B685F] font-body max-w-xs mx-auto mb-6">
                  Add signature protein bowls, cold-pressed refreshers, or wholesome plates to build your clean feast.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="cursor-pointer inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#2E5A36] text-[#FAF8F3] font-body font-bold text-xs hover:bg-[#1E3D24] transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar */}
          {cart.length > 0 ? (
            <div className="p-5 bg-white border-t border-[#E8E3D8] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B685F]">
                <span>Delivery: Beltola Tiniali Express (25-35 mins)</span>
                <span className="text-[#2E5A36] font-bold">FREE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-base text-[#141412]">Total to Pay</span>
                <span className="font-heading font-black text-2xl text-[#141412]">
                  {formatINR(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full cursor-pointer py-3.5 px-6 rounded-full bg-[#F2B705] hover:bg-[#D49E00] text-[#141412] font-body font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <span>Proceed to Clean Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B685F] text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2E5A36]" />
                <span>Zero Seed Oils Guarantee • 100% Compostable Packaging</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

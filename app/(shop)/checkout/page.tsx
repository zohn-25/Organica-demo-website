'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  MapPin,
  Clock,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  Check,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';
import { useCart } from '@/features/cart/CartContext';
import { formatINR } from '@/lib/utils';
import { VegIndicator } from '@/components/ui/Badge';
import { createOrder } from '@/lib/api/orders';
import { useToast } from '@/components/providers/ToastProvider';

const DELIVERY_PRESETS = [
  {
    id: 'beltola',
    label: 'Home • Beltola Tiniali',
    address: 'House #14, Survey Road, Beltola Tiniali, Guwahati 781028',
    eta: '20–25 Mins',
  },
  {
    id: 'dispur',
    label: 'Office • Dispur Capital Complex',
    address: 'Block B, GS Road, Dispur, Guwahati 781006',
    eta: '25–30 Mins',
  },
];

const INSTRUCTION_CHIPS = [
  '🍃 Dressing on the side',
  '🚪 Leave at door / reception',
  '🔔 Do not ring bell',
  '📞 Call upon arrival',
  '🌱 Cutlery not required',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();

  const [selectedAddressId, setSelectedAddressId] = useState('beltola');
  const [selectedInstructions, setSelectedInstructions] = useState<Record<string, boolean>>({
    '🍃 Dressing on the side': true,
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    eta: number;
  } | null>(null);

  const selectedAddress =
    DELIVERY_PRESETS.find((p) => p.id === selectedAddressId) || DELIVERY_PRESETS[0];

  // Bill calculations
  const gst = Math.round(totalPrice * 0.05);
  const deliveryFee = 0; // Free promotion
  const grandTotal = totalPrice + gst + deliveryFee;

  const toggleInstruction = (text: string) => {
    setSelectedInstructions((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const activeInstructions = Object.keys(selectedInstructions).filter(
        (k) => selectedInstructions[k]
      );

      const orderPayload = {
        items: cart,
        subtotal: totalPrice,
        tax: gst,
        deliveryFee: 0,
        total: grandTotal,
        customer: {
          name: 'Organica Diner',
          phone: '+91 98450 12345',
          address: selectedAddress.address,
          instructions: activeInstructions.join(', ') || 'Clean zero seed-oils prep',
        },
        paymentMethod: (paymentMethod === 'cod'
          ? 'cash_on_delivery'
          : paymentMethod === 'card'
          ? 'razorpay'
          : 'upi') as 'cash_on_delivery' | 'razorpay' | 'upi',
      };

      const result = await createOrder(orderPayload);

      if (result.success) {
        setConfirmedOrder({
          orderId: result.orderId,
          total: grandTotal,
          eta: result.estimatedDeliveryMinutes || 25,
        });
        clearCart();
        showToast({
          type: 'success',
          title: `Order #${result.orderId} Placed!`,
          message: 'Kitchen prep started. Bagasse bowls dispatched soon.',
          duration: 5000,
        });
      }
    } catch {
      showToast({
        type: 'error',
        title: 'Checkout Failed',
        message: 'Could not connect to kitchen order system. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── ORDER CONFIRMED SCREEN ──
  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] pt-14 pb-24 px-4 flex items-center justify-center select-none">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8E3D8] p-6 sm:p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#EBF4ED] text-[#2E5A36] mx-auto flex items-center justify-center shadow-xs">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-[#2E5A36] uppercase tracking-wider">
              Order Confirmed
            </span>
            <h1 className="font-heading font-black text-2xl text-[#141412]">
              Order #{confirmedOrder.orderId}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B685F] font-body">
              Our Beltola Tiniali culinary team has started preparing your zero seed-oil meal.
            </p>
          </div>

          <div className="bg-[#FAF8F3] rounded-2xl p-4 border border-[#E8E3D8] space-y-3 text-left">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#6B685F] font-body">Estimated Delivery</span>
              <span className="font-heading font-bold text-[#2E5A36] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{confirmedOrder.eta} Minutes</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#6B685F] font-body">Delivery Location</span>
              <span className="font-heading font-bold text-[#141412] truncate max-w-[200px]">
                {selectedAddress.label}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-[#E8E3D8]">
              <span className="text-[#6B685F] font-body">Amount Paid</span>
              <span className="font-heading font-black text-[#141412]">
                {formatINR(confirmedOrder.total)}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <a
              href="https://wa.me/919845012345?text=Hello%20Organica!%20Checking%20status%20for%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Track Updates on WhatsApp</span>
            </a>

            <Link
              href="/"
              className="block w-full py-3.5 rounded-full bg-[#FAF8F3] hover:bg-[#E8E3D8] text-[#141412] font-heading font-bold text-sm transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── EMPTY BAG SCREEN ──
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F3] pt-20 pb-24 px-4 flex items-center justify-center select-none">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#E8E3D8] p-8 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border border-[#E8E3D8] flex items-center justify-center text-[#6B685F] mx-auto">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="font-heading font-bold text-xl text-[#141412]">
              Your Clean Bag is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#6B685F] font-body">
              Explore our wholesome protein bowls, salads, and cold-pressed drinks.
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
      </div>
    );
  }

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
            <h1 className="font-heading font-black text-sm sm:text-base text-[#141412]">
              Review &amp; Checkout
            </h1>
            <span className="text-[10px] font-body text-[#6B685F]">
              {totalCount} {totalCount === 1 ? 'item' : 'items'} in your clean bag
            </span>
          </div>

          <div className="w-8" />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-4 space-y-4">
        {/* ── 1. DELIVERY HUB & ADDRESS CARD ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E8E3D8] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-heading font-extrabold uppercase text-[#1FA882] tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivering From Beltola Tiniali Hub</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF4ED] text-[#2E5A36] text-[10px] font-mono font-bold">
              <Clock className="w-3 h-3 text-[#F2B705]" />
              <span>{selectedAddress.eta}</span>
            </span>
          </div>

          {/* Address Options */}
          <div className="space-y-2">
            {DELIVERY_PRESETS.map((preset) => {
              const isSelected = selectedAddressId === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => setSelectedAddressId(preset.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#F0FDF4] border-[#1FA882] ring-1 ring-[#1FA882]/20'
                      : 'bg-[#FAF8F3] border-[#E8E3D8] hover:border-[#1FA882]/40'
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <span className="font-heading font-bold text-xs sm:text-sm text-[#141412] block">
                      {preset.label}
                    </span>
                    <p className="text-[11px] text-[#6B685F] font-body truncate">
                      {preset.address}
                    </p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-[#1FA882] bg-[#1FA882] text-white'
                        : 'border-[#A6A295] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 2. ITEM DETAILS LIST ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E8E3D8] shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E3D8]/60">
            <h2 className="font-heading font-bold text-sm text-[#141412]">
              Order Items ({totalCount})
            </h2>
            <Link
              href="/menu"
              className="text-[11px] font-heading font-extrabold text-[#1FA882] hover:underline"
            >
              + Add More Food
            </Link>
          </div>

          <div className="space-y-3 divide-y divide-[#E8E3D8]/60">
            {cart.map(({ cartLineId, item, quantity, selectedAddOns }) => {
              const lineKey = cartLineId || item.id;
              const addOnsPrice = (selectedAddOns || []).reduce(
                (sum, a) => sum + a.price,
                0
              );
              const unitPrice = item.price + addOnsPrice;
              const lineTotal = unitPrice * quantity;

              return (
                <div key={lineKey} className="pt-3 first:pt-0 flex items-start gap-3">
                  {/* Thumbnail */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-[#FAF8F3] shrink-0 border border-[#E8E3D8]">
                    <Image
                      src={item.image || '/images/hero-bowl.jpg'}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <VegIndicator isVeg={item.isVeg} className="scale-75 origin-left" />
                          <h3 className="font-heading font-bold text-xs sm:text-sm text-[#141412] truncate">
                            {item.name}
                          </h3>
                        </div>
                        {selectedAddOns && selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-[#6B685F] font-body line-clamp-1">
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

                    <div className="flex items-center justify-between pt-0.5">
                      <span className="font-heading font-black text-xs sm:text-sm text-[#C2820B]">
                        {formatINR(lineTotal)}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 bg-[#FAF8F3] border border-[#E8E3D8] rounded-full px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(lineKey, -1)}
                          className="text-[#141412] hover:text-[#1FA882] p-0.5 cursor-pointer"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3 stroke-[2.5]" />
                        </button>
                        <span className="font-mono font-bold text-xs text-[#141412] min-w-3 text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(lineKey, 1)}
                          className="text-[#141412] hover:text-[#1FA882] p-0.5 cursor-pointer"
                          aria-label="Increase"
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
        </div>

        {/* ── 3. COOKING & DELIVERY INSTRUCTION CHIPS ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E8E3D8] shadow-xs space-y-2.5">
          <h3 className="font-heading font-bold text-xs sm:text-sm text-[#141412]">
            Kitchen &amp; Delivery Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {INSTRUCTION_CHIPS.map((chip) => {
              const active = !!selectedInstructions[chip];
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => toggleInstruction(chip)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-body font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1FA882] text-white shadow-2xs'
                      : 'bg-[#FAF8F3] text-[#6B685F] border border-[#E8E3D8] hover:border-[#1FA882]/40'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4. PAYMENT METHOD SELECTOR ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E8E3D8] shadow-xs space-y-3">
          <h3 className="font-heading font-bold text-xs sm:text-sm text-[#141412]">
            Payment Options
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {/* UPI */}
            <div
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                paymentMethod === 'upi'
                  ? 'bg-[#F0FDF4] border-[#1FA882] ring-1 ring-[#1FA882]/30 shadow-2xs'
                  : 'bg-[#FAF8F3] border-[#E8E3D8]'
              }`}
            >
              <Smartphone className="w-5 h-5 text-[#1FA882]" />
              <span className="font-heading font-bold text-[11px] text-[#141412]">
                UPI / QR
              </span>
              <span className="text-[9px] text-[#6B685F]">GPay, PhonePe</span>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setPaymentMethod('cod')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                paymentMethod === 'cod'
                  ? 'bg-[#F0FDF4] border-[#1FA882] ring-1 ring-[#1FA882]/30 shadow-2xs'
                  : 'bg-[#FAF8F3] border-[#E8E3D8]'
              }`}
            >
              <Banknote className="w-5 h-5 text-[#1FA882]" />
              <span className="font-heading font-bold text-[11px] text-[#141412]">
                Cash On Delivery
              </span>
              <span className="text-[9px] text-[#6B685F]">Pay at doorstep</span>
            </div>

            {/* Card */}
            <div
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                paymentMethod === 'card'
                  ? 'bg-[#F0FDF4] border-[#1FA882] ring-1 ring-[#1FA882]/30 shadow-2xs'
                  : 'bg-[#FAF8F3] border-[#E8E3D8]'
              }`}
            >
              <CreditCard className="w-5 h-5 text-[#1FA882]" />
              <span className="font-heading font-bold text-[11px] text-[#141412]">
                Cards / NetBank
              </span>
              <span className="text-[9px] text-[#6B685F]">Debit/Credit</span>
            </div>
          </div>
        </div>

        {/* ── 5. BILL SUMMARY ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E8E3D8] shadow-xs space-y-2.5">
          <h3 className="font-heading font-bold text-xs sm:text-sm text-[#141412] pb-1 border-b border-[#E8E3D8]/60">
            Bill Details
          </h3>

          <div className="space-y-1.5 text-xs font-body">
            <div className="flex items-center justify-between text-[#6B685F]">
              <span>Item Total</span>
              <span className="font-mono text-[#141412] font-semibold">{formatINR(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-[#6B685F]">
              <span>Organic Eco Bagasse Packaging</span>
              <span className="text-[#1FA882] font-bold">FREE</span>
            </div>
            <div className="flex items-center justify-between text-[#6B685F]">
              <span>Local Beltola Hub Delivery</span>
              <span className="text-[#1FA882] font-bold">FREE</span>
            </div>
            <div className="flex items-center justify-between text-[#6B685F]">
              <span>GST (5%)</span>
              <span className="font-mono text-[#141412] font-semibold">{formatINR(gst)}</span>
            </div>
            <div className="flex items-center justify-between text-sm sm:text-base font-heading font-black text-[#141412] pt-2 border-t border-[#E8E3D8]">
              <span>To Pay</span>
              <span className="text-[#C2820B]">{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Zero Seed Oil Guarantee Stamp */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-body text-[#6B685F] py-1">
          <ShieldCheck className="w-4 h-4 text-[#1FA882]" />
          <span>100% Zero Seed-Oils • Cooked in Pure Cold-Pressed Oils</span>
        </div>
      </div>

      {/* ── FIXED BOTTOM ACTION BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E3D8] px-4 py-3 shadow-[0_-8px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-body text-[#6B685F] block uppercase tracking-wider font-bold">
              Total Payable
            </span>
            <span className="font-heading font-black text-lg sm:text-xl text-[#C2820B]">
              {formatINR(grandTotal)}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="flex-1 py-3.5 sm:py-4 rounded-full bg-[#1FA882] hover:bg-[#188B6B] disabled:opacity-50 text-white font-heading font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Confirming Order...</span>
            ) : (
              <>
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

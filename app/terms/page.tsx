import React from 'react';
import Link from 'next/link';
import { Scale, ArrowLeft, Truck, AlertTriangle, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Terms of Service • Organica Guwahati',
  description: 'Terms and conditions for placing orders, delivery, and meal subscriptions with Organica.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-28 pb-20 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-body font-bold text-[#6B685F] hover:text-[#141412] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-[#E8E3D8]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E5A36]">
            <Scale className="w-4 h-4" />
            <span>Customer Agreement</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#141412] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[#6B685F] font-body">
            Last Updated: September 2026 • Organica Clean Foods Pvt. Ltd., Guwahati, Assam.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E3D8] shadow-2xs space-y-8 font-body text-xs sm:text-sm text-[#4A4843] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#2E5A36]" />
              <span>1. Ordering &amp; Delivery Across Guwahati</span>
            </h2>
            <p>
              By placing an order through the Organica website, WhatsApp desk, or phone line, you agree to these terms:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B685F]">
              <li>Orders are prepared fresh-to-order at our Beltola Tiniali studio kitchen.</li>
              <li>
                Estimated delivery windows are 25–35 minutes for primary zones (Beltola, Dispur, Six Mile, GS Road,
                Christian Basti, Ganeshguri). Severe monsoon rain or peak Guwahati traffic may occasionally affect arrival times.
              </li>
              <li>Please ensure your phone is reachable when the delivery rider arrives at your gate or building reception.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#2E5A36]" />
              <span>2. Nutritional Values &amp; Allergen Disclaimer</span>
            </h2>
            <p>
              Organica strives for absolute precision in counting macronutrients (protein, carbs, calories). However,
              since meals are prepared from whole organic ingredients, natural seasonal variances (such as avocado size
              or wild-catch basa density) may cause slight deviations within ±5–8% of stated values.
            </p>
            <p className="text-[#6B685F]">
              If you have severe allergies (nuts, eggs, fish, dairy), please alert our culinary concierge prior to cooking.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <RefreshCcw className="w-4 h-4 text-[#2E5A36]" />
              <span>3. Cancellations, Replacements &amp; Refunds</span>
            </h2>
            <p>
              Because our food is freshly cooked to order in cold-pressed oils, orders can only be cancelled within
              <strong> 5 minutes</strong> of placement. If your order arrives compromised, spilled, or incorrect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B685F]">
              <li>Send a quick photo to our WhatsApp desk (+91 98450 12345) within 30 minutes of delivery.</li>
              <li>We will dispatch an immediate replacement bowl or issue an instant full refund to your original payment method.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2E5A36]" />
              <span>4. Studio Kitchen Takeaway &amp; Pickup</span>
            </h2>
            <p>
              Customers choosing curbside pickup or studio takeaway are welcome to collect their orders directly from:
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E3D8] space-y-1 text-xs">
              <p className="font-bold text-[#141412]">Organica Beltola Tiniali Kitchen</p>
              <p>{RESTAURANT_INFO.address}</p>
              <p>Operating Hours: {RESTAURANT_INFO.hours.weekdays}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ShieldCheck, HeartPulse, Leaf, Truck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Story • Organica Guwahati',
  description:
    'Learn about Organica — Guwahati’s first zero seed-oil kitchen and culinary wellness studio in Beltola Tiniali.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-28 pb-20 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ── Editorial Header ── */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-body font-bold text-[#2E5A36] uppercase tracking-[0.25em] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2E5A36]" />
            <span>Guwahati&apos;s Clean-Eating Revolution</span>
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#141412] tracking-tight">
            Food as Fuel. Cooked with Complete Honesty.
          </h1>
          <p className="text-sm sm:text-base text-[#6B685F] font-body leading-relaxed">
            We started Organica at Beltola Tiniali with a simple observation: finding authentic, gourmet clean food in
            Guwahati without hidden seed-oils, artificial thickeners, or processed sugars was nearly impossible.
          </p>
        </div>

        {/* ── Visual Backdrop Card ── */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-[#E8E3D8] shadow-sm bg-white">
          <Image
            src="/images/hero-culinary-backdrop.jpg"
            alt="Organica Kitchen Studio Guwahati"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141412]/80 via-[#141412]/30 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-[#FAF8F3] space-y-1 max-w-lg">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F2B705] block">
                Central Studio Kitchen
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl">
                Beltola Tiniali • Guwahati
              </h3>
              <p className="text-xs text-[#FAF8F3]/80 font-body">
                Operating 8:00 AM – 10:00 PM daily with direct thermal-insulated delivery to Beltola, Dispur, GS Road, and beyond.
              </p>
            </div>
          </div>
        </div>

        {/* ── 3 Core Pillars ── */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#141412]">
              The Three Non-Negotiables
            </h2>
            <p className="text-xs sm:text-sm text-[#6B685F] font-body">
              The foundational culinary rules behind every bowl that leaves our kitchen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3D8] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EBF4ED] text-[#2E5A36] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#141412]">Zero Refined Seed-Oils</h3>
              <p className="text-xs text-[#6B685F] font-body leading-relaxed">
                Strictly zero palm, canola, or hydrogenated cooking fats. We sauté and dress exclusively in cold-pressed
                mustard, extra virgin olive oil, and organic A2 ghee.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3D8] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF9E6] text-[#D49E00] flex items-center justify-center">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#141412]">Accurate Macro Counting</h3>
              <p className="text-xs text-[#6B685F] font-body leading-relaxed">
                Every chicken cut, basa fillet, egg, and organic quinoa scoop is precision-weighed before plating so your
                protein and calorie targets match your fitness tracker.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E3D8] shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EBF4ED] text-[#2E5A36] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#141412]">100% Compostable Bagasse</h3>
              <p className="text-xs text-[#6B685F] font-body leading-relaxed">
                Hot food in toxic single-use plastic leaches endocrine-disrupting chemicals. We package 100% of our meals in
                sugarcane bagasse bowls that naturally compost.
              </p>
            </div>
          </div>
        </div>

        {/* ── Local Sourcing Narrative ── */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E3D8] shadow-2xs space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E5A36] block">
            Farm to Table within 12 Hours
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#141412]">
            Rooted in Assam&apos;s Fertile Soils
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4843] font-body leading-relaxed">
            Our heirloom greens, native herbs, and seasonal vegetables are harvested every dawn from local partner growers
            across the Brahmaputra valley and Kamrup. Delivered directly to our Beltola kitchen, sanitized in ozone water,
            and prepared fresh for your lunch and dinner dispatch.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href="/menu"
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] font-body font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2B705]" />
            </Link>

            <Link
              href="/#contact"
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F3] hover:bg-[#ECE7DC] text-[#141412] border border-[#E8E3D8] font-body font-bold text-xs sm:text-sm transition-all active:scale-95"
            >
              <Truck className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Kitchen Location &amp; Hours</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

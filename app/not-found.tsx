import React from 'react';
import Link from 'next/link';
import { Utensils, Home, Compass } from 'lucide-react';
import { ScatterAvocado } from '@/components/ui/ScatterElements';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] relative overflow-hidden select-none">
      {/* Decorative Botanical Accent */}
      <div className="absolute top-12 right-12 opacity-80 pointer-events-none hidden md:block">
        <ScatterAvocado size={80} />
      </div>

      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        {/* Visual Badge / Tag */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#E8E3D8] shadow-2xs">
          <Utensils className="w-3.5 h-3.5 text-[#2E5A36]" />
          <span className="text-xs font-body font-bold text-[#2E5A36] uppercase tracking-[0.2em]">
            404 • Recipe Not Found
          </span>
        </div>

        {/* Large Styled Number & Headline */}
        <div className="space-y-3">
          <h1 className="font-heading font-black text-7xl sm:text-8xl lg:text-9xl text-[#141412] tracking-tighter">
            404
          </h1>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#141412]">
            Looks like this dish isn&apos;t on our menu!
          </h2>
          <p className="text-sm text-[#6B685F] font-body leading-relaxed max-w-md mx-auto">
            The page or secret culinary creation you&apos;re searching for might have been retired from our seasonal
            organic harvest, or the link has changed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] font-body font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4 text-[#F2B705]" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/menu"
            className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F3] text-[#141412] border border-[#E8E3D8] hover:border-[#2E5A36]/40 font-body font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-95"
          >
            <Compass className="w-4 h-4 text-[#2E5A36]" />
            <span>Browse Full Menu</span>
          </Link>
        </div>

        {/* Guwahati Kitchen Help Note */}
        <div className="pt-6 border-t border-[#E8E3D8]/80 text-xs text-[#8C887B] font-body">
          Need immediate support with an order in Guwahati? Call our Beltola kitchen at{' '}
          <a href="tel:+919845012345" className="text-[#2E5A36] font-bold hover:underline">
            +91 98450 12345
          </a>
        </div>
      </div>
    </div>
  );
}

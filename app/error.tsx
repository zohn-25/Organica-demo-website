'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring if needed
    console.error('Organica Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] select-none">
      <div className="max-w-md w-full bg-white rounded-[32px] p-8 sm:p-10 border border-[#E8E3D8] shadow-sm text-center space-y-6">
        {/* Amber/Red Alert Icon */}
        <div className="w-16 h-16 rounded-full bg-[#FFF5F2] border border-[#FF5E36]/30 text-[#FF5E36] flex items-center justify-center mx-auto shadow-xs">
          <AlertCircle className="w-8 h-8" />
        </div>

        {/* Friendly Culinary Copy */}
        <div className="space-y-2">
          <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-[#FF5E36] block">
            Kitchen Mishap
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#141412] tracking-tight">
            Something went wrong in the kitchen
          </h2>
          <p className="text-xs sm:text-sm text-[#6B685F] font-body leading-relaxed">
            Our chefs may have spilled some cold-pressed olive oil on the circuit. Don&apos;t worry, your orders
            and cart are completely safe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] font-body font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#F2B705]" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F3] hover:bg-[#F4EFE6] text-[#141412] border border-[#E8E3D8] font-body font-bold text-xs sm:text-sm transition-all active:scale-95"
          >
            <Home className="w-3.5 h-3.5 text-[#2E5A36]" />
            <span>Back Home</span>
          </Link>
        </div>

        {/* Error Digest / Diagnostics */}
        {error.digest && (
          <p className="text-[10px] text-[#A09D93] font-mono pt-2">
            Reference ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}

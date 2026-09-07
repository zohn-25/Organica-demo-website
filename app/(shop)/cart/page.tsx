'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/checkout');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-[#1FA882] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-body text-[#6B685F]">Opening your clean bag...</p>
      </div>
    </div>
  );
}

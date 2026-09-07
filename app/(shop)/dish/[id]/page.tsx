'use client';

import React, { use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { findDishById } from '@/features/menu/data/menu-data';
import { DishDetailModal } from '@/components/mobile/DishDetailModal';

interface DishPageProps {
  params: Promise<{ id: string }>;
}

export default function DishDetailPage({ params }: DishPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const dish = findDishById(resolvedParams.id);

  if (!dish) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] flex items-center justify-center p-0 sm:p-4">
      <DishDetailModal
        dish={dish}
        isOpen={true}
        onClose={() => router.back()}
        onGoToCheckout={() => router.push('/checkout')}
      />
    </div>
  );
}

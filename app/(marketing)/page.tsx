'use client';

import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhatsOnPlate } from '@/components/sections/WhatsOnPlate';
import { MenuSection } from '@/components/sections/MenuSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CustomFoodBanner } from '@/components/sections/CustomFoodBanner';
import { LocationContactSection } from '@/components/sections/LocationContactSection';
import { MobileAppView } from '@/components/mobile/MobileAppView';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* ── DESKTOP & TABLET VIEW (md and up: 100% UNTOUCHED) ── */}
      <div className="hidden md:block">
        {/* 1. Hero Section with choreographed entrance animation, dark slate & multi-layer wave */}
        <HeroSection />

        {/* 2. Editorial Feature Bowl Split & 4 Process Step Cards (White, Black, White, White) */}
        <WhatsOnPlate />

        {/* 3. Categorized Menu Grid (8-card grid with tabs, ratings, and instant cart) */}
        <MenuSection />

        {/* 4. Customer Testimonials (2 wide cards with avocado & strawberry accents) */}
        <TestimonialsSection />

        {/* 5. Signature Dish Showcase with floating review card (French Toast / Brioche) */}
        <CustomFoodBanner />

        {/* 6. Location Radius Map & Minimal Contact Desk */}
        <LocationContactSection />
      </div>

      {/* ── MOBILE DELIVERY APP VIEW (block md:hidden: matches reference design exactly) ── */}
      <div className="block md:hidden">
        <MobileAppView />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MENU_ITEMS, CATEGORY_TABS } from '../data/menu-data';
import { useMenuFilter } from '../hooks/useMenuFilter';
import { MenuCard } from './MenuCard';
import { SplitHeading } from '@/components/ui/SplitHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function MenuGrid() {
  const {
    activeCategory,
    setActiveCategory,
    filteredItems,
  } = useMenuFilter(MENU_ITEMS);

  // In-place expansion state: default to 8 items, expand to all items on click
  const [isExpanded, setIsExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // GSAP Choreographed Scroll Animations
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Category chips row: Left-to-right clip-path wipe, staggered
      if (chipsRef.current) {
        const chips = chipsRef.current.querySelectorAll('.category-chip');
        gsap.fromTo(
          chips,
          {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            opacity: 0.4,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: chipsRef.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      }

      // 2. Menu Cards Batch: Masked/clipped rise with randomized delay variance
      if (cardsGridRef.current) {
        const cards = cardsGridRef.current.querySelectorAll('.menu-grid-card');
        ScrollTrigger.batch(cards, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            batch.forEach((card, idx) => {
              const randomDelay = 0.05 + (idx % 4) * 0.04 + Math.random() * 0.08;
              gsap.fromTo(
                card,
                {
                  clipPath: 'inset(30% 0% 0% 0%)',
                  y: 35,
                  opacity: 0,
                },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: 'power3.out',
                  delay: randomDelay,
                  clearProps: 'clipPath,transform',
                }
              );
            });
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, [activeCategory, isExpanded]);

  // If expanded, show all filtered items (or all 27 items), else initial 8 items
  const displayItems = isExpanded ? filteredItems : filteredItems.slice(0, 8);

  const handleToggleExpand = () => {
    if (!isExpanded) {
      // If current category has 8 or fewer items, switch to 'all' so all 27 cards appear
      if (activeCategory !== 'all' && filteredItems.length <= 8) {
        setActiveCategory('all');
      }
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
      // Smoothly scroll back to top of menu grid when collapsing
      const gridElem = document.getElementById('menu-grid');
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div ref={rootRef} className="w-full space-y-10" id="menu-grid">
      {/* ── Editorial Header: Headline on Left, Minimal Tabs on Right (Direct Reference Match) ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#E8E3D8]/60">
        <div>
          <span className="text-xs sm:text-sm font-body font-bold text-[#2E5A36] uppercase tracking-[0.25em] flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#2E5A36]" />
            <span>Seasonal Harvest • Menu</span>
          </span>
          <SplitHeading className="font-heading font-black text-3xl sm:text-4xl text-[#141412] tracking-tight">
            Crafted Daily. Zero Seed-Oils.
          </SplitHeading>
        </div>

        {/* Minimalist Editorial Category Tabs (Clip-path stagger reveal) */}
        <div
          ref={chipsRef}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id);
                }}
                className={`category-chip cursor-pointer px-4 py-2 rounded-full text-xs sm:text-sm font-body font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#141412] text-[#FAF8F3] shadow-sm'
                    : 'text-[#6B685F] hover:text-[#141412] hover:bg-[#E8E3D8]/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Menu Food Cards Grid (Batch masked rise with randomized stagger) ── */}
      <div ref={cardsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            className={`menu-grid-card ${index >= 8 ? 'animate-fadeIn' : ''}`}
            style={index >= 8 ? { animationDelay: `${Math.min((index - 8) * 15, 120)}ms` } : undefined}
          >
            <MenuCard item={item} />
          </div>
        ))}
      </div>

      {/* ── In-Place Toggle Action: Expand / Collapse All Cards ── */}
      <div className="text-center pt-4 space-y-2">
        <button
          type="button"
          onClick={handleToggleExpand}
          className={`cursor-pointer inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-body font-extrabold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 group ${
            isExpanded
              ? 'bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] border border-[#141412]'
              : 'bg-[#FFFFFF] hover:bg-[#141412] text-[#141412] hover:text-[#FAF8F3] border border-[#E8E3D8] hover:border-[#141412]'
          }`}
        >
          {isExpanded ? (
            <>
              <span>Show Top 8 Featured Dishes</span>
              <ChevronUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              <span>Explore All 27 Clean Dishes</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
            </>
          )}
        </button>

        {isExpanded && (
          <p className="text-[11px] font-body text-[#6B685F]">
            Showing all {displayItems.length} handcrafted clean dishes • 100% Zero Refined Seed-Oils
          </p>
        )}
      </div>
    </div>
  );
}



'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Search,
  ChevronDown,
  Clock,
  Star,
  Plus,
  Heart,
  Check,
  Sparkles,
  Phone,
  MessageCircle,
  X,
  Navigation,
  Salad,
  Egg,
  Flame,
  Citrus,
  Leaf,
} from 'lucide-react';
import { MENU_ITEMS, SIGNATURE_BOWLS } from '@/features/menu/data/menu-data';
import { MenuItem, MenuCategoryId } from '@/features/menu/types';
import { useCart } from '@/features/cart/CartContext';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/components/providers/ToastProvider';
import { RESTAURANT_INFO } from '@/lib/constants';
import { DishDetailModal } from '@/components/mobile/DishDetailModal';

interface CategoryIconItem {
  id: MenuCategoryId;
  label: string;
  icon: React.ElementType;
}

const CATEGORY_ICONS: CategoryIconItem[] = [
  { id: 'all', label: 'All Bowls', icon: Salad },
  { id: 'breakfast', label: 'Breakfast', icon: Egg },
  { id: 'power-plates', label: 'Power Plates', icon: Flame },
  { id: 'refreshers', label: 'Refreshers', icon: Citrus },
  { id: 'wellness', label: 'Wellness', icon: Leaf },
  { id: 'crave', label: 'Clean Crave', icon: Sparkles },
];

const SEGMENT_TABS = [
  { id: 'all', label: 'All Food' },
  { id: 'high-protein', label: 'High Protein' },
  { id: 'veg', label: 'Pure Veg' },
  { id: 'refreshers', label: 'Refreshers' },
];

export function MobileAppView() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('all');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [selectedDishForModal, setSelectedDishForModal] = useState<MenuItem | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  const openDishDetail = (dish: MenuItem) => {
    setSelectedDishForModal(dish);
    setIsDishModalOpen(true);
  };

  // Toggle favorite
  const toggleFavorite = (itemId: string, itemName: string) => {
    setFavorites((prev) => {
      const newState = !prev[itemId];
      showToast({
        type: newState ? 'success' : 'info',
        title: newState ? 'Saved to Favorites' : 'Removed from Favorites',
        message: `${itemName} ${newState ? 'added to your favorites' : 'removed'}.`,
        duration: 2500,
      });
      return { ...prev, [itemId]: newState };
    });
  };

  // Add to cart with feedback
  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);

    showToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${item.name} added to your clean harvest order.`,
      duration: 2500,
    });
  };

  // Combine items for the mobile feed
  const allDishes = useMemo(() => {
    // Map signature bowls into menu items format for consistent grid display
    const signatureItems: MenuItem[] = SIGNATURE_BOWLS.map((sb) => ({
      id: sb.id,
      name: sb.name,
      category: 'power-plates',
      price: sb.price,
      description: sb.description,
      isVeg: sb.isVeg,
      image: sb.image,
      calories: sb.calories,
      protein: sb.protein,
      rating: 4.9,
      reviewsCount: 350,
      badge: "Chef's Signature",
      featured: true,
    }));

    return [...signatureItems, ...MENU_ITEMS];
  }, []);

  // Filtered items based on search, category icon, and segment pills
  const filteredItems = useMemo(() => {
    return allDishes.filter((dish) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesDesc = dish.description.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }

      // Category Icon filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }

      // Segment filter
      if (selectedSegment === 'high-protein' && (dish.protein || 0) < 18) {
        return false;
      }
      if (selectedSegment === 'veg' && !dish.isVeg) {
        return false;
      }
      if (selectedSegment === 'refreshers' && dish.category !== 'refreshers') {
        return false;
      }

      return true;
    });
  }, [allDishes, searchQuery, selectedCategory, selectedSegment]);

  // Separate into Popular and Trending for the reference layout
  const popularItems = useMemo(() => filteredItems.slice(0, 4), [filteredItems]);
  const trendingItems = useMemo(() => filteredItems.slice(4, 12), [filteredItems]);

  return (
    <div className="w-full min-h-screen bg-[#FAF8F3] pb-28 select-none">
      {/* ── 1. Top Atmospheric Header with Organic Gradient Background ── */}
      <div className="bg-gradient-to-b from-[#E7F0E8] via-[#FAF8F3]/90 to-[#FAF8F3] px-3 sm:px-4 pt-16 pb-4 space-y-3 sm:space-y-4">
        {/* Location & Kitchen Status Bar (Responsive for 320px Mobile S & 375px Mobile M) */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-white border border-[#E8E3D8] shadow-xs flex items-center justify-center text-[#2E5A36] shrink-0">
              <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] font-body font-bold text-[#6B685F] uppercase tracking-wider block truncate">
                Current Kitchen Hub
              </span>
              <div className="flex items-center gap-1 min-w-0">
                <span className="font-heading font-extrabold text-xs sm:text-sm text-[#141412] truncate">
                  Beltola Tiniali, Guwahati
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2E5A36] shrink-0" />
              </div>
            </div>
          </div>

          {/* Clean Eating Live Badge (Never wraps, shrink-0 with crisp spacing) */}
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 border border-[#2E5A36]/25 shadow-2xs whitespace-nowrap">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2E5A36] animate-pulse shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-body font-extrabold text-[#2E5A36] whitespace-nowrap">
              Zero Seed-Oils
            </span>
          </div>
        </div>

        {/* ── 2. Search Input (Direct Reference Match, smooth truncate on small screens) ── */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 sm:left-3.5 flex items-center pointer-events-none text-[#6B685F]">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clean bowls, salads, refreshers..."
            className="w-full bg-white border border-[#E8E3D8] rounded-full pl-9 sm:pl-10 pr-8 sm:pr-9 py-2.5 sm:py-3 text-xs sm:text-sm font-body text-[#141412] placeholder:text-[#8C887B] shadow-xs focus:outline-none focus:border-[#2E5A36] focus:ring-2 focus:ring-[#2E5A36]/15 transition-all truncate"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-3 flex items-center text-[#6B685F] hover:text-[#141412]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── 3. Segment Filter Pills (Food, High Protein, Veg, Refreshers) ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
          {SEGMENT_TABS.map((seg) => {
            const isSelected = selectedSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => setSelectedSegment(seg.id)}
                aria-pressed={isSelected}
                className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-body font-bold transition-all whitespace-nowrap shadow-2xs shrink-0 ${
                  isSelected
                    ? 'bg-[#2E5A36] text-[#FAF8F3] shadow-xs scale-102'
                    : 'bg-white text-[#4A4843] border border-[#E8E3D8] hover:border-[#2E5A36]/40'
                }`}
              >
                {seg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. Horizontal Category Icon Carousel (Professional UI/UX Library Icons) ── */}
      <div className="px-3 sm:px-4 py-2">
        <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar py-2">
          {CATEGORY_ICONS.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const IconComponent = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={isSelected}
                className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
              >
                <div
                  className={`w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#2E5A36] text-[#FAF8F3] shadow-[0_6px_16px_rgba(46,90,54,0.3)] scale-105 ring-2 ring-[#2E5A36]/25'
                      : 'bg-white text-[#2E5A36] border border-[#E8E3D8] shadow-xs group-hover:border-[#2E5A36]/40 group-hover:bg-[#F5F9F6]'
                  }`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" strokeWidth={2} />
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-body font-bold text-center tracking-tight transition-colors whitespace-nowrap ${
                    isSelected ? 'text-[#2E5A36] font-extrabold' : 'text-[#4A4843]'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 5. "Ongoing Offers" Promotional Hero Card (Direct Reference Match) ── */}
      <div className="px-3 sm:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-black text-base sm:text-lg text-[#141412] tracking-tight">
            Ongoing Offers
          </h3>
          <span className="text-[11px] sm:text-xs font-body font-bold text-[#2E5A36] flex items-center gap-1">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Guwahati Special</span>
          </span>
        </div>

        {/* Green Wavy Banner Card matching reference */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1B3B22] via-[#244E2D] to-[#2E5A36] text-white p-3.5 sm:p-5 shadow-lg border border-[#2E5A36]/40 flex items-center justify-between gap-2">
          {/* Subtle Organic Background Patterns */}
          <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-12 -top-8 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />

          {/* Left Text & CTA */}
          <div className="space-y-2 sm:space-y-3 z-10 min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-white/15 text-[9px] sm:text-[10px] font-bold text-[#FAF8F3] tracking-wide backdrop-blur-xs whitespace-nowrap">
              <span>🌱 100% Zero Seed-Oils</span>
            </div>
            <h4 className="font-heading font-black text-base sm:text-xl leading-tight text-[#FAF8F3]">
              Ongoing Offers <br />
              <span className="text-[#F2B705]">You Can't Miss!</span>
            </h4>
            <p className="text-[10px] sm:text-[11px] text-white/80 font-body leading-snug line-clamp-2">
              Farm-to-bowl protein feast delivered hot in Beltola &amp; Dispur.
            </p>
            <button
              onClick={() => {
                const target = document.getElementById('popular-dishes');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="cursor-pointer inline-flex items-center justify-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-[#141412] hover:bg-[#F2B705] transition-all font-body font-extrabold text-[11px] sm:text-xs shadow-md active:scale-95"
            >
              Order Now
            </button>
          </div>

          {/* Right Cutout Circular Food Image Overflowing (Direct Reference Match) */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 -mr-1 sm:-mr-2 z-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-3 sm:border-4 border-white/25 shadow-2xl relative">
              <Image
                src="/images/hero-bowl.jpg"
                alt="Chicken Protein Power Bowl"
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. "Popular Items" Section (2-Column Food Card Grid) ── */}
      <div id="popular-dishes" className="px-3 sm:px-4 py-2 space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1 pr-2">
            <h3 className="font-heading font-black text-base sm:text-lg text-[#141412] tracking-tight">
              Popular Items
            </h3>
            <span className="text-[10px] sm:text-[11px] text-[#6B685F] font-body block truncate">
              Highest rated by Guwahati marathoners &amp; foodies
            </span>
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-[11px] sm:text-xs font-body font-bold text-[#2E5A36] hover:underline shrink-0"
          >
            See All
          </button>
        </div>

        {/* 2-Column Delivery App Card Grid matching reference right phone */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
          {popularItems.map((item) => {
            const isFav = !!favorites[item.id];
            const isAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                onClick={() => openDishDetail(item)}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#E8E3D8] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group cursor-pointer active:scale-98"
              >
                {/* Image Container with Floating Favorite & Prep Badge */}
                <div className="relative w-full aspect-[4/3] bg-[#FAF8F3] overflow-hidden">
                  <Image
                    src={item.image || '/images/hero-bowl.jpg'}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Floating Favorite Heart in circle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id, item.name);
                    }}
                    className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#141412] hover:text-[#B53424] shadow-xs transition-colors cursor-pointer z-10"
                    aria-label={`Favorite ${item.name}`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isFav ? 'fill-[#B53424] text-[#B53424]' : 'text-[#6B685F]'
                      }`}
                    />
                  </button>

                  {/* Delivery Prep Time Tag (Reference: 15 Mins / 20 Mins) */}
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#141412]/80 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-mono font-medium">
                    <Clock className="w-2.5 h-2.5 text-[#F2B705]" />
                    <span>20-25 Mins</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-2.5 sm:p-3 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#141412] line-clamp-1 leading-snug">
                      {item.name}
                    </h4>

                    {/* Rating & Reviews Count */}
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#6B685F]">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F2B705] fill-[#F2B705]" />
                      <span className="font-bold text-[#141412]">{item.rating || 4.9}</span>
                      <span>({item.reviewsCount || 150})</span>
                    </div>

                    {/* Macro pill if protein is available */}
                    {item.protein && (
                      <span className="inline-block text-[9px] sm:text-[10px] font-mono font-semibold text-[#2E5A36] bg-[#EBF4ED] px-1.5 py-0.5 rounded-md">
                        {item.protein}g Protein
                      </span>
                    )}
                  </div>

                  {/* Bottom Bar: Price Pill & Quick Action Button */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#E8E3D8]/60">
                    <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#2E5A36] text-[#FAF8F3] font-heading font-extrabold text-[11px] sm:text-xs shadow-2xs">
                      {formatINR(item.price)}
                    </span>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      aria-label={`Add ${item.name} to bag`}
                      className={`cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${
                        isAdded
                          ? 'bg-[#2E5A36] text-white scale-95'
                          : 'bg-white border border-[#E8E3D8] hover:border-[#2E5A36] text-[#141412] hover:bg-[#FAF8F3] shadow-xs active:scale-95'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2E5A36]" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 7. "Trending Dishes" Section (2-Column Grid) ── */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4 space-y-2.5 sm:space-y-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-black text-base sm:text-lg text-[#141412] tracking-tight">
              Trending Bowls &amp; Plates
            </h3>
            <span className="text-[10px] sm:text-[11px] text-[#6B685F] font-body block truncate">
              Fresh farm harvest cooked to order in Beltola
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
          {trendingItems.map((item) => {
            const isFav = !!favorites[item.id];
            const isAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                onClick={() => openDishDetail(item)}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#E8E3D8] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group cursor-pointer active:scale-98"
              >
                {/* Image Container with Floating Favorite & Prep Badge */}
                <div className="relative w-full aspect-[4/3] bg-[#FAF8F3] overflow-hidden">
                  <Image
                    src={item.image || '/images/hero-salad-bowl.jpg'}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Floating Favorite Heart in circle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id, item.name);
                    }}
                    className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#141412] hover:text-[#B53424] shadow-xs transition-colors cursor-pointer z-10"
                    aria-label={`Favorite ${item.name}`}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isFav ? 'fill-[#B53424] text-[#B53424]' : 'text-[#6B685F]'
                      }`}
                    />
                  </button>

                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-[#141412]/80 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-mono font-medium">
                    <Clock className="w-2.5 h-2.5 text-[#F2B705]" />
                    <span>20 Mins</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-2.5 sm:p-3 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#141412] line-clamp-1 leading-snug">
                      {item.name}
                    </h4>

                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#6B685F]">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F2B705] fill-[#F2B705]" />
                      <span className="font-bold text-[#141412]">{item.rating || 4.8}</span>
                      <span>({item.reviewsCount || 85})</span>
                    </div>

                    {item.calories && (
                      <span className="inline-block text-[9px] sm:text-[10px] font-mono font-semibold text-[#6B685F] bg-[#FAF8F3] px-1.5 py-0.5 rounded-md">
                        {item.calories} Kcal
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#E8E3D8]/60">
                    <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#2E5A36] text-[#FAF8F3] font-heading font-extrabold text-[11px] sm:text-xs shadow-2xs">
                      {formatINR(item.price)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      aria-label={`Add ${item.name} to bag`}
                      className={`cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${
                        isAdded
                          ? 'bg-[#2E5A36] text-white scale-95'
                          : 'bg-white border border-[#E8E3D8] hover:border-[#2E5A36] text-[#141412] hover:bg-[#FAF8F3] shadow-xs active:scale-95'
                      }`}
                    >
                      {isAdded ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2E5A36]" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 8. Guwahati Studio Kitchen & Instant Support Card ── */}
      <div id="contact" className="px-3 sm:px-4 pt-4 sm:pt-6 pb-2">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#E8E3D8] shadow-xs space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#EBF4ED] text-[#2E5A36] flex items-center justify-center shrink-0">
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2E5A36] block truncate">
                Direct Cloud Kitchen Dispatch
              </span>
              <h4 className="font-heading font-bold text-sm sm:text-base text-[#141412] truncate">
                Organica Beltola Tiniali Hub
              </h4>
              <p className="text-[10px] sm:text-[11px] text-[#6B685F] font-body line-clamp-2">
                Thermal bag delivery across Beltola, Dispur, GS Road &amp; Six Mile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-1">
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-[#FAF8F3] border border-[#E8E3D8] text-[11px] sm:text-xs font-body font-bold text-[#141412] hover:border-[#2E5A36] transition-colors"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2E5A36] shrink-0" />
              <span className="truncate">Call Kitchen</span>
            </a>
            <a
              href="https://wa.me/919845012345"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl bg-[#2E5A36] text-[#FAF8F3] text-[11px] sm:text-xs font-body font-bold hover:bg-[#1B3B22] transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F2B705] shrink-0" />
              <span className="truncate">WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── DISH DETAIL MODAL (Matching Reference UI 100%) ── */}
      <DishDetailModal
        dish={selectedDishForModal}
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        onGoToCheckout={() => {
          setIsDishModalOpen(false);
          router.push('/checkout');
        }}
      />
    </div>
  );
}

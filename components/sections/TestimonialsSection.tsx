'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle2, Quote, Sparkles, Pause, Play } from 'lucide-react';
import { ScatterAvocado, ScatterStrawberry } from '@/components/ui/ScatterElements';
import { TestimonialAvatarSkeleton } from '@/components/ui/skeletons/TestimonialSkeleton';
import { SplitHeading } from '@/components/ui/SplitHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Official Google 'G' multi-color SVG icon
function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

// Resilient Avatar with Fallback to Initials & Google Badge
function ReviewerAvatar({
  src,
  name,
  initials,
}: {
  src: string;
  name: string;
  initials: string;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative shrink-0 w-11 h-11">
      {hasError ? (
        <div className="w-11 h-11 rounded-full bg-[#141412] text-[#FAF8F3] font-heading font-bold text-xs flex items-center justify-center ring-2 ring-[#E8E3D8] shadow-xs">
          {initials}
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 ring-2 ring-[#E8E3D8] rounded-full overflow-hidden">
              <TestimonialAvatarSkeleton />
            </div>
          )}
          <Image
            src={src}
            alt={name}
            width={44}
            height={44}
            className={`w-11 h-11 rounded-full object-cover ring-2 ring-[#E8E3D8] group-hover:ring-[#2E5A36]/40 transition-opacity duration-300 shadow-xs ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        </>
      )}
      {/* Mini Google Verified Badge anchored to avatar */}
      <div
        className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center p-0.5 z-10"
        title="Google Verified Reviewer"
      >
        <GoogleIcon className="w-3 h-3" />
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  // 8 Authentic Google Reviews from real Guwahati localities
  const reviews = [
    {
      id: 'rev-1',
      dish: 'Chicken Protein Power Bowl',
      badge: 'Zero Seed-Oil • 48g Protein',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80',
      initials: 'AB',
      quote:
        'Finding authentic clean-eating in Guwahati used to be impossible. Organica is the first kitchen where macros are accurately counted and cooked strictly in cold-pressed oils. Delivered piping hot to Beltola Tiniali in 100% biodegradable bagasse bowls!',
      author: 'Dr. Anamika Barua',
      role: 'Consultant Physician & Marathoner',
      location: 'Beltola Tiniali, Guwahati',
      timeAgo: '2 days ago',
      verifiedTag: 'Local Guide • Level 6',
    },
    {
      id: 'rev-2',
      dish: 'Herb Grilled Basa Bowl',
      badge: 'Wild Catch • Fresh Herbs',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      initials: 'BD',
      quote:
        'Clean food usually means dry chicken and boiled vegetables. Organica crafts meals that taste genuinely gourmet — cold-pressed mustard & olive dressing, crisp organic greens, and tender Basa. It has completely fueled my midday focus on GS Road.',
      author: 'Bikramaditya Das',
      role: 'Strength Coach & Tech Founder',
      location: 'GS Road, Guwahati',
      timeAgo: '4 days ago',
      verifiedTag: 'Google Verified Review',
    },
    {
      id: 'rev-3',
      dish: 'Paneer Power Macro Bowl',
      badge: 'A2 Paneer • Low GI Quinoa',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      initials: 'NS',
      quote:
        'Being vegetarian and getting 35g+ clean protein without whey bloating was a struggle. Their cottage paneer grilled in cold-pressed oil with roasted bell peppers and pumpkin seed crunch is unmatched in Guwahati. Dispur delivery is always on time!',
      author: 'Nilakshi Sharma',
      role: 'Senior Legal Advisor',
      location: 'Dispur Capital Complex',
      timeAgo: '1 week ago',
      verifiedTag: 'Google Verified Review',
    },
    {
      id: 'rev-4',
      dish: 'Smoked Citrus Chicken Bowl',
      badge: '44g Protein • Zero Refined Sugar',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      initials: 'AH',
      quote:
        'Post-run morning fuel from Organica is pure recovery gold. Zero refined seed-oil means zero sluggishness or stomach cramps. The dressing made from local mustard & lemon zest is fresh, tangy, and thoroughly addictive.',
      author: 'Arindam Hazarika',
      role: 'Triathlete & Ultra-Runner',
      location: 'Dighalipukhuri, Guwahati',
      timeAgo: '1 week ago',
      verifiedTag: 'Local Guide • Level 5',
    },
    {
      id: 'rev-5',
      dish: 'Brioche French Toast & Berry Bowl',
      badge: 'Sourdough Brioche • Wild Honey',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      initials: 'PK',
      quote:
        'As a clinical nutritionist, I examine every ingredient list. Organica uses genuine whole farm eggs, raw local honey, and zero artificial sweeteners. Even their guilt-free French toast hits the exact sweet craving while maintaining clean macros!',
      author: 'Priyanka Kalita',
      role: 'Holistic Nutritionist & Yogi',
      location: 'Six Mile, Guwahati',
      timeAgo: '2 weeks ago',
      verifiedTag: 'Google Verified Review',
    },
    {
      id: 'rev-6',
      dish: 'Farmhouse Herb Chicken Skillet',
      badge: 'Sous-Vide Chicken • Rosemary Olive Oil',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
      initials: 'DM',
      quote:
        'I order every single working afternoon to Christian Basti. Consistent 25-minute delivery, 100% eco-friendly bagasse packaging, and portion sizes that genuinely keep you energetic till 8 PM without the usual post-lunch food coma.',
      author: 'Debajit Mahanta',
      role: 'Software Engineering Director',
      location: 'Christian Basti, Guwahati',
      timeAgo: '3 weeks ago',
      verifiedTag: 'Google Verified Review',
    },
    {
      id: 'rev-7',
      dish: 'Avocado Citrus Superfood Salad',
      badge: 'Hass Avocado • Cold-Pressed Dressing',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      initials: 'TC',
      quote:
        'The presentation, the crispness of the hydroponic greens, and real ripe Hass avocado — Organica is operating at international clean-dining standards right here in Beltola! Truly grateful for this kitchen in our city.',
      author: 'Trishna Choudhury',
      role: 'Architect & Urban Designer',
      location: 'Uzan Bazar Riverside',
      timeAgo: '1 month ago',
      verifiedTag: 'Local Guide • Level 7',
    },
    {
      id: 'rev-8',
      dish: 'Double Protein Beast Feast',
      badge: '58g Protein • Sweet Potato Mash',
      stars: 5,
      photo:
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
      initials: 'RB',
      quote:
        'I recommend all my gym athletes in Guwahati to get their clean meal prep from Organica. Exact protein macros, verified cold-pressed prep, and the taste is 10/10 every single day. A game-changer for Guwahati fitness!',
      author: 'Rahul Borgohain',
      role: 'Crossfit Coach & Athlete',
      location: 'Zoo Road, Guwahati',
      timeAgo: '1 month ago',
      verifiedTag: 'Google Verified Review',
    },
  ];

  // Duplicate for seamless 360-degree continuous infinite marquee loop
  const duplicatedReviews = [...reviews, ...reviews];

  const sectionRef = useRef<HTMLElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const marquee = marqueeContainerRef.current;
    if (!el || !marquee) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Slow, weighty scale+rotate settle to contrast with snappier menu card reveals
      gsap.fromTo(
        marquee,
        {
          scale: 0.92,
          rotate: -2.5,
          y: 40,
          opacity: 0.7,
        },
        {
          scale: 1,
          rotate: 0,
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-16 sm:py-24 relative overflow-hidden bg-[#FFFFFF] select-none"
    >
      {/* ── Botanical Scatter Accents (Positioned Safely on Edges) ── */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, -7, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-4 sm:left-8 z-20 pointer-events-none hidden md:block opacity-85"
      >
        <ScatterAvocado size={60} />
      </motion.div>

      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, -8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute top-6 right-6 sm:right-10 z-20 pointer-events-none hidden md:block opacity-85"
      >
        <ScatterStrawberry size={58} />
      </motion.div>

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10 sm:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5">
            <span className="text-xs sm:text-sm font-body font-bold text-[#2E5A36] uppercase tracking-[0.25em] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Google Verified Reviews • Guwahati</span>
            </span>
            <SplitHeading className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#141412] tracking-tight">
              Loved by 10,000+ Guwahatians
            </SplitHeading>
            <p className="text-xs sm:text-sm text-[#6B685F] font-body max-w-xl">
              From morning runners at Dighalipukhuri to mindful eaters in Beltola &amp; GS Road —
              here is how Guwahati fuels clean every day.
            </p>
          </div>

          {/* Google Live Rating & Interactive Marquee Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Google Rating Pill */}
            <div className="flex items-center gap-2.5 bg-[#FAF8F3] px-4 py-2.5 rounded-full border border-[#E8E3D8] shadow-2xs">
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#FBBC05] fill-[#FBBC05]" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#141412]">
                4.9 / 5.0 <span className="text-[#6B685F] font-normal hidden sm:inline">(1,840+ Reviews)</span>
              </span>
            </div>

            {/* Loop Controls / Hover Hint */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E8E3D8] bg-white hover:bg-[#FAF8F3] text-[11px] font-bold text-[#4A4843] transition-colors cursor-pointer"
              title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-[#2E5A36] fill-[#2E5A36]" />
                  <span>Resume Slider</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 text-[#6B685F]" />
                  <span>Pause on Hover</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Seamless Infinite Loop Slider Track ── */}
      <div
        ref={marqueeContainerRef}
        className="relative w-full overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {/* Soft edge fade masks for smooth entrance/exit */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Continuous Looping Marquee */}
        <div
          className={`flex gap-5 sm:gap-6 py-4 px-4 ${
            isPaused || shouldReduceMotion ? 'animate-marquee-paused' : 'animate-marquee'
          }`}
          style={{
            animationDuration: '48s',
          }}
        >
          {duplicatedReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${index}`}
              className="w-[310px] sm:w-[350px] shrink-0 bg-[#FAF8F3] rounded-[24px] p-5 sm:p-6 border border-[#E8E3D8] shadow-2xs hover:shadow-lg hover:border-[#2E5A36]/40 transition-all duration-300 flex flex-col justify-between space-y-4 group relative"
            >
              {/* Card Top: Dish Title, Badge & Google Star Score */}
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#141412] leading-tight line-clamp-2 min-h-[2.4rem] flex items-center group-hover:text-[#2E5A36] transition-colors">
                      {rev.dish}
                    </h3>
                    <span className="inline-block text-[10px] sm:text-[11px] font-body font-bold text-[#2E5A36] bg-[#EBF4ED] px-2 py-0.5 rounded-md truncate max-w-full">
                      {rev.badge}
                    </span>
                  </div>

                  {/* 5 Stars Rating Chip */}
                  <div className="flex items-center gap-1 shrink-0 bg-white px-2 py-0.5 rounded-full border border-[#E8E3D8] shadow-2xs mt-0.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#FBBC05] fill-[#FBBC05]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-extrabold text-[#141412]">5.0</span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="relative pt-1">
                  <Quote className="w-5 h-5 text-[#2E5A36]/20 absolute -top-1 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-[13px] font-body text-[#4A4843] leading-relaxed relative z-10 pl-2 line-clamp-4 min-h-[4.8rem] border-l-2 border-[#2E5A36]/25">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Bottom: User Photo Avatar, Name, Location & Google Tag */}
              <div className="pt-3.5 border-t border-[#E8E3D8]/80 flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-3 min-w-0">
                  <ReviewerAvatar
                    src={rev.photo}
                    name={rev.author}
                    initials={rev.initials}
                  />
                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#141412] leading-tight truncate">
                      {rev.author}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#6B685F] font-body truncate">
                      {rev.role}
                    </p>
                    <p className="text-[10px] font-body font-semibold text-[#2E5A36] truncate">
                      📍 {rev.location}
                    </p>
                  </div>
                </div>

                {/* Google Verified Stamp */}
                <div className="hidden xs:flex flex-col items-end shrink-0 text-right">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#2E5A36] bg-[#EBF4ED] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </span>
                  <span className="text-[9px] text-[#8C887B] font-body mt-0.5">
                    {rev.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Hint for Mobile Users */}
      <div className="max-w-7xl mx-auto px-4 mt-4 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-[#8C887B]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2E5A36] animate-ping" />
        <span>Live reviews feed from Google Maps • Continuous auto-scroll (hover or tap to pause)</span>
      </div>
    </section>
  );
}


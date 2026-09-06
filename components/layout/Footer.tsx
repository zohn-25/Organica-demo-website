'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Restrained, minimal fade + slight rise only
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#141412] text-[#FAF8F3] pt-16 pb-28 md:pb-12 border-t border-[#2C2B26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#FAF8F3] p-3 rounded-2xl inline-block">
              <Logo />
            </div>

            <p className="text-xs sm:text-sm text-[#FAF8F3]/70 font-body leading-relaxed max-w-sm">
              Organica is Guwahati&apos;s premier clean-eating delivery kitchen. Dedicated to 100% organic,
              seed-oil free culinary wellness engineered for sustained human vitality.
            </p>

            <div className="space-y-1.5 text-xs text-[#FAF8F3]/60 font-body">
              <p className="text-[#F2B705] font-semibold">📍 Beltola Tiniali Kitchen:</p>
              <p>Weekly Bazar, Pir Ajan Fakir Rd, near SBI &amp; HDFC ATM, Beltola Tiniali, Guwahati, Assam 781028</p>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#F2B705] font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Hydrogenated Fats • Pure Cold-Pressed Ounces</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-heading font-bold text-base text-[#FAF8F3] tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-body text-[#FAF8F3]/70">
              <li>
                <Link href="/#menu-section" className="hover:text-[#F2B705] transition-colors">
                  Seasonal Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F2B705] transition-colors">
                  Our Brand Story
                </Link>
              </li>
              <li>
                <Link href="/#signature-bowls" className="hover:text-[#F2B705] transition-colors">
                  What&apos;s on Plate
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-[#F2B705] transition-colors">
                  Clean Eater Testimonials
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#F2B705] transition-colors">
                  Kitchen Location &amp; Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Discount Column */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading font-bold text-base text-[#FAF8F3] tracking-wide">
              Join the Clean Club
            </h4>
            <p className="text-xs text-[#FAF8F3]/70 font-body">
              Receive weekly macro guides, secret seasonal specials, and ₹100 off your first delivery.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Welcome to the Organica Clean Club! Check your inbox for your ₹100 welcome code.');
              }}
              className="flex items-center gap-2 pt-1"
            >
              <input
                type="email"
                required
                placeholder="Enter email..."
                className="bg-[#242420] text-xs text-white placeholder-white/40 px-4 py-2.5 rounded-full border border-[#2C2B26] focus:outline-none focus:border-[#F2B705] flex-1"
              />
              <button
                type="submit"
                className="cursor-pointer bg-[#F2B705] hover:bg-[#D49E00] text-[#141412] font-body font-bold text-xs px-4 py-2.5 rounded-full transition-colors flex items-center gap-1 shrink-0"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright & legal links */}
        <div className="pt-8 border-t border-[#2C2B26] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F3]/50 font-body">
          <p>© {new Date().getFullYear()} Organica Clean Foods Pvt. Ltd. All rights reserved.</p>

          {/* Legal Links (Zero Dead Links) */}
          <div className="flex items-center gap-4 text-[#FAF8F3]/70 font-semibold">
            <Link href="/about" className="hover:text-[#F2B705] transition-colors">
              About Us
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-[#F2B705] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#F2B705] transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[#FAF8F3]/60">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/organicaghy?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2B705] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2B705] transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/919845012345"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F2B705] transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


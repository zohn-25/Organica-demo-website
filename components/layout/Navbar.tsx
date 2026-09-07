'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useCart } from '@/features/cart/CartContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F3]/95 backdrop-blur-md py-3 shadow-sm border-b border-[#E8E3D8]/80'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Center Nav Links (Matching reference: Menu, Delivery, About Us, Contact) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-9 font-body text-xs xl:text-sm font-semibold text-[#141412] md:mr-auto md:ml-8 lg:ml-14 xl:ml-20">
          <Link
            href="/menu"
            className="hover:text-[#2E5A36] transition-colors relative py-1"
          >
            Menu
          </Link>
          <Link
            href="/#features"
            className="hover:text-[#2E5A36] transition-colors relative py-1"
          >
            Delivery
          </Link>
          <Link
            href="/about"
            className="hover:text-[#2E5A36] transition-colors relative py-1"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="hover:text-[#2E5A36] transition-colors relative py-1"
          >
            Contact
          </Link>
        </nav>

        {/* Right side: Sign In button, Social Icons, and Cart Bag */}
        <div className="flex items-center gap-3.5">
          {/* Sign In Pill Button (Clean rounded pill matching reference design) */}
          <button
            onClick={() => alert('Organica Member Portal — Sign in')}
            className="cursor-pointer hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full border border-[#141412] text-[#141412] bg-white/80 hover:bg-[#141412] hover:text-[#FAF8F3] text-xs font-body font-bold transition-all shadow-xs"
          >
            Sign In
          </button>

          {/* Social Icons (Dark circle icons from reference top right) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#141412] text-[#FAF8F3] hover:bg-[#2E5A36] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/organicaghy?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#141412] text-[#FAF8F3] hover:bg-[#2E5A36] flex items-center justify-center transition-colors shadow-xs"
              aria-label="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* WhatsApp / Direct */}
            <a
              href="https://wa.me/919845012345"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#141412] text-[#FAF8F3] hover:bg-[#2E5A36] flex items-center justify-center transition-colors shadow-xs"
              aria-label="WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#141412] text-[#FAF8F3] hover:bg-[#2E5A36] flex items-center justify-center transition-colors shadow-xs"
              aria-label="YouTube"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>

          {/* Cart Bag Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="cursor-pointer relative p-2.5 rounded-full bg-[#FFFFFF] border border-[#E8E3D8] hover:border-[#141412] text-[#141412] hover:bg-[#F4EFE6] transition-all duration-200 shadow-xs flex items-center justify-center group"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            {totalCount > 0 ? (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F2B705] text-[#141412] text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {totalCount}
              </span>
            ) : null}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#141412] hover:bg-[#E8E3D8] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F3] border-b border-[#E8E3D8] px-5 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-3 font-body text-base font-semibold text-[#141412]">
            <Link
              href="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8E3D8]/60 hover:text-[#2E5A36]"
            >
              Menu
            </Link>
            <Link
              href="/#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8E3D8]/60 hover:text-[#2E5A36]"
            >
              Delivery
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8E3D8]/60 hover:text-[#2E5A36]"
            >
              About Us
            </Link>
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8E3D8]/60 hover:text-[#2E5A36]"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

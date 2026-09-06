import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { CartProvider } from '@/features/cart/CartContext';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { PageTransitionCurtain } from '@/components/providers/PageTransitionCurtain';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';

const fraunces = localFont({
  src: [
    { path: '../public/fonts/Fraunces-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Fraunces-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/Fraunces-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/Fraunces-800.woff2', weight: '800', style: 'normal' },
    { path: '../public/fonts/Fraunces-900.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-heading',
  display: 'swap',
});

const manrope = localFont({
  src: [
    { path: '../public/fonts/Manrope-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Manrope-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Manrope-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/Manrope-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/Manrope-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://organica-guwahati.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Organica — Clean Eating, Delivered Fresh in Guwahati',
    template: '%s • Organica Guwahati',
  },
  description:
    'Guwahati’s premier clean-eating kitchen in Beltola Tiniali. 100% organic harvest bowls, verified macro counts, and zero industrial seed-oils.',
  keywords: [
    'Organica Guwahati',
    'clean food delivery Guwahati',
    'organic bowls Beltola Tiniali',
    'high protein bowls Guwahati',
    'seed oil free food Assam',
    'macro counted meals Guwahati',
    'healthy food delivery Dispur',
  ],
  authors: [{ name: 'Organica Clean Foods' }],
  openGraph: {
    title: 'Organica — Clean Eating, Delivered Fresh in Guwahati',
    description:
      'Chef-crafted harvest bowls, verified sports macros, and zero refined seed oils. Delivered warm in 100% biodegradable bagasse bowls across Guwahati.',
    url: siteUrl,
    siteName: 'Organica Guwahati',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organica — Clean Eating, Delivered Fresh in Guwahati',
    description:
      'Guwahati’s premier clean-eating kitchen. 100% organic, zero industrial seed-oils, and verified athlete macros.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="bg-[#FAF8F3] text-[#141412] antialiased selection:bg-[#F2B705] selection:text-[#141412]">
        <SmoothScrollProvider>
          <AuthProvider>
            <CartProvider>
              <ToastProvider>
                <PageTransitionCurtain />
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <CartDrawer />
                <MobileBottomNav />
              </ToastProvider>
            </CartProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

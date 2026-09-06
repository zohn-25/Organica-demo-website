import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText, Mail } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy • Organica Guwahati',
  description: 'Learn how Organica collects, uses, and protects your personal and order information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-28 pb-20 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-body font-bold text-[#6B685F] hover:text-[#141412] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>

        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-[#E8E3D8]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2E5A36]">
            <ShieldCheck className="w-4 h-4" />
            <span>Customer Trust &amp; Transparency</span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#141412] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#6B685F] font-body">
            Last Updated: September 2026 • Organica Clean Foods Pvt. Ltd., Guwahati, Assam.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E3D8] shadow-2xs space-y-8 font-body text-xs sm:text-sm text-[#4A4843] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#2E5A36]" />
              <span>1. Information We Collect</span>
            </h2>
            <p>
              When you place an order or inquire about meal subscriptions with Organica, we collect essential
              information required to cook and deliver your food fresh:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B685F]">
              <li>Contact details (Name, Delivery Address, Phone Number, WhatsApp contact, Email).</li>
              <li>Dietary notes and allergy preferences specified during custom bowl or catering requests.</li>
              <li>Order history, delivery instructions, and feedback ratings.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2E5A36]" />
              <span>2. How We Use Your Information</span>
            </h2>
            <p>
              Your personal information is used exclusively to provide high-quality culinary service:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#6B685F]">
              <li>Preparing your meals with strict adherence to your custom dietary goals.</li>
              <li>Dispatching delivery riders from our Beltola Tiniali kitchen directly to your address.</li>
              <li>Providing real-time order status updates and customer support.</li>
              <li>Sharing weekly macro menus or seasonal specials (only if you subscribe to Clean Club).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#2E5A36]" />
              <span>3. Payment Security &amp; Data Protection</span>
            </h2>
            <p>
              We prioritize data security. Online payments are processed through PCI-DSS certified encrypted payment
              gateways (UPI, Cards, Net Banking). Organica never stores your credit card numbers or banking passwords.
              We do not sell, rent, or trade your personal information to third-party advertisers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5">
            <h2 className="font-heading font-bold text-lg text-[#141412] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2E5A36]" />
              <span>4. Contact Our Privacy Officer</span>
            </h2>
            <p>
              If you wish to review, update, or delete your contact records from our kitchen database, please contact:
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E3D8] space-y-1 text-xs">
              <p className="font-bold text-[#141412]">Organica Clean Foods Pvt. Ltd.</p>
              <p>{RESTAURANT_INFO.address}</p>
              <p>Email: <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-[#2E5A36] font-bold underline">{RESTAURANT_INFO.email}</a></p>
              <p>Phone: <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#2E5A36] font-bold underline">{RESTAURANT_INFO.phone}</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

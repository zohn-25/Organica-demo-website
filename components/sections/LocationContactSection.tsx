'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Navigation,
  Sparkles,
  MessageCircle,
  Truck,
  Building2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';
import { submitContactInquiry } from '@/lib/api/contact';
import { useToast } from '@/components/providers/ToastProvider';

type InquiryType = 'subscription' | 'corporate' | 'dietary' | 'takeaway';

const INQUIRY_OPTIONS: { id: InquiryType; label: string; placeholder: string }[] = [
  {
    id: 'subscription',
    label: '🥗 Meal Subscriptions',
    placeholder: 'Tell us your fitness goal (e.g. 5-day high protein lunch plan to Beltola/Dispur)...',
  },
  {
    id: 'corporate',
    label: '💼 Corporate Catering',
    placeholder: 'Inquiring about healthy meeting meal boxes for our team on GS Road...',
  },
  {
    id: 'dietary',
    label: '🌿 Dietary Consultation',
    placeholder: 'I have specific dietary restrictions (e.g. low GI, zero dairy, seed-oil free)...',
  },
  {
    id: 'takeaway',
    label: '🥡 Kitchen Takeaway',
    placeholder: 'Pre-ordering pickup from Beltola Tiniali studio kitchen at 1:30 PM...',
  },
];

export function LocationContactSection() {
  const { showToast } = useToast();
  const [selectedType, setSelectedType] = useState<InquiryType>('subscription');
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contactInfo?: string; message?: string }>({});

  const activeOption = INQUIRY_OPTIONS.find((opt) => opt.id === selectedType) || INQUIRY_OPTIONS[0];

  const validateForm = () => {
    const newErrors: { name?: string; contactInfo?: string; message?: string } = {};

    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Please enter your name (at least 2 characters)';
    }

    const trimmedContact = contactInfo.trim();
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedContact) {
      newErrors.contactInfo = 'Please enter your phone number or email';
    } else if (!phoneRegex.test(trimmedContact.replace(/\s+/g, '')) && !emailRegex.test(trimmedContact)) {
      newErrors.contactInfo = 'Enter a valid 10-digit phone number or email address';
    }

    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = 'Please provide more details (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast({
        type: 'warning',
        title: 'Incomplete Details',
        message: 'Please resolve the highlighted fields to send your message.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitContactInquiry({
        name,
        contact: contactInfo,
        message,
        branch: 'Beltola Tiniali Central Kitchen',
        inquiryType: selectedType === 'subscription' ? 'catering' : selectedType === 'dietary' ? 'dietary-consult' : 'general',
      });

      if (response.success) {
        setFormSent(true);
        showToast({
          type: 'success',
          title: 'Inquiry Dispatched!',
          message: 'Our Guwahati chef concierge will connect with you shortly.',
        });
        setTimeout(() => {
          setFormSent(false);
          setName('');
          setContactInfo('');
          setMessage('');
          setErrors({});
        }, 4000);
      }
    } catch {
      showToast({
        type: 'error',
        title: 'Transmission Failed',
        message: 'Could not deliver your message right now. Please call our kitchen directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#E8E3D8] select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* ── Section Header (Editorial & Elegant, Zero Clutter) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span className="text-xs sm:text-sm font-body font-bold text-[#2E5A36] uppercase tracking-[0.25em] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2E5A36]" />
              <span>Studio Kitchen &amp; Direct Dispatch • Guwahati</span>
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#141412] tracking-tight">
              Freshly Crafted in Beltola, Delivered Across Guwahati
            </h2>
            <p className="text-xs sm:text-sm text-[#6B685F] font-body leading-relaxed">
              Every bowl is cooked to order in cold-pressed oils at our Beltola Tiniali studio kitchen and
              dispatched in thermal-insulated biodegradable bagasse bowls.
            </p>
          </div>

          {/* Live Kitchen Status Pill */}
          <div className="inline-flex items-center gap-2.5 bg-[#FAF8F3] px-4 py-2 rounded-full border border-[#E8E3D8] text-xs font-bold text-[#141412] shrink-0 self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E5A36] animate-pulse" />
            <span>Kitchen Open &amp; Delivering (8:00 AM – 10:00 PM)</span>
          </div>
        </div>

        {/* ── Cohesive 2-Column Master Layout (Balanced Proportions, Zero Redundancy) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ── LEFT COLUMN (7 cols): Dietary Concierge & Quick Inquiry Desk ── */}
          <div className="lg:col-span-7 bg-[#FAF8F3] rounded-[32px] p-6 sm:p-8 lg:p-9 border border-[#E8E3D8] shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-body font-bold uppercase tracking-wider text-[#2E5A36] block mb-1">
                  Personalized Nutrition &amp; Support
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#141412] tracking-tight">
                  Connect with Our Kitchen Desk
                </h3>
                <p className="text-xs sm:text-sm text-[#6B685F] font-body mt-1">
                  Select your inquiry intent and our head chef or nutritionist will connect with you.
                </p>
              </div>

              {/* Inquiry Type Intent Selector Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {INQUIRY_OPTIONS.map((opt) => {
                  const isSelected = selectedType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedType(opt.id)}
                      className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-body font-bold transition-all ${
                        isSelected
                          ? 'bg-[#141412] text-[#FAF8F3] shadow-xs scale-102'
                          : 'bg-white text-[#4A4843] border border-[#E8E3D8] hover:border-[#2E5A36]/40 hover:bg-[#FAF8F3]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Inquiry Form */}
              {formSent ? (
                <div className="p-6 rounded-2xl bg-[#EBF4ED] border border-[#2E5A36]/30 flex items-center gap-3.5 text-[#2E5A36] animate-fadeIn">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base">Inquiry Received</h4>
                    <p className="text-xs text-[#2E5A36]/80 mt-0.5">
                      Our Beltola kitchen concierge will get in touch with you shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 font-body" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141412] block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Dr. Anamika Barua"
                        className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#141412] placeholder:text-[#A09D93] focus:outline-none transition-all ${
                          errors.name
                            ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-[#E8E3D8] focus:border-[#2E5A36] focus:ring-2 focus:ring-[#2E5A36]/15'
                        }`}
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-[11px] text-red-600 font-semibold mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141412] block mb-1">
                        Phone or WhatsApp
                      </label>
                      <input
                        type="text"
                        value={contactInfo}
                        onChange={(e) => {
                          setContactInfo(e.target.value);
                          if (errors.contactInfo) setErrors((prev) => ({ ...prev, contactInfo: undefined }));
                        }}
                        placeholder="+91 98450 XXXXX"
                        className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#141412] placeholder:text-[#A09D93] focus:outline-none transition-all ${
                          errors.contactInfo
                            ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                            : 'border-[#E8E3D8] focus:border-[#2E5A36] focus:ring-2 focus:ring-[#2E5A36]/15'
                        }`}
                      />
                      {errors.contactInfo && (
                        <p className="flex items-center gap-1 text-[11px] text-red-600 font-semibold mt-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.contactInfo}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#141412] block mb-1">
                      Your Query or Dietary Goal
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder={activeOption.placeholder}
                      className={`w-full bg-white border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#141412] placeholder:text-[#A09D93] focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                          : 'border-[#E8E3D8] focus:border-[#2E5A36] focus:ring-2 focus:ring-[#2E5A36]/15'
                      }`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 text-[11px] text-red-600 font-semibold mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2E5A36] hover:bg-[#1E3D24] text-[#FAF8F3] font-body font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#F2B705]" />
                        <span>Transmitting to Kitchen...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send className="w-3.5 h-3.5 text-[#F2B705]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Quick Contact Ribbons: Phone, WhatsApp & Email */}
            <div className="pt-4 border-t border-[#E8E3D8]/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#E8E3D8] hover:border-[#2E5A36]/40 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#EBF4ED] text-[#2E5A36] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#6B685F] font-bold block uppercase tracking-wider">Direct Call</span>
                  <span className="text-xs font-bold text-[#141412] group-hover:text-[#2E5A36] truncate block">
                    {RESTAURANT_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/919845012345?text=Hello%20Organica,%20I%20would%20like%20to%20inquire%20about%20meal%20plans`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#E8E3D8] hover:border-[#2E5A36]/40 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#EBF4ED] text-[#2E5A36] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#6B685F] font-bold block uppercase tracking-wider">WhatsApp</span>
                  <span className="text-xs font-bold text-[#141412] group-hover:text-[#2E5A36] truncate block">
                    Chat with Desk
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#E8E3D8] hover:border-[#2E5A36]/40 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#EBF4ED] text-[#2E5A36] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#6B685F] font-bold block uppercase tracking-wider">Email</span>
                  <span className="text-xs font-bold text-[#141412] group-hover:text-[#2E5A36] truncate block">
                    {RESTAURANT_INFO.email}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN (5 cols): Compact Studio Location Card (ZERO Duplicate Buttons) ── */}
          <div className="lg:col-span-5 bg-[#FAF8F3] rounded-[32px] p-6 sm:p-7 border border-[#E8E3D8] shadow-2xs flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Studio Card Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#2E5A36] text-[#FAF8F3] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-[#141412] leading-tight">
                      Beltola Tiniali Hub
                    </h3>
                    <span className="text-[11px] text-[#6B685F] font-body">
                      Central Cloud Kitchen &amp; Studio
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#2E5A36] bg-[#EBF4ED] px-2.5 py-1 rounded-full shrink-0">
                  Takeaway &amp; Dispatch
                </span>
              </div>

              {/* ── Compact, Elegant Interactive Map Viewport (NOT oversized!) ── */}
              <div className="relative w-full h-[220px] sm:h-[230px] rounded-2xl overflow-hidden border border-[#E8E3D8] bg-white shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5645063854736!2d91.7995775!3d26.1232804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5f088a3d2faf%3A0xab1e1775c74c7da0!2sORGANICA!5e0!3m2!1sen!2sin!4v1725528000000!5m2!1sen!2sin"
                  title="ORGANICA Guwahati Google Map Location"
                  className="w-full h-full border-0 filter saturate-[1.05]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Physical Address Block & Landmarks */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-[#4A4843] font-body">
                  <MapPin className="w-4 h-4 text-[#2E5A36] shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong className="text-[#141412] block">Weekly Bazar, Pir Ajan Fakir Rd</strong>
                    Beltola Tiniali, Guwahati, Assam 781028
                  </p>
                </div>

                {/* Landmark Tags */}
                <div className="flex flex-wrap gap-1.5 pl-6">
                  <span className="text-[10px] font-bold text-[#141412] bg-white px-2 py-0.5 rounded-md border border-[#E8E3D8]">
                    Near SBI &amp; HDFC ATM
                  </span>
                  <span className="text-[10px] font-bold text-[#2E5A36] bg-[#EBF4ED] px-2 py-0.5 rounded-md">
                    Curbside Pickup Available
                  </span>
                </div>
              </div>

              {/* Express Delivery Coverage Pill Matrix */}
              <div className="p-3 rounded-2xl bg-white border border-[#E8E3D8] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#141412]">
                  <span className="flex items-center gap-1.5 text-[#2E5A36]">
                    <Truck className="w-3.5 h-3.5" />
                    <span>25–35 Min Hot Delivery Zones</span>
                  </span>
                  <span className="text-[10px] text-[#6B685F] font-normal">Thermal Bag Packaged</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Beltola', 'Dispur', 'Six Mile', 'GS Road', 'Christian Basti', 'Ganeshguri'].map((zone) => (
                    <span
                      key={zone}
                      className="text-[10px] font-body font-semibold text-[#4A4843] bg-[#FAF8F3] px-2 py-0.5 rounded-md border border-[#E8E3D8]"
                    >
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Single, Authoritative Navigation CTA (Zero Duplicate Buttons!) ── */}
            <div className="pt-2">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#141412] hover:bg-[#2E5A36] text-[#FAF8F3] font-body font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-98 group"
              >
                <Navigation className="w-3.5 h-3.5 text-[#F2B705] group-hover:translate-x-0.5 transition-transform" />
                <span>Get Driving Directions to Beltola Hub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


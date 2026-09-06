// Design system color constants & navigation tokens
export const BRAND_COLORS = {
  base: {
    dark: '#141412',
    darkMuted: '#242420',
    darkSubtle: '#6B685F',
    light: '#FAF8F3',
    lightAlt: '#F4EFE6',
    card: '#FFFFFF',
    border: '#E8E3D8',
    borderDark: '#2C2B26',
  },
  green: {
    tint: '#EBF4ED',
    light: '#4B885C',
    primary: '#2E5A36',
    dark: '#1E3D24',
    deep: '#132818',
  },
  mustard: {
    tint: '#FFF9E6',
    light: '#F5C842',
    primary: '#F2B705',
    dark: '#D49E00',
    hover: '#B88800',
  },
} as const;

export const NAV_LINKS = [
  { label: "Menu", href: "/#menu-section" },
  { label: "What's on Plate", href: "/#signature-bowls" },
  { label: "Our Story", href: "/#features" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
] as const;

export const RESTAURANT_INFO = {
  name: "Organica",
  tagline: "Clean Eating, Delivered",
  subtext: "100% Organic, Zero Refined Seed-Oils, Farm-to-Table within 12 Hours",
  phone: "+91 98450 12345",
  email: "hello@organicaclean.in",
  address: "Weekly Bazar, Pir Ajan Fakir Rd, near SBI & HDFC ATM, Beltola Tiniali, Guwahati, Assam 781028",
  city: "Guwahati",
  state: "Assam",
  pincode: "781028",
  landmark: "Near SBI & HDFC ATM, Weekly Bazar, Beltola Tiniali",
  mapsUrl: "https://maps.app.goo.gl/DFC7sxGK4qwJLH8C8",
  hours: {
    weekdays: "08:00 AM – 10:00 PM",
    weekends: "08:00 AM – 11:00 PM",
    deliverySlots: "08:00 am – 09:00 pm (Daily Delivery)",
    expressSlot: "05:00 pm – 06:00 pm (Dinner Express)",
  },
} as const;

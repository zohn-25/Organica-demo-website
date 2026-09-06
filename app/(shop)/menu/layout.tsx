import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seasonal Menu & Macro Bowls | Organica Clean Eating Guwahati',
  description:
    'Explore Organica\'s complete farm-fresh menu in Guwahati. High-protein nourish bowls, guilt-free cold desserts, low-calorie French toasts, and immunity smoothies crafted with zero refined oils or sugar.',
  keywords: [
    'Organica Menu',
    'Salad Bowls Guwahati',
    'Macro Bowls Assam',
    'Guilt-Free Desserts',
    'Clean Fast Food Guwahati',
    'Healthy Diet Delivery Guwahati',
  ],
  openGraph: {
    title: 'Seasonal Menu & Macro Bowls | Organica Guwahati',
    description:
      'Farm-to-bowl macro bowls, cold desserts, and guilt-free comfort foods in Guwahati. Calorie & macro-counted clean eating.',
    url: 'https://organica-guwahati.com/menu',
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

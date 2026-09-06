# Organica — Clean Eating, Delivered Fresh in Guwahati

> Guwahati’s premier farm-to-table clean-eating kitchen in Beltola Tiniali. 100% organic harvest bowls, verified sports macros, and zero refined seed-oils.

---

## 🥗 Features

- **Farm-to-Bowl Nutrition**: Macro-counted protein bowls, cold-pressed refreshers, and guilt-free comfort meals.
- **Strict Clean Standards**: 100% cold-pressed oils (zero industrial seed oils), zero refined sugars, and biodegradable bagasse packaging.
- **High-Performance Tech Stack**: Built on Next.js 16 (App Router), TypeScript (Strict Mode), Tailwind CSS, Framer Motion, and GSAP ScrollTrigger + Lenis for smooth momentum scrolling.
- **Launch-Ready SEO & PWA**: Dynamic OpenGraph images, XML sitemap (`/sitemap.xml`), crawler rules (`/robots.txt`), and PWA manifest (`/manifest.webmanifest`).
- **Enterprise Backend Scaffolding**: Modular API service abstraction layer in `lib/api/` (`menu.ts`, `orders.ts`, `contact.ts`), Razorpay payment readiness, and pre-wired NextAuth user session context.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or pnpm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and configure your API/database keys:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

### 6. Linting & Type Checking
```bash
npm run lint
npx tsc --noEmit
```

---

## 📁 Project Structure

```text
organica-website-2nd/
├── app/                      # Next.js App Router routes & layouts
│   ├── (marketing)/          # Landing page routes
│   ├── (shop)/menu/          # Seasonal menu catalog
│   ├── about/                # Brand story & kitchen philosophy
│   ├── privacy-policy/       # Privacy policy
│   ├── terms/                # Terms of service
│   ├── sitemap.ts            # Dynamic XML sitemap
│   ├── robots.ts             # Search crawler directives
│   ├── opengraph-image.tsx   # Dynamic social preview card
│   ├── manifest.ts           # PWA web manifest
│   ├── icon.tsx              # Favicon generator
│   └── apple-icon.tsx        # iOS touch icon
├── components/               # UI components & section layouts
│   ├── layout/               # Navbar, Footer
│   ├── sections/             # Hero, Menu, Testimonials, Contact
│   ├── ui/                   # Buttons, Badges, Toast, Skeletons
│   └── providers/            # SmoothScroll, ToastProvider
├── features/                 # Modular feature domains
│   ├── cart/                 # CartContext & persistent state
│   └── menu/                 # Menu filters, cards, categories
├── lib/                      # Utilities & API service layer
│   ├── api/                  # menu.ts, orders.ts, contact.ts
│   ├── auth/                 # AuthContext & user session stub
│   ├── constants.ts          # Restaurant info & config
│   └── utils.ts              # Currency & format helpers
└── public/                   # Static images & botanical SVGs
```

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

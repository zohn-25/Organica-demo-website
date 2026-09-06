export type MenuCategoryId = 'all' | 'breakfast' | 'power-plates' | 'refreshers' | 'wellness' | 'crave';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategoryId;
  price: number;
  description: string;
  isVeg: boolean;
  image?: string;
  calories?: number;
  protein?: number; // in grams
  rating?: number;
  reviewsCount?: number;
  badge?: string; // e.g. "Chef's Signature", "High Protein", "Hydrating"
  featured?: boolean;
  sku?: string;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
  allergens?: string[];
  kitchenId?: string;
}

export interface SignatureBowl {
  id: string;
  name: string;
  tagline: string;
  price: number;
  protein: number;
  calories: number;
  carbs: number;
  fats: number;
  isVeg: boolean;
  description: string;
  ingredients: string[];
  image: string;
  accentColor?: string;
  sku?: string;
  inStock?: boolean;
  allergens?: string[];
}

export interface CategoryTab {
  id: MenuCategoryId;
  label: string;
  iconName: string; // Lucide icon name
  description: string;
}

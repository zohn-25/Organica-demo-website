/**
 * Organica Menu API Service
 * Abstraction layer for fetching menu items and signature bowls.
 * Seamlessly transitions between mock datasets and real REST/GraphQL backends.
 */

import { MenuItem, SignatureBowl, MenuCategoryId } from '@/features/menu/types';
import { MENU_ITEMS, SIGNATURE_BOWLS } from '@/features/menu/data/menu-data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface MenuFilterOptions {
  category?: MenuCategoryId;
  isVeg?: boolean;
  searchQuery?: string;
  minProtein?: number;
  maxCalories?: number;
}

/**
 * Fetches all menu items with optional category and dietary filtering.
 */
export async function getMenuItems(filters?: MenuFilterOptions): Promise<MenuItem[]> {
  if (API_BASE_URL) {
    try {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters?.isVeg !== undefined) params.append('isVeg', String(filters.isVeg));
      if (filters?.searchQuery) params.append('q', filters.searchQuery);

      const res = await fetch(`${API_BASE_URL}/api/menu?${params.toString()}`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        return (await res.json()) as MenuItem[];
      }
    } catch (err) {
      console.warn('[Organica API] Backend unreachable, falling back to cached local menu data:', err);
    }
  }

  // Local fallback with instantaneous async resolution
  return new Promise((resolve) => {
    let items = [...MENU_ITEMS];

    if (filters?.category && filters.category !== 'all') {
      items = items.filter((item) => item.category === filters.category);
    }
    if (filters?.isVeg !== undefined) {
      items = items.filter((item) => item.isVeg === filters.isVeg);
    }
    if (filters?.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      items = items.filter(
        (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }
    if (filters?.minProtein) {
      items = items.filter((item) => (item.protein || 0) >= filters.minProtein!);
    }
    if (filters?.maxCalories) {
      items = items.filter((item) => (item.calories || 9999) <= filters.maxCalories!);
    }

    resolve(items);
  });
}

/**
 * Retrieves a single menu item by ID.
 */
export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/menu/${id}`);
      if (res.ok) return (await res.json()) as MenuItem;
    } catch (err) {
      console.warn(`[Organica API] Failed fetching item ${id}, using fallback:`, err);
    }
  }

  return new Promise((resolve) => {
    const item = MENU_ITEMS.find((m) => m.id === id) || null;
    resolve(item);
  });
}

/**
 * Retrieves signature macro-balanced bowls.
 */
export async function getSignatureBowls(): Promise<SignatureBowl[]> {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/signature-bowls`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) return (await res.json()) as SignatureBowl[];
    } catch (err) {
      console.warn('[Organica API] Fallback to local signature bowls:', err);
    }
  }

  return new Promise((resolve) => {
    resolve([...SIGNATURE_BOWLS]);
  });
}

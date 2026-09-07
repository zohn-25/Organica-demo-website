'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MenuItem } from '@/features/menu/types';
import { MENU_ITEMS, SIGNATURE_BOWLS } from '@/features/menu/data/menu-data';
import { useToast } from '@/components/providers/ToastProvider';

interface FavoritesContextType {
  favoriteIds: string[];
  favoriteItems: MenuItem[];
  favoritesCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string, name?: string) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'organica_favorites_v1';

// Seed default favorite dishes for instant delightful UX
const DEFAULT_FAVORITE_IDS = ['sig-chicken', 'sig-basa'];

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();
  const [favoriteIds, setFavoriteIds] = useState<string[]>(DEFAULT_FAVORITE_IDS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Combine all dishes to resolve full MenuItem objects
  const allDishes = useMemo(() => {
    const signatureItems: MenuItem[] = SIGNATURE_BOWLS.map((sb) => ({
      id: sb.id,
      name: sb.name,
      category: 'power-plates',
      price: sb.price,
      description: sb.description,
      isVeg: sb.isVeg,
      image: sb.image,
      calories: sb.calories,
      protein: sb.protein,
      rating: 4.9,
      reviewsCount: 350,
      badge: "Chef's Signature",
      featured: true,
    }));
    return [...signatureItems, ...MENU_ITEMS];
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFavoriteIds(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds, isInitialized]);

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const toggleFavorite = (id: string, name?: string) => {
    const dish = allDishes.find((d) => d.id === id);
    const dishName = name || dish?.name || 'Item';

    setFavoriteIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];

      showToast({
        type: exists ? 'info' : 'success',
        title: exists ? 'Removed from Favorites' : 'Saved to Favorites',
        message: exists
          ? `${dishName} removed from your favorites.`
          : `${dishName} added to your favorites!`,
        duration: 2500,
      });

      return next;
    });
  };

  const removeFavorite = (id: string) => {
    setFavoriteIds((prev) => prev.filter((item) => item !== id));
  };

  const favoriteItems = useMemo(() => {
    return favoriteIds
      .map((id) => allDishes.find((dish) => dish.id === id))
      .filter((dish): dish is MenuItem => Boolean(dish));
  }, [favoriteIds, allDishes]);

  const favoritesCount = favoriteIds.length;

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteItems,
        favoritesCount,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

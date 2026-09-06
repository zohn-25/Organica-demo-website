'use client';

import { useState, useMemo } from 'react';
import { MenuItem, MenuCategoryId } from '../types';

export function useMenuFilter(items: MenuItem[]) {
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'non-veg' && item.isVeg) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        return matchName || matchDesc;
      }

      return true;
    });
  }, [items, activeCategory, dietaryFilter, searchQuery]);

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    dietaryFilter,
    setDietaryFilter,
    filteredItems,
    totalCount: filteredItems.length,
  };
}

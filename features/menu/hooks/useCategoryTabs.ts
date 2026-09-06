'use client';

import { useState } from 'react';
import { MenuCategoryId } from '../types';

export function useCategoryTabs(initialCategory: MenuCategoryId = 'all') {
  const [currentTab, setCurrentTab] = useState<MenuCategoryId>(initialCategory);

  const selectTab = (tab: MenuCategoryId) => {
    setCurrentTab(tab);
  };

  return {
    currentTab,
    selectTab,
  };
}

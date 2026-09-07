'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/features/menu/types';

export interface DishAddOn {
  id: string;
  name: string;
  price: number;
  image?: string;
  iconName?: string;
}

export interface CartItem {
  cartLineId: string;
  item: MenuItem;
  quantity: number;
  selectedAddOns?: DishAddOn[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, selectedAddOns?: DishAddOn[]) => void;
  removeFromCart: (cartLineId: string) => void;
  updateQuantity: (cartLineId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalCount: number;
  totalPrice: number;
  totalCalories: number;
  totalProtein: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('organica_cart_v2');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        // Ensure every item has a cartLineId
        const sanitized = parsed.map((ci, idx) => ({
          ...ci,
          cartLineId: ci.cartLineId || `${ci.item?.id || 'item'}-${idx}`,
          selectedAddOns: ci.selectedAddOns || [],
        }));
        setCart(sanitized);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('organica_cart_v2', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    quantity: number = 1,
    selectedAddOns: DishAddOn[] = []
  ) => {
    setCart((prev) => {
      const addOnsKey = selectedAddOns
        .map((a) => a.id)
        .sort()
        .join('-');
      const targetLineId = `${item.id}${addOnsKey ? `-${addOnsKey}` : ''}`;

      const existingIndex = prev.findIndex(
        (ci) =>
          ci.cartLineId === targetLineId ||
          (ci.item.id === item.id &&
            (ci.selectedAddOns || []).map((a) => a.id).sort().join('-') === addOnsKey)
      );

      if (existingIndex > -1) {
        return prev.map((ci, idx) =>
          idx === existingIndex
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      }

      return [
        ...prev,
        {
          cartLineId: targetLineId,
          item,
          quantity: Math.max(1, quantity),
          selectedAddOns,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartLineId: string) => {
    setCart((prev) =>
      prev.filter(
        (ci) => ci.cartLineId !== cartLineId && ci.item.id !== cartLineId
      )
    );
  };

  const updateQuantity = (cartLineId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.cartLineId === cartLineId || ci.item.id === cartLineId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalPrice = cart.reduce((sum, ci) => {
    const addOnsTotal = (ci.selectedAddOns || []).reduce(
      (asum, a) => asum + a.price,
      0
    );
    return sum + (ci.item.price + addOnsTotal) * ci.quantity;
  }, 0);
  const totalCalories = cart.reduce(
    (sum, ci) => sum + (ci.item.calories || 0) * ci.quantity,
    0
  );
  const totalProtein = cart.reduce(
    (sum, ci) => sum + (ci.item.protein || 0) * ci.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalCount,
        totalPrice,
        totalCalories,
        totalProtein,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

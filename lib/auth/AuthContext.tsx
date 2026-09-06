'use client';

/**
 * Organica Auth Context Scaffolding
 * Provides client-side user authentication state and methods.
 * Architecture is 100% prepared for NextAuth.js / Supabase / Firebase drop-in integration.
 *
 * To integrate NextAuth:
 * 1. Install `next-auth`
 * 2. Create `app/api/auth/[...nextauth]/route.ts`
 * 3. Replace the mock state below with `useSession()` from `next-auth/react`
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin' | 'kitchen_staff';
  savedAddresses?: Array<{
    id: string;
    label: string; // e.g. "Home", "Office"
    address: string;
    landmark?: string;
  }>;
  favoriteItemIds?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, code?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'organica_user_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore simulated local session on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable or corrupted
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (emailOrPhone: string, _code?: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate backend verification latency (e.g. OTP check or passwordless magic link)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const mockUser: UserProfile = {
      id: `usr_${Date.now().toString(36)}`,
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Organica Diner',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'guest@organicaguwahati.com',
      phone: emailOrPhone.includes('@') ? undefined : emailOrPhone,
      role: 'customer',
      savedAddresses: [
        {
          id: 'addr_1',
          label: 'Default',
          address: 'Christian Basti, G.S. Road, Guwahati, Assam 781005',
        },
      ],
      favoriteItemIds: ['sig-chicken', 'sig-paneer'],
    };

    setUser(mockUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    } catch {
      // Ignore storage errors
    }
    setIsLoading(false);
    return true;
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setIsLoading(false);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

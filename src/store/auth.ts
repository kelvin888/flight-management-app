"use client";
import { AuthData } from '@/types/auth';
import { create } from 'zustand';

type ModalState = {
  authenticatedUser: AuthData | null;
  setAuthUser: (authData: AuthData) => void;
  clearAuthUser: () => void;
};

const isClient = typeof window !== 'undefined';

const getAuthFromSessionStorage = (): AuthData | null => {
  if (isClient) {
    const authUser = sessionStorage.getItem('authUser');
    return authUser ? JSON.parse(authUser) : null;
  }
  return null;
};

const setAuthToSessionStorage = (authData: AuthData | null) => {
  if (isClient) {
    if (authData) {
      sessionStorage.setItem('authUser', JSON.stringify(authData));
    } else {
      sessionStorage.removeItem('authUser');
    }
  }
};

export const useAuthStore = create<ModalState>((set) => ({
  authenticatedUser: getAuthFromSessionStorage(),

  setAuthUser: (authData: AuthData) => {
    setAuthToSessionStorage(authData);
    set({ authenticatedUser: authData });
  },

  clearAuthUser: () => {
    setAuthToSessionStorage(null);
    set({ authenticatedUser: null });
  },
}));

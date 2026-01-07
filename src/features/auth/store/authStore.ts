import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  logout: () => set({ isAuthenticated: false }),
}));


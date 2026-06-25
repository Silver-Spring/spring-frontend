import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name?: string | null;
  email: string;
  age: number;
  gender: string;
  type: string;
  isAdmin: boolean;
  isInternal: boolean;
  phoneNumber?: string | null;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  _hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      clearUser: () => set({ user: null }),
      _hasHydrated: false,
      setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist `user` — _hasHydrated is always derived at runtime
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        // Safety timeout: if rehydration fails silently (e.g. storage quota error),
        // force hydrated after 3s to prevent a permanent loading spinner.
        const timer = setTimeout(() => {
          useUserStore.getState().setHasHydrated(true);
        }, 3000);
        if (state) {
          state.setHasHydrated(true);
          clearTimeout(timer);
        }
      },
    },
  ),
);

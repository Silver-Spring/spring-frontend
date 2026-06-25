'use client';

import { useQuery } from '@apollo/client/react';
import { CurrentUserDoc, LiteUserDoc } from '../graphql';
import { useFragment } from '@/gql';
import { useUserStore } from '@/stores';
import { useEffect } from 'react';

export function useCurrentUser() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const hasHydrated = useUserStore((state) => state._hasHydrated);

  const { data, loading, error, refetch } = useQuery(CurrentUserDoc, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
    skip: !hasHydrated,
  });

  // Use useFragment at the top level, not conditionally
  const userFragment = useFragment(LiteUserDoc, data?.currentUser ?? null);
  const currentUser = data?.currentUser ? userFragment : null;

  // Sync Apollo cache with Zustand store
  useEffect(() => {
    // Don't do anything until hydration is complete
    if (!hasHydrated) return;

    if (currentUser) {
      setUser({
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        age: currentUser.age,
        gender: currentUser.gender,
        type: currentUser.type,
        isAdmin: currentUser.isAdmin,
        phoneNumber: currentUser.phoneNumber,
        isInternal: currentUser.isInternal,
      });
    } else if (!loading && !currentUser) {
      // Only clear if:
      // 1. Hydration is complete (checked above)
      // 2. Apollo is not loading
      // 3. There's no user data from Apollo
      // This means the backend confirmed the user is logged out
      clearUser();
    }
  }, [currentUser, loading, hasHydrated, setUser, clearUser]);

  // Re-validate session when the tab regains focus — catches expired tokens
  // and backend-side logouts while the tab was in the background.
  useEffect(() => {
    if (!hasHydrated) return;
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') refetch();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [hasHydrated, refetch]);

  // Cross-tab logout: when another tab calls clearUser(), localStorage
  // fires a storage event. Mirror that into this tab immediately.
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== 'user-storage') return;
      try {
        const next = e.newValue ? JSON.parse(e.newValue) : null;
        if (!next?.state?.user) {
          clearUser();
          if (!window.location.pathname.startsWith('/auth')) {
            window.location.href = '/auth/login';
          }
        }
      } catch {
        // malformed storage value — ignore
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [clearUser]);

  return {
    currentUser,
    loading: !hasHydrated || loading,
    error,
    isLoggedIn: !!currentUser,
    isAdmin: currentUser?.isAdmin ?? false,
  };
}

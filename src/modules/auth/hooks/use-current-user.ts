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

  const { data, loading, error } = useQuery(CurrentUserDoc, {
    errorPolicy: 'all',
    // Use cache-and-network to ensure we get fresh data while showing cached data immediately
    fetchPolicy: 'cache-and-network',
    // After the first fetch, use cache-first for better performance
    nextFetchPolicy: 'cache-first',
    // Skip query until hydration is complete to avoid premature clearing
    skip: !hasHydrated,
    // Enable polling as a fallback (optional, can be removed if not needed)
    // pollInterval: 30000, // Poll every 30 seconds
  });

  // Use useFragment at the top level, not conditionally
  const userFragment = useFragment(LiteUserDoc, data?.currentUser);
  const currentUser = data?.currentUser ? userFragment : null;

  // Sync Apollo cache with Zustand store
  useEffect(() => {
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
      });
    } else if (!loading && !currentUser) {
      // Only clear if we're not loading and there's no user (logged out state)
      clearUser();
    }
  }, [currentUser, loading, setUser, clearUser]);

  return {
    currentUser,
    loading: !hasHydrated || loading,
    error,
    isLoggedIn: !!currentUser,
    isAdmin: currentUser?.isAdmin ?? false,
  };
}

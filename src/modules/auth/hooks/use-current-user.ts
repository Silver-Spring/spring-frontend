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
    // Use cache-first for optimal performance - only fetch if cache is empty
    fetchPolicy: 'cache-first',
    // After the first fetch, continue using cache-first
    nextFetchPolicy: 'cache-first',
    // Skip query until hydration is complete to avoid premature clearing
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

  return {
    currentUser,
    loading: !hasHydrated || loading,
    error,
    isLoggedIn: !!currentUser,
    isAdmin: currentUser?.isAdmin ?? false,
  };
}

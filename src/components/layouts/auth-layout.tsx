'use client';

import { useCurrentUser } from '@/modules/auth/hooks/use-current-user';
import { useUserStore } from '@/stores';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import type { Lite_UserFragment } from '@/gql/graphql';
import { Spinner } from '../ui/spinner';

/**
 * Authorization restriction flags using bitwise operations
 * Can be combined using bitwise OR (|) operator
 */
export enum AuthRestrict {
  /** No restrictions */
  NEVER = 0,
  /** Forbid access when user is logged out (require authentication) */
  LOGGED_OUT = 1 << 0,
  /** Forbid access when user is logged in (e.g., login/register pages) */
  LOGGED_IN = 1 << 1,
  /** Forbid access when user is not an admin (require admin privileges) */
  NOT_ADMIN = 1 << 2,
}

interface AuthLayoutProps {
  children: ReactNode | ((props: LayoutChildProps) => ReactNode);
  /** Bitwise flags indicating which user states should be forbidden */
  forbidWhen?: AuthRestrict;
  /** Custom redirect path when access is forbidden */
  redirectTo?: string | ((currentUser: Lite_UserFragment | null | undefined) => string);
  /** Show loading state while checking authentication */
  loadingComponent?: ReactNode;
  /** Custom component to show when access is forbidden (instead of redirecting) */
  forbiddenComponent?: ReactNode;
}

export interface LayoutChildProps {
  currentUser: Lite_UserFragment | null | undefined;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

/**
 * AuthLayout component that handles authorization-based page access control
 *
 * @example
 * // Require authentication
 * <AuthLayout forbidWhen={AuthRestrict.LOGGED_OUT}>
 *   <Dashboard />
 * </AuthLayout>
 *
 * @example
 * // Forbid logged-in users (e.g., login page)
 * <AuthLayout forbidWhen={AuthRestrict.LOGGED_IN}>
 *   <LoginPage />
 * </AuthLayout>
 *
 * @example
 * // Require admin access
 * <AuthLayout forbidWhen={AuthRestrict.LOGGED_OUT | AuthRestrict.NOT_ADMIN}>
 *   <AdminPanel />
 * </AuthLayout>
 *
 * @example
 * // Render prop pattern with user data
 * <AuthLayout>
 *   {({ currentUser, isAdmin }) => (
 *     <div>Welcome, {currentUser?.name}!</div>
 *   )}
 * </AuthLayout>
 */
export function AuthLayout({
  children,
  forbidWhen = AuthRestrict.NEVER,
  redirectTo,
  loadingComponent,
  forbiddenComponent,
}: AuthLayoutProps) {
  const { currentUser, loading, isLoggedIn, isAdmin } = useCurrentUser();
  const zustandUser = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state._hasHydrated);
  const router = useRouter();
  const pathname = usePathname();

  // Use Zustand user for immediate availability while Apollo is loading
  // This provides a seamless experience on page navigation
  const effectiveUser = currentUser ?? zustandUser;
  const effectiveIsLoggedIn = isLoggedIn || !!zustandUser;
  const effectiveIsAdmin = isAdmin || (zustandUser?.isAdmin ?? false);

  // Check authorization flags using bitwise AND
  const forbidsLoggedIn = !!(forbidWhen & AuthRestrict.LOGGED_IN);
  const forbidsLoggedOut = !!(forbidWhen & AuthRestrict.LOGGED_OUT);
  const forbidsNotAdmin = !!(forbidWhen & AuthRestrict.NOT_ADMIN);

  // Determine if access should be forbidden
  // Only check after hydration is complete to avoid false positives
  // Use effective values that include Zustand state for immediate checks
  const isForbidden =
    hasHydrated &&
    ((forbidsLoggedIn && effectiveIsLoggedIn) ||
      (forbidsLoggedOut && !effectiveIsLoggedIn) ||
      (forbidsNotAdmin && !effectiveIsAdmin));

  // Handle redirects
  useEffect(() => {
    // Wait for hydration to complete before redirecting
    if (!hasHydrated || loading || !isForbidden) return;

    const getRedirectPath = (): string => {
      // Custom redirect path provided
      if (redirectTo) {
        return typeof redirectTo === 'function' ? redirectTo(effectiveUser) : redirectTo;
      }

      // Default redirect logic
      if (forbidsLoggedIn || forbidsNotAdmin) {
        // User is logged in but shouldn't be here, or not admin
        return effectiveIsLoggedIn ? '/dashboard' : '/auth/login';
      }

      if (forbidsLoggedOut) {
        // User is not logged in but needs to be
        return `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      }

      return '/dashboard';
    };

    const redirectPath = getRedirectPath();
    if (redirectPath !== pathname) {
      router.push(redirectPath);
    }
  }, [
    hasHydrated,
    loading,
    isForbidden,
    forbidsLoggedIn,
    forbidsLoggedOut,
    forbidsNotAdmin,
    effectiveIsLoggedIn,
    effectiveUser,
    redirectTo,
    pathname,
    router,
  ]);

  // Show loading state if:
  // 1. Zustand hasn't hydrated yet (to prevent flash of wrong content)
  // 2. Apollo is loading AND we have no user data from Zustand
  if (!hasHydrated || (loading && !zustandUser)) {
    return loadingComponent ?? <LoadingFallback />;
  }

  // Show forbidden state (if custom component provided)
  if (isForbidden && forbiddenComponent) {
    return <>{forbiddenComponent}</>;
  }

  // Don't render anything if forbidden and redirecting
  if (isForbidden) {
    return null;
  }

  // Render children with user data
  // Prefer currentUser from Apollo if available, fallback to Zustand
  const childProps: LayoutChildProps = {
    currentUser: effectiveUser,
    isLoggedIn: effectiveIsLoggedIn,
    isAdmin: effectiveIsAdmin,
  };

  return <>{typeof children === 'function' ? children(childProps) : children}</>;
}

/**
 * Default loading component
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-8" />
    </div>
  );
}

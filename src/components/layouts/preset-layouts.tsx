'use client';

import { AuthLayout, AuthRestrict, type LayoutChildProps } from './auth-layout';
import type { ReactNode } from 'react';

/**
 * Pre-configured AuthLayout for pages that should only be accessible to logged-out users
 * Typically used for login, register, and other authentication pages
 */
export function GuestOnlyLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayout forbidWhen={AuthRestrict.LOGGED_IN} redirectTo="/dashboard">
      {children}
    </AuthLayout>
  );
}

/**
 * Pre-configured AuthLayout for pages that require authentication
 * Redirects to login with return URL if user is not authenticated
 */
export function ProtectedLayout({
  children,
}: {
  children: ReactNode | ((props: LayoutChildProps) => ReactNode);
}) {
  return <AuthLayout forbidWhen={AuthRestrict.LOGGED_OUT}>{children}</AuthLayout>;
}

/**
 * Pre-configured AuthLayout for pages that require admin access
 * Redirects to login if not authenticated, or home if not admin
 */
export function AdminLayout({
  children,
}: {
  children: ReactNode | ((props: LayoutChildProps) => ReactNode);
}) {
  return (
    <AuthLayout forbidWhen={AuthRestrict.LOGGED_OUT | AuthRestrict.NOT_ADMIN}>
      {children}
    </AuthLayout>
  );
}

/**
 * Pre-configured AuthLayout with no restrictions
 * Useful for public pages that want to access user data when available
 */
export function PublicLayout({
  children,
}: {
  children: ReactNode | ((props: LayoutChildProps) => ReactNode);
}) {
  return <AuthLayout forbidWhen={AuthRestrict.NEVER}>{children}</AuthLayout>;
}

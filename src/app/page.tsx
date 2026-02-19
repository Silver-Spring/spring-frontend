'use client';

import { Spinner } from '@/components/ui/spinner';
import { useCurrentUser } from '@/modules/auth/hooks/use-current-user';
import { useUserStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const { isLoggedIn, loading } = useCurrentUser();
  const zustandUser = useUserStore((state) => state.user);
  const hasHydrated = useUserStore((state) => state._hasHydrated);
  const router = useRouter();

  const effectiveIsLoggedIn = isLoggedIn || !!zustandUser;

  useEffect(() => {
    if (!hasHydrated || loading) return;
    router.replace(effectiveIsLoggedIn ? '/dashboard' : '/auth/login');
  }, [hasHydrated, loading, effectiveIsLoggedIn, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-8" />
    </div>
  );
}

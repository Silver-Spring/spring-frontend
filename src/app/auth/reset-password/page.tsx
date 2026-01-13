'use client';

import { GuestOnlyLayout } from '@/components/layouts';
import { ResetPasswordForm } from '@/modules/auth/components';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId') || '';
  const token = searchParams.get('token') || '';

  return <ResetPasswordForm userId={userId} resetToken={token} />;
}

export default function ResetPasswordPage() {
  return (
    <GuestOnlyLayout>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                <Spinner className="size-8" />
              </div>
            }
          >
            <ResetPasswordContent />
          </Suspense>
        </div>
      </div>
    </GuestOnlyLayout>
  );
}

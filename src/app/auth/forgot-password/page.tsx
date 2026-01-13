'use client';

import { GuestOnlyLayout } from '@/components/layouts';
import { ForgotPasswordForm } from '@/modules/auth/components';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';

export default function ForgotPasswordPage() {
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
            <ForgotPasswordForm />
          </Suspense>
        </div>
      </div>
    </GuestOnlyLayout>
  );
}

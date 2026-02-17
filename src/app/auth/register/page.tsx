'use client';

import { GuestOnlyLayout } from '@/components/layouts';
import { RegisterForm } from '@/modules/auth/components';
import { Spinner } from '@/components/ui/spinner';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <GuestOnlyLayout>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-2xl">
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                <Spinner className="size-8" />
              </div>
            }
          >
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </GuestOnlyLayout>
  );
}

'use client';

import { ProtectedLayout } from '@/components/layouts';
import { CoriAssessmentPage } from '@/modules/assessment/cori/components';
import { PhoneNumberDialog } from '@/modules/auth/components';
import { useUserStore } from '@/stores';
import { useState } from 'react';

export default function CoriPage() {
  const currentUser = useUserStore((state) => state.user);
  const [phoneDialogDismissed, setPhoneDialogDismissed] = useState(false);
  const showPhoneDialog = !!(currentUser && !currentUser.phoneNumber && !phoneDialogDismissed);

  return (
    <ProtectedLayout>
      {() => (
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1 px-4 sm:px-6">
            <CoriAssessmentPage />
          </main>

          <PhoneNumberDialog open={showPhoneDialog} onOpenChange={(open) => { if (!open) setPhoneDialogDismissed(true); }} />
        </div>
      )}
    </ProtectedLayout>
  );
}

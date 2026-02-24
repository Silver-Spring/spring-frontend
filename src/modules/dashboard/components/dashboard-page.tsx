'use client';

import { ProtectedLayout } from '@/components/layouts';
import { AssessmentStatus } from '@/modules/assessment/components';
import { PhoneNumberDialog } from '@/modules/auth/components';
import { useUserStore } from '@/stores';
import { useEffect, useState } from 'react';

export const DashboardPage = () => {
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const currentUser = useUserStore((state) => state.user);

  useEffect(() => {
    if (currentUser && !currentUser.phoneNumber) {
      setShowPhoneDialog(true);
    }
  }, [currentUser]);

  return (
    <ProtectedLayout>
      {() => (
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1 px-4 sm:px-6">
            <AssessmentStatus />
          </main>

          <PhoneNumberDialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog} />
        </div>
      )}
    </ProtectedLayout>
  );
};

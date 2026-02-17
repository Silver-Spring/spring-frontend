'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentStatus } from '@/modules/assessment/components';
import { PhoneNumberDialog } from '@/modules/auth/components';
import { useUserStore } from '@/stores';
import { useState, useEffect } from 'react';

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
      {({ currentUser, isAdmin }) => {
        return (
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back!</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Name:</span> {currentUser?.name || 'N/A'}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {currentUser?.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone Number:</span>{' '}
                      {currentUser?.phoneNumber || 'N/A'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <AssessmentStatus />
            </div>

            <PhoneNumberDialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog} />
          </div>
        );
      }}
    </ProtectedLayout>
  );
};

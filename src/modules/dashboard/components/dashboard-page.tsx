'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AssessmentStatus } from '@/modules/assessment/components';
import { PhoneNumberDialog } from '@/modules/auth/components';
import { useUserStore } from '@/stores';
import { getGreeting } from '../utils';
import { Mail, Phone, User } from 'lucide-react';
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
      {({ currentUser }) => (
        <div className="min-h-screen bg-background">
          <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">
                {getGreeting()}, {currentUser?.name?.split(' ')[0] || 'there'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Here&apos;s an overview of your profile and assessment status.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Your Profile</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground w-12 shrink-0">Name</span>
                    <span className="ml-auto font-medium truncate">{currentUser?.name || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground w-12 shrink-0">Email</span>
                    <span className="ml-auto font-medium truncate">
                      {currentUser?.email || '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground w-12 shrink-0">Phone</span>
                    <span className="ml-auto font-medium">
                      {currentUser?.phoneNumber ?? (
                        <button
                          onClick={() => setShowPhoneDialog(true)}
                          className="text-primary underline underline-offset-4 text-xs font-normal"
                        >
                          Add number
                        </button>
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <AssessmentStatus />
            </div>
          </main>

          <PhoneNumberDialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog} />
        </div>
      )}
    </ProtectedLayout>
  );
};

'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentStatus } from '@/modules/assessment/components';

export const DashboardPage = () => {
  return (
    <ProtectedLayout>
      {({ currentUser, isAdmin }) => (
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
                    <span className="font-medium">User Type:</span> {currentUser?.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Admin Access:</span>{' '}
                    {isAdmin ? (
                      <span className="text-green-600 font-semibold">Yes ✓</span>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <AssessmentStatus />
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

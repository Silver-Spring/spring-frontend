'use client';

// Force dynamic rendering to avoid pre-rendering issues with auth state
export const dynamic = 'force-dynamic';

import { use, Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { ProtectedLayout } from '@/components/layouts';
import { AssessmentPage } from '@/modules/assessment/components';

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

const AssessmentPageWrapper = ({ params }: PageProps) => {
  const resolvedParams = use(params);
  return <AssessmentPage sessionId={resolvedParams.sessionId} />;
};

export default function Assessment({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <ProtectedLayout>
          {() => (
            <div className="flex items-center justify-center min-h-screen">
              <Spinner className="size-8" />
            </div>
          )}
        </ProtectedLayout>
      }
    >
      <AssessmentPageWrapper params={params} />
    </Suspense>
  );
}

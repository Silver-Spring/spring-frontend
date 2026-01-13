'use client';

// Force dynamic rendering to avoid pre-rendering issues with auth state
export const dynamic = 'force-dynamic';

import { use, Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { ProtectedLayout } from '@/components/layouts';
import { AssessmentResultsPage } from '@/modules/assessment/components';

interface PageProps {
  params: Promise<{
    resultId: string;
  }>;
}

const AssessmentResultsPageWrapper = ({ params }: PageProps) => {
  const resolvedParams = use(params);
  return <AssessmentResultsPage resultId={resolvedParams.resultId} />;
};

export default function AssessmentResults({ params }: PageProps) {
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
      <AssessmentResultsPageWrapper params={params} />
    </Suspense>
  );
}

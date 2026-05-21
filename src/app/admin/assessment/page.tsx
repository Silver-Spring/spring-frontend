'use client';

import { AdminAssessmentPage } from '@/modules/admin/components/admin-assessment-page';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

const AssessmentPageFallback = () => (
  <div className="flex items-center justify-center p-12">
    <Spinner className="size-6" />
  </div>
);

export default function AdminAssessment() {
  return (
    <Suspense fallback={<AssessmentPageFallback />}>
      <AdminAssessmentPage />
    </Suspense>
  );
}

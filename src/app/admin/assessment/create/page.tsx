'use client';

import { CreateAssessmentTypeWizard } from '@/modules/admin/components/create-assessment-type-wizard';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';

const CreateAssessmentTypeFallback = () => (
  <div className="flex items-center justify-center p-12">
    <Spinner className="size-6" />
  </div>
);

export default function CreateAssessmentTypePage() {
  return (
    <Suspense fallback={<CreateAssessmentTypeFallback />}>
      <div className="p-6 md:p-8">
        <CreateAssessmentTypeWizard />
      </div>
    </Suspense>
  );
}

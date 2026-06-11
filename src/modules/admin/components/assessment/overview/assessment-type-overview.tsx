'use client';

import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AssessmentContentStats } from '@/modules/admin/components/assessment/overview/assessment-content-stats';
import { AssessmentRecloneCard } from '@/modules/admin/components/assessment/overview/assessment-reclone-card';
import { AssessmentTypeReadinessPanel } from '@/modules/admin/components/assessment-type-readiness-panel';
import { AssessmentTypeStatusStrip } from '@/modules/admin/components/assessment/overview/assessment-type-status-strip';
import { AssessmentWorkspaceGuide } from '@/modules/admin/components/assessment/overview/assessment-workspace-guide';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks';

type AssessmentTypeOverviewProps = {
  assessmentType: string;
};

const AssessmentTypeOverview = ({ assessmentType }: AssessmentTypeOverviewProps) => {
  const { assessmentTypes, loading } = useAdminAssessmentTypes();
  const type = assessmentTypes.find((item) => item.code === assessmentType);

  if (loading && !type) {
    return (
      <Card className="p-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Spinner className="size-4" />
          Loading...
        </div>
      </Card>
    );
  }

  if (!type) {
    return null;
  }

  return (
    <div className="space-y-6">
      <AssessmentTypeStatusStrip
        code={type.code}
        priceAmount={type.priceAmount}
        totalQuestions={type.totalQuestions}
        sectionCount={type.sectionCount}
        minScore={type.minScore}
        maxScore={type.maxScore}
        isActive={type.isActive}
        isDyadic={type.isDyadic}
        responseScaleMin={type.responseScaleMin}
        responseScaleMax={type.responseScaleMax}
        profileQuestionsCount={type.profileQuestionsCount}
      />

      <AssessmentContentStats assessmentType={assessmentType} />

      <AssessmentTypeReadinessPanel assessmentType={assessmentType} />

      <AssessmentRecloneCard assessmentType={assessmentType} />

      {!type.isActive && (
        <AssessmentWorkspaceGuide assessmentType={assessmentType} />
      )}
    </div>
  );
};

export { AssessmentTypeOverview };

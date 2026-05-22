'use client';

import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AssessmentWorkspaceHeader } from '@/modules/admin/components/assessment/workspace/assessment-workspace-header';
import { AssessmentWorkspacePanel } from '@/modules/admin/components/assessment/workspace/assessment-workspace-panel';
import { ReportPreviewRefreshProvider } from '@/modules/admin/components/report-preview-context';
import { ReportPreviewDialog } from '@/modules/admin/components/report-preview-panel';
import {
  isTypeScopedView,
  useAdminAssessmentWorkspace,
} from '@/modules/admin/hooks/use-admin-assessment-workspace';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks';
import { useMemo } from 'react';

const REPORT_PREVIEW_VIEWS = new Set(['content', 'scoring', 'reports'] as const);

export const AdminAssessmentPage = () => {
  const { view, selectedType } = useAdminAssessmentWorkspace();
  const { assessmentTypes, loading: typesLoading } = useAdminAssessmentTypes();

  const isTypeScoped = isTypeScopedView(view);
  const selectedTypeMeta = useMemo(
    () => assessmentTypes.find((type) => type.code === selectedType),
    [assessmentTypes, selectedType]
  );
  const typeExists = Boolean(selectedTypeMeta);
  const showTypeNotFound =
    isTypeScoped && !typesLoading && assessmentTypes.length > 0 && !typeExists;
  const showReportPreview =
    isTypeScoped && typeExists && REPORT_PREVIEW_VIEWS.has(view as 'content' | 'scoring' | 'reports');

  const workspaceContent = (
    <>
      <AssessmentWorkspaceHeader
        view={view}
        typeCode={selectedType}
        typeName={selectedTypeMeta?.name}
        actions={
          showReportPreview ? (
            <ReportPreviewDialog assessmentType={selectedType} />
          ) : undefined
        }
      />

      {isTypeScoped && typesLoading && assessmentTypes.length === 0 ? (
        <Card className="p-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Spinner className="size-4" />
            Loading...
          </div>
        </Card>
      ) : (
        <AssessmentWorkspacePanel
          view={view}
          assessmentType={selectedType}
          showTypeNotFound={showTypeNotFound}
        />
      )}
    </>
  );

  return (
    <div className="p-6 md:p-8">
      {isTypeScoped && !showTypeNotFound ? (
        <ReportPreviewRefreshProvider>{workspaceContent}</ReportPreviewRefreshProvider>
      ) : (
        workspaceContent
      )}
    </div>
  );
};

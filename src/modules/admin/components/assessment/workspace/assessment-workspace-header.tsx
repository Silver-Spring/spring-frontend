import type { ReactNode } from 'react';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { WORKSPACE_VIEW_META } from '@/modules/admin/lib/assessment-workspace-copy';
import type { AssessmentWorkspaceView } from '@/modules/admin/hooks/use-admin-assessment-workspace';

type AssessmentWorkspaceHeaderProps = {
  view: AssessmentWorkspaceView;
  typeCode?: string;
  typeName?: string;
  actions?: ReactNode;
};

const AssessmentWorkspaceHeader = ({
  view,
  typeCode,
  typeName,
  actions,
}: AssessmentWorkspaceHeaderProps) => {
  const meta = WORKSPACE_VIEW_META[view];
  const isGlobal = view === 'catalog' || view === 'users';

  const eyebrow = isGlobal ? 'Assessments' : typeName || typeCode?.toUpperCase() || 'Assessment';

  return (
    <AdminPageHeader
      eyebrow={eyebrow}
      title={meta.title}
      description={meta.description}
      actions={actions}
      className="mb-6"
    />
  );
};

export { AssessmentWorkspaceHeader };

import type { ReactNode } from 'react';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { WORKSPACE_VIEW_META } from '@/modules/admin/lib/assessment-workspace-copy';
import type { AssessmentWorkspaceView } from '@/modules/admin/hooks/use-admin-assessment-workspace';
import { buildAssessmentHref } from '@/modules/admin/hooks/use-admin-assessment-workspace';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type AssessmentWorkspaceHeaderProps = {
  view: AssessmentWorkspaceView;
  typeCode?: string;
  typeName?: string;
  actions?: ReactNode;
};

const Breadcrumb = ({
  view,
  typeCode,
  typeName,
}: Pick<AssessmentWorkspaceHeaderProps, 'view' | 'typeCode' | 'typeName'>) => {
  const isGlobal = view === 'catalog' || view === 'users';
  const isOverview = view === 'overview';

  if (isGlobal) return null;

  const displayName = typeName || typeCode?.toUpperCase() || 'Assessment';
  const viewLabel = WORKSPACE_VIEW_META[view]?.title;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
      <Link
        href={buildAssessmentHref('catalog')}
        className="hover:text-foreground transition-colors"
      >
        Assessments
      </Link>
      <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
      {isOverview ? (
        <span className="text-foreground font-medium">{displayName}</span>
      ) : (
        <>
          <Link
            href={buildAssessmentHref('overview', typeCode)}
            className="hover:text-foreground transition-colors"
          >
            {displayName}
          </Link>
          <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
          <span className="text-foreground font-medium">{viewLabel}</span>
        </>
      )}
    </nav>
  );
};

const AssessmentWorkspaceHeader = ({
  view,
  typeCode,
  typeName,
  actions,
}: AssessmentWorkspaceHeaderProps) => {
  const meta = WORKSPACE_VIEW_META[view];

  return (
    <div className="mb-6">
      <Breadcrumb view={view} typeCode={typeCode} typeName={typeName} />
      <AdminPageHeader
        title={meta.title}
        description={meta.description}
        actions={actions}
      />
    </div>
  );
};

export { AssessmentWorkspaceHeader };

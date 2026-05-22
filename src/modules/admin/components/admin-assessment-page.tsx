'use client';

import {
  isTypeScopedView,
  useAdminAssessmentWorkspace,
  buildAssessmentHref,
  type AssessmentWorkspaceView,
} from '@/modules/admin/hooks/use-admin-assessment-workspace';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import Link from 'next/link';
import { AssessmentContentManager } from './assessment-content-manager';
import { AssessmentTypeOverview } from './assessment-type-overview';
import { AssessmentTypesCatalog } from './assessment-types-catalog';
import { AssessmentTypeSettingsPanel } from './assessment-workspace-panels';
import { InterpretationBandManager } from './interpretation-band-manager';
import { UsersAssessmentTable } from './users-assessment-table';

const VIEW_TITLES: Record<AssessmentWorkspaceView, string> = {
  overview: 'Overview',
  content: 'Content',
  scoring: 'Scoring',
  settings: 'Settings',
  catalog: 'All Assessment Types',
  users: 'User Results',
};

const AssessmentTypeNotFound = ({ typeCode }: { typeCode: string }) => (
  <Card className="p-8 text-center space-y-4">
    <p className="text-muted-foreground">
      Assessment type <span className="font-mono font-medium text-foreground">{typeCode}</span>{' '}
      was not found. It may have been removed or the URL is incorrect.
    </p>
    <Button asChild>
      <Link href={buildAssessmentHref('catalog')}>Back to catalog</Link>
    </Button>
  </Card>
);

export const AdminAssessmentPage = () => {
  const { view, selectedType } = useAdminAssessmentWorkspace();
  const { assessmentTypes, loading: typesLoading } = useAdminAssessmentTypes();

  const isTypeScoped = isTypeScopedView(view);
  const typeExists = assessmentTypes.some((type) => type.code === selectedType);
  const showTypeNotFound = isTypeScoped && !typesLoading && assessmentTypes.length > 0 && !typeExists;

  const renderWorkspace = () => {
    if (showTypeNotFound) {
      return <AssessmentTypeNotFound typeCode={selectedType} />;
    }

    switch (view) {
      case 'catalog':
        return <AssessmentTypesCatalog />;
      case 'users':
        return (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              All assessment sessions and results across types.
            </p>
            <UsersAssessmentTable />
          </div>
        );
      case 'content':
        return <AssessmentContentManager assessmentType={selectedType} />;
      case 'scoring':
        return <InterpretationBandManager assessmentType={selectedType} />;
      case 'settings':
        return <AssessmentTypeSettingsPanel assessmentType={selectedType} />;
      case 'overview':
      default:
        return <AssessmentTypeOverview assessmentType={selectedType} />;
    }
  };

  const subtitle = view === 'catalog' || view === 'users' ? 'Global' : selectedType.toUpperCase();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {subtitle}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mt-0.5">{VIEW_TITLES[view]}</h1>
      </div>
      {isTypeScoped && typesLoading && assessmentTypes.length === 0 ? (
        <Card className="p-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Spinner className="size-4" />
            Loading assessment type...
          </div>
        </Card>
      ) : (
        renderWorkspace()
      )}
    </div>
  );
};

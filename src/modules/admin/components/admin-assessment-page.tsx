'use client';

import {
  useAdminAssessmentWorkspace,
  type AssessmentWorkspaceView,
} from '@/modules/admin/hooks/use-admin-assessment-workspace';
import { AssessmentContentManager } from './assessment-content-manager';
import { AssessmentTypeOverview } from './assessment-type-overview';
import { AssessmentTypesCatalog } from './assessment-types-catalog';
import {
  AssessmentTypeSettingsPanel,
  TemplateContentEditor,
} from './assessment-workspace-panels';
import { InterpretationBandManager } from './interpretation-band-manager';
import { UsersAssessmentTable } from './users-assessment-table';

const VIEW_TITLES: Record<AssessmentWorkspaceView, string> = {
  overview: 'Overview',
  content: 'Content',
  scoring: 'Scoring',
  reports: 'Reports',
  settings: 'Settings',
  catalog: 'All Assessment Types',
  users: 'User Results',
};

export const AdminAssessmentPage = () => {
  const { view, selectedType } = useAdminAssessmentWorkspace();

  const renderWorkspace = () => {
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
      case 'reports':
        return <TemplateContentEditor assessmentType={selectedType} />;
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
      {renderWorkspace()}
    </div>
  );
};

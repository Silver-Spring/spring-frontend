'use client';

import dynamic from 'next/dynamic';
import type { AssessmentTypeCode } from '@/modules/assessment/constants';
import type { AssessmentWorkspaceView } from '@/modules/admin/hooks/use-admin-assessment-workspace';
import { AdminAssessmentPanelSkeleton } from '@/modules/admin/components/shared/admin-panel-skeleton';
import { AssessmentTypeNotFound } from './assessment-type-not-found';

const panelLoading = () => <AdminAssessmentPanelSkeleton />;

const AssessmentTypesCatalog = dynamic(
  () =>
    import('../catalog/assessment-types-catalog').then((mod) => ({
      default: mod.AssessmentTypesCatalog,
    })),
  { loading: panelLoading }
);

const UsersAssessmentTable = dynamic(
  () =>
    import('../../users-assessment-table').then((mod) => ({
      default: mod.UsersAssessmentTable,
    })),
  { loading: panelLoading }
);

const AssessmentTypeOverview = dynamic(
  () =>
    import('../overview/assessment-type-overview').then((mod) => ({
      default: mod.AssessmentTypeOverview,
    })),
  { loading: panelLoading }
);

const AssessmentContentManager = dynamic(
  () =>
    import('../content/assessment-content-manager').then((mod) => ({
      default: mod.AssessmentContentManager,
    })),
  { loading: panelLoading }
);

const InterpretationBandManager = dynamic(
  () =>
    import('../../interpretation-bands').then((mod) => ({
      default: mod.InterpretationBandManager,
    })),
  { loading: panelLoading }
);

const TemplateContentEditor = dynamic(
  () =>
    import('../../template-content-editor').then((mod) => ({
      default: mod.TemplateContentEditor,
    })),
  { loading: panelLoading }
);

const AssessmentTypeSettingsPanel = dynamic(
  () =>
    import('../../assessment-workspace-panels').then((mod) => ({
      default: mod.AssessmentTypeSettingsPanel,
    })),
  { loading: panelLoading }
);

const PdfThemeEditor = dynamic(
  () =>
    import('../../pdf-theme-editor').then((mod) => ({
      default: mod.PdfThemeEditor,
    })),
  { loading: panelLoading }
);

type AssessmentWorkspacePanelProps = {
  view: AssessmentWorkspaceView;
  assessmentType: AssessmentTypeCode;
  showTypeNotFound: boolean;
};

const AssessmentWorkspacePanel = ({
  view,
  assessmentType,
  showTypeNotFound,
}: AssessmentWorkspacePanelProps) => {
  if (showTypeNotFound) {
    return <AssessmentTypeNotFound typeCode={assessmentType} />;
  }

  switch (view) {
    case 'catalog':
      return <AssessmentTypesCatalog />;
    case 'users':
      return (
        <div className="space-y-4">
          <UsersAssessmentTable />
        </div>
      );
    case 'content':
      return <AssessmentContentManager assessmentType={assessmentType} />;
    case 'scoring':
      return <InterpretationBandManager assessmentType={assessmentType} />;
    case 'reports':
      return <TemplateContentEditor assessmentType={assessmentType} />;
    case 'pdf-theme':
      return <PdfThemeEditor assessmentType={assessmentType} />;
    case 'settings':
      return <AssessmentTypeSettingsPanel assessmentType={assessmentType} />;
    case 'overview':
    default:
      return <AssessmentTypeOverview assessmentType={assessmentType} />;
  }
};

export { AssessmentWorkspacePanel };

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReportPreviewRefresh } from '@/modules/admin/components/report-preview-context';
import {
  useAssessmentTypeReadiness,
  useAssessmentTypeStages,
  useInterpretationBands,
} from '@/modules/admin/hooks';
import { useMemo, useState } from 'react';
import { ADMIN_FOOTER_NOTE } from './constants';
import { OverallBandPanel } from './overall-band-panel';
import { SectionBandMatrix } from './section-band-matrix';
import { StageEditor } from './stage-editor';
import type { AssessmentTypePanelProps, TypeStageRow } from './types';

export const InterpretationBandManager = ({ assessmentType }: AssessmentTypePanelProps) => {
  const [activeTab, setActiveTab] = useState('section');
  const { bumpPreview } = useReportPreviewRefresh();
  const { requiredSectionBands, stagesPerSection } = useAssessmentTypeReadiness(assessmentType);
  const { stages, loading: stagesLoading, refetch: refetchStages } =
    useAssessmentTypeStages(assessmentType);
  const { sectionBands, overallBands, loading, refetch } = useInterpretationBands(
    assessmentType,
    {
      loadSection: true,
      loadOverall: activeTab === 'overall',
    }
  );

  const stageRows: TypeStageRow[] = useMemo(
    () =>
      stages.map((stage) => ({
        displayOrder: stage.displayOrder,
        label: stage.label,
        description: stage.description,
        sectionRangeStart: stage.sectionRangeStart,
        sectionRangeEnd: stage.sectionRangeEnd,
        overallRangeStart: stage.overallRangeStart,
        overallRangeEnd: stage.overallRangeEnd,
      })),
    [stages]
  );

  const bumpPreviewAndRefetch = () => {
    void refetch();
    bumpPreview();
  };

  const handleBandsChanged = () => {
    bumpPreviewAndRefetch();
  };

  const handleStagesSaved = () => {
    void refetchStages();
    bumpPreviewAndRefetch();
  };

  const sectionBandLabel =
    requiredSectionBands != null
      ? `Section bands (${requiredSectionBands})`
      : `Section bands (${stagesPerSection} per dimension)`;

  return (
    <div className="space-y-6">
      <StageEditor
        assessmentType={assessmentType}
        stages={stageRows}
        loading={stagesLoading}
        onSaved={handleStagesSaved}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="section">{sectionBandLabel}</TabsTrigger>
          <TabsTrigger value="overall">Overall bands (5)</TabsTrigger>
        </TabsList>
        <TabsContent value="section" className="mt-4">
          <SectionBandMatrix
            assessmentType={assessmentType}
            sectionBands={sectionBands}
            bandsLoading={loading || stagesLoading}
            requiredSectionBands={requiredSectionBands}
            stagesPerSection={stagesPerSection}
            stages={stageRows}
            onBandsChanged={handleBandsChanged}
          />
        </TabsContent>
        <TabsContent value="overall" className="mt-4">
          {activeTab === 'overall' && (
            <OverallBandPanel
              assessmentType={assessmentType}
              overallBands={overallBands}
              loading={loading || stagesLoading}
              stages={stageRows}
              onBandsChanged={handleBandsChanged}
            />
          )}
        </TabsContent>
      </Tabs>

      <p className="text-xs text-muted-foreground border-t pt-4">{ADMIN_FOOTER_NOTE}</p>
    </div>
  );
};

'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ReportFieldHint } from '@/modules/admin/components/report-field-hint';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import { useRecomputeAutoStageRanges, useUpdateAssessmentTypeStages } from '@/modules/admin/hooks';
import { useEffect, useState } from 'react';
import type { StageDraft, TypeStageRow } from './types';
import { stageDraftHasChanges, toStageDraft } from './utils';

const buildStagePayload = (
  draft: StageDraft,
  includeRanges: boolean
): {
  displayOrder: number;
  label: string;
  description?: string;
  sectionRangeStart?: number;
  sectionRangeEnd?: number;
  overallRangeStart?: number;
  overallRangeEnd?: number;
} => {
  const trimmedDescription = draft.description.trim();

  const base = {
    displayOrder: draft.displayOrder,
    label: draft.label.trim(),
    ...(trimmedDescription ? { description: trimmedDescription } : { description: '' }),
  };

  if (!includeRanges) {
    return base;
  }

  return {
    ...base,
    sectionRangeStart: parseInt(draft.sectionRangeStart, 10),
    sectionRangeEnd: parseInt(draft.sectionRangeEnd, 10),
    overallRangeStart: parseInt(draft.overallRangeStart, 10),
    overallRangeEnd: parseInt(draft.overallRangeEnd, 10),
  };
};

export const StageEditor = ({
  assessmentType,
  stages,
  loading,
  onSaved,
}: {
  assessmentType: AssessmentTypeCode;
  stages: TypeStageRow[];
  loading: boolean;
  onSaved: () => void;
}) => {
  const { updateAssessmentTypeStages, loading: saving } = useUpdateAssessmentTypeStages();
  const { recomputeAutoStageRanges, loading: recomputing } = useRecomputeAutoStageRanges();
  const [drafts, setDrafts] = useState<StageDraft[]>([]);

  useEffect(() => {
    setDrafts(stages.map(toStageDraft));
  }, [stages]);

  const handleSave = async () => {
    if (drafts.length === 0) return;

    const anyRangeChanged = drafts.some((draft) => {
      const stage = stages.find((row) => row.displayOrder === draft.displayOrder);
      if (!stage) return false;
      return (
        parseInt(draft.sectionRangeStart, 10) !== stage.sectionRangeStart ||
        parseInt(draft.sectionRangeEnd, 10) !== stage.sectionRangeEnd ||
        parseInt(draft.overallRangeStart, 10) !== stage.overallRangeStart ||
        parseInt(draft.overallRangeEnd, 10) !== stage.overallRangeEnd
      );
    });

    const changedRows = drafts.filter((draft) => {
      const stage = stages.find((row) => row.displayOrder === draft.displayOrder);
      return stage && stageDraftHasChanges(draft, stage);
    });

    if (changedRows.length === 0) return;

    const stagePayload = anyRangeChanged
      ? drafts.map((draft) => buildStagePayload(draft, true))
      : changedRows.map((draft) => buildStagePayload(draft, false));

    await updateAssessmentTypeStages({
      assessmentTypeCode: assessmentType,
      stages: stagePayload,
    });
    onSaved();
  };

  const handleRecompute = async () => {
    await recomputeAutoStageRanges(assessmentType);
    onSaved();
  };

  const hasChanges = drafts.some((draft) => {
    const stage = stages.find((row) => row.displayOrder === draft.displayOrder);
    return stage && stageDraftHasChanges(draft, stage);
  });

  const handleDraftChange = (
    displayOrder: number,
    field: keyof Omit<StageDraft, 'displayOrder'>,
    value: string
  ) => {
    setDrafts((current) =>
      current.map((draft) =>
        draft.displayOrder === displayOrder ? { ...draft, [field]: value } : draft
      )
    );
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
        <Spinner className="size-4" />
        Loading stage configuration...
      </div>
    );
  }

  if (stages.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-2">
        No stage configuration found for this type.
      </p>
    );
  }

  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h4 className="font-medium">Stages</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Definitions appear on the About page. Score ranges drive band matching and scoring.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" size="sm" variant="outline" disabled={recomputing || saving}>
                Reset to auto ranges
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset stage ranges?</AlertDialogTitle>
                <AlertDialogDescription>
                  This overwrites custom section and overall ranges with defaults for this type.
                  Definitions, band narratives, and recommended actions are not changed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(event) => {
                    event.preventDefault();
                    void handleRecompute();
                  }}
                >
                  {recomputing ? 'Resetting...' : 'Reset ranges'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button type="button" size="sm" onClick={handleSave} disabled={saving || !hasChanges}>
            {saving ? 'Saving...' : 'Save stages'}
          </Button>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-[120px_minmax(0,1.4fr)_1fr_1fr] gap-2 px-1 pb-2 text-xs font-medium text-muted-foreground">
        <span>Stage</span>
        <span className="flex items-center gap-1">
          Definition (About page)
          <ReportFieldHint hintId="stage.description" />
        </span>
        <span>Section range (10–100)</span>
        <span>Overall range</span>
      </div>

      <div className="space-y-3">
        {drafts.map((draft) => (
          <div
            key={draft.displayOrder}
            className="grid grid-cols-1 lg:grid-cols-[120px_minmax(0,1.4fr)_1fr_1fr] gap-3 rounded-md border p-3"
          >
            <Input
              value={draft.label}
              onChange={(e) => handleDraftChange(draft.displayOrder, 'label', e.target.value)}
              aria-label={`Stage ${draft.displayOrder} label`}
              className="font-medium"
            />
            <Textarea
              value={draft.description}
              onChange={(e) => handleDraftChange(draft.displayOrder, 'description', e.target.value)}
              aria-label={`Stage ${draft.displayOrder} definition`}
              rows={2}
              className="min-h-0 resize-y text-sm"
              placeholder="One-line definition for the About page"
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={draft.sectionRangeStart}
                onChange={(e) =>
                  handleDraftChange(draft.displayOrder, 'sectionRangeStart', e.target.value)
                }
                aria-label={`Stage ${draft.displayOrder} section range start`}
                className="min-w-0"
              />
              <span className="text-muted-foreground shrink-0">–</span>
              <Input
                type="number"
                value={draft.sectionRangeEnd}
                onChange={(e) =>
                  handleDraftChange(draft.displayOrder, 'sectionRangeEnd', e.target.value)
                }
                aria-label={`Stage ${draft.displayOrder} section range end`}
                className="min-w-0"
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={draft.overallRangeStart}
                onChange={(e) =>
                  handleDraftChange(draft.displayOrder, 'overallRangeStart', e.target.value)
                }
                aria-label={`Stage ${draft.displayOrder} overall range start`}
                className="min-w-0"
              />
              <span className="text-muted-foreground shrink-0">–</span>
              <Input
                type="number"
                value={draft.overallRangeEnd}
                onChange={(e) =>
                  handleDraftChange(draft.displayOrder, 'overallRangeEnd', e.target.value)
                }
                aria-label={`Stage ${draft.displayOrder} overall range end`}
                className="min-w-0"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

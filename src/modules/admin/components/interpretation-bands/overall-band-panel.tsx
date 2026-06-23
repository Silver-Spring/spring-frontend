'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import {
  useUpdateInterpretationBand,
  type OverallInterpretationBandNode,
} from '@/modules/admin/hooks';
import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { BandEditSheet } from './band-edit-sheet';
import type { BandFormState, TypeStageRow } from './types';

export const OverallBandPanel = ({
  assessmentType,
  overallBands,
  loading,
  stages,
  onBandsChanged,
}: {
  assessmentType: AssessmentTypeCode;
  overallBands: OverallInterpretationBandNode[];
  loading: boolean;
  stages: TypeStageRow[];
  onBandsChanged: () => void;
}) => {
  const { updateInterpretationBand, loading: updating } =
    useUpdateInterpretationBand(assessmentType);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState<OverallInterpretationBandNode | null>(null);
  const [preset, setPreset] = useState<Partial<BandFormState> | undefined>();

  const handleEdit = (band: OverallInterpretationBandNode) => {
    setSelectedBand(band);
    setPreset(undefined);
    setSheetOpen(true);
  };

  const missingStages = stages.filter(
    (s) => !overallBands.some((b) => b.displayOrder === s.displayOrder)
  );

  const openForStage = (stage: TypeStageRow) => {
    setSelectedBand(null);
    setPreset({
      label: stage.label,
      rangeStart: String(stage.overallRangeStart),
      rangeEnd: String(stage.overallRangeEnd),
      displayOrder: String(stage.displayOrder),
      narrative: '',
    });
    setSheetOpen(true);
  };

  const handleCreate = (stage?: TypeStageRow) => {
    if (stage) { openForStage(stage); return; }
    // Auto-pick the first missing stage so rangeStart/rangeEnd are never blank.
    if (missingStages.length > 0) { openForStage(missingStages[0]); return; }
    // All stages covered — open blank form (admin adding a custom extra band).
    setSelectedBand(null);
    setPreset(undefined);
    setSheetOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-muted-foreground">
          {overallBands.length} overall bands (expected 5). Score ranges sync from the stage
          editor above.
        </p>
        <div className="flex flex-wrap gap-2">
          {missingStages.length > 0 ? (
            missingStages.map((stage) => (
              <Button key={stage.displayOrder} variant="outline" onClick={() => openForStage(stage)}>
                <Plus className="size-4 mr-2" />
                Add {stage.label}
              </Button>
            ))
          ) : (
            <Button variant="outline" onClick={() => handleCreate()}>
              <Plus className="size-4 mr-2" />
              Add Band
            </Button>
          )}
        </div>
      </div>

      {overallBands.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No overall bands configured.{' '}
          {stages.map((stage) => (
            <Button
              key={stage.displayOrder}
              variant="link"
              className="px-1"
              onClick={() => handleCreate(stage)}
            >
              Add {stage.label}
            </Button>
          ))}
        </Card>
      ) : (
        <ul className="space-y-3">
          {overallBands.map((band) => (
            <li key={band.id}>
              <Card className={cn('p-4', !band.isActive && 'opacity-60')}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{band.label}</span>
                      <Badge variant="outline">
                        Range: {band.rangeStart}–{band.rangeEnd}
                      </Badge>
                      {band.displayRangeLabel && (
                        <Badge variant="secondary">PDF: {band.displayRangeLabel}</Badge>
                      )}
                      {!band.isActive && <Badge variant="secondary">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 whitespace-pre-wrap">
                      {band.narrative.split('\n\n')[0]}
                    </p>
                    {band.keyMindset && (
                      <p className="text-xs italic text-muted-foreground mt-2">{band.keyMindset}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Switch
                      checked={band.isActive}
                      onCheckedChange={() =>
                        updateInterpretationBand({ id: band.id, isActive: !band.isActive })
                      }
                      aria-label={`Toggle ${band.label} active state`}
                      disabled={updating}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(band)}
                      aria-label={`Edit ${band.label} band`}
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <BandEditSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        assessmentType={assessmentType}
        bandScope="overall"
        band={selectedBand}
        preset={preset}
        onSaved={onBandsChanged}
      />
    </>
  );
};

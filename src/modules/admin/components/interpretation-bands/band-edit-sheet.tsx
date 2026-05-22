'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import type { BandScope, InterpretationBandNode } from '@/modules/admin/hooks';
import { BandEditForm } from './band-edit-form';
import { RecommendedActionsPanel } from './recommended-actions-panel';
import type { BandFormState } from './types';

export const BandEditSheet = ({
  open,
  onOpenChange,
  assessmentType,
  bandScope,
  band,
  preset,
  contextSectionType,
  contextSectionLabel,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentType: AssessmentTypeCode;
  bandScope: BandScope;
  band: InterpretationBandNode | null;
  preset?: Partial<BandFormState>;
  contextSectionType?: string;
  contextSectionLabel?: string;
  onSaved: () => void;
}) => {
  const dimensionSuffix = contextSectionLabel ? ` · ${contextSectionLabel}` : '';
  const title = band
    ? `${band.label}${dimensionSuffix}`
    : preset?.label
      ? `${preset.label}${dimensionSuffix}`
      : 'Create band';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {bandScope === 'section'
              ? 'Dimension-specific interpretation and recommended actions.'
              : 'Overall TRI interpretation, PDF display range, and Focus for Growth actions.'}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-8 space-y-6">
          <BandEditForm
            bandScope={bandScope}
            assessmentType={assessmentType}
            editingBand={band}
            preset={preset}
            contextSectionType={contextSectionType}
            contextSectionLabel={contextSectionLabel}
            onCancel={() => onOpenChange(false)}
            onSuccess={() => {
              onSaved();
              onOpenChange(false);
            }}
          />
          {band && (
            <RecommendedActionsPanel
              assessmentType={assessmentType}
              band={band}
              bandScope={bandScope}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

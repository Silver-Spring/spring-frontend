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
import { Label } from '@/components/ui/label';
import { ReportFieldHint } from '@/modules/admin/components/report-field-hint';
import { NarrativeTextarea } from '@/components/ui/narrative-textarea';
import { Textarea } from '@/components/ui/textarea';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import {
  useCreateInterpretationBand,
  useDeleteInterpretationBand,
  useUpdateInterpretationBand,
  type BandScope,
  type InterpretationBandNode,
} from '@/modules/admin/hooks';
import { useEffect, useState } from 'react';
import { BandAffectsChips } from './band-affects-chips';
import { BandStageMetadata } from './band-stage-metadata';
import { EMPTY_BAND_FORM } from './constants';
import type { BandFormState } from './types';
import { normalizeSectionType } from './utils';

export const BandEditForm = ({
  bandScope,
  assessmentType,
  editingBand,
  preset,
  contextSectionType,
  contextSectionLabel,
  onCancel,
  onSuccess,
}: {
  bandScope: BandScope;
  assessmentType: AssessmentTypeCode;
  editingBand: InterpretationBandNode | null;
  preset?: Partial<BandFormState>;
  contextSectionType?: string;
  contextSectionLabel?: string;
  onCancel: () => void;
  onSuccess: () => void;
}) => {
  const { createInterpretationBand, loading: creating } =
    useCreateInterpretationBand(assessmentType);
  const { updateInterpretationBand, loading: updating } =
    useUpdateInterpretationBand(assessmentType);
  const { deleteInterpretationBand, loading: deleting } =
    useDeleteInterpretationBand(assessmentType);

  const [form, setForm] = useState<BandFormState>(EMPTY_BAND_FORM);

  useEffect(() => {
    const resolvedSectionType =
      (editingBand && 'sectionType' in editingBand
        ? normalizeSectionType(editingBand.sectionType)
        : '') ||
      normalizeSectionType(contextSectionType) ||
      normalizeSectionType(preset?.sectionType) ||
      '';

    if (editingBand) {
      setForm({
        sectionType: resolvedSectionType,
        rangeStart: String(editingBand.rangeStart),
        rangeEnd: String(editingBand.rangeEnd),
        label: editingBand.label,
        narrative: editingBand.narrative,
        keyMindset: 'keyMindset' in editingBand ? (editingBand.keyMindset ?? '') : '',
        displayRangeLabel:
          'displayRangeLabel' in editingBand ? (editingBand.displayRangeLabel ?? '') : '',
        displayOrder: String(editingBand.displayOrder),
      });
      return;
    }
    if (preset || contextSectionType) {
      setForm({
        ...EMPTY_BAND_FORM,
        ...preset,
        sectionType: resolvedSectionType,
      });
      return;
    }
    setForm(EMPTY_BAND_FORM);
  }, [editingBand, preset, contextSectionType]);

  const isOverall = bandScope === 'overall';
  const isSection = bandScope === 'section';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSection && !editingBand && !form.sectionType) {
      return;
    }

    if (editingBand) {
      await updateInterpretationBand({
        id: editingBand.id,
        narrative: form.narrative,
        keyMindset: isOverall ? form.keyMindset.trim() || null : undefined,
      });
    } else {
      await createInterpretationBand({
        assessmentType,
        bandScope,
        sectionType: isSection ? form.sectionType : undefined,
        rangeStart: parseInt(form.rangeStart, 10),
        rangeEnd: parseInt(form.rangeEnd, 10),
        label: form.label.trim(),
        narrative: form.narrative,
        keyMindset: isOverall ? form.keyMindset.trim() || undefined : undefined,
        displayOrder: form.displayOrder ? parseInt(form.displayOrder, 10) : undefined,
      });
    }

    onSuccess();
  };

  const handleDelete = async () => {
    if (!editingBand) return;
    await deleteInterpretationBand({ id: editingBand.id });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BandAffectsChips bandScope={bandScope} />

      <BandStageMetadata
        label={form.label}
        displayOrder={form.displayOrder}
        rangeStart={form.rangeStart}
        rangeEnd={form.rangeEnd}
        displayRangeLabel={form.displayRangeLabel}
        isSection={isSection}
        contextSectionLabel={contextSectionLabel}
        sectionType={form.sectionType}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="band-narrative">Interpretation text</Label>
            <ReportFieldHint hintId="band.narrative" />
          </div>
          <div className="mt-2">
            <NarrativeTextarea
              id="band-narrative"
              value={form.narrative}
              onChange={(narrative) => setForm({ ...form, narrative })}
              rows={6}
              showFormatting
              showParagraphCount
              required
            />
          </div>
        </div>

        {isOverall && (
          <div className="md:col-span-2">
            <Label htmlFor="band-key-mindset">Key mindset quote</Label>
            <Textarea
              id="band-key-mindset"
              value={form.keyMindset}
              onChange={(e) => setForm({ ...form, keyMindset: e.target.value })}
              className="mt-2"
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={creating || updating}>
          {creating || updating ? 'Saving...' : editingBand ? 'Save Changes' : 'Create Band'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        {editingBand && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant="destructive" disabled={deleting}>
                Delete Band
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete interpretation band?</AlertDialogTitle>
                <AlertDialogDescription>
                  Prefer deactivating if past results reference this band.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </form>
  );
};

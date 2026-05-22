import type { StageDraft, TypeStageRow } from './types';

export const normalizeSectionType = (type: string | null | undefined): string =>
  (type ?? '').trim().toLowerCase();

export const formatRangeLabel = (start: number, end: number) => `${start}–${end}`;

export const toStageDraft = (stage: TypeStageRow): StageDraft => ({
  displayOrder: stage.displayOrder,
  label: stage.label,
  description: stage.description ?? '',
  sectionRangeStart: String(stage.sectionRangeStart),
  sectionRangeEnd: String(stage.sectionRangeEnd),
  overallRangeStart: String(stage.overallRangeStart),
  overallRangeEnd: String(stage.overallRangeEnd),
});

export const stageDraftHasChanges = (draft: StageDraft, stage: TypeStageRow): boolean =>
  draft.label.trim() !== stage.label ||
  draft.description.trim() !== (stage.description ?? '').trim() ||
  parseInt(draft.sectionRangeStart, 10) !== stage.sectionRangeStart ||
  parseInt(draft.sectionRangeEnd, 10) !== stage.sectionRangeEnd ||
  parseInt(draft.overallRangeStart, 10) !== stage.overallRangeStart ||
  parseInt(draft.overallRangeEnd, 10) !== stage.overallRangeEnd;

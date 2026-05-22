import { AssessmentTypeCode } from '@/modules/assessment/constants';

export type AssessmentTypePanelProps = {
  assessmentType: AssessmentTypeCode;
};

export type BandFormState = {
  sectionType: string;
  rangeStart: string;
  rangeEnd: string;
  label: string;
  narrative: string;
  keyMindset: string;
  displayRangeLabel: string;
  displayOrder: string;
};

export type ActionFormState = {
  actionText: string;
  priority: string;
};

export type TypeStageRow = {
  displayOrder: number;
  label: string;
  description?: string | null;
  sectionRangeStart: number;
  sectionRangeEnd: number;
  overallRangeStart: number;
  overallRangeEnd: number;
};

export type StageDraft = {
  displayOrder: number;
  label: string;
  description: string;
  sectionRangeStart: string;
  sectionRangeEnd: string;
  overallRangeStart: string;
  overallRangeEnd: string;
};

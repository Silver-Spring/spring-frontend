import {
  DEFAULT_ASSESSMENT_TYPE,
  PROTECTED_ASSESSMENT_TYPES,
} from '@/modules/assessment/constants';
import type { AssessmentTypeReadinessCheckKey } from '../hooks/use-assessment-type-readiness';

export type ReadinessFixView = 'content' | 'scoring' | 'settings';

export const READINESS_CHECK_FIX_VIEWS: Partial<
  Record<AssessmentTypeReadinessCheckKey, ReadinessFixView>
> = {
  sections: 'content',
  questions: 'content',
  section_bands: 'scoring',
  overall_bands: 'scoring',
  section_band_coverage: 'scoring',
};

export const READINESS_FIX_VIEW_LABELS: Record<ReadinessFixView, string> = {
  content: 'Sections & questions',
  scoring: 'Score bands',
  settings: 'Type details',
};

export const isProtectedAssessmentType = (code: string): boolean =>
  PROTECTED_ASSESSMENT_TYPES.includes(
    code as (typeof PROTECTED_ASSESSMENT_TYPES)[number]
  );

export const getDefaultTemplateCode = (
  options: { code: string }[],
  preferred: string = DEFAULT_ASSESSMENT_TYPE
): string => {
  if (options.length === 0) return preferred;
  const match = options.find((option) => option.code === preferred);
  return match?.code ?? options[0].code;
};

export const getReadinessFixViewLabel = (checkKey: string): string | null => {
  const view = READINESS_CHECK_FIX_VIEWS[checkKey as AssessmentTypeReadinessCheckKey];
  if (!view) return null;
  return READINESS_FIX_VIEW_LABELS[view];
};

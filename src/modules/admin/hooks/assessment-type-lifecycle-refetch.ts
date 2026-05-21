import type { InternalRefetchQueriesInclude } from '@apollo/client';
import { AdminAssessmentStatsDoc } from '@/modules/assessment/graphql';
import {
  AdminAssessmentTypesDoc,
  AssessmentTypeReadinessDoc,
} from '../graphql';
import { interpretationBandsRefetchQueries } from './interpretation-bands-refetch';

export const assessmentTypeLifecycleRefetchQueries = (
  assessmentType: string
): InternalRefetchQueriesInclude =>
  [
    { query: AdminAssessmentTypesDoc },
    { query: AssessmentTypeReadinessDoc, variables: { type: assessmentType } },
    { query: AdminAssessmentStatsDoc, variables: { assessmentType } },
  ] as InternalRefetchQueriesInclude;

export const assessmentTypeSeedRefetchQueries = (
  assessmentType: string,
  options?: { refetchBands?: boolean }
): InternalRefetchQueriesInclude => {
  if (!options?.refetchBands) {
    return assessmentTypeLifecycleRefetchQueries(assessmentType);
  }

  return [
    ...assessmentTypeLifecycleRefetchQueries(assessmentType),
    ...interpretationBandsRefetchQueries(assessmentType),
  ] as InternalRefetchQueriesInclude;
};

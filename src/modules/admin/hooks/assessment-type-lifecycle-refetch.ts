import type { InternalRefetchQueriesInclude } from '@apollo/client';
import { AdminAssessmentStatsDoc, GetAllSectionsDoc } from '@/modules/assessment/graphql';
import {
  AdminAssessmentTypesDoc,
  AssessmentTemplateContentsDoc,
  AssessmentTypeReadinessDoc,
  AssessmentTypeStagesDoc,
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

export const assessmentTypeStagesRefetchQueries = (
  assessmentType: string
): InternalRefetchQueriesInclude =>
  [
    {
      query: AssessmentTypeStagesDoc,
      variables: { assessmentTypeCode: assessmentType },
    },
    ...interpretationBandsRefetchQueries(assessmentType),
  ] as InternalRefetchQueriesInclude;

export const assessmentTemplateContentRefetchQueries = (
  assessmentType: string
): InternalRefetchQueriesInclude =>
  [
    {
      query: AssessmentTemplateContentsDoc,
      variables: { assessmentTypeCode: assessmentType },
    },
    ...assessmentTypeLifecycleRefetchQueries(assessmentType),
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

export const assessmentSectionRefetchQueries = (
  assessmentType: string,
  options?: { refetchBands?: boolean }
): InternalRefetchQueriesInclude => {
  const queries: InternalRefetchQueriesInclude = [
    { query: GetAllSectionsDoc, variables: { assessmentType } },
    ...assessmentTypeLifecycleRefetchQueries(assessmentType),
  ];

  if (options?.refetchBands) {
    return [
      ...queries,
      ...interpretationBandsRefetchQueries(assessmentType),
    ] as InternalRefetchQueriesInclude;
  }

  return queries;
};

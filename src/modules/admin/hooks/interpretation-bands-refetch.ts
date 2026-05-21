import type { InternalRefetchQueriesInclude } from '@apollo/client';
import {
  OverallInterpretationBandsDoc,
  SectionInterpretationBandsDoc,
} from '../graphql';

export const interpretationBandsRefetchQueries = (
  assessmentType: string
): InternalRefetchQueriesInclude => [
  { query: SectionInterpretationBandsDoc, variables: { type: assessmentType } },
  { query: OverallInterpretationBandsDoc, variables: { type: assessmentType } },
];

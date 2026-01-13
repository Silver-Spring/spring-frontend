import { graphql } from '@/gql';

const AssessmentStatusDoc = graphql(`
  query AssessmentStatus {
    assessmentStatus {
      hasCompletedAssessment
      hasActiveSession
      completedAt
      resultId
      totalReadinessIndex
    }
  }
`);

export { AssessmentStatusDoc };

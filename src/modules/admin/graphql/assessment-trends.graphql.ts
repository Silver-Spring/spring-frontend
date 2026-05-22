import { graphql } from '@/gql';

const AssessmentTrendsDoc = graphql(`
  query GetAssessmentTrends($startDate: Date!, $endDate: Date!, $assessmentType: String) {
    assessmentTrends(
      input: { startDate: $startDate, endDate: $endDate, assessmentType: $assessmentType }
    ) {
      trends {
        date
        completedCount
        startedCount
        inProgressCount
      }
      totalCompleted
      totalStarted
      totalInProgress
    }
  }
`);

export { AssessmentTrendsDoc };

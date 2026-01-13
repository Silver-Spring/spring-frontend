import { graphql } from '@/gql';

const AssessmentTrendsDoc = graphql(`
  query GetAssessmentTrends($startDate: Date!, $endDate: Date!) {
    assessmentTrends(input: { startDate: $startDate, endDate: $endDate }) {
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

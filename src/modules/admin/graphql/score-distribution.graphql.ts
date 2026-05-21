import { graphql } from '@/gql';

const ScoreDistributionDoc = graphql(`
  query GetScoreDistribution($assessmentType: String = "ssri") {
    scoreDistribution(assessmentType: $assessmentType) {
      distribution {
        range
        count
        percentage
        label
      }
      totalAssessments
      averageScore
    }
  }
`);

export { ScoreDistributionDoc };

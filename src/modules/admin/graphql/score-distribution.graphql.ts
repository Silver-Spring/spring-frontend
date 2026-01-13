import { graphql } from '@/gql';

const ScoreDistributionDoc = graphql(`
  query GetScoreDistribution {
    scoreDistribution {
      distribution {
        range
        count
        percentage
      }
      totalAssessments
      averageScore
    }
  }
`);

export { ScoreDistributionDoc };

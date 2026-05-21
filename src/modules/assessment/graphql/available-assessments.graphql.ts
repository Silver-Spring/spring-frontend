import { graphql } from '@/gql';

const AvailableAssessmentsDoc = graphql(`
  query AvailableAssessments {
    availableAssessments {
      code
      name
      description
      priceAmount
      totalQuestions
      displayOrder
    }
  }
`);

export { AvailableAssessmentsDoc };

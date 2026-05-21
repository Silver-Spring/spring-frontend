import { graphql } from '@/gql';

const AssessmentTypeByCodeDoc = graphql(`
  query AssessmentTypeByCode($code: String!) {
    assessmentTypeByCode(code: $code) {
      code
      name
      priceAmount
      totalQuestions
      minScore
      maxScore
      isActive
    }
  }
`);

export { AssessmentTypeByCodeDoc };

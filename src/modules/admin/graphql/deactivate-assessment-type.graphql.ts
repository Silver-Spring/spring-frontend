import { graphql } from '@/gql';

const DeactivateAssessmentTypeDoc = graphql(`
  mutation DeactivateAssessmentType($code: String!) {
    deactivateAssessmentType(code: $code) {
      success
      message
    }
  }
`);

export { DeactivateAssessmentTypeDoc };

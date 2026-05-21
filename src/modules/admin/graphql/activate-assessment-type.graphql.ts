import { graphql } from '@/gql';

const ActivateAssessmentTypeDoc = graphql(`
  mutation ActivateAssessmentType($code: String!) {
    activateAssessmentType(code: $code) {
      success
      message
      assessmentType {
        code
        isActive
      }
    }
  }
`);

export { ActivateAssessmentTypeDoc };

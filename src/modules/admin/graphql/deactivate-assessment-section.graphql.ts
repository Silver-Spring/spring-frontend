import { graphql } from '@/gql';

const DeactivateAssessmentSectionDoc = graphql(`
  mutation DeactivateAssessmentSection($input: DeactivateAssessmentSectionInput!) {
    deactivateAssessmentSection(input: $input) {
      success
      message
      section {
        id
        type
        isActive
      }
    }
  }
`);

export { DeactivateAssessmentSectionDoc };

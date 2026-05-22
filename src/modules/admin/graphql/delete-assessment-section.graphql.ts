import { graphql } from '@/gql';

const DeleteAssessmentSectionDoc = graphql(`
  mutation DeleteAssessmentSection($input: DeleteAssessmentSectionInput!) {
    deleteAssessmentSection(input: $input) {
      success
      message
    }
  }
`);

export { DeleteAssessmentSectionDoc };

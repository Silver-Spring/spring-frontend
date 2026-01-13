import { graphql } from '@/gql';

const UpdateAssessmentSectionDoc = graphql(`
  mutation UpdateAssessmentSection($input: UpdateSectionInput!) {
    updateAssessmentSection(input: $input) {
      section {
        id
        name
        description
        displayOrder
        isActive
        updatedAt
      }
      success
      message
    }
  }
`);

export { UpdateAssessmentSectionDoc };

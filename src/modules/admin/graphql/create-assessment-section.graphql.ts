import { graphql } from '@/gql';

const CreateAssessmentSectionDoc = graphql(`
  mutation CreateAssessmentSection($input: CreateAssessmentSectionInput!) {
    createAssessmentSection(input: $input) {
      success
      message
      section {
        id
        type
        name
        description
        displayOrder
        isActive
        assessmentTypeCode
      }
    }
  }
`);

export { CreateAssessmentSectionDoc };

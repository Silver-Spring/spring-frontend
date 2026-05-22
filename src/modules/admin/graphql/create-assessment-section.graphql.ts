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
        aboutDescription
        subtitle
        emoji
        displayColor
        displayOrder
        isActive
        assessmentTypeCode
      }
    }
  }
`);

export { CreateAssessmentSectionDoc };

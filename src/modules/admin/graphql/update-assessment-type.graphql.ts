import { graphql } from '@/gql';

const UpdateAssessmentTypeDoc = graphql(`
  mutation UpdateAssessmentType($input: UpdateAssessmentTypeInput!) {
    updateAssessmentType(input: $input) {
      assessmentType {
        code
        name
      }
      success
      message
    }
  }
`);

export { UpdateAssessmentTypeDoc };

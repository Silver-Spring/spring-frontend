import { graphql } from '@/gql';

const DeleteMyAssessmentDoc = graphql(`
  mutation DeleteMyAssessment($assessmentType: String) {
    deleteMyAssessment(input: { confirmation: true, assessmentType: $assessmentType }) {
      success
      message
      deletedCount
    }
  }
`);

export { DeleteMyAssessmentDoc };

import { graphql } from '@/gql';

const DeleteMyAssessmentDoc = graphql(`
  mutation DeleteMyAssessment {
    deleteMyAssessment(input: { confirmation: true }) {
      success
      message
      deletedCount
    }
  }
`);

export { DeleteMyAssessmentDoc };

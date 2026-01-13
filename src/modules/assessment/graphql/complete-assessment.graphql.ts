import { graphql } from '@/gql';

const CompleteAssessmentDoc = graphql(`
  mutation CompleteAssessment($sessionId: UUID!) {
    completeAssessment(input: { sessionId: $sessionId }) {
      result {
        id
        sessionId
        userId
        totalReadinessIndex
        pdfPath
        isEmailed
        emailedAt
        createdAt
      }
      success
      message
      pdfPath
    }
  }
`);

export { CompleteAssessmentDoc };

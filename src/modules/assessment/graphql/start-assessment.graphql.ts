import { graphql } from '@/gql';

const StartAssessmentDoc = graphql(`
  mutation StartAssessment($paymentId: UUID!) {
    startAssessment(input: { paymentId: $paymentId }) {
      session {
        id
        userId
        paymentId
        status
        currentQuestionNumber
        startTime
        expiresAt
      }
      message
    }
  }
`);

export { StartAssessmentDoc };

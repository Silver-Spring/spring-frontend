import { graphql } from '@/gql';

const StartAssessmentDoc = graphql(`
  mutation StartAssessment($input: StartAssessmentInput!) {
    startAssessment(input: $input) {
      session {
        id
        userId
        paymentId
        status
        currentQuestionNumber
        assessmentTypeCode
        startTime
        expiresAt
      }
      assessmentType {
        code
        name
        totalQuestions
      }
      message
    }
  }
`);

export { StartAssessmentDoc };

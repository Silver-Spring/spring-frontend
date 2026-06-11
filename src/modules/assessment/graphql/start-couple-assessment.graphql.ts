import { graphql } from '@/gql';

const StartCoupleAssessmentDoc = graphql(`
  mutation StartCoupleAssessment($input: StartCoupleAssessmentInput!) {
    startCoupleAssessment(input: $input) {
      session {
        id
        userId
        paymentId
        status
        currentQuestionNumber
        assessmentTypeCode
        partnerRole
        coupleId
        startTime
        expiresAt
      }
      inviteCode
      coupleId
      assessmentType {
        code
        name
        totalQuestions
      }
      message
    }
  }
`);

export { StartCoupleAssessmentDoc };

import { graphql } from '@/gql';

const JoinCoupleAssessmentDoc = graphql(`
  mutation JoinCoupleAssessment($input: JoinCoupleAssessmentInput!) {
    joinCoupleAssessment(input: $input) {
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

export { JoinCoupleAssessmentDoc };

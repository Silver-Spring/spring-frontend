import { graphql } from '@/gql';

const CurrentSessionDoc = graphql(`
  query CurrentAssessmentSession($assessmentType: String = "ssri") {
    currentAssessmentSession(assessmentType: $assessmentType) {
      id
      userId
      paymentId
      status
      currentQuestionNumber
      assessmentTypeCode
      startTime
      lastActivityTime
      expiresAt
    }
  }
`);

export { CurrentSessionDoc };

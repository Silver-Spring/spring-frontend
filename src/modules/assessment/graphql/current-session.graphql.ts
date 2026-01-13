import { graphql } from '@/gql';

const CurrentSessionDoc = graphql(`
  query CurrentAssessmentSession {
    currentAssessmentSession {
      id
      userId
      paymentId
      status
      currentQuestionNumber
      startTime
      lastActivityTime
      expiresAt
    }
  }
`);

export { CurrentSessionDoc };

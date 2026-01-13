import { graphql } from '@/gql';

const SubmitResponseDoc = graphql(`
  mutation SubmitResponse(
    $sessionId: UUID!
    $questionId: UUID!
    $responseValue: Int!
    $timeTakenSeconds: Int
  ) {
    submitAssessmentResponse(
      input: {
        sessionId: $sessionId
        questionId: $questionId
        responseValue: $responseValue
        timeTakenSeconds: $timeTakenSeconds
      }
    ) {
      response {
        id
        sessionId
        questionId
        responseValue
        timeTakenSeconds
        createdAt
      }
      success
      message
    }
  }
`);

export { SubmitResponseDoc };

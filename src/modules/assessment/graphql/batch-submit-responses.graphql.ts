import { graphql } from '@/gql';

const BatchSubmitResponsesDoc = graphql(`
  mutation BatchSubmitResponses($input: BatchSubmitResponsesInput!) {
    batchSubmitResponses(input: $input) {
      success
      message
      answeredCount
      responses {
        id
        sessionId
        questionId
        responseValue
        timeTakenSeconds
        createdAt
        updatedAt
      }
    }
  }
`);

export { BatchSubmitResponsesDoc };

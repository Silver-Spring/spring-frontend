import { graphql } from '@/gql';

const SubmitOrUpdateResponseDoc = graphql(`
  mutation SubmitOrUpdateResponse($input: SubmitOrUpdateResponseInput!) {
    submitOrUpdateResponse(input: $input) {
      response {
        id
        sessionId
        questionId
        responseValue
        timeTakenSeconds
        isUpdate
        createdAt
        updatedAt
      }

      session {
        id
        currentQuestionNumber
        lastAnsweredQuestion
        lastActivityTime
        expiresAt
      }

      progress {
        answeredCount
        totalCount
        percentComplete
      }

      nextQuestion {
        questionNumber
        hasNext
      }

      success
      message
    }
  }
`);

export { SubmitOrUpdateResponseDoc };

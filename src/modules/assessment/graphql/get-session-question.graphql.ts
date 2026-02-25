import { graphql } from '@/gql';

const GetSessionQuestionDoc = graphql(`
  query GetSessionQuestion($sessionId: UUID!, $questionNumber: Int!) {
    getSessionQuestion(sessionId: $sessionId, questionNumber: $questionNumber) {
      question {
        id
        sessionId
        questionId
        displayOrder
        questionText
        sectionName
        sectionType
        isAnswered
      }

      currentResponse {
        id
        responseValue
        timeTakenSeconds
        isUpdate
        updatedAt
      }

      navigation {
        currentNumber
        totalQuestions
        hasPrevious
        hasNext
        previousNumber
        nextNumber
      }

      progress {
        answeredCount
        totalCount
        percentComplete
      }
    }
  }
`);

export { GetSessionQuestionDoc };

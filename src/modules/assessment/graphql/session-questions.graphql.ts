import { graphql } from '@/gql';

const SessionQuestionsDoc = graphql(`
  query SessionQuestions($sessionId: UUID!) {
    assessmentSession(id: $sessionId) {
      id
      status
      currentQuestionNumber
      startTime
      lastActivityTime
      expiresAt

      # Get all 50 questions for this session
      assessmentSessionQuestionsBySessionId {
        nodes {
          id
          sessionId
          questionId
          displayOrder
          isAnswered
          question {
            id
            questionText
            sectionId
          }
        }
      }

      # Get all previous responses to pre-fill answers
      assessmentResponsesBySessionId {
        nodes {
          id
          questionId
          responseValue
          timeTakenSeconds
          createdAt
          updatedAt
        }
      }
    }
  }
`);

export { SessionQuestionsDoc };

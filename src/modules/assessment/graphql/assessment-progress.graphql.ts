import { graphql } from '@/gql';

const AssessmentProgressDoc = graphql(`
  query AssessmentProgress {
    assessmentProgress {
      session {
        id
        currentQuestionNumber
      }
      totalQuestions
      answeredQuestions
      progressPercentage
    }
  }
`);

export { AssessmentProgressDoc };

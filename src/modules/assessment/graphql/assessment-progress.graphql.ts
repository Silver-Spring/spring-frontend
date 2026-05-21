import { graphql } from '@/gql';

const AssessmentProgressDoc = graphql(`
  query AssessmentProgress($assessmentType: String = "ssri") {
    assessmentProgress(assessmentType: $assessmentType) {
      session {
        id
        currentQuestionNumber
        assessmentTypeCode
      }
      totalQuestions
      answeredQuestions
      progressPercentage
    }
  }
`);

export { AssessmentProgressDoc };

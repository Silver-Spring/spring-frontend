import { graphql } from '@/gql';

const AssessmentStatusDoc = graphql(`
  query AssessmentStatus($assessmentType: String = "ssri") {
    assessmentStatus(assessmentType: $assessmentType) {
      hasCompletedAssessment
      hasActiveSession
      completedAt
      resultId
      totalReadinessIndex
      completedAssessments
      availableAssessments {
        code
        name
        priceAmount
        totalQuestions
        maxScore
        isDyadic
      }
    }
  }
`);

export { AssessmentStatusDoc };

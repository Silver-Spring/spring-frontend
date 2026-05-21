import { graphql } from '@/gql';

const AdminAssessmentStatsDoc = graphql(`
  query AdminAssessmentStats($assessmentType: String = "ssri") {
    adminAssessmentStats(assessmentType: $assessmentType) {
      totalSections
      totalQuestions
      totalInterpretationBands
      totalRecommendedActions
      activeQuestions
      inactiveQuestions
      questionsBySectionType
    }
  }
`);

export { AdminAssessmentStatsDoc };

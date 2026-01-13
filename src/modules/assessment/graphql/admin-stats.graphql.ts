import { graphql } from '@/gql';

const AdminAssessmentStatsDoc = graphql(`
  query AdminAssessmentStats {
    adminAssessmentStats {
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

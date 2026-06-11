import { graphql } from '@/gql';

const AdminAssessmentTypesDoc = graphql(`
  query AdminAssessmentTypes {
    adminAssessmentTypes {
      id
      code
      name
      description
      priceAmount
      isActive
      totalQuestions
      sectionCount
      questionsPerSection
      minScore
      maxScore
      scoringFormula
      displayOrder
      isDyadic
      responseScaleMin
      responseScaleMax
      profileQuestionsCount
    }
  }
`);

export { AdminAssessmentTypesDoc };

import { graphql } from '@/gql';

const CreateAssessmentTypeDoc = graphql(`
  mutation CreateAssessmentType($input: CreateAssessmentTypeInput!) {
    createAssessmentType(input: $input) {
      success
      message
      assessmentType {
        code
        name
        isActive
        totalQuestions
        sectionCount
        questionsPerSection
        minScore
        maxScore
        scoringFormula
        displayOrder
      }
    }
  }
`);

export { CreateAssessmentTypeDoc };

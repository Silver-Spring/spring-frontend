import { graphql } from '@/gql';

const AssessmentQuestionsDoc = graphql(`
  query AssessmentQuestions {
    assessmentQuestions {
      nodes {
        id
        questionText
        sectionId
        displayOrder
        isActive
      }
    }
  }
`);

export { AssessmentQuestionsDoc };

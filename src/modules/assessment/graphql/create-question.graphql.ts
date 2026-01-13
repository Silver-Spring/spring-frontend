import { graphql } from '@/gql';

const CreateAssessmentQuestionDoc = graphql(`
  mutation CreateAssessmentQuestion($input: CreateQuestionInput!) {
    createAssessmentQuestion(input: $input) {
      question {
        id
        sectionId
        questionText
        displayOrder
        isActive
        createdAt
        updatedAt
      }
      success
      message
    }
  }
`);

export { CreateAssessmentQuestionDoc };

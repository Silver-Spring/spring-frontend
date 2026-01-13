import { graphql } from '@/gql';

const UpdateAssessmentQuestionDoc = graphql(`
  mutation UpdateAssessmentQuestion($input: UpdateQuestionInput!) {
    updateAssessmentQuestion(input: $input) {
      question {
        id
        questionText
        displayOrder
        isActive
        updatedAt
      }
      success
      message
    }
  }
`);

export { UpdateAssessmentQuestionDoc };

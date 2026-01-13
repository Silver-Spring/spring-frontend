import { graphql } from '@/gql';

const DeleteAssessmentQuestionDoc = graphql(`
  mutation DeleteAssessmentQuestion($input: DeleteQuestionInput!) {
    deleteAssessmentQuestion(input: $input) {
      success
      message
    }
  }
`);

export { DeleteAssessmentQuestionDoc };

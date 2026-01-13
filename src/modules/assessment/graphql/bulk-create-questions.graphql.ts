import { graphql } from '@/gql';

const BulkCreateAssessmentQuestionsDoc = graphql(`
  mutation BulkCreateAssessmentQuestions($input: BulkCreateQuestionsInput!) {
    bulkCreateAssessmentQuestions(input: $input) {
      questions {
        id
        questionText
        displayOrder
      }
      count
      success
      message
    }
  }
`);

export { BulkCreateAssessmentQuestionsDoc };

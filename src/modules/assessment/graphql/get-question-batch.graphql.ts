import { graphql } from '@/gql';

const GetQuestionBatchDoc = graphql(`
  query GetQuestionBatch($batchNumber: Int!) {
    getQuestionBatch(batchNumber: $batchNumber) {
      batchNumber
      totalBatches
      currentBatchStartIndex
      currentBatchEndIndex
      questions {
        id
        sessionId
        questionId
        displayOrder
        isAnswered
        createdAt
        questionText
        sectionName
        sectionType
      }
    }
  }
`);

export { GetQuestionBatchDoc };

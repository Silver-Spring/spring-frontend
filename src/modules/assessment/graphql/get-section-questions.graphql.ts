import { graphql } from '@/gql';

export const GetSectionQuestionsDoc = graphql(`
  query GetSectionQuestions($sectionId: UUID!) {
    assessmentQuestions(
      condition: { sectionId: $sectionId }
    ) {
      nodes {
        id
        sectionId
        questionText
        displayOrder
        isActive
        questionCategory
        answerOptions
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`);

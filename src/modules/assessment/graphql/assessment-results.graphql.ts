import { graphql } from '@/gql';

const AssessmentResultsDoc = graphql(`
  query AssessmentResults($id: UUID!) {
    assessmentResult(id: $id) {
      id
      totalReadinessIndex
      pdfPath
      isEmailed
      createdAt
      assessmentSectionResultsByResultId {
        nodes {
          sectionType
          score
          interpretationLabel
          interpretationNarrative
        }
      }
    }
  }
`);

export { AssessmentResultsDoc };

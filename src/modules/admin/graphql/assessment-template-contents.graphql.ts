import { graphql } from '@/gql';

const AssessmentTemplateContentsDoc = graphql(`
  query AssessmentTemplateContents($assessmentTypeCode: String!) {
    assessmentTemplateContents(
      condition: { assessmentTypeCode: $assessmentTypeCode }
    ) {
      nodes {
        id
        assessmentTypeCode
        contentKey
        contentValue
        updatedAt
      }
    }
  }
`);

export { AssessmentTemplateContentsDoc };

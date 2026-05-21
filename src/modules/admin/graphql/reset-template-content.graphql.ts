import { graphql } from '@/gql';

const ResetTemplateContentDoc = graphql(`
  mutation ResetTemplateContent($assessmentType: String!, $contentKey: String!) {
    resetTemplateContent(assessmentType: $assessmentType, contentKey: $contentKey) {
      success
      message
    }
  }
`);

export { ResetTemplateContentDoc };

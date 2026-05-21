import { graphql } from '@/gql';

const UpdateTemplateContentDoc = graphql(`
  mutation UpdateTemplateContent($input: UpdateTemplateContentInput!) {
    updateTemplateContent(input: $input) {
      success
      message
    }
  }
`);

export { UpdateTemplateContentDoc };

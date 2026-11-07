import { graphql } from '@/gql';

export const RegisterForWorkshopDoc = graphql(`
  mutation RegisterForWorkshop($input: RegisterForWorkshopInput!) {
    registerForWorkshop(input: $input) {
      success
      eventTitle
      startsAt
    }
  }
`);

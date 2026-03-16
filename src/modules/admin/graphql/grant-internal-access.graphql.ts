import { graphql } from '@/gql';

const GrantInternalAccessDoc = graphql(`
  mutation GrantInternalAccess($userId: UUID!) {
    grantInternalAccess(input: { userId: $userId }) {
      user {
        id
        email
        name
        isAdmin
        isInternal
        createdAt
        updatedAt
      }
      success
      message
    }
  }
`);

export { GrantInternalAccessDoc };

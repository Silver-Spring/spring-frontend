import { graphql } from '@/gql';

const RevokeInternalAccessDoc = graphql(`
  mutation RevokeInternalAccess($userId: UUID!) {
    revokeInternalAccess(input: { userId: $userId }) {
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

export { RevokeInternalAccessDoc };

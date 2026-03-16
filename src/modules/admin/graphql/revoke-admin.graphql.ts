import { graphql } from '@/gql';

const RevokeAdminDoc = graphql(`
  mutation RevokeAdmin($userId: UUID!) {
    revokeAdminAccess(input: { userId: $userId }) {
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

export { RevokeAdminDoc };

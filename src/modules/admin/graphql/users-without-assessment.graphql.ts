import { graphql } from '@/gql';

const UsersWithoutAssessmentDoc = graphql(`
  query GetUsersWithoutAssessment {
    usersWithoutAssessment {
      users {
        id
        email
        name
        phoneNumber
        isAdmin
        isInternal
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`);

export { UsersWithoutAssessmentDoc };

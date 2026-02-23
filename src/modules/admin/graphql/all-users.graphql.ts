import { graphql } from '@/gql';

const AllUsersDoc = graphql(`
  query GetAllUsers {
    allUsers {
      users {
        id
        email
        name
        phoneNumber
        isAdmin
        createdAt
        updatedAt
      }
      totalCount
      adminCount
    }
  }
`);

export { AllUsersDoc };

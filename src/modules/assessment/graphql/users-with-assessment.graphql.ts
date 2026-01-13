import { graphql } from '@/gql';

const UsersWithAssessmentDoc = graphql(`
  query GetUsersWithAssessment {
    usersWithAssessment {
      users {
        userId
        userName
        userEmail
        sessionId
        resultId
        status
        startedAt
        completedAt
        expiresAt
        totalScore
        interpretationLabel
      }
      totalCount
      completedCount
      inProgressCount
    }
  }
`);

export { UsersWithAssessmentDoc };

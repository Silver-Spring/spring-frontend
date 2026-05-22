import { graphql } from '@/gql';

const UsersWithAssessmentDoc = graphql(`
  query GetUsersWithAssessment($assessmentType: String) {
    usersWithAssessment(assessmentType: $assessmentType) {
      users {
        userId
        userName
        userEmail
        sessionId
        resultId
        assessmentTypeCode
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

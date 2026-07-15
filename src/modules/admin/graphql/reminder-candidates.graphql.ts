import { graphql } from '@/gql';

const ReminderCandidatesDoc = graphql(`
  query ReminderCandidates($reminderType: String!) {
    adminReminderCandidates(reminderType: $reminderType) {
      users {
        userId
        email
        name
        daysSinceSignup
        reminderCount
        lastReminder
      }
      totalCount
    }
  }
`);

export { ReminderCandidatesDoc };

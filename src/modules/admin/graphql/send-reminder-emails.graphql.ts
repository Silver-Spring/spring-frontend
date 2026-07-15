import { graphql } from '@/gql';

const SendReminderEmailsDoc = graphql(`
  mutation SendReminderEmails($input: SendReminderEmailsInput!) {
    adminSendReminderEmails(input: $input) {
      success
      queuedCount
      message
    }
  }
`);

export { SendReminderEmailsDoc };

import { graphql } from '@/gql';

export const AdminSendWorkshopEmailDoc = graphql(`
  mutation AdminSendWorkshopEmail($eventId: UUID!, $emailType: String!) {
    adminSendWorkshopEmail(eventId: $eventId, emailType: $emailType) {
      sentCount
      failedCount
      skippedCount
      remainingCount
      failures
    }
  }
`);

export const AdminDeleteWorkshopRegistrationDoc = graphql(`
  mutation AdminDeleteWorkshopRegistration($registrationId: UUID!) {
    adminDeleteWorkshopRegistration(registrationId: $registrationId)
  }
`);

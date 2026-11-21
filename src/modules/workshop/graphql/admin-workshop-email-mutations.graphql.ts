import { graphql } from '@/gql';

export const AdminSendWorkshopEmailDoc = graphql(`
  mutation AdminSendWorkshopEmail($eventId: UUID!, $emailType: String!, $registrationIds: [UUID!]) {
    adminSendWorkshopEmail(eventId: $eventId, emailType: $emailType, registrationIds: $registrationIds) {
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

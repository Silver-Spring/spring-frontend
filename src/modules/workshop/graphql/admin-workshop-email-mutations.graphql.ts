import { graphql } from '@/gql';

export const AdminResendWorkshopConfirmationsDoc = graphql(`
  mutation AdminResendWorkshopConfirmations($eventId: UUID!, $registrationIds: [UUID!]) {
    adminResendWorkshopConfirmations(eventId: $eventId, registrationIds: $registrationIds) {
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

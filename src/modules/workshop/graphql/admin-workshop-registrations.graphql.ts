import { graphql } from '@/gql';

export const AdminWorkshopRegistrationsDoc = graphql(`
  query AdminWorkshopRegistrations($eventId: UUID!) {
    adminWorkshopRegistrations(eventId: $eventId) {
      id
      fullName
      email
      phone
      source
      createdAt
      emails {
        emailType
        status
        sentAt
        error
      }
    }
  }
`);

export const AdminWorkshopEmailPendingCountDoc = graphql(`
  query AdminWorkshopEmailPendingCount($eventId: UUID!, $emailType: String!) {
    adminWorkshopEmailPendingCount(eventId: $eventId, emailType: $emailType)
  }
`);

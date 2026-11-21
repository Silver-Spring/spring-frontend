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

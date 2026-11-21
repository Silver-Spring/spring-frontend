import { graphql } from '@/gql';

export const AdminCampaignsDoc = graphql(`
  query AdminCampaigns($eventId: UUID, $starters: Boolean) {
    adminCampaigns(eventId: $eventId, starters: $starters) {
      id
      name
      subject
      eventId
      kind
      status
      isStarter
      starterKey
      scheduledAt
      startedAt
      finishedAt
      createdAt
      counts {
        queued
        sending
        sent
        failed
        suppressed
      }
    }
  }
`);

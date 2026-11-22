import { graphql } from '@/gql';

export const AdminCampaignDoc = graphql(`
  query AdminCampaign($id: UUID!) {
    adminCampaign(id: $id) {
      id
      name
      subject
      preheader
      bodyMarkdown
      buttonLabel
      buttonUrl
      eventId
      audience
      kind
      includeUnsubscribe
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

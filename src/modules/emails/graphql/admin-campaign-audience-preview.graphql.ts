import { graphql } from '@/gql';

export const AdminCampaignAudiencePreviewDoc = graphql(`
  query AdminCampaignAudiencePreview($audience: JSON!, $eventId: UUID) {
    adminCampaignAudiencePreview(audience: $audience, eventId: $eventId) {
      count
      kind
      sample {
        email
        name
        hasAccount
      }
    }
  }
`);

import { graphql } from '@/gql';

export const AdminPreviewCampaignDoc = graphql(`
  query AdminPreviewCampaign($id: UUID!, $contactEmail: String) {
    adminPreviewCampaign(id: $id, contactEmail: $contactEmail) {
      subject
      html
      recipientEmail
    }
  }
`);

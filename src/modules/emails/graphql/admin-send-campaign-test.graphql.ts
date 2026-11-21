import { graphql } from '@/gql';

export const AdminSendCampaignTestDoc = graphql(`
  mutation AdminSendCampaignTest($id: UUID!, $contactEmail: String) {
    adminSendCampaignTest(id: $id, contactEmail: $contactEmail)
  }
`);

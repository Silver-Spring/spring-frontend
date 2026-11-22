import { graphql } from '@/gql';

export const AdminDeleteCampaignDoc = graphql(`
  mutation AdminDeleteCampaign($id: UUID!) {
    adminDeleteCampaign(id: $id)
  }
`);

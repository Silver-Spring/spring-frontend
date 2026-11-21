import { graphql } from '@/gql';

export const AdminSaveCampaignDoc = graphql(`
  mutation AdminSaveCampaign($input: SaveCampaignInput!) {
    adminSaveCampaign(input: $input) {
      id
      kind
      status
    }
  }
`);

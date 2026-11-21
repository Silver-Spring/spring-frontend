import { graphql } from '@/gql';

export const AdminCampaignConditionsDoc = graphql(`
  query AdminCampaignConditions {
    adminCampaignConditions {
      key
      label
      params {
        name
        type
      }
    }
  }
`);

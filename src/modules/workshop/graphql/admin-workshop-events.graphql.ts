import { graphql } from '@/gql';

export const AdminWorkshopEventsDoc = graphql(`
  query AdminWorkshopEvents {
    adminWorkshopEvents {
      ...AdminWorkshopEventFields
    }
  }
`);

export const AdminWorkshopEventDoc = graphql(`
  query AdminWorkshopEvent($id: UUID!) {
    adminWorkshopEvent(id: $id) {
      ...AdminWorkshopEventFields
    }
  }
`);

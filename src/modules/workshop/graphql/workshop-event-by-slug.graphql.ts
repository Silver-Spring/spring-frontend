import { graphql } from '@/gql';

export const WorkshopEventBySlugDoc = graphql(`
  query WorkshopEventBySlug($slug: String!) {
    workshopEventBySlug(slug: $slug) {
      id
      slug
      title
      subtitle
      speakers {
        name
        role
      }
      startsAt
      endsAt
      status
      registrationOpen
      spotsLeft
    }
  }
`);

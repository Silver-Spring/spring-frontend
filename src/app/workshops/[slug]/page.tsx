import { WorkshopPage } from '@/modules/workshop/components/workshop-page';

type WorkshopRouteProps = {
  params: Promise<{ slug: string }>;
};

const WorkshopRoute = async ({ params }: WorkshopRouteProps) => {
  const { slug } = await params;
  return <WorkshopPage slug={slug} />;
};

export default WorkshopRoute;

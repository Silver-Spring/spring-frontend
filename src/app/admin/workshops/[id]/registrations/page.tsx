import { WorkshopRegistrationsPage } from '@/modules/workshop/components/workshop-registrations-page';

type RegistrationsRouteProps = { params: Promise<{ id: string }> };

const RegistrationsRoute = async ({ params }: RegistrationsRouteProps) => {
  const { id } = await params;
  return <WorkshopRegistrationsPage id={id} />;
};

export default RegistrationsRoute;

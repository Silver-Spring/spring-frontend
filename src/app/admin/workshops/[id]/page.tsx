import { WorkshopEditPage } from '@/modules/workshop/components/workshop-edit-page';

type EditWorkshopRouteProps = { params: Promise<{ id: string }> };

const EditWorkshopRoute = async ({ params }: EditWorkshopRouteProps) => {
  const { id } = await params;
  return <WorkshopEditPage id={id} />;
};

export default EditWorkshopRoute;

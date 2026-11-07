import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { WorkshopForm } from '@/modules/workshop/components/workshop-form';

const NewWorkshopPage = () => (
  <div className="max-w-4xl space-y-6 p-6">
    <AdminPageHeader
      title="New workshop"
      description="Each field says where it appears. New workshops start as a draft."
    />
    <WorkshopForm />
  </div>
);

export default NewWorkshopPage;

'use client';

import { Spinner } from '@/components/ui/spinner';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { useAdminWorkshopEvent } from '../hooks/use-admin-workshops';
import { WorkshopForm } from './workshop-form';

export const WorkshopEditPage = ({ id }: { id: string }) => {
  const { workshop, loading } = useAdminWorkshopEvent(id);

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!workshop) return <p className="p-6">Workshop not found.</p>;

  return (
    <div className="max-w-4xl space-y-6 p-6">
      <AdminPageHeader title="Edit workshop" description={workshop.event.title} />
      <WorkshopForm workshop={workshop} />
    </div>
  );
};

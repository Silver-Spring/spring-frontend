import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AdminPanelSkeleton = () => (
  <Card className="p-6 space-y-4">
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-4 w-full max-w-xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-64 w-full" />
  </Card>
);

const AdminPageSkeleton = () => (
  <div className="p-6 md:p-8 space-y-8">
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-4 w-full max-w-2xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
    <AdminPanelSkeleton />
  </div>
);

export { AdminPanelSkeleton, AdminPageSkeleton, AdminPanelSkeleton as AdminAssessmentPanelSkeleton };

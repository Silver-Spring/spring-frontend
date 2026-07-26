import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

type DashboardInsightsSectionProps = {
  inProgressCount: number;
  draftTypeCount: number;
  totalQuestions: number;
  activeQuestions: number;
  failedPayments?: number;
  failedWorkbookPurchases?: number;
  pendingWorkbookPurchases?: number;
  loading?: boolean;
};

const DashboardInsightsSection = ({
  inProgressCount,
  draftTypeCount,
  totalQuestions,
  activeQuestions,
  failedPayments = 0,
  failedWorkbookPurchases = 0,
  pendingWorkbookPurchases = 0,
  loading = false,
}: DashboardInsightsSectionProps) => {
  if (loading) {
    return null;
  }

  const items: string[] = [];

  if (failedPayments > 0) {
    items.push(`${failedPayments} failed assessment payment${failedPayments === 1 ? '' : 's'} — check Payments`);
  }

  if (failedWorkbookPurchases > 0) {
    items.push(`${failedWorkbookPurchases} failed workbook purchase${failedWorkbookPurchases === 1 ? '' : 's'} — check Workbooks`);
  }

  if (pendingWorkbookPurchases > 0) {
    items.push(`${pendingWorkbookPurchases} workbook order${pendingWorkbookPurchases === 1 ? '' : 's'} started but not paid`);
  }

  if (inProgressCount > 0) {
    items.push(`${inProgressCount} session${inProgressCount === 1 ? '' : 's'} in progress`);
  }

  if (draftTypeCount > 0) {
    items.push(`${draftTypeCount} draft type${draftTypeCount === 1 ? '' : 's'} not published`);
  }

  if (totalQuestions > 0 && activeQuestions < totalQuestions) {
    items.push(`${totalQuestions - activeQuestions} inactive question${totalQuestions - activeQuestions === 1 ? '' : 's'}`);
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <Alert>
      <CircleAlert className="size-4" aria-hidden="true" />
      <AlertTitle>Needs attention</AlertTitle>
      <AlertDescription>
        <ul className="mt-1.5 space-y-1 list-disc pl-4 text-sm">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

export { DashboardInsightsSection };

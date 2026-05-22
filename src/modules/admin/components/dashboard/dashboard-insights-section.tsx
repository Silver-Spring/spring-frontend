import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

type DashboardInsightsSectionProps = {
  inProgressCount: number;
  draftTypeCount: number;
  totalQuestions: number;
  activeQuestions: number;
  loading?: boolean;
};

const DashboardInsightsSection = ({
  inProgressCount,
  draftTypeCount,
  totalQuestions,
  activeQuestions,
  loading = false,
}: DashboardInsightsSectionProps) => {
  if (loading) {
    return null;
  }

  const items: string[] = [];

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

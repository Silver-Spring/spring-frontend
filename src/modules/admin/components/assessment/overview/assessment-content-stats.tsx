import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import { useAdminStats } from '@/modules/assessment/hooks';
import { AlertCircle } from 'lucide-react';

type AssessmentContentStatsProps = {
  assessmentType: AssessmentTypeCode;
};

const AssessmentContentStats = ({ assessmentType }: AssessmentContentStatsProps) => {
  const { stats, loading, error } = useAdminStats(assessmentType);

  if (loading || error || !stats) return null;

  const hasInactive = stats.inactiveQuestions > 0;
  const hasSections = stats.questionsBySectionType && stats.questionsBySectionType.length > 0;

  if (!hasSections) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Question coverage</CardTitle>
          <span className="text-sm text-muted-foreground">
            {stats.activeQuestions}/{stats.totalQuestions} active
            {hasInactive && (
              <span className="ml-2 inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                <AlertCircle className="size-3.5" aria-hidden="true" />
                {stats.inactiveQuestions} inactive
              </span>
            )}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {stats.questionsBySectionType.map(
            (section: {
              type: string;
              name: string;
              question_count: string;
              active_count: string;
            }) => {
              const total = parseInt(section.question_count, 10);
              const active = parseInt(section.active_count, 10);
              const allActive = active === total;
              return (
                <div key={section.type} className="rounded-md border p-2.5">
                  <p className="text-xs font-medium truncate">{section.name}</p>
                  <p className={`text-xs mt-1 ${allActive ? 'text-muted-foreground' : 'text-amber-600 dark:text-amber-400'}`}>
                    {active}/{total} active
                  </p>
                </div>
              );
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export { AssessmentContentStats };

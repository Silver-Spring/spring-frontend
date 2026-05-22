import { AdminKpiCard } from '@/modules/admin/components/shared/admin-kpi-card';
import { Card } from '@/components/ui/card';
import { AssessmentTypeCode } from '@/modules/assessment/constants';
import { useAdminStats } from '@/modules/assessment/hooks';
import { BarChart3, CheckCircle2, ClipboardList, FileText } from 'lucide-react';

type AssessmentContentStatsProps = {
  assessmentType: AssessmentTypeCode;
};

const AssessmentContentStats = ({ assessmentType }: AssessmentContentStatsProps) => {
  const { stats, loading, error } = useAdminStats(assessmentType);

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-sm text-destructive">Could not load stats.</p>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  const inactiveCount = stats.inactiveQuestions;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <AdminKpiCard
          label="Sections"
          value={stats.totalSections}
          insight="Scoring dimensions"
          icon={FileText}
        />
        <AdminKpiCard
          label="Questions"
          value={stats.totalQuestions}
          insight={`${stats.activeQuestions} active`}
          icon={ClipboardList}
        />
        <AdminKpiCard
          label="Active"
          value={stats.activeQuestions}
          insight="Visible to users"
          icon={CheckCircle2}
          tone="success"
        />
        <AdminKpiCard
          label="Inactive"
          value={inactiveCount}
          insight={inactiveCount > 0 ? 'Hidden from users' : 'None'}
          icon={BarChart3}
          tone={inactiveCount > 0 ? 'warning' : 'muted'}
        />
      </div>

      {stats.questionsBySectionType && stats.questionsBySectionType.length > 0 && (
        <Card className="p-5">
          <h4 className="text-sm font-medium mb-3">By section</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.questionsBySectionType.map(
              (section: {
                type: string;
                name: string;
                question_count: string;
                active_count: string;
              }) => (
                <div key={section.type} className="rounded-md border p-3">
                  <p className="text-sm font-medium">{section.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {section.active_count}/{section.question_count} active
                  </p>
                </div>
              )
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export { AssessmentContentStats };

import { Card } from '@/components/ui/card';
import { useAdminStats } from '../hooks';

export const AdminStatsCard = () => {
  const { stats, loading, error } = useAdminStats();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">Loading stats...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-destructive">Failed to load statistics</div>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">Total Sections</div>
        <div className="text-3xl font-bold mt-2">{stats.totalSections}</div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">Total Questions</div>
        <div className="text-3xl font-bold mt-2">{stats.totalQuestions}</div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">Active Questions</div>
        <div className="text-3xl font-bold mt-2 text-green-600">{stats.activeQuestions}</div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-medium text-muted-foreground">Inactive Questions</div>
        <div className="text-3xl font-bold mt-2 text-orange-600">{stats.inactiveQuestions}</div>
      </Card>

      {stats.questionsBySectionType && stats.questionsBySectionType.length > 0 && (
        <Card className="p-6 md:col-span-2 lg:col-span-4">
          <div className="text-sm font-medium text-muted-foreground mb-4">Questions by Section</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.questionsBySectionType.map(
              (section: {
                type: string;
                name: string;
                question_count: string;
                active_count: string;
              }) => (
                <div key={section.type} className="flex flex-col space-y-1">
                  <div className="text-sm font-medium">{section.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {section.active_count} / {section.question_count} active
                  </div>
                </div>
              )
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

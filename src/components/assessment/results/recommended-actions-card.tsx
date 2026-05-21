'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks } from 'lucide-react';

interface RecommendedActionsCardProps {
  actions: Array<string | null | undefined>;
}

export const RecommendedActionsCard = ({ actions }: RecommendedActionsCardProps) => {
  const filteredActions = actions.filter(
    (action): action is string => typeof action === 'string' && action.trim().length > 0
  );

  if (filteredActions.length === 0) return null;

  return (
    <Card className="bg-linear-to-br from-primary/8 via-primary/5 to-background border-primary/20 shadow-none mt-6">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ListChecks className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-green-900 dark:text-green-100">
              Recommended Actions
            </CardTitle>
            <CardDescription className="text-green-800/70 dark:text-green-200/70">
              Top suggestions from your lowest-scoring dimensions (from section bands at completion)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="space-y-3 list-decimal list-inside">
          {filteredActions.map((action, index) => (
            <li key={index} className="text-sm text-foreground leading-relaxed pl-1">
              {action}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

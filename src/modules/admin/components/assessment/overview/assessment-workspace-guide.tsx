import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildAssessmentHref } from '@/modules/admin/hooks';
import { WORKSPACE_TAB_GUIDE } from '@/modules/admin/lib/assessment-workspace-copy';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type AssessmentWorkspaceGuideProps = {
  assessmentType: string;
};

const AssessmentWorkspaceGuide = ({ assessmentType }: AssessmentWorkspaceGuideProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base">Setup order</CardTitle>
    </CardHeader>
    <CardContent>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {WORKSPACE_TAB_GUIDE.map((tab, index) => {
          const Icon = tab.icon;

          return (
            <li key={tab.view}>
              <Link
                href={buildAssessmentHref(tab.view, assessmentType)}
                className="group flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 hover:border-primary/30"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {index + 1}
                </span>
                <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="min-w-0 flex-1 text-sm font-medium">{tab.label}</span>
                <ArrowRight
                  className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ol>
    </CardContent>
  </Card>
);

export { AssessmentWorkspaceGuide };

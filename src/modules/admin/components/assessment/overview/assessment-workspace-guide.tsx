import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildAssessmentHref } from '@/modules/admin/hooks';
import { WORKSPACE_TAB_GUIDE } from '@/modules/admin/lib/assessment-workspace-copy';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const STEP_HINTS: Record<string, string> = {
  content: 'Add sections and questions',
  scoring: 'Define score bands and narratives',
  reports: 'Write the PDF cover and about text',
  settings: 'Set name, price, and structure',
};

type AssessmentWorkspaceGuideProps = {
  assessmentType: string;
};

const AssessmentWorkspaceGuide = ({ assessmentType }: AssessmentWorkspaceGuideProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Setup checklist
      </CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ol className="divide-y">
        {WORKSPACE_TAB_GUIDE.map((tab, index) => {
          const Icon = tab.icon;
          const hint = STEP_HINTS[tab.view] ?? tab.label;

          return (
            <li key={tab.view}>
              <Link
                href={buildAssessmentHref(tab.view, assessmentType)}
                className="group flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-muted/40"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {index + 1}
                </span>
                <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-none">{tab.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
                </div>
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

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { ArrowRight, BarChart3, ClipboardList, FileText, Layers } from 'lucide-react';
import Link from 'next/link';

type DashboardContentHealthProps = {
  liveTypeCount: number;
  draftTypeCount: number;
  totalSections: number;
  totalQuestions: number;
  activeQuestions: number;
  totalInterpretationBands: number;
  loading?: boolean;
};

const DashboardContentHealth = ({
  liveTypeCount,
  draftTypeCount,
  totalSections,
  totalQuestions,
  activeQuestions,
  totalInterpretationBands,
  loading = false,
}: DashboardContentHealthProps) => {
  const rows = [
    {
      label: 'Assessment types',
      value: `${liveTypeCount} live${draftTypeCount > 0 ? ` · ${draftTypeCount} draft` : ''}`,
      icon: Layers,
    },
    {
      label: 'Sections',
      value: `${totalSections} across all types`,
      icon: FileText,
    },
    {
      label: 'Questions',
      value: `${activeQuestions} active of ${totalQuestions}`,
      icon: ClipboardList,
    },
    {
      label: 'Score bands',
      value: `${totalInterpretationBands} defined`,
      icon: BarChart3,
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle className="text-base">Content health</CardTitle>
            <CardDescription>Assessment types, questions and scoring</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild aria-label="Manage assessment content">
            <Link href="/admin/assessment?view=catalog">
              Manage
              <ArrowRight className="ml-1 size-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <Spinner className="size-6" />
          </div>
        ) : (
          <ul className="space-y-3">
            {rows.map((row) => (
              <li key={row.label} className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <row.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="text-xs text-muted-foreground">{row.value}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export { DashboardContentHealth };

'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { formatPriceFromPaise } from '@/modules/assessment/constants';
import { buildAssessmentHref, useAdminAssessmentTypes } from '@/modules/admin/hooks';
import Link from 'next/link';
import { AdminStatsCard } from './admin-stats-card';
import { AssessmentTypeReadinessPanel } from './assessment-type-readiness-panel';

type AssessmentTypeOverviewProps = {
  assessmentType: string;
};

export const AssessmentTypeOverview = ({ assessmentType }: AssessmentTypeOverviewProps) => {
  const { assessmentTypes, loading } = useAdminAssessmentTypes();
  const type = assessmentTypes.find((t) => t.code === assessmentType);

  if (loading && !type) {
    return (
      <Card className="p-8">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Spinner className="size-4" />
          Loading overview...
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {type && (
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-semibold">{type.name}</h2>
                <Badge variant="outline">{type.code.toUpperCase()}</Badge>
                <Badge variant={type.isActive ? 'default' : 'secondary'}>
                  {type.isActive ? 'Live' : 'Draft'}
                </Badge>
              </div>
              {type.description && (
                <p className="text-sm text-muted-foreground mt-2">{type.description}</p>
              )}
              {!type.isActive && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={buildAssessmentHref('content', assessmentType)}>
                      Manage questions
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={buildAssessmentHref('scoring', assessmentType)}>
                      Edit interpretation
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-medium">{formatPriceFromPaise(type.priceAmount)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Questions</dt>
                <dd className="font-medium">{type.totalQuestions}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Sections</dt>
                <dd className="font-medium">{type.sectionCount}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Score range</dt>
                <dd className="font-medium">
                  {type.minScore}–{type.maxScore} ({type.scoringFormula})
                </dd>
              </div>
            </dl>
          </div>
        </Card>
      )}

      <AssessmentTypeReadinessPanel assessmentType={assessmentType} />

      <AdminStatsCard assessmentType={assessmentType} showTypeLabel={false} />
    </div>
  );
};

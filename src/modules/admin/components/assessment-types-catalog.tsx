'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { formatPriceFromPaise } from '@/modules/assessment/constants';
import { buildAssessmentHref, useAdminAssessmentTypes } from '@/modules/admin/hooks';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { AssessmentTypeReadinessSummary } from './assessment-type-readiness-panel';

export const AssessmentTypesCatalog = () => {
  const { assessmentTypes, loading } = useAdminAssessmentTypes();

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Spinner className="size-4" />
          Loading assessment types...
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground mt-1">
            Manage assessment products. Draft types are hidden from users until published.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/assessment/create">
            <Plus className="size-4 mr-2" />
            Create Type
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assessmentTypes.length === 0 ? (
          <Card className="p-8 md:col-span-2">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                No assessment types yet. Create your first draft type to get started.
              </p>
              <Button asChild>
                <Link href="/admin/assessment/create">
                  <Plus className="size-4 mr-2" />
                  Create Type
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          assessmentTypes.map((type) => (
            <Card key={type.code} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{type.name}</h3>
                  <Badge variant="outline">{type.code.toUpperCase()}</Badge>
                </div>
                {type.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {type.description}
                  </p>
                )}
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <div>
                    <dt className="inline">Price: </dt>
                    <dd className="inline font-medium text-foreground">
                      {formatPriceFromPaise(type.priceAmount)}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Questions: </dt>
                    <dd className="inline font-medium text-foreground">{type.totalQuestions}</dd>
                  </div>
                  <div>
                    <dt className="inline">Structure: </dt>
                    <dd className="inline font-medium text-foreground">
                      {type.sectionCount}×{type.questionsPerSection}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Score: </dt>
                    <dd className="inline font-medium text-foreground">
                      {type.minScore}–{type.maxScore}
                    </dd>
                  </div>
                </dl>
                <AssessmentTypeReadinessSummary
                  assessmentType={type.code}
                  isActive={type.isActive}
                />
              </div>
              <Badge variant={type.isActive ? 'default' : 'secondary'} className="shrink-0">
                {type.isActive ? 'Live' : 'Draft'}
              </Badge>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" size="sm" asChild>
                <Link href={buildAssessmentHref('overview', type.code)}>
                  {type.isActive ? 'Manage' : 'Configure & publish'}
                </Link>
              </Button>
            </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

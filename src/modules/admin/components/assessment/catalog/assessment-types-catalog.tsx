'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import { AssessmentCatalogSummary } from './assessment-catalog-summary';
import { AssessmentTypeCard } from './assessment-type-card';

const AssessmentTypesCatalog = () => {
  const { assessmentTypes, loading } = useAdminAssessmentTypes();

  const sortedTypes = useMemo(
    () =>
      [...assessmentTypes].sort((a, b) => {
        if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
        return a.name.localeCompare(b.name);
      }),
    [assessmentTypes]
  );

  const liveCount = sortedTypes.filter((type) => type.isActive).length;
  const draftCount = sortedTypes.length - liveCount;

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
      <div className="flex flex-wrap items-center justify-end gap-4">
        <Button asChild>
          <Link href="/admin/assessment/create">
            <Plus className="size-4 mr-2" aria-hidden="true" />
            Create type
          </Link>
        </Button>
      </div>

      <AssessmentCatalogSummary
        totalCount={sortedTypes.length}
        liveCount={liveCount}
        draftCount={draftCount}
      />

      {sortedTypes.length === 0 ? (
        <Card className="p-10 text-center space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">No types yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Create a draft, then publish from Overview when ready.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/assessment/create">
              <Plus className="size-4 mr-2" aria-hidden="true" />
              Create first type
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sortedTypes.map((type) => (
            <AssessmentTypeCard
              key={type.code}
              code={type.code}
              name={type.name}
              description={type.description}
              priceAmount={type.priceAmount}
              totalQuestions={type.totalQuestions}
              sectionCount={type.sectionCount}
              questionsPerSection={type.questionsPerSection}
              minScore={type.minScore}
              maxScore={type.maxScore}
              isActive={type.isActive}
              isDyadic={type.isDyadic}
              responseScaleMin={type.responseScaleMin}
              responseScaleMax={type.responseScaleMax}
              profileQuestionsCount={type.profileQuestionsCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { AssessmentTypesCatalog };

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPriceFromPaise } from '@/modules/assessment/constants';
import { buildAssessmentHref } from '@/modules/admin/hooks';
import Link from 'next/link';
import { Users } from 'lucide-react';

type AssessmentTypeStatusStripProps = {
  code: string;
  priceAmount: number;
  totalQuestions: number;
  sectionCount: number;
  minScore: number;
  maxScore: number;
  isActive: boolean;
  isDyadic?: boolean;
  responseScaleMin?: number;
  responseScaleMax?: number;
  profileQuestionsCount?: number;
};

const AssessmentTypeStatusStrip = ({
  code,
  priceAmount,
  totalQuestions,
  sectionCount,
  minScore,
  maxScore,
  isActive,
  isDyadic = false,
  responseScaleMin = 1,
  responseScaleMax = 10,
  profileQuestionsCount = 0,
}: AssessmentTypeStatusStripProps) => {
  const hasCustomScale = responseScaleMin !== 1 || responseScaleMax !== 10;

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">{code.toUpperCase()}</Badge>
            <Badge variant={isActive ? 'default' : 'secondary'}>{isActive ? 'Live' : 'Draft'}</Badge>
            {isDyadic && (
              <Badge variant="secondary" className="gap-1">
                <Users className="size-3" aria-hidden="true" />
                Couples
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{formatPriceFromPaise(priceAmount)}</span>
            <span aria-hidden="true">·</span>
            <span>
              {sectionCount} sections
              {profileQuestionsCount > 0 && (
                <> · <span className="text-blue-600 dark:text-blue-400">{profileQuestionsCount} profile</span></>
              )}
            </span>
            <span aria-hidden="true">·</span>
            <span>{totalQuestions} questions</span>
            <span aria-hidden="true">·</span>
            <span>score {minScore}–{maxScore}</span>
            {hasCustomScale && (
              <>
                <span aria-hidden="true">·</span>
                <span>scale {responseScaleMin}–{responseScaleMax}</span>
              </>
            )}
          </div>
        </div>

        {!isActive && (
          <div className="flex flex-wrap gap-2 shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link href={buildAssessmentHref('content', code)}>Sections & questions</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={buildAssessmentHref('scoring', code)}>Score bands</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { AssessmentTypeStatusStrip };

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPriceFromPaise } from '@/modules/assessment/constants';
import { buildAssessmentHref } from '@/modules/admin/hooks';
import Link from 'next/link';

type AssessmentTypeStatusStripProps = {
  code: string;
  priceAmount: number;
  totalQuestions: number;
  sectionCount: number;
  minScore: number;
  maxScore: number;
  isActive: boolean;
};

const AssessmentTypeStatusStrip = ({
  code,
  priceAmount,
  totalQuestions,
  sectionCount,
  minScore,
  maxScore,
  isActive,
}: AssessmentTypeStatusStripProps) => (
  <Card>
    <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{code.toUpperCase()}</Badge>
        <Badge variant={isActive ? 'default' : 'secondary'}>{isActive ? 'Live' : 'Draft'}</Badge>
        <span className="text-sm text-muted-foreground">
          {formatPriceFromPaise(priceAmount)} · {sectionCount} sections · {totalQuestions} questions
          · {minScore}–{maxScore}
        </span>
      </div>
      {!isActive && (
        <div className="flex flex-wrap gap-2">
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

export { AssessmentTypeStatusStrip };

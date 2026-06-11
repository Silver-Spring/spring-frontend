import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatPriceFromPaise } from '@/modules/assessment/constants';
import { buildAssessmentHref } from '@/modules/admin/hooks';
import Link from 'next/link';
import { AssessmentTypeReadinessSummary } from '../../assessment-type-readiness-panel';

type AssessmentTypeCardProps = {
  code: string;
  name: string;
  description?: string | null;
  priceAmount: number;
  totalQuestions: number;
  sectionCount: number;
  questionsPerSection: number;
  minScore: number;
  maxScore: number;
  isActive: boolean;
  isDyadic?: boolean;
  responseScaleMin?: number;
  responseScaleMax?: number;
  profileQuestionsCount?: number;
};

const AssessmentTypeCard = ({
  code,
  name,
  description,
  priceAmount,
  totalQuestions,
  sectionCount,
  questionsPerSection,
  minScore,
  maxScore,
  isActive,
  isDyadic = false,
  responseScaleMin = 1,
  responseScaleMax = 10,
  profileQuestionsCount = 0,
}: AssessmentTypeCardProps) => (
  <Card className="flex flex-col h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold leading-tight">{name}</h3>
            <Badge variant="outline">{code.toUpperCase()}</Badge>
            {isDyadic && (
              <Badge variant="secondary" className="text-[10px]">Couples</Badge>
            )}
          </div>
          {description ? (
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          ) : null}
        </div>
        <Badge variant={isActive ? 'default' : 'secondary'} className="shrink-0">
          {isActive ? 'Live' : 'Draft'}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="flex-1 space-y-3">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="text-muted-foreground text-xs">Price</dt>
          <dd className="font-medium">{formatPriceFromPaise(priceAmount)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Questions</dt>
          <dd className="font-medium">{totalQuestions}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Structure</dt>
          <dd className="font-medium">
            {sectionCount} sections × {questionsPerSection} each
            {profileQuestionsCount > 0 && (
              <span className="text-muted-foreground font-normal"> + {profileQuestionsCount} profile</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-xs">Score range</dt>
          <dd className="font-medium">
            {minScore}–{maxScore}
          </dd>
        </div>
        {(responseScaleMin !== 1 || responseScaleMax !== 10) && (
          <div>
            <dt className="text-muted-foreground text-xs">Answer scale</dt>
            <dd className="font-medium">{responseScaleMin}–{responseScaleMax}</dd>
          </div>
        )}
      </dl>
      <AssessmentTypeReadinessSummary assessmentType={code} isActive={isActive} />
    </CardContent>
    <CardFooter className="border-t pt-4">
      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
        <Link href={buildAssessmentHref('overview', code)}>
          {isActive ? 'Open' : 'Set up'}
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export { AssessmentTypeCard };

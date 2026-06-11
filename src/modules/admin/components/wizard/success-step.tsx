'use client';

import { Button } from '@/components/ui/button';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { buildAssessmentHref } from '@/modules/admin/hooks';
import { CheckCircle2, ClipboardList, Layers, ListChecks } from 'lucide-react';
import Link from 'next/link';

export type CreatedAssessmentType = {
  code: string;
  name: string;
  sectionCount: number;
  questionsPerSection: number;
  totalQuestions: number;
  clonedFrom: string | null;
  seededSections: boolean;
  isDyadic: boolean;
};

type SuccessStepProps = {
  created: CreatedAssessmentType;
  onNavigateContent: () => void;
  onNavigateOverview: () => void;
  onNavigateScoring: () => void;
};

export const SuccessStep = ({
  created,
  onNavigateContent,
  onNavigateOverview,
  onNavigateScoring,
}: SuccessStepProps) => {
  const totalQuestions =
    Number.isFinite(created.totalQuestions) && created.totalQuestions > 0
      ? created.totalQuestions
      : created.sectionCount * created.questionsPerSection;

  const sectionBandCount = created.sectionCount * 5;
  const totalBandCount = sectionBandCount + 5;

  return (
    <div className="space-y-6">
      <Item variant="outline" className="border-primary/30 bg-primary/5">
        <ItemMedia>
          <CheckCircle2 className="size-6 text-primary" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-base font-semibold">
            Draft created: {created.name}
            {created.isDyadic && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">· Couples</span>
            )}
          </ItemTitle>
          <ItemDescription className="line-clamp-none">
            Code{' '}
            <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{created.code}</span>{' '}
            is inactive and hidden from users until you publish.
            {created.isDyadic && (
              <>
                {' '}
                Use <code className="text-xs">startCoupleAssessment</code> to begin a session.
              </>
            )}
          </ItemDescription>
        </ItemContent>
      </Item>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          What was set up
        </h4>
        <ItemGroup className="gap-2">
          {created.seededSections && (
            <Item variant="outline" size="sm">
              <ItemContent>
                <ItemDescription className="line-clamp-none">
                  {created.sectionCount} dimension section{created.sectionCount !== 1 ? 's' : ''}{' '}
                  created
                </ItemDescription>
              </ItemContent>
            </Item>
          )}
          <Item variant="outline" size="sm">
            <ItemContent>
              <ItemDescription className="line-clamp-none">
                {created.clonedFrom ? (
                  <>
                    {totalBandCount} interpretation bands ({sectionBandCount} section + 5 overall)
                    cloned from <strong>{created.clonedFrom.toUpperCase()}</strong>
                  </>
                ) : (
                  'No interpretation bands cloned — add these manually in Score bands'
                )}
              </ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          What to do next
        </h4>
        <ItemGroup className="gap-2">
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <ListChecks className="text-primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Add questions</ItemTitle>
              <ItemDescription className="line-clamp-none">
                Add {totalQuestions} active questions ({created.questionsPerSection} per section).
                Required before publishing.
              </ItemDescription>
            </ItemContent>
          </Item>
          {!created.clonedFrom && (
            <Item variant="outline" size="sm">
              <ItemMedia variant="icon">
                <Layers className="text-primary" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Set up score bands</ItemTitle>
                <ItemDescription className="line-clamp-none">
                  Define score ranges and interpretation narratives for each stage.
                </ItemDescription>
              </ItemContent>
            </Item>
          )}
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <ClipboardList className="text-primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Review readiness &amp; publish</ItemTitle>
              <ItemDescription className="line-clamp-none">
                Overview shows a publish checklist. Go live once all checks pass.
              </ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button onClick={onNavigateContent}>Add questions</Button>
        {!created.clonedFrom && (
          <Button variant="outline" onClick={onNavigateScoring}>
            Set up score bands
          </Button>
        )}
        <Button variant="outline" onClick={onNavigateOverview}>
          View overview
        </Button>
        <Button variant="ghost" asChild>
          <Link href={buildAssessmentHref('catalog')}>Back to catalog</Link>
        </Button>
      </div>
    </div>
  );
};

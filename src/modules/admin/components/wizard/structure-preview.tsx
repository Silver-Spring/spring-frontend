'use client';

import { computeScoreBounds } from '@/modules/assessment/lib/section-display';
import { type CreateAssessmentTypeWizardValues } from '@/modules/admin/schema';
import { useFormContext, useWatch } from 'react-hook-form';

export const StructurePreview = () => {
  const form = useFormContext<CreateAssessmentTypeWizardValues>();
  const sectionCount = useWatch({ control: form.control, name: 'sectionCount' }) ?? 0;
  const questionsPerSection = useWatch({ control: form.control, name: 'questionsPerSection' }) ?? 0;
  const scoringFormula = useWatch({ control: form.control, name: 'scoringFormula' }) ?? 'sum';
  const scaleMin = useWatch({ control: form.control, name: 'responseScaleMin' }) ?? 1;
  const scaleMax = useWatch({ control: form.control, name: 'responseScaleMax' }) ?? 10;
  const profileCount = useWatch({ control: form.control, name: 'profileQuestionsCount' }) ?? 0;
  const isDyadic = useWatch({ control: form.control, name: 'isDyadic' }) ?? false;

  const total = sectionCount * questionsPerSection;
  const { minScore, maxScore } = computeScoreBounds(sectionCount, scoringFormula);
  const isDefaultScale = scaleMin === 1 && scaleMax === 10;

  if (!sectionCount || !questionsPerSection) return null;

  return (
    <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm space-y-1">
      <p className="font-medium text-foreground">Assessment preview</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground text-xs mt-1">
        <span>
          {sectionCount} section{sectionCount !== 1 ? 's' : ''} × {questionsPerSection} questions ={' '}
          <strong className="text-foreground">{total} scored</strong>
        </span>
        {profileCount > 0 && <span>+ {profileCount} profile questions</span>}
        {isDyadic ? (
          <span className="text-primary font-medium">
            Dyadic scoring — domain averages + couple total
          </span>
        ) : (
          <span>
            Score range{' '}
            <strong className="text-foreground">
              {minScore}–{maxScore}
            </strong>
          </span>
        )}
        {!isDefaultScale && (
          <span>
            Answer scale{' '}
            <strong className="text-foreground">
              {scaleMin}–{scaleMax}
            </strong>
          </span>
        )}
      </div>
    </div>
  );
};

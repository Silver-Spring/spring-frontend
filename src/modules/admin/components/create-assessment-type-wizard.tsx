'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { DEFAULT_ASSESSMENT_TYPE } from '@/modules/assessment/constants';
import {
  buildAssessmentHref,
  useAdminAssessmentTypes,
  useCreateAssessmentType,
} from '@/modules/admin/hooks';
import {
  CREATE_ASSESSMENT_TYPE_BASICS_FIELDS,
  CREATE_ASSESSMENT_TYPE_CLONE_FIELDS,
  CREATE_ASSESSMENT_TYPE_WIZARD_DEFAULTS,
  SKIP_CLONE_TEMPLATE_VALUE,
  createAssessmentTypeWizardSchema,
  type CreateAssessmentTypeWizardValues,
} from '@/modules/admin/schema';
import { BasicsStepFields } from '@/modules/admin/components/wizard/basics-step-fields';
import { CloneStepFields } from '@/modules/admin/components/wizard/clone-step-fields';
import { SuccessStep, type CreatedAssessmentType } from '@/modules/admin/components/wizard/success-step';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const WIZARD_STEPS = [
  { id: 'basics', label: 'Basics', description: 'Identity, pricing, and structure' },
  { id: 'clone', label: 'Template', description: 'Sections and content seeding' },
  { id: 'success', label: 'Done', description: 'Configure your draft' },
] as const;

const StepIndicator = ({ currentStepIndex }: { currentStepIndex: number }) => (
  <ol className="flex gap-2 sm:gap-4 mb-8">
    {WIZARD_STEPS.map((step, index) => {
      const isComplete = index < currentStepIndex;
      const isCurrent = index === currentStepIndex;

      return (
        <li key={step.id} className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className={`shrink-0 ${isComplete || isCurrent ? 'text-primary' : 'text-muted-foreground'}`}
            aria-hidden
          >
            {isComplete ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className={`size-5 ${isCurrent ? 'fill-primary/15' : ''}`} />
            )}
          </div>
          <div className="min-w-0 hidden sm:block">
            <p
              className={`text-sm font-medium leading-none ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {step.label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{step.description}</p>
          </div>
          {index < WIZARD_STEPS.length - 1 && (
            <div className="flex-1 h-px bg-border mx-1 hidden sm:block" aria-hidden />
          )}
        </li>
      );
    })}
  </ol>
);

export const CreateAssessmentTypeWizard = () => {
  const router = useRouter();
  const { assessmentTypes, loading: typesLoading } = useAdminAssessmentTypes();
  const { createAssessmentType, loading: creating } = useCreateAssessmentType();

  const [stepIndex, setStepIndex] = useState(0);
  const [createdType, setCreatedType] = useState<CreatedAssessmentType | null>(null);

  const form = useForm<CreateAssessmentTypeWizardValues>({
    resolver: zodResolver(createAssessmentTypeWizardSchema),
    defaultValues: CREATE_ASSESSMENT_TYPE_WIZARD_DEFAULTS,
    mode: 'onBlur',
  });

  const watchedCode = form.watch('code')?.toLowerCase().trim();

  const existingCodes = useMemo(
    () => new Set(assessmentTypes.map((type) => type.code)),
    [assessmentTypes]
  );

  const templateOptions = useMemo(
    () => assessmentTypes.filter((type) => type.code !== watchedCode),
    [assessmentTypes, watchedCode]
  );

  const currentStep = WIZARD_STEPS[stepIndex];
  const progressValue = ((stepIndex + 1) / WIZARD_STEPS.length) * 100;

  const handleNextFromBasics = async () => {
    const valid = await form.trigger([...CREATE_ASSESSMENT_TYPE_BASICS_FIELDS]);
    if (!valid) return;
    const code = form.getValues('code')?.toLowerCase().trim();
    if (code && existingCodes.has(code)) return;
    setStepIndex(1);
  };

  const handleBack = () => {
    if (stepIndex > 0 && stepIndex < 2) setStepIndex((prev) => prev - 1);
  };

  const handleCreate = async () => {
    const valid = await form.trigger([...CREATE_ASSESSMENT_TYPE_CLONE_FIELDS]);
    if (!valid) return;

    const values = form.getValues();
    const cloneFromTemplate =
      values.cloneFromTemplate === SKIP_CLONE_TEMPLATE_VALUE
        ? null
        : values.cloneFromTemplate || DEFAULT_ASSESSMENT_TYPE;

    const seedSections = values.sectionCount > 5 ? false : values.seedSections;

    const result = await createAssessmentType({
      code: values.code.trim().toLowerCase(),
      name: values.name,
      description: values.description?.trim() || undefined,
      priceAmount: Math.round(values.priceAmount * 100),
      sectionCount: values.sectionCount,
      questionsPerSection: values.questionsPerSection,
      scoringFormula: values.scoringFormula,
      seedSections,
      cloneFromTemplate,
      isDyadic: values.isDyadic,
      responseScaleMin: values.responseScaleMin,
      responseScaleMax: values.responseScaleMax,
      profileQuestionsCount: values.profileQuestionsCount,
    });

    if (!result?.success || !result.assessmentType) return;

    setCreatedType({
      code: result.assessmentType.code,
      name: result.assessmentType.name,
      sectionCount: values.sectionCount,
      questionsPerSection: values.questionsPerSection,
      totalQuestions:
        result.assessmentType.totalQuestions ?? values.sectionCount * values.questionsPerSection,
      clonedFrom: cloneFromTemplate,
      seededSections: seedSections,
      isDyadic: values.isDyadic,
    });
    setStepIndex(2);
  };

  const handleNavigateContent = () =>
    createdType && router.push(buildAssessmentHref('content', createdType.code));
  const handleNavigateScoring = () =>
    createdType && router.push(buildAssessmentHref('scoring', createdType.code));
  const handleNavigateOverview = () =>
    createdType && router.push(buildAssessmentHref('overview', createdType.code));

  if (typesLoading && assessmentTypes.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
          <Link href={buildAssessmentHref('catalog')}>
            <ArrowLeft className="size-4 mr-2" />
            Back to catalog
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">New assessment type</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Starts as a draft — invisible to users until you publish.
        </p>
      </div>

      <Progress value={progressValue} className="mb-6 h-1.5" aria-label="Wizard progress" />
      <StepIndicator currentStepIndex={stepIndex} />

      {currentStep.id === 'success' && createdType ? (
        <SuccessStep
          created={createdType}
          onNavigateContent={handleNavigateContent}
          onNavigateOverview={handleNavigateOverview}
          onNavigateScoring={handleNavigateScoring}
        />
      ) : (
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (stepIndex === 0) { handleNextFromBasics(); return; }
              if (stepIndex === 1) { handleCreate(); }
            }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  {stepIndex === 0 ? 'Basics' : 'Template & seeding'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                {stepIndex === 0 && <BasicsStepFields existingCodes={existingCodes} />}
                {stepIndex === 1 && <CloneStepFields templateOptions={templateOptions} />}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={stepIndex === 0 || creating}
              >
                <ArrowLeft className="size-4 mr-2" />
                Back
              </Button>
              {stepIndex === 0 ? (
                <Button type="submit">
                  Continue
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={creating}>
                  {creating ? (
                    <>
                      <Spinner className="size-4 mr-2" />
                      Creating…
                    </>
                  ) : (
                    'Create draft'
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

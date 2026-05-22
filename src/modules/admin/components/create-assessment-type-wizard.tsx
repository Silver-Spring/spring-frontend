'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_ASSESSMENT_TYPE, formatPriceFromPaise } from '@/modules/assessment/constants';
import { computeScoreBounds } from '@/modules/assessment/lib/section-display';
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
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ClipboardList,
  Layers,
  ListChecks,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useFormContext, useWatch } from 'react-hook-form';

const WIZARD_STEPS = [
  { id: 'basics', label: 'Basics', description: 'Identity, pricing, and scoring' },
  { id: 'clone', label: 'Template', description: 'Sections and content cloning' },
  { id: 'success', label: 'Next steps', description: 'Configure your draft' },
] as const;

type CreatedAssessmentType = {
  code: string;
  name: string;
  sectionCount: number;
  questionsPerSection: number;
  totalQuestions: number;
  clonedFrom: string | null;
  seededSections: boolean;
};

const WIZARD_FORM_ROW_CLASS = 'grid grid-cols-1 md:grid-cols-2 gap-4';
const WIZARD_FIELD_LABEL_CLASS = 'min-h-10 flex items-end leading-snug';
const WIZARD_FIELD_FOOTER_CLASS = 'min-h-10 space-y-1';

const StepIndicator = ({ currentStepIndex }: { currentStepIndex: number }) => (
  <ol className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
    {WIZARD_STEPS.map((step, index) => {
      const isComplete = index < currentStepIndex;
      const isCurrent = index === currentStepIndex;

      return (
        <li key={step.id} className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={
              isComplete ? 'text-primary' : isCurrent ? 'text-primary' : 'text-muted-foreground'
            }
            aria-hidden
          >
            {isComplete ? (
              <CheckCircle2 className="size-5 shrink-0" />
            ) : (
              <Circle className={`size-5 shrink-0 ${isCurrent ? 'fill-primary/15' : ''}`} />
            )}
          </div>
          <div className="min-w-0">
            <p
              className={`text-sm font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {step.label}
            </p>
            <p className="text-xs text-muted-foreground truncate">{step.description}</p>
          </div>
        </li>
      );
    })}
  </ol>
);

const BasicsStepFields = ({ existingCodes }: { existingCodes: Set<string> }) => {
  const form = useFormContext<CreateAssessmentTypeWizardValues>();
  const sectionCount = useWatch({ control: form.control, name: 'sectionCount' }) ?? 0;
  const questionsPerSection = useWatch({ control: form.control, name: 'questionsPerSection' }) ?? 0;
  const scoringFormula = useWatch({ control: form.control, name: 'scoringFormula' }) ?? 'sum';
  const watchedCode = useWatch({ control: form.control, name: 'code' })?.toLowerCase().trim();
  const codeCollision = Boolean(watchedCode && existingCodes.has(watchedCode));
  const previewTotalQuestions = sectionCount * questionsPerSection;
  const scoreBounds = computeScoreBounds(sectionCount, scoringFormula);

  return (
  <div className="space-y-6">
    <div className={WIZARD_FORM_ROW_CLASS}>
      <FormField
        name="code"
        render={({ field }) => (
          <FormItem className="gap-2">
            <FormLabel className={WIZARD_FIELD_LABEL_CLASS}>Code</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g. prai"
                autoComplete="off"
                aria-label="Assessment type code"
              />
            </FormControl>
            <div className={WIZARD_FIELD_FOOTER_CLASS}>
              <FormDescription>
                Lowercase slug. Immutable after creation (letters, numbers, -, _).
              </FormDescription>
              {codeCollision && (
                <p className="text-sm text-destructive" role="alert">
                  This code is already in use. Choose a different code.
                </p>
              )}
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        name="name"
        render={({ field }) => (
          <FormItem className="gap-2">
            <FormLabel className={WIZARD_FIELD_LABEL_CLASS}>Display name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g. PRAI Assessment" aria-label="Display name" />
            </FormControl>
            <div className={WIZARD_FIELD_FOOTER_CLASS}>
              <FormDescription>This is the name that will be displayed to users.</FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>

    <FormField
      name="description"
      render={({ field }) => (
        <FormItem className="gap-2">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={field.value ?? ''}
              placeholder="Optional short description for admins"
              aria-label="Description"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <div className={WIZARD_FORM_ROW_CLASS}>
      <FormField
        name="priceAmount"
        render={({ field }) => (
          <FormItem className="gap-2">
            <FormLabel className={WIZARD_FIELD_LABEL_CLASS}>Price (paise)</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min={1}
                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                aria-label="Price in paise"
              />
            </FormControl>
            <div className={WIZARD_FIELD_FOOTER_CLASS}>
              <FormDescription>250000 paise = {formatPriceFromPaise(250000)}</FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        name="displayOrder"
        render={({ field }) => (
          <FormItem className="gap-2">
            <FormLabel className={WIZARD_FIELD_LABEL_CLASS}>Display order</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min={0}
                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                aria-label="Display order"
              />
            </FormControl>
            <div className={WIZARD_FIELD_FOOTER_CLASS}>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>

    <div className={WIZARD_FORM_ROW_CLASS}>
      <FormField
        name="sectionCount"
        render={({ field }) => (
          <FormItem className="gap-2">
            <FormLabel className={WIZARD_FIELD_LABEL_CLASS}>Sections</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min={1}
                max={10}
                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                aria-label="Section count"
              />
            </FormControl>
            <div className={WIZARD_FIELD_FOOTER_CLASS}>
              <FormDescription>
                Target active sections (1–10). Preset seed covers the first 5 only; use manual adds
                for 6–10.
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        name="questionsPerSection"
        render={({ field }) => (
          <FormItem className="gap-2">
            <FormLabel className={WIZARD_FIELD_LABEL_CLASS}>Questions per section</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min={1}
                onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                aria-label="Questions per section"
              />
            </FormControl>
            <div className={WIZARD_FIELD_FOOTER_CLASS}>
              <FormDescription>
                Users need this many active questions per section to publish
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>

    <div className={WIZARD_FORM_ROW_CLASS}>
      <FormField
        name="scoringFormula"
        render={({ field }) => (
          <FormItem className="gap-2">
            <FormLabel className={WIZARD_FIELD_LABEL_CLASS}>Scoring formula</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger aria-label="Scoring formula">
                  <SelectValue placeholder="Select formula" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="sum">sum</SelectItem>
                <SelectItem value="average">average</SelectItem>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className="rounded-md border bg-muted/30 px-3 py-3 text-sm">
        <p className="font-medium">Computed score bounds</p>
        <p className="text-muted-foreground mt-1">
          {scoreBounds.minScore}–{scoreBounds.maxScore} overall ({scoringFormula} formula)
        </p>
      </div>
    </div>

    {previewTotalQuestions > 0 && (
      <p className="text-sm text-muted-foreground rounded-md border bg-muted/30 px-3 py-2">
        Preview: {previewTotalQuestions} total questions ({sectionCount} section
        {sectionCount === 1 ? '' : 's'} × {questionsPerSection} each) — required for publish.
      </p>
    )}
  </div>
  );
};

const CloneStepFields = ({
  templateOptions,
}: {
  templateOptions: { code: string; name: string; isActive: boolean }[];
}) => {
  const form = useFormContext<CreateAssessmentTypeWizardValues>();
  const sectionCount = useWatch({ control: form.control, name: 'sectionCount' }) ?? 5;
  const seedPresetCount = Math.min(sectionCount, 5);

  useEffect(() => {
    if (sectionCount > 5) {
      form.setValue('seedSections', false);
    }
  }, [sectionCount, form]);

  return (
  <div className="space-y-6">
    <FormField
      name="seedSections"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start gap-3 rounded-lg border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              aria-label="Seed standard dimension sections"
              disabled={sectionCount > 5}
            />
          </FormControl>
          <div className="space-y-1">
            <FormLabel className="text-base font-medium">Seed dimension sections</FormLabel>
            <FormDescription>
              {sectionCount > 5 ? (
                <>
                  Preset seed supports up to 5 sections. With {sectionCount} sections, disable seed
                  and add sections manually in Content after creation.
                </>
              ) : (
                <>
                  Seeds the first {seedPresetCount} preset dimension
                  {seedPresetCount === 1 ? '' : 's'} when enabled. Recommended for new types.
                </>
              )}
            </FormDescription>
          </div>
        </FormItem>
      )}
    />

    <FormField
      name="cloneFromTemplate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Clone content from</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger aria-label="Template assessment type">
                <SelectValue placeholder="Select template type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={SKIP_CLONE_TEMPLATE_VALUE}>
                None — skip interpretation bands
              </SelectItem>
              {templateOptions.map((type) => (
                <SelectItem key={type.code} value={type.code}>
                  {type.name} ({type.code.toUpperCase()}){!type.isActive ? ' — draft' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Clones section and overall interpretation bands plus recommended actions from the
            template type. Questions are never cloned — you will add those next.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
  );
};

const SuccessStep = ({
  created,
  onNavigateContent,
  onNavigateOverview,
  onNavigateScoring,
}: {
  created: CreatedAssessmentType;
  onNavigateContent: () => void;
  onNavigateOverview: () => void;
  onNavigateScoring: () => void;
}) => {
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
          <ItemTitle className="text-base font-semibold">Draft created: {created.name}</ItemTitle>
          <ItemDescription className="line-clamp-none">
            Code <span className="font-mono">&quot;{created.code}&quot;</span> is inactive and
            hidden from users until you publish.
          </ItemDescription>
        </ItemContent>
      </Item>

      <div className="space-y-3">
        <h4 className="text-base font-medium">What we set up automatically</h4>
        <ItemGroup className="gap-2">
          {created.seededSections && (
            <Item variant="outline" size="sm">
              <ItemContent>
                <ItemDescription className="line-clamp-none">
                  {created.sectionCount} dimension sections ({created.sectionCount} configured)
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
                    and recommended actions cloned from {created.clonedFrom.toUpperCase()}
                  </>
                ) : (
                  'No interpretation bands cloned — add these manually in Scoring'
                )}
              </ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>

      <div className="space-y-3">
        <h4 className="text-base font-medium">What you need to do next</h4>
        <ItemGroup className="gap-2">
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <ListChecks className="text-primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Add questions</ItemTitle>
              <ItemDescription className="line-clamp-none">
                Add {totalQuestions} active questions ({created.questionsPerSection} per section).
                This is required before you can publish.
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <Layers className="text-primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Customize interpretation (optional)</ItemTitle>
              <ItemDescription className="line-clamp-none">
                Edit dimension-specific narratives and recommended actions in Scoring.
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <ClipboardList className="text-primary" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Review readiness & publish</ItemTitle>
              <ItemDescription className="line-clamp-none">
                Overview shows a checklist. Publish only when all checks pass.
              </ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onNavigateContent}>Add Questions</Button>
        {!created.clonedFrom && (
          <Button variant="outline" onClick={onNavigateScoring}>
            Set up Scoring
          </Button>
        )}
        <Button variant="outline" onClick={onNavigateOverview}>
          View Overview & Readiness
        </Button>
        <Button variant="ghost" asChild>
          <Link href={buildAssessmentHref('catalog')}>Back to catalog</Link>
        </Button>
      </div>
    </div>
  );
};

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

  const templateOptions = useMemo(() => {
    return assessmentTypes.filter((type) => type.code !== watchedCode);
  }, [assessmentTypes, watchedCode]);

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
    if (stepIndex > 0 && stepIndex < 2) {
      setStepIndex((prev) => prev - 1);
    }
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
      priceAmount: values.priceAmount,
      sectionCount: values.sectionCount,
      questionsPerSection: values.questionsPerSection,
      scoringFormula: values.scoringFormula,
      displayOrder: values.displayOrder,
      seedSections,
      cloneFromTemplate,
    });

    if (!result?.success || !result.assessmentType) return;

    setCreatedType({
      code: result.assessmentType.code,
      name: result.assessmentType.name,
      // Form values are source of truth — create mutation may omit section counts in response
      sectionCount: values.sectionCount,
      questionsPerSection: values.questionsPerSection,
      totalQuestions:
        result.assessmentType.totalQuestions ?? values.sectionCount * values.questionsPerSection,
      clonedFrom: cloneFromTemplate,
      seededSections: seedSections,
    });
    setStepIndex(2);
  };

  const handleNavigateContent = () => {
    if (!createdType) return;
    router.push(buildAssessmentHref('content', createdType.code));
  };

  const handleNavigateScoring = () => {
    if (!createdType) return;
    router.push(buildAssessmentHref('scoring', createdType.code));
  };

  const handleNavigateOverview = () => {
    if (!createdType) return;
    router.push(buildAssessmentHref('overview', createdType.code));
  };

  if (typesLoading && assessmentTypes.length === 0) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
          <Link href={buildAssessmentHref('catalog')}>
            <ArrowLeft className="size-4 mr-2" />
            Back to catalog
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Assessment Type</h1>
        <p className="text-muted-foreground mt-2">
          New types start as drafts. Users cannot see or purchase them until you complete setup and
          publish.
        </p>
      </div>

      <Progress value={progressValue} className="mb-6" aria-label="Wizard progress" />

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
              if (stepIndex === 0) {
                handleNextFromBasics();
                return;
              }
              if (stepIndex === 1) {
                handleCreate();
              }
            }}
            className="space-y-6"
          >
            <Card className="p-6">
              {stepIndex === 0 && (
                <>
                  <h2 className="font-semibold text-lg mb-4">Basics</h2>
                  <BasicsStepFields existingCodes={existingCodes} />
                </>
              )}
              {stepIndex === 1 && (
                <>
                  <h2 className="font-semibold text-lg mb-4">Template & seeding</h2>
                  <CloneStepFields templateOptions={templateOptions} />
                </>
              )}
            </Card>

            <div className="flex flex-wrap gap-3 justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={stepIndex === 0 || creating}
              >
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
                      Creating draft...
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

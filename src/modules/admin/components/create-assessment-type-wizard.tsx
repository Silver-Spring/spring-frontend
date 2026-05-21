'use client';

import { Badge } from '@/components/ui/badge';
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
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  clonedFrom: string | null;
  seededSections: boolean;
};

const StepIndicator = ({ currentStepIndex }: { currentStepIndex: number }) => (
  <ol className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
    {WIZARD_STEPS.map((step, index) => {
      const isComplete = index < currentStepIndex;
      const isCurrent = index === currentStepIndex;

      return (
        <li key={step.id} className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={
              isComplete
                ? 'text-primary'
                : isCurrent
                  ? 'text-primary'
                  : 'text-muted-foreground'
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

const BasicsStepFields = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <FormField
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Code</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="e.g. prai"
              autoComplete="off"
              aria-label="Assessment type code"
            />
          </FormControl>
          <FormDescription>
            Lowercase slug. Immutable after creation (letters, numbers, -, _).
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Display name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="e.g. PRAI Assessment" aria-label="Display name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="description"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
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
    <FormField
      name="priceAmount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price (paise)</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              min={1}
              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
              aria-label="Price in paise"
            />
          </FormControl>
          <FormDescription>250000 paise = {formatPriceFromPaise(250000)}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="displayOrder"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Display order</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              min={0}
              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
              aria-label="Display order"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="sectionCount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sections</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              min={1}
              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
              aria-label="Section count"
            />
          </FormControl>
          <FormDescription>Default: 5 dimensions</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="questionsPerSection"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Questions per section</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              min={1}
              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
              aria-label="Questions per section"
            />
          </FormControl>
          <FormDescription>Users need this many active questions per section to publish</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="minScore"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Min overall score</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
              aria-label="Minimum score"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="maxScore"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Max overall score</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
              aria-label="Maximum score"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      name="scoringFormula"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Scoring formula</FormLabel>
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
  </div>
);

const CloneStepFields = ({
  templateOptions,
}: {
  templateOptions: { code: string; name: string; isActive: boolean }[];
}) => (
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
            />
          </FormControl>
          <div className="space-y-1">
            <FormLabel className="text-base font-medium">Seed dimension sections</FormLabel>
            <FormDescription>
              Creates 5 standard sections (psychological, social, mental, physical, lifestyle).
              Recommended for new types.
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
                None — skip bands and PDF template
              </SelectItem>
              {templateOptions.map((type) => (
                <SelectItem key={type.code} value={type.code}>
                  {type.name} ({type.code.toUpperCase()})
                  {!type.isActive ? ' — draft' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Clones 25 section + 5 overall interpretation bands, recommended actions, and PDF
            template keys. Questions are never cloned — you will add those next.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const SuccessStep = ({
  created,
  onNavigateContent,
  onNavigateOverview,
}: {
  created: CreatedAssessmentType;
  onNavigateContent: () => void;
  onNavigateOverview: () => void;
}) => {
  const totalQuestions = created.sectionCount * created.questionsPerSection;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="size-6 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg">Draft created: {created.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              <Badge variant="secondary" className="mr-2">
                Draft
              </Badge>
              Code <span className="font-mono">{created.code}</span> is inactive and hidden from
              users until you publish.
            </p>
          </div>
        </div>
      </div>

      <Card className="p-5 space-y-3">
        <h4 className="font-medium">What we set up automatically</h4>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          {created.seededSections && (
            <li>5 dimension sections ({created.sectionCount} configured)</li>
          )}
          {created.clonedFrom ? (
            <li>
              30 interpretation bands + recommended actions cloned from{' '}
              {created.clonedFrom.toUpperCase()}
            </li>
          ) : (
            <li>No bands or template content cloned — add these manually in Scoring / Reports</li>
          )}
        </ul>
      </Card>

      <Card className="p-5 space-y-4">
        <h4 className="font-medium">What you need to do next</h4>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <ListChecks className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Add questions</p>
              <p className="text-sm text-muted-foreground">
                Add {totalQuestions} active questions ({created.questionsPerSection} per section).
                This is required before you can publish.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <Layers className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Customize interpretation (optional)</p>
              <p className="text-sm text-muted-foreground">
                Edit dimension-specific narratives and recommended actions in Scoring.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <ClipboardList className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Review readiness & publish</p>
              <p className="text-sm text-muted-foreground">
                Overview shows a checklist. Publish only when all checks pass.
              </p>
            </div>
          </li>
        </ol>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button onClick={onNavigateContent}>Add Questions</Button>
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

  const templateOptions = useMemo(() => {
    return assessmentTypes.filter((type) => type.code !== watchedCode);
  }, [assessmentTypes, watchedCode]);

  const currentStep = WIZARD_STEPS[stepIndex];
  const progressValue = ((stepIndex + 1) / WIZARD_STEPS.length) * 100;

  const handleNextFromBasics = async () => {
    const valid = await form.trigger([...CREATE_ASSESSMENT_TYPE_BASICS_FIELDS]);
    if (!valid) return;
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

    const result = await createAssessmentType({
      code: values.code.trim().toLowerCase(),
      name: values.name,
      description: values.description?.trim() || undefined,
      priceAmount: values.priceAmount,
      sectionCount: values.sectionCount,
      questionsPerSection: values.questionsPerSection,
      minScore: values.minScore,
      maxScore: values.maxScore,
      scoringFormula: values.scoringFormula,
      displayOrder: values.displayOrder,
      seedSections: values.seedSections,
      cloneFromTemplate,
    });

    if (!result?.success || !result.assessmentType) return;

    setCreatedType({
      code: result.assessmentType.code,
      name: result.assessmentType.name,
      sectionCount: result.assessmentType.sectionCount,
      questionsPerSection: result.assessmentType.questionsPerSection,
      clonedFrom: cloneFromTemplate,
      seededSections: values.seedSections,
    });
    setStepIndex(2);
  };

  const handleNavigateContent = () => {
    if (!createdType) return;
    router.push(buildAssessmentHref('content', createdType.code));
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
                  <BasicsStepFields />
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

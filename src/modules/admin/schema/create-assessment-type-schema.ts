import { z } from 'zod';

const assessmentTypeCodeRegex = /^[a-z0-9_-]+$/;

export const CREATE_ASSESSMENT_TYPE_BASICS_FIELDS = [
  'code',
  'name',
  'description',
  'priceAmount',
  'sectionCount',
  'questionsPerSection',
  'minScore',
  'maxScore',
  'scoringFormula',
  'displayOrder',
] as const;

export const CREATE_ASSESSMENT_TYPE_CLONE_FIELDS = [
  'seedSections',
  'cloneFromTemplate',
] as const;

export const createAssessmentTypeBasicsSchema = z
  .object({
    code: z
      .string()
      .min(2, 'Code must be at least 2 characters')
      .max(32, 'Code must be at most 32 characters')
      .regex(
        assessmentTypeCodeRegex,
        'Use lowercase letters, numbers, dashes, or underscores only'
      ),
    name: z.string().min(1, 'Name is required').max(120, 'Name is too long'),
    description: z.string().max(500, 'Description is too long').optional(),
    priceAmount: z
      .number({ error: 'Price is required' })
      .int('Price must be a whole number of paise')
      .positive('Price must be greater than zero'),
    sectionCount: z
      .number()
      .int()
      .min(1, 'At least one section is required')
      .max(10, 'Maximum 10 sections'),
    questionsPerSection: z
      .number()
      .int()
      .min(1, 'At least one question per section is required')
      .max(50, 'Maximum 50 questions per section'),
    minScore: z.number().int('Min score must be a whole number'),
    maxScore: z.number().int('Max score must be a whole number'),
    scoringFormula: z.enum(['sum', 'average'], {
      error: 'Select a scoring formula',
    }),
    displayOrder: z.number().int().min(0, 'Display order cannot be negative'),
  })
  .refine((data) => data.maxScore > data.minScore, {
    message: 'Max score must be greater than min score',
    path: ['maxScore'],
  });

export const createAssessmentTypeCloneSchema = z.object({
  seedSections: z.boolean(),
  cloneFromTemplate: z.string(),
});

export const createAssessmentTypeWizardSchema = createAssessmentTypeBasicsSchema.merge(
  createAssessmentTypeCloneSchema
);

export type CreateAssessmentTypeWizardValues = z.infer<
  typeof createAssessmentTypeWizardSchema
>;

export const CREATE_ASSESSMENT_TYPE_WIZARD_DEFAULTS: CreateAssessmentTypeWizardValues = {
  code: '',
  name: '',
  description: '',
  priceAmount: 250000,
  sectionCount: 5,
  questionsPerSection: 10,
  minScore: 50,
  maxScore: 500,
  scoringFormula: 'sum',
  displayOrder: 0,
  seedSections: true,
  cloneFromTemplate: 'ssri',
};

export const SKIP_CLONE_TEMPLATE_VALUE = '__none__';

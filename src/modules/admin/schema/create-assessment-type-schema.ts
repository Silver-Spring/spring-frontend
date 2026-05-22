import { z } from 'zod';

const assessmentTypeCodeRegex = /^[a-z0-9_-]+$/;

export const CREATE_ASSESSMENT_TYPE_BASICS_FIELDS = [
  'code',
  'name',
  'description',
  'priceAmount',
  'sectionCount',
  'questionsPerSection',
  'scoringFormula',
  'displayOrder',
] as const;

export const CREATE_ASSESSMENT_TYPE_CLONE_FIELDS = [
  'seedSections',
  'cloneFromTemplate',
] as const;

export const createAssessmentTypeBasicsObjectSchema = z.object({
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
    scoringFormula: z.enum(['sum', 'average'], {
      error: 'Select a scoring formula',
    }),
    displayOrder: z.number().int().min(0, 'Display order cannot be negative'),
  });

export const createAssessmentTypeBasicsSchema = createAssessmentTypeBasicsObjectSchema;

export const createAssessmentTypeCloneSchema = z.object({
  seedSections: z.boolean(),
  cloneFromTemplate: z.string(),
});

export const createAssessmentTypeWizardSchema = createAssessmentTypeBasicsObjectSchema.extend(
  createAssessmentTypeCloneSchema.shape
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
  scoringFormula: 'sum',
  displayOrder: 0,
  seedSections: true,
  cloneFromTemplate: 'ssri',
};

export const SKIP_CLONE_TEMPLATE_VALUE = '__none__';

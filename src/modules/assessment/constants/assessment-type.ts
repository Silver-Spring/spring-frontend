export const DEFAULT_ASSESSMENT_TYPE = 'ssri' as const;

/** Sentinel value for admin filters that include every assessment type. */
export const ALL_ASSESSMENT_TYPES_FILTER = '__all__' as const;

/** Types that cannot be deactivated via admin (protected baseline). */
export const PROTECTED_ASSESSMENT_TYPES = [DEFAULT_ASSESSMENT_TYPE] as const;

export type AssessmentTypeCode = typeof DEFAULT_ASSESSMENT_TYPE | 'prai' | string;

export type AssessmentTypeFilter = AssessmentTypeCode | typeof ALL_ASSESSMENT_TYPES_FILTER;

export const toAssessmentTypeQueryVariable = (
  filter: AssessmentTypeFilter
): string | undefined => (filter === ALL_ASSESSMENT_TYPES_FILTER ? undefined : filter);

export const TEMPLATE_CONTENT_KEYS = [
  'report_title',
  'header_title',
  'cover_subtitle',
  'about_title',
  'about_intro',
] as const;

export type TemplateContentKey = (typeof TEMPLATE_CONTENT_KEYS)[number];

export const formatPriceFromPaise = (paise: number): string => {
  return `₹${(paise / 100).toFixed(2)}`;
};

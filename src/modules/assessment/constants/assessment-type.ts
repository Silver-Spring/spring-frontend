export const DEFAULT_ASSESSMENT_TYPE = 'ssri' as const;

/** Types that cannot be deactivated via admin (protected baseline). */
export const PROTECTED_ASSESSMENT_TYPES = [DEFAULT_ASSESSMENT_TYPE] as const;

export type AssessmentTypeCode = typeof DEFAULT_ASSESSMENT_TYPE | 'prai' | string;

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

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
  'cover_title',
  'cover_subtitle',
  'about_intro',
  'about_report_includes',
  'about_closing',
  'about_disclaimer',
] as const;

export type TemplateContentKey = (typeof TEMPLATE_CONTENT_KEYS)[number];

export const TEMPLATE_CONTENT_ARRAY_KEYS = [
  'about_intro',
  'about_report_includes',
  'about_disclaimer',
] as const;

export type TemplateContentArrayKey = (typeof TEMPLATE_CONTENT_ARRAY_KEYS)[number];

export const isTemplateContentArrayKey = (
  key: TemplateContentKey
): key is TemplateContentArrayKey =>
  (TEMPLATE_CONTENT_ARRAY_KEYS as readonly string[]).includes(key);

export const TEMPLATE_CONTENT_LABELS: Record<TemplateContentKey, string> = {
  report_title: 'Report name (About heading)',
  header_title: 'Page header (top right)',
  cover_title: 'Cover headline',
  cover_subtitle: 'Cover subtitle line',
  about_intro: 'About intro paragraphs',
  about_report_includes: 'About report includes',
  about_closing: 'About closing',
  about_disclaimer: 'About disclaimer',
};

export const PDF_THEME_KEYS = [
  'pdf_primary_color',
  'pdf_cover_bg_color',
  'pdf_box_bg_color',
  'pdf_font_heading',
  'pdf_font_body',
] as const;

export type PdfThemeKey = (typeof PDF_THEME_KEYS)[number];

export const PDF_THEME_LABELS: Record<PdfThemeKey, string> = {
  pdf_primary_color: 'Brand color',
  pdf_cover_bg_color: 'Cover & page background',
  pdf_box_bg_color: 'Callout box background',
  pdf_font_heading: 'Heading font',
  pdf_font_body: 'Body font',
};

export const PDF_COLOR_KEYS: readonly PdfThemeKey[] = [
  'pdf_primary_color',
  'pdf_cover_bg_color',
  'pdf_box_bg_color',
] as const;

export const PDF_FONT_KEYS: readonly PdfThemeKey[] = [
  'pdf_font_heading',
  'pdf_font_body',
] as const;

export const PDF_FONT_OPTIONS = [
  'Playfair Display',
  'Source Sans 3',
  'Georgia',
  'Lato',
  'Montserrat',
] as const;

export type PdfFontOption = (typeof PDF_FONT_OPTIONS)[number];

export const PDF_THEME_DEFAULTS: Record<PdfThemeKey, string> = {
  pdf_primary_color: '#16a34a',
  pdf_cover_bg_color: '#f0fdf4',
  pdf_box_bg_color: '#dcfce7',
  pdf_font_heading: 'Playfair Display',
  pdf_font_body: 'Source Sans 3',
};

export const formatPriceFromPaise = (paise: number): string => {
  return `₹${(paise / 100).toFixed(2)}`;
};

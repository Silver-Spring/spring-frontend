export type ReportFieldHintId =
  | 'template.cover_title'
  | 'template.cover_subtitle'
  | 'template.report_title'
  | 'template.header_title'
  | 'template.about_intro'
  | 'template.about_report_includes'
  | 'template.about_closing'
  | 'template.about_disclaimer'
  | 'section.about_description'
  | 'section.subtitle'
  | 'section.description'
  | 'stage.description'
  | 'band.narrative';

export type ReportFieldHintConfig = {
  title: string;
  page: string;
  description: string;
  /** Path under /public, e.g. /admin/report-field-hints/cover-title.png */
  imageSrc?: string;
  imageAlt: string;
};

/**
 * Static reference screenshots from the SSRI report PDF.
 *
 * Generated via:
 *   python3 scripts/generate-report-field-hints.py /path/to/assessment-report-rajat.pdf
 *
 * Title keys (logo is a fixed asset in pdf-templates, not editable):
 *   cover_title / cover_subtitle — cover page only
 *   header_title — top-right uppercase text on inner page header bar
 *   report_title — “About the {name}” heading + PDF document title
 */
export const REPORT_FIELD_HINTS: Record<ReportFieldHintId, ReportFieldHintConfig> = {
  'template.cover_title': {
    title: 'Cover headline',
    page: 'Cover',
    description:
      'Large serif title on the cover (center). HTML allowed — use <br> for line breaks. Logo above is a fixed image asset.',
    imageSrc: '/admin/report-field-hints/cover-title.png',
    imageAlt: 'Cover page main headline',
  },
  'template.cover_subtitle': {
    title: 'Cover subtitle line',
    page: 'Cover',
    description:
      'Line under the cover headline. Template text is combined with the participant name at render time (e.g. “Personalized Report for Rajat”).',
    imageSrc: '/admin/report-field-hints/cover-subtitle.png',
    imageAlt: 'Cover page subtitle below the headline',
  },
  'template.header_title': {
    title: 'Page header (top right)',
    page: 'Inner pages (header bar)',
    description:
      'Small uppercase sans-serif text in the top-right of every inner page header — like a letterhead. Not the logo (left) and not the About page heading.',
    imageSrc: '/admin/report-field-hints/header-title.png',
    imageAlt: 'Inner page header bar with uppercase title on the right',
  },
  'template.report_title': {
    title: 'Report name (About heading)',
    page: 'About (1) + PDF metadata',
    description:
      'Full product name used in the About page heading (“About the …”) and as the browser/PDF document title. Plain text only.',
    imageSrc: '/admin/report-field-hints/report-title-about.png',
    imageAlt: 'About page heading that includes the report name',
  },
  'template.about_intro': {
    title: 'About intro',
    page: 'About (1)',
    description: 'Opening paragraphs below the About heading on the first About page.',
    imageSrc: '/admin/report-field-hints/about-intro.png',
    imageAlt: 'First About page intro paragraphs',
  },
  'template.about_report_includes': {
    title: 'What this report includes',
    page: 'About (1)',
    description: 'Bullet-style list describing report sections.',
    imageSrc: '/admin/report-field-hints/about-includes.png',
    imageAlt: 'About page report includes list',
  },
  'template.about_closing': {
    title: 'About closing',
    page: 'About (1)',
    description: 'Closing paragraphs at the bottom of the first About page.',
    imageSrc: '/admin/report-field-hints/about-closing.png',
    imageAlt: 'About page closing paragraphs',
  },
  'template.about_disclaimer': {
    title: 'Disclaimer',
    page: 'About (2)',
    description: 'Legal or advisory disclaimer at the end of the second About page.',
    imageSrc: '/admin/report-field-hints/about-disclaimer.png',
    imageAlt: 'About page disclaimer text',
  },
  'section.about_description': {
    title: 'About page blurb',
    page: 'About (1) & About (2)',
    description: 'Short description for each dimension in the About pages dimension list and blurbs.',
    imageSrc: '/admin/report-field-hints/about-dimension-blurb.png',
    imageAlt: 'About page dimension list with short descriptions',
  },
  'section.subtitle': {
    title: 'Intro tagline',
    page: 'Dimension intro',
    description: 'Italic tagline directly under the dimension title (no emoji on this page).',
    imageSrc: '/admin/report-field-hints/dimension-intro-subtitle.png',
    imageAlt: 'Dimension intro page with title and italic subtitle',
  },
  'section.description': {
    title: 'Intro body',
    page: 'Dimension intro',
    description: 'Long narrative with floated image. Keep to 3–4 paragraphs so it fits one page.',
    imageSrc: '/admin/report-field-hints/dimension-intro-body.png',
    imageAlt: 'Dimension intro page with body text and image',
  },
  'stage.description': {
    title: 'Stage definition',
    page: 'About (2)',
    description: 'Explains what each score stage means (Thriving, Developing, etc.).',
    imageSrc: '/admin/report-field-hints/stage-definitions.png',
    imageAlt: 'About page stage definition rows',
  },
  'band.narrative': {
    title: 'Band narrative',
    page: 'Overall or dimension insight',
    description: 'Interpretation text for the score band shown on insight pages.',
    imageSrc: '/admin/report-field-hints/band-narrative.png',
    imageAlt: 'Score insight page with band narrative',
  },
};

export const getReportFieldHint = (hintId: ReportFieldHintId): ReportFieldHintConfig =>
  REPORT_FIELD_HINTS[hintId];

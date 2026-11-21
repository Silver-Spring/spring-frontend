export const ALWAYS_VARIABLES = [
  'name',
  'firstName',
  'assessmentUrl',
  'workbookUrl',
  'siteUrl',
  'supportEmail',
] as const;

export const WEBINAR_VARIABLES = [
  'eventTitle',
  'eventDateLabel',
  'eventTimeLabel',
  'formatLabel',
  'eventPageUrl',
  'calendarUrl',
  'feedbackFormUrl',
] as const;

export const JOINING_VARIABLE = 'joiningUrl';

export const availableVariables = (opts: { hasWebinar: boolean; webinarUpdate: boolean }): string[] => [
  ...ALWAYS_VARIABLES,
  ...(opts.hasWebinar ? WEBINAR_VARIABLES : []),
  ...(opts.hasWebinar && opts.webinarUpdate ? [JOINING_VARIABLE] : []),
];

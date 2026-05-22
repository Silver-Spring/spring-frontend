import type { ActionFormState, BandFormState } from './types';

export const EMPTY_BAND_FORM: BandFormState = {
  sectionType: '',
  rangeStart: '',
  rangeEnd: '',
  label: '',
  narrative: '',
  keyMindset: '',
  displayRangeLabel: '',
  displayOrder: '',
};

export const EMPTY_ACTION_FORM: ActionFormState = {
  actionText: '',
  priority: '1',
};

export const ADMIN_FOOTER_NOTE =
  "Section body text is saved on the user's result at completion. Recommended actions and overall band content update immediately when PDFs are regenerated.";

export const SECTION_AFFECTS = [
  'PDF insight body (new completions)',
  'PDF actions (immediate regen)',
  'Email',
  'Results',
];

export const OVERALL_AFFECTS = [
  'PDF overall body/focus/mindset (immediate regen)',
  'Email TRI (new completions)',
  'Results',
];

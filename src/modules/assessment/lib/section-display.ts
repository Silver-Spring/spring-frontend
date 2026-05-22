const DEFAULT_SECTION_COLOR = '#6366f1';
const DEFAULT_SECTION_EMOJI = '📊';

export type SectionDisplaySource = {
  sectionType: string;
  sectionName?: string | null;
  sectionEmoji?: string | null;
  sectionDisplayColor?: string | null;
  section?: {
    name?: string | null;
    emoji?: string | null;
    displayColor?: string | null;
    displayOrder?: number | null;
  } | null;
};

export type ResolvedSectionDisplay = {
  name: string;
  emoji: string;
  color: string;
  displayOrder: number | null;
};

export const formatSectionSlug = (slug: string): string =>
  slug
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const previewSlugFromName = (name: string): string => {
  const normalized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s_]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[^a-z]+/, '');

  if (!normalized) return '';
  return normalized.slice(0, 32);
};

export const resolveSectionDisplay = (
  row: SectionDisplaySource
): ResolvedSectionDisplay => ({
  name:
    row.sectionName?.trim() ||
    row.section?.name?.trim() ||
    formatSectionSlug(row.sectionType),
  emoji: row.sectionEmoji?.trim() || row.section?.emoji?.trim() || DEFAULT_SECTION_EMOJI,
  color:
    row.sectionDisplayColor?.trim() ||
    row.section?.displayColor?.trim() ||
    DEFAULT_SECTION_COLOR,
  displayOrder: row.section?.displayOrder ?? null,
});

export const computeScoreBounds = (
  sectionCount: number,
  scoringFormula: 'sum' | 'average'
): { minScore: number; maxScore: number } => {
  if (scoringFormula === 'average') {
    return { minScore: 10, maxScore: 100 };
  }

  return {
    minScore: sectionCount * 10,
    maxScore: sectionCount * 100,
  };
};

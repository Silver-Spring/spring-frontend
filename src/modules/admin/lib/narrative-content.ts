export const NARRATIVE_PARAGRAPH_SOFT_MAX = 6;

export const countNarrativeParagraphs = (text: string): number => {
  if (!text.trim()) {
    return 0;
  }

  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
};

export const narrativeArrayToText = (raw: unknown): string => {
  if (raw == null) {
    return '';
  }

  if (Array.isArray(raw)) {
    return raw.map(String).filter(Boolean).join('\n\n');
  }

  return typeof raw === 'string' ? raw : String(raw);
};

export const narrativeTextToArray = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

export const wrapTextareaSelection = (
  value: string,
  selectionStart: number,
  selectionEnd: number,
  openTag: string,
  closeTag: string
): { nextValue: string; selectionStart: number; selectionEnd: number } => {
  const selected = value.slice(selectionStart, selectionEnd);
  const wrapped = selected ? `${openTag}${selected}${closeTag}` : `${openTag}${closeTag}`;
  const nextValue = value.slice(0, selectionStart) + wrapped + value.slice(selectionEnd);
  const cursorStart = selectionStart + openTag.length;
  const cursorEnd = cursorStart + selected.length;

  return {
    nextValue,
    selectionStart: cursorStart,
    selectionEnd: cursorEnd,
  };
};

export const getParagraphCountMessage = (count: number): string => {
  if (count === 0) {
    return 'No paragraphs detected';
  }

  if (count === 1) {
    return '1 paragraph';
  }

  if (count > NARRATIVE_PARAGRAPH_SOFT_MAX) {
    return `${count} paragraphs — consider shortening (soft limit ${NARRATIVE_PARAGRAPH_SOFT_MAX})`;
  }

  return `${count} paragraphs`;
};

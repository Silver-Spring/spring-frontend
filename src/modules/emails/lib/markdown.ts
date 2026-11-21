type Edit = { nextValue: string; selectionStart: number; selectionEnd: number };

/** Wraps the selection, e.g. **bold**. With nothing selected the cursor lands between the marks. */
export const wrapSelection = (value: string, start: number, end: number, open: string, close: string): Edit => {
  const selected = value.slice(start, end);
  const nextValue = value.slice(0, start) + open + selected + close + value.slice(end);
  return { nextValue, selectionStart: start + open.length, selectionEnd: start + open.length + selected.length };
};

/** Turns the selection into [text](https://) and selects the URL so it can be typed over. */
export const insertLink = (value: string, start: number, end: number): Edit => {
  const text = value.slice(start, end) || 'link text';
  const url = 'https://';
  const inserted = `[${text}](${url})`;
  const nextValue = value.slice(0, start) + inserted + value.slice(end);
  const urlStart = start + text.length + 3;
  return { nextValue, selectionStart: urlStart, selectionEnd: urlStart + url.length };
};

/** Adds a prefix such as "## " or "- " to every line the selection touches. */
export const prefixLines = (value: string, start: number, end: number, prefix: string): Edit => {
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  const lineEndIndex = value.indexOf('\n', end);
  const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
  const block = value
    .slice(lineStart, lineEnd)
    .split('\n')
    .map((line) => (line.startsWith(prefix) ? line : prefix + line))
    .join('\n');
  const nextValue = value.slice(0, lineStart) + block + value.slice(lineEnd);
  return { nextValue, selectionStart: lineStart + block.length, selectionEnd: lineStart + block.length };
};

/** Inserts text at the cursor, replacing any selection, and puts the cursor after it. */
export const insertAt = (value: string, start: number, end: number, text: string): Edit => {
  const nextValue = value.slice(0, start) + text + value.slice(end);
  return { nextValue, selectionStart: start + text.length, selectionEnd: start + text.length };
};

'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Bold, Heading2, Italic, Link2, List } from 'lucide-react';
import type { ComponentType, FocusEventHandler, RefObject } from 'react';
import { insertLink, prefixLines, wrapSelection } from '../lib/markdown';

type MarkdownTextareaProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  rows?: number;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

type Tool = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  apply: (value: string, start: number, end: number) => ReturnType<typeof wrapSelection>;
};

const TOOLS: Tool[] = [
  { label: 'Bold', icon: Bold, apply: (v, s, e) => wrapSelection(v, s, e, '**', '**') },
  { label: 'Italic', icon: Italic, apply: (v, s, e) => wrapSelection(v, s, e, '_', '_') },
  { label: 'Link', icon: Link2, apply: insertLink },
  { label: 'Heading', icon: Heading2, apply: (v, s, e) => prefixLines(v, s, e, '## ') },
  { label: 'List', icon: List, apply: (v, s, e) => prefixLines(v, s, e, '- ') },
];

/** Markdown body field with a small formatting toolbar (same pattern as NarrativeTextarea). */
export const MarkdownTextarea = ({
  id,
  value,
  onChange,
  textareaRef,
  onFocus,
  rows = 12,
  disabled = false,
  placeholder,
  className,
}: MarkdownTextareaProps) => {
  const handleTool = (tool: Tool) => {
    const textarea = textareaRef.current;
    if (!textarea || disabled) return;
    const { nextValue, selectionStart, selectionEnd } = tool.apply(
      value,
      textarea.selectionStart,
      textarea.selectionEnd,
    );
    onChange(nextValue);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {TOOLS.map((tool) => (
          <Button
            key={tool.label}
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2.5"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleTool(tool)}
            disabled={disabled}
            aria-label={tool.label}
            title={tool.label}
          >
            <tool.icon className="size-3.5" aria-hidden="true" />
          </Button>
        ))}
        <span className="ml-1 text-xs text-muted-foreground">Markdown. Blank line = new paragraph</span>
      </div>
      <Textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={cn('min-h-0 resize-y font-mono text-sm', className)}
      />
    </div>
  );
};

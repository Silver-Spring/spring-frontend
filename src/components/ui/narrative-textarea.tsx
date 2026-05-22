'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  countNarrativeParagraphs,
  getParagraphCountMessage,
  wrapTextareaSelection,
} from '@/modules/admin/lib/narrative-content';
import { Bold, Italic } from 'lucide-react';
import { useRef, useState } from 'react';

type NarrativeTextareaProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  showFormatting?: boolean;
  showParagraphCount?: boolean;
  hint?: string;
};

const NarrativeTextarea = ({
  id,
  value,
  onChange,
  rows = 4,
  placeholder = 'Separate paragraphs with a blank line.',
  className,
  required = false,
  disabled = false,
  showFormatting = true,
  showParagraphCount = true,
  hint,
}: NarrativeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [paragraphCount, setParagraphCount] = useState<number | null>(null);
  const [showCount, setShowCount] = useState(false);

  const handleBlur = () => {
    if (!showParagraphCount) {
      return;
    }

    setParagraphCount(countNarrativeParagraphs(value));
    setShowCount(true);
  };

  const handleFormat = (openTag: string, closeTag: string) => {
    const textarea = textareaRef.current;
    if (!textarea || disabled) {
      return;
    }

    const { nextValue, selectionStart, selectionEnd } = wrapTextareaSelection(
      value,
      textarea.selectionStart,
      textarea.selectionEnd,
      openTag,
      closeTag
    );

    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  const count = paragraphCount ?? countNarrativeParagraphs(value);
  const countMessage = getParagraphCountMessage(count);
  const hasParagraphWarning = showParagraphCount && showCount && (count === 0 || count > 6);

  return (
    <div className="space-y-2">
      {showFormatting ? (
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2.5"
            onClick={() => handleFormat('<strong>', '</strong>')}
            disabled={disabled}
            aria-label="Bold"
          >
            <Bold className="size-3.5" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 px-2.5"
            onClick={() => handleFormat('<em>', '</em>')}
            disabled={disabled}
            aria-label="Italic"
          >
            <Italic className="size-3.5" aria-hidden="true" />
          </Button>
          <span className="text-xs text-muted-foreground ml-1">Bold / italic optional</span>
        </div>
      ) : null}

      <Textarea
        ref={textareaRef}
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={handleBlur}
        rows={rows}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        className={cn('min-h-0 resize-y text-sm', className)}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        {hint ? <span>{hint}</span> : <span>Blank line = new PDF paragraph</span>}
        {showParagraphCount && showCount ? (
          <span className={cn(hasParagraphWarning && 'text-amber-600 dark:text-amber-400')}>
            {countMessage}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export { NarrativeTextarea };

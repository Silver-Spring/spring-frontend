import { CheckCircleIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnswerOptions, LabeledOption } from './answer-options';

type QuestionVariant = 'previous' | 'current' | 'next';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  variant: QuestionVariant;
  selectedValue?: number | null;
  isAnswered?: boolean;
  isFadingOut?: boolean;
  isDisabled?: boolean;
  questionCategory?: string;
  answerOptions?: LabeledOption[] | null;
  onSelect?: (value: number) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

interface ProfileNumericInputProps {
  selectedValue?: number | null;
  onSelect: (value: number) => void;
  disabled?: boolean;
}

function ProfileNumericInput({ selectedValue, onSelect, disabled }: ProfileNumericInputProps) {
  const [rawValue, setRawValue] = useState(selectedValue != null ? String(selectedValue) : '');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRawValue(e.target.value);
  }, []);

  const handleConfirm = useCallback(() => {
    const parsed = parseInt(rawValue, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onSelect(parsed);
    }
  }, [rawValue, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleConfirm();
  }, [handleConfirm]);

  return (
    <div className="flex items-center gap-3">
      <Input
        type="number"
        min={0}
        max={150}
        value={rawValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="max-w-[140px] text-center text-lg font-semibold"
        placeholder="Enter number"
      />
      <Button
        type="button"
        onClick={handleConfirm}
        disabled={disabled || rawValue.trim() === '' || isNaN(parseInt(rawValue, 10))}
        className="rounded-full px-6"
      >
        Confirm
      </Button>
    </div>
  );
}

const variantStyles: Record<
  QuestionVariant,
  { container: string; badge: string; badgeText: string }
> = {
  previous: {
    container:
      'border-primary/10 bg-primary/5 cursor-pointer opacity-40 hover:opacity-60 hover:border-primary/20 hover:shadow-sm hover:bg-primary/8',
    badge: 'bg-primary/15 text-primary',
    badgeText: 'text-foreground/70',
  },
  current: {
    container: 'border-primary/20 bg-primary/8 shadow-md',
    badge: 'bg-primary text-primary-foreground',
    badgeText: 'text-green-900 dark:text-green-100',
  },
  next: {
    container: 'border-primary/10 bg-primary/5 pointer-events-none opacity-15',
    badge: 'bg-primary/8 text-primary',
    badgeText: 'text-foreground/70',
  },
};

export const QuestionCard = ({
  questionNumber,
  questionText,
  variant,
  selectedValue = null,
  isAnswered = false,
  isFadingOut = false,
  isDisabled = false,
  questionCategory,
  answerOptions,
  onSelect,
  onClick,
  onKeyDown,
}: QuestionCardProps) => {
  const styles = variantStyles[variant];
  const isClickable = variant === 'previous';
  const showAnswerOptions = variant === 'current';
  const isProfileQuestion = questionCategory === 'profile';

  const fadeClass =
    variant === 'previous'
      ? isFadingOut
        ? 'opacity-0 -translate-y-4'
        : 'translate-y-0'
      : variant === 'current'
        ? isFadingOut
          ? 'opacity-0 scale-95'
          : 'opacity-100 scale-100'
        : isFadingOut
          ? 'opacity-0 translate-y-4'
          : 'translate-y-0';

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `Go back to question ${questionNumber}` : undefined}
      aria-current={variant === 'current' ? 'step' : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={isClickable ? onKeyDown : undefined}
      className={`scroll-mt-20 rounded-xl border p-6 md:p-8 transition-all duration-500 ease-in-out ${styles.container} ${fadeClass} ${
        isClickable && isDisabled ? 'cursor-not-allowed' : ''
      }`}
    >
      <div className={showAnswerOptions ? 'mb-6' : ''}>
        {isProfileQuestion && variant === 'current' && (
          <div className="mb-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              About you
            </span>
          </div>
        )}
        <div className="flex items-start gap-4">
          <span
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold shrink-0 mt-0.5 transition-colors duration-300 ${styles.badge}`}
          >
            {isAnswered ? <CheckCircleIcon className="size-4" /> : questionNumber}
          </span>
          <p className={`text-xl md:text-2xl font-medium leading-relaxed ${styles.badgeText}`}>
            {questionText}
          </p>
        </div>
      </div>

      {showAnswerOptions && onSelect && isProfileQuestion && !answerOptions ? (
        <ProfileNumericInput
          selectedValue={selectedValue}
          onSelect={onSelect}
          disabled={isDisabled}
        />
      ) : showAnswerOptions && onSelect ? (
        <AnswerOptions
          selectedValue={selectedValue}
          onSelect={onSelect}
          disabled={isDisabled}
          labeledOptions={answerOptions}
        />
      ) : null}

      {variant === 'previous' && isAnswered && (
        <div className="flex justify-center mt-4">
          <span className="text-sm text-primary italic">Click to edit</span>
        </div>
      )}
    </div>
  );
};

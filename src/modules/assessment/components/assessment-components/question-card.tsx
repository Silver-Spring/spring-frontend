import { CheckCircleIcon } from 'lucide-react';
import { AnswerOptions } from './answer-options';

type QuestionVariant = 'previous' | 'current' | 'next';

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  variant: QuestionVariant;
  selectedValue?: number | null;
  isAnswered?: boolean;
  isFadingOut?: boolean;
  isDisabled?: boolean;
  onSelect?: (value: number) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const variantStyles: Record<
  QuestionVariant,
  { container: string; badge: string; badgeText: string }
> = {
  previous: {
    container:
      'border-green-100 dark:border-green-900/30 bg-green-50/30 dark:bg-green-950/10 cursor-pointer opacity-40 hover:opacity-60 hover:border-green-200 dark:hover:border-green-800/40 hover:shadow-sm hover:bg-green-50/40 dark:hover:bg-green-950/15',
    badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    badgeText: 'text-foreground/70',
  },
  current: {
    container:
      'border-green-200 dark:border-green-800/50 bg-green-50/50 dark:bg-green-950/20 shadow-md',
    badge: 'bg-green-700 dark:bg-green-700 text-white',
    badgeText: 'text-green-900 dark:text-green-100',
  },
  next: {
    container:
      'border-green-100 dark:border-green-900/20 bg-green-50/20 dark:bg-green-950/5 pointer-events-none opacity-15',
    badge: 'bg-green-100/50 dark:bg-green-900/20 text-green-600 dark:text-green-500',
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
  onSelect,
  onClick,
  onKeyDown,
}: QuestionCardProps) => {
  const styles = variantStyles[variant];
  const isClickable = variant === 'previous';
  const showAnswerOptions = variant === 'current';

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
      <div className={showAnswerOptions ? 'mb-8' : ''}>
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

      {showAnswerOptions && onSelect && (
        <AnswerOptions selectedValue={selectedValue} onSelect={onSelect} disabled={isDisabled} />
      )}

      {variant === 'previous' && isAnswered && (
        <div className="flex justify-center mt-4">
          <span className="text-sm text-green-600 dark:text-green-500 italic">Click to edit</span>
        </div>
      )}
    </div>
  );
};

import { Button } from '@/components/ui/button';
import { ANSWER_OPTIONS, SCALE_LABELS } from '@/modules/assessment/constants';
import { memo, useCallback } from 'react';

interface AnswerButtonProps {
  num: number;
  isSelected: boolean;
  onSelect: (value: number) => void;
  disabled: boolean;
}

const AnswerButton = memo(({ num, isSelected, onSelect, disabled }: AnswerButtonProps) => {
  const handleClick = useCallback(() => onSelect(num), [num, onSelect]);

  return (
    <Button
      type="button"
      variant={isSelected ? 'default' : 'outline'}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Option ${num} out of 10`}
      aria-pressed={isSelected}
      className={`aspect-square h-auto w-full p-0 rounded-full text-sm font-semibold transition-all duration-150 ${
        isSelected
          ? 'bg-primary hover:bg-primary/90 border-primary text-primary-foreground shadow-md scale-110 ring-2 ring-primary ring-offset-2'
          : 'border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 hover:scale-105'
      }`}
    >
      {num}
    </Button>
  );
});
AnswerButton.displayName = 'AnswerButton';

interface AnswerOptionsProps {
  selectedValue: number | null;
  onSelect: (value: number) => void;
  disabled?: boolean;
}

export const AnswerOptions = memo(({
  selectedValue,
  onSelect,
  disabled = false,
}: AnswerOptionsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {ANSWER_OPTIONS.map((num) => (
          <AnswerButton
            key={num}
            num={num}
            isSelected={selectedValue === num}
            onSelect={onSelect}
            disabled={disabled}
          />
        ))}
      </div>

      <div className="flex justify-between font-semibold text-xs text-primary px-1 pt-1">
        <span>{SCALE_LABELS.start}</span>
        <span>{SCALE_LABELS.middle}</span>
        <span>{SCALE_LABELS.end}</span>
      </div>
    </div>
  );
});
AnswerOptions.displayName = 'AnswerOptions';

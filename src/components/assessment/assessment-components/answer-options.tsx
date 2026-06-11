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

export interface LabeledOption {
  value: number;
  label: string;
}

interface LabeledOptionButtonProps {
  option: LabeledOption;
  isSelected: boolean;
  onSelect: (value: number) => void;
  disabled: boolean;
}

const LabeledOptionButton = memo(({ option, isSelected, onSelect, disabled }: LabeledOptionButtonProps) => {
  const handleClick = useCallback(() => onSelect(option.value), [option.value, onSelect]);

  return (
    <Button
      type="button"
      variant={isSelected ? 'default' : 'outline'}
      onClick={handleClick}
      disabled={disabled}
      aria-label={option.label}
      aria-pressed={isSelected}
      className={`w-full h-auto py-3 px-4 text-sm font-medium text-left justify-start transition-all duration-150 ${
        isSelected
          ? 'bg-primary hover:bg-primary/90 border-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2'
          : 'border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40'
      }`}
    >
      <span className={`mr-3 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 ${
        isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-primary/10 text-primary'
      }`}>
        {option.value}
      </span>
      {option.label}
    </Button>
  );
});
LabeledOptionButton.displayName = 'LabeledOptionButton';

interface AnswerOptionsProps {
  selectedValue: number | null;
  onSelect: (value: number) => void;
  disabled?: boolean;
  labeledOptions?: LabeledOption[] | null;
}

export const AnswerOptions = memo(({
  selectedValue,
  onSelect,
  disabled = false,
  labeledOptions,
}: AnswerOptionsProps) => {
  if (labeledOptions && labeledOptions.length > 0) {
    return (
      <div className="space-y-2">
        {labeledOptions.map((option) => (
          <LabeledOptionButton
            key={option.value}
            option={option}
            isSelected={selectedValue === option.value}
            onSelect={onSelect}
            disabled={disabled}
          />
        ))}
      </div>
    );
  }

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

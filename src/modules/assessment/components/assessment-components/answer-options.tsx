import { Button } from '@/components/ui/button';
import { ANSWER_OPTIONS, SCALE_LABELS } from '@/modules/assessment/constants';

interface AnswerOptionsProps {
  selectedValue: number | null;
  onSelect: (value: number) => void;
  disabled?: boolean;
}

export const AnswerOptions = ({
  selectedValue,
  onSelect,
  disabled = false,
}: AnswerOptionsProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {ANSWER_OPTIONS.map((num) => {
          const isSelected = selectedValue === num;
          return (
            <Button
              key={num}
              type="button"
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => onSelect(num)}
              disabled={disabled}
              aria-label={`Option ${num} out of 10`}
              aria-pressed={isSelected}
              className={`aspect-square h-auto w-full p-0 rounded-full text-sm font-semibold transition-all duration-150 ${
                isSelected
                  ? 'bg-green-700 hover:bg-green-800 border-green-700 text-white shadow-md scale-110 ring-2 ring-green-700 ring-offset-2'
                  : 'border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-400 hover:scale-105'
              }`}
            >
              {num}
            </Button>
          );
        })}
      </div>

      <div className="flex justify-between font-semibold text-xs text-green-600 dark:text-green-500 px-1 pt-1">
        <span>{SCALE_LABELS.start}</span>
        <span>{SCALE_LABELS.middle}</span>
        <span>{SCALE_LABELS.end}</span>
      </div>
    </div>
  );
};

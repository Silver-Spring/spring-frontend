import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TOTAL_QUESTIONS } from '@/modules/assessment/constants';
import { ChevronLeft } from 'lucide-react';

interface AssessmentHeaderProps {
  questionNumber: number;
  progressPercent: number;
  onBack: () => void;
  isDisabled?: boolean;
  canGoBack?: boolean;
}

export const AssessmentHeader = ({
  questionNumber,
  progressPercent,
  onBack,
  isDisabled = false,
  canGoBack = true,
}: AssessmentHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-3 max-w-2xl">
        <div className="flex items-center gap-2 mb-2.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            disabled={isDisabled || !canGoBack}
            aria-label="Back to dashboard"
            className="shrink-0 -ml-2 size-8"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex flex-1 items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Question <span className="text-primary">{questionNumber}</span>{' '}
              <span className="text-muted-foreground">of {TOTAL_QUESTIONS}</span>
            </span>
            <span className="tabular-nums text-muted-foreground">
              {Math.round(progressPercent)}%
            </span>
          </div>
        </div>
        <Progress
          value={progressPercent}
          className="h-1.5 transition-all duration-500 **:data-[slot=progress-indicator]:bg-green-700"
        />
      </div>
    </div>
  );
};

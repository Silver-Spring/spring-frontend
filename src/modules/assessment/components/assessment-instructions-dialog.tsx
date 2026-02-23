'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface AssessmentInstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function AssessmentInstructionsDialog({
  open,
  onOpenChange,
  onConfirm,
}: AssessmentInstructionsDialogProps) {
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleConfirm = () => {
    if (hasAgreed) {
      onConfirm();
      setHasAgreed(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    setHasAgreed(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Info className="size-6 text-primary" />
            Before You Begin
          </DialogTitle>
          <DialogDescription className="sr-only">
            Important information about the assessment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-base leading-relaxed text-foreground">
            The{' '}
            <span className="font-semibold">Silver Spring Retirement Readiness Index (SSRI)</span>{' '}
            is a structured self-assessment designed to help you understand your readiness for your
            next phase in life beyond full-time work. It focuses on the non-financial dimensions of
            transition, including psychological, social, mental, physical and lifestyle
            preparedness.
          </p>

          <p className="text-base leading-relaxed text-foreground">
            The assessment should take about <span className="font-semibold">15 minutes</span> to
            complete. As you respond, please reflect specifically on your experiences and patterns
            over the <span className="font-semibold">last six months</span>, rather than how you
            felt years ago or how you hope to feel in the future.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
            <p className="text-base leading-relaxed text-foreground">
              There are <span className="font-semibold">no right or wrong answers</span>. Be honest
              with yourself. This is not about judgment; it is about clarity. The more authentic
              your responses, the more meaningful and accurate your readiness insights will be.
            </p>
          </div>

          <div className="flex items-start gap-3 pt-4">
            <Checkbox
              id="agree"
              checked={hasAgreed}
              onCheckedChange={(checked) => setHasAgreed(checked === true)}
              className="mt-1"
            />
            <Label htmlFor="agree" className="text-sm leading-relaxed">
              I have read and understood the instructions above. I am ready to begin the assessment.
            </Label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!hasAgreed}>
            Begin Assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { getReportFieldHint, type ReportFieldHintId } from '@/modules/admin/lib/report-field-hints';
import { CircleHelp } from 'lucide-react';
import { useState } from 'react';

type ReportFieldHintProps = {
  hintId: ReportFieldHintId;
  className?: string;
};

const ReportFieldHint = ({ hintId, className }: ReportFieldHintProps) => {
  const hint = getReportFieldHint(hintId);
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn('size-7 shrink-0 text-muted-foreground', className)}
          aria-label={`Where "${hint.title}" appears in the PDF report`}
        >
          <CircleHelp className="size-4" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={8}
        collisionPadding={16}
        className="w-[min(26rem,calc(100vw-2rem))] overflow-y-auto p-0"
        style={{ maxHeight: 'min(520px, 85vh)' }}
      >
        <PopoverHeader className="gap-1 border-b px-3 py-2.5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            PDF · {hint.page}
          </p>
          <PopoverTitle className="text-sm">{hint.title}</PopoverTitle>
          <PopoverDescription className="text-xs leading-relaxed">
            {hint.description}
          </PopoverDescription>
        </PopoverHeader>

        {hint.imageSrc && !imageMissing ? (
          <div className="min-h-12 border-t bg-muted/30 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hint.imageSrc}
              alt={hint.imageAlt}
              className="block max-h-72 w-full object-contain object-left"
              onError={() => setImageMissing(true)}
            />
          </div>
        ) : (
          <div className="flex max-h-[min(280px,40vh)] items-center justify-center border-t bg-muted/20 px-4 py-8 text-center">
            <p className="text-xs text-muted-foreground">
              Add a cropped screenshot at{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{hint.imageSrc}</code>
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export { ReportFieldHint };

'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useReportPreview } from '@/modules/admin/hooks/use-report-preview';
import { useReportPreviewRefresh } from '@/modules/admin/components/report-preview-context';
import { ExternalLink, Eye, RefreshCw, X } from 'lucide-react';
import { useState } from 'react';

type ReportPreviewDialogProps = {
  assessmentType: string;
  refreshKey?: number | string;
  className?: string;
};

const ReportPreviewDialog = ({
  assessmentType,
  refreshKey: refreshKeyProp,
  className,
}: ReportPreviewDialogProps) => {
  const [open, setOpen] = useState(false);
  const { refreshKey: contextRefreshKey } = useReportPreviewRefresh();
  const refreshKey = refreshKeyProp ?? contextRefreshKey;
  const { html, loading, error, loadPreview, openPdfPreview, apiBaseConfigured } =
    useReportPreview({
      assessmentType,
      refreshKey,
      enabled: open,
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn('h-8', className)}
          disabled={!apiBaseConfigured}
        >
          <Eye className="size-4 mr-2" aria-hidden="true" />
          Preview report
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="fixed inset-3 z-50 flex h-[calc(100vh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-lg border p-0 shadow-2xl sm:max-w-none"
      >
        <DialogHeader className="flex shrink-0 flex-row items-center justify-between gap-4 border-b px-4 py-3 text-left">
          <div className="min-w-0 space-y-0.5">
            <DialogTitle className="text-base">Report preview</DialogTitle>
            <DialogDescription className="text-xs">
              Content pages with live copy · mock scores for layout
            </DialogDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => void loadPreview()}
              disabled={loading}
            >
              <RefreshCw className={cn('size-3.5 mr-1.5', loading && 'animate-spin')} />
              Refresh
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => void openPdfPreview()}
              disabled={loading}
              title="Generate and open a PDF in a new tab (same content as this preview)"
            >
              <ExternalLink className="size-3.5 mr-1.5" />
              Open PDF
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setOpen(false)}
              aria-label="Close preview"
            >
              <X className="size-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 bg-muted/40 p-3 sm:p-4">
          {loading && !html ? (
            <div className="flex h-full items-center justify-center gap-2 text-muted-foreground">
              <Spinner className="size-5" />
              Loading preview...
            </div>
          ) : error ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="max-w-md text-sm text-destructive">{error}</p>
              <Button type="button" variant="outline" size="sm" onClick={() => void loadPreview()}>
                Try again
              </Button>
            </div>
          ) : html ? (
            <iframe
              title="Report content preview"
              srcDoc={html}
              className="mx-auto h-full w-full max-w-[820px] rounded-md border bg-white shadow-sm"
              sandbox="allow-same-origin"
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ReportPreviewDialog };

/** @deprecated Use ReportPreviewDialog */
export { ReportPreviewDialog as ReportPreviewPanel };

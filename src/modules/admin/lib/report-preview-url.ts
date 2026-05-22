import { getApiBaseUrl } from '@/lib/api-base-url';

type ReportPreviewFormat = 'html' | 'pdf';
type ReportPreviewMode = 'content' | 'full';

type BuildReportPreviewUrlOptions = {
  assessmentType: string;
  format?: ReportPreviewFormat;
  mode?: ReportPreviewMode;
  cacheBust?: number | string;
};

export const buildReportPreviewUrl = ({
  assessmentType,
  format = 'html',
  mode = 'content',
  cacheBust,
}: BuildReportPreviewUrlOptions): string => {
  const params = new URLSearchParams({
    format,
    mode,
  });

  if (cacheBust != null) {
    params.set('t', String(cacheBust));
  }

  return `${getApiBaseUrl()}/api/admin/preview-report/${encodeURIComponent(
    assessmentType
  )}?${params.toString()}`;
};

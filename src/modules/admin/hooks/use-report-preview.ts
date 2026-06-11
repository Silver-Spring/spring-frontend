'use client';

import { getApiBaseUrl } from '@/lib/api-base-url';
import { buildReportPreviewUrl } from '@/modules/admin/lib/report-preview-url';
import { TOKEN_NAME } from '@/modules/auth/hooks';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useCallback, useEffect, useState } from 'react';

type UseReportPreviewOptions = {
  assessmentType: string;
  refreshKey?: number | string;
  enabled?: boolean;
};

export const useReportPreview = ({
  assessmentType,
  refreshKey,
  enabled = false,
}: UseReportPreviewOptions) => {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPreview = useCallback(async () => {
    if (!assessmentType) {
      return;
    }

    setLoading(true);
    setError(null);

    const previewUrl = buildReportPreviewUrl({
      assessmentType,
      format: 'html',
      mode: 'content',
      cacheBust: refreshKey ?? Date.now(),
    });

    const token = Cookies.get(TOKEN_NAME);

    try {
      const response = await fetch(previewUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'text/html',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (response.status === 401) {
        setError('Session expired. Log in again to preview.');
        setHtml(null);
        return;
      }

      if (response.status === 403) {
        setError('Admin access required to preview reports.');
        setHtml(null);
        return;
      }

      if (!response.ok) {
        const message = await response.text().catch(() => '');
        setError(message || `Preview failed (${response.status}).`);
        setHtml(null);
        return;
      }

      const nextHtml = await response.text();
      setHtml(nextHtml);
    } catch {
      setError('Could not load preview. Check your connection and try again.');
      setHtml(null);
    } finally {
      setLoading(false);
    }
  }, [assessmentType, refreshKey]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadPreview();
  }, [enabled, loadPreview]);

  const openPdfPreview = useCallback(async () => {
    const pdfUrl = buildReportPreviewUrl({
      assessmentType,
      format: 'pdf',
      mode: 'full',
      cacheBust: Date.now(),
    });

    const token = Cookies.get(TOKEN_NAME);

    try {
      const response = await fetch(pdfUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/pdf',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const message = await response.text().catch(() => '');
        toast.error(
          message.trim() ||
          `PDF preview failed (${response.status}). Check server logs — HTML preview may still work.`
        );
        return;
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      window.open(blobUrl, '_blank', 'noopener,noreferrer');
      window.setTimeout(() => window.URL.revokeObjectURL(blobUrl), 60_000);
    } catch {
      toast.error('Could not open PDF preview. Check your connection and try again.');
    }
  }, [assessmentType]);

  return {
    html,
    loading,
    error,
    loadPreview,
    openPdfPreview,
    apiBaseConfigured: Boolean(getApiBaseUrl()),
  };
};

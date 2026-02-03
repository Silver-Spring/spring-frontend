import { useState } from 'react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { TOKEN_NAME } from '@/modules/auth/hooks';

const getApiBaseUrl = (): string => {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';
  return graphqlUrl.replace('/graphql', '');
};

interface DownloadReportOptions {
  resultId: string;
  filename?: string;
}

export const useDownloadReport = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadReport = async ({
    resultId,
    filename = `assessment-report-${resultId}.pdf`,
  }: DownloadReportOptions): Promise<boolean> => {
    const apiUrl = getApiBaseUrl();
    const downloadUrl = `${apiUrl}/api/download-report/${resultId}`;
    const token = Cookies.get(TOKEN_NAME);

    setIsDownloading(true);
    let generatingTimer: NodeJS.Timeout | null = null;

    try {
      const downloadPromise = new Promise<void>(async (resolve, reject) => {
        try {
          generatingTimer = setTimeout(() => {
            setIsGenerating(true);
          }, 2000);

          const response = await fetch(downloadUrl, {
            method: 'GET',
            credentials: 'include',
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });

          if (generatingTimer) {
            clearTimeout(generatingTimer);
          }
          setIsGenerating(false);

          if (response.status === 401) {
            window.location.href = '/auth/login';
            reject(new Error('Session expired. Please log in again.'));
            return;
          }

          if (response.status === 403) {
            reject(new Error('You do not have permission to download this report.'));
            return;
          }

          if (response.status === 404) {
            reject(new Error('Report not found. It may have been deleted.'));
            return;
          }

          if (response.status === 500) {
            reject(new Error('Failed to generate report. Please try again in a moment.'));
            return;
          }

          if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            reject(
              new Error(
                error.message || `Download failed with status: ${response.status}`
              )
            );
            return;
          }

          const contentType = response.headers.get('content-type');
          if (contentType !== 'application/pdf') {
            reject(new Error('Invalid file format received'));
            return;
          }

          const blob = await response.blob();

          if (blob.size === 0) {
            reject(new Error('Received empty file'));
            return;
          }

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

          resolve();
        } catch (error) {
          reject(error);
        }
      });

      await toast.promise(downloadPromise, {
        loading: 'Preparing your report...',
        success: 'Your report has been downloaded.',
        error: (err) => {
          const message = err instanceof Error ? err.message : 'Failed to download report. Please try again.';
          return message;
        },
      });

      return true;
    } catch (error) {
      console.error('Download error:', error);
      return false;
    } finally {
      if (generatingTimer) {
        clearTimeout(generatingTimer);
      }
      setIsDownloading(false);
      setIsGenerating(false);
    }
  };

  return {
    downloadReport,
    isDownloading,
    isGenerating,
  };
};

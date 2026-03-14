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

  const downloadReport = async ({
    resultId,
    filename = `assessment-report-${resultId}.pdf`,
  }: DownloadReportOptions): Promise<boolean> => {
    if (isDownloading) {
      return false;
    }

    const apiUrl = getApiBaseUrl();
    const downloadUrl = `${apiUrl}/api/download-report/${resultId}`;
    const token = Cookies.get(TOKEN_NAME);

    setIsDownloading(true);

    try {
      const downloadPromise = new Promise<void>(async (resolve, reject) => {
        try {
          const response = await fetch(downloadUrl, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json, application/pdf',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });

          if (response.status === 401) {
            const redirect = encodeURIComponent(window.location.pathname + window.location.search);
            window.location.href = `/auth/login?redirect=${redirect}`;
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

          if (response.status === 503) {
            reject(new Error('Server is busy generating reports. Please try again in a moment.'));
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

          if (contentType?.includes('application/json')) {
            const data = await response.json();
            
            if (data.success && data.url) {
              window.open(data.url, '_blank');
            } else {
              reject(new Error(data.message || 'Failed to get download URL'));
              return;
            }
          } else if (contentType?.includes('application/pdf')) {
            const blob = await response.blob();

            if (blob.size === 0) {
              reject(new Error('Received empty file'));
              return;
            }

            const disposition = response.headers.get('content-disposition');
            const extractedFilename = disposition?.match(/filename="(.+)"/)?.[1];
            const finalFilename = extractedFilename || filename;

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = finalFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          } else {
            reject(new Error('Unexpected response format'));
            return;
          }

          resolve();
        } catch (error) {
          reject(error);
        }
      });

      await toast.promise(downloadPromise, {
        loading: 'Preparing your report...',
        success: 'Your report download has started.',
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
      setIsDownloading(false);
    }
  };

  return {
    downloadReport,
    isDownloading,
  };
};

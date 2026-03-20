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

    let newWindow: Window | null = null;

    setIsDownloading(true);

    try {
      const downloadPromise = new Promise<void>(async (resolve, reject) => {
        try {
          newWindow = window.open('', '_blank');
          
          if (newWindow && newWindow.document) {
            const loadingHTML = `
              <html>
                <head>
                  <title>Preparing Your Report...</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      min-height: 100vh;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                      background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
                      position: relative;
                      overflow: hidden;
                    }
                    body::before {
                      content: '';
                      position: absolute;
                      top: -50%;
                      left: -50%;
                      width: 200%;
                      height: 200%;
                      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                      animation: pulse 3s ease-in-out infinite;
                    }
                    @keyframes pulse {
                      0%, 100% { opacity: 0.5; transform: scale(1); }
                      50% { opacity: 0.8; transform: scale(1.05); }
                    }
                    .loader {
                      text-align: center;
                      color: white;
                      position: relative;
                      z-index: 1;
                      padding: 40px;
                      background: rgba(0, 0, 0, 0.2);
                      border-radius: 16px;
                      backdrop-filter: blur(10px);
                      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    }
                    .spinner {
                      border: 4px solid rgba(255, 255, 255, 0.2);
                      border-radius: 50%;
                      border-top: 4px solid white;
                      width: 48px;
                      height: 48px;
                      animation: spin 0.8s linear infinite;
                      margin: 0 auto 24px;
                    }
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    h2 { 
                      margin: 0 0 12px; 
                      font-size: 28px; 
                      font-weight: 600;
                      letter-spacing: -0.5px;
                    }
                    p { 
                      margin: 0; 
                      opacity: 0.95; 
                      font-size: 16px;
                    }
                  </style>
                </head>
                <body>
                  <div class="loader">
                    <div class="spinner"></div>
                    <h2>Preparing Your Report</h2>
                    <p>Please wait while we generate your PDF...</p>
                  </div>
                </body>
              </html>
            `;
            newWindow.document.documentElement.innerHTML = loadingHTML;
          }
          
          const response = await fetch(downloadUrl, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json, application/pdf',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });

          if (response.status === 401) {
            if (newWindow) newWindow.close();
            const redirect = encodeURIComponent(window.location.pathname + window.location.search);
            window.location.href = `/auth/login?redirect=${redirect}`;
            reject(new Error('Session expired. Please log in again.'));
            return;
          }

          if (response.status === 403) {
            if (newWindow) newWindow.close();
            reject(new Error('You do not have permission to download this report.'));
            return;
          }

          if (response.status === 404) {
            if (newWindow) newWindow.close();
            reject(new Error('Report not found. It may have been deleted.'));
            return;
          }

          if (response.status === 500) {
            if (newWindow) newWindow.close();
            reject(new Error('Failed to generate report. Please try again in a moment.'));
            return;
          }

          if (response.status === 503) {
            if (newWindow) newWindow.close();
            reject(new Error('Server is busy generating reports. Please try again in a moment.'));
            return;
          }

          if (!response.ok) {
            if (newWindow) newWindow.close();
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
              if (newWindow) {
                newWindow.location.href = data.url;
              } else {
                window.location.href = data.url;
              }
            } else {
              if (newWindow) newWindow.close();
              reject(new Error(data.message || 'Failed to get download URL'));
              return;
            }
          } else if (contentType?.includes('application/pdf')) {
            const blob = await response.blob();

            if (blob.size === 0) {
              if (newWindow) newWindow.close();
              reject(new Error('Received empty file'));
              return;
            }

            const disposition = response.headers.get('content-disposition');
            const extractedFilename = disposition?.match(/filename="(.+)"/)?.[1];
            const finalFilename = extractedFilename || filename;

            const blobUrl = window.URL.createObjectURL(blob);
            
            if (newWindow) {
              newWindow.location.href = blobUrl;
            } else {
              const a = document.createElement('a');
              a.href = blobUrl;
              a.download = finalFilename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
            
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
          } else {
            if (newWindow) newWindow.close();
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

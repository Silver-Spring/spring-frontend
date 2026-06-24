import { getApiBaseUrl } from '@/lib/api-base-url';
import { TOKEN_NAME } from '@/modules/auth/hooks';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { toast } from 'sonner';

export const useDownloadWorkbook = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadWorkbook = async (): Promise<boolean> => {
    if (isDownloading) return false;

    const apiUrl = getApiBaseUrl();
    const downloadUrl = `${apiUrl}/api/download-workbook`;
    const token = Cookies.get(TOKEN_NAME);

    let newWindow: Window | null = null;
    setIsDownloading(true);

    try {
      const downloadPromise = new Promise<void>(async (resolve, reject) => {
        try {
          newWindow = window.open('', '_blank');

          if (newWindow?.document) {
            newWindow.document.documentElement.innerHTML = `
              <html>
                <head><title>Preparing Your Workbook...</title>
                <style>
                  body { margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh;
                    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                    background:linear-gradient(135deg,#10b981 0%,#059669 50%,#047857 100%); }
                  .loader { text-align:center; color:white; padding:40px; background:rgba(0,0,0,0.2);
                    border-radius:16px; backdrop-filter:blur(10px); }
                  .spinner { border:4px solid rgba(255,255,255,0.2); border-radius:50%;
                    border-top:4px solid white; width:48px; height:48px;
                    animation:spin 0.8s linear infinite; margin:0 auto 24px; }
                  @keyframes spin { to { transform:rotate(360deg); } }
                  h2 { margin:0 0 12px; font-size:28px; font-weight:600; }
                  p { margin:0; opacity:0.95; font-size:16px; }
                </style></head>
                <body><div class="loader"><div class="spinner"></div>
                  <h2>Preparing Your Workbook</h2>
                  <p>Please wait while we generate your PDF...</p>
                </div></body>
              </html>`;
          }

          const response = await fetch(downloadUrl, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              Accept: 'application/json, application/pdf',
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
            reject(new Error('Please complete your purchase first.'));
            return;
          }

          if (!response.ok) {
            if (newWindow) newWindow.close();
            const err = await response.json().catch(() => ({}));
            reject(new Error(err.message || 'Download failed. Please try again.'));
            return;
          }

          const contentType = response.headers.get('content-type');

          if (contentType?.includes('application/json')) {
            const data = await response.json();
            if (!data.success || !data.url) {
              if (newWindow) newWindow.close();
              reject(new Error(data.message || 'Failed to get download URL'));
              return;
            }
            // Navigate the already-open tab to the PDF — keeps original tab open
            if (newWindow) newWindow.location.href = data.url;
            else window.open(data.url, '_blank');
          } else if (contentType?.includes('application/pdf')) {
            // Local dev: streams PDF directly
            const blob = await response.blob();
            if (blob.size === 0) {
              if (newWindow) newWindow.close();
              reject(new Error('Received empty file'));
              return;
            }
            const blobUrl = window.URL.createObjectURL(blob);
            if (newWindow) newWindow.location.href = blobUrl;
            else window.open(blobUrl, '_blank');
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
        loading: 'Preparing your workbook...',
        success: 'Your workbook download has started.',
        error: (err) => (err instanceof Error ? err.message : 'Failed to download. Please try again.'),
      });

      return true;
    } catch {
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadWorkbook, isDownloading };
};

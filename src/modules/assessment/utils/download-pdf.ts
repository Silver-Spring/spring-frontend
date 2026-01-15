import Cookies from 'js-cookie';
import { TOKEN_NAME } from '@/modules/auth/hooks';

const getApiBaseUrl = (): string => {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || '';
  return graphqlUrl.replace('/graphql', '');
};

export const downloadAssessmentReport = async (resultId: string): Promise<void> => {
  const apiUrl = getApiBaseUrl();
  const downloadUrl = `${apiUrl}/api/download-report/${resultId}`;
  const token = Cookies.get(TOKEN_NAME);

  try {
    const response = await fetch(downloadUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.status === 202) {
      alert('Report is still being generated. Please wait a moment and try again...');
      return;
    }

    if (response.status === 401) {
      alert('Session expired. Please log in again.');
      window.location.href = '/auth/login';
      return;
    }

    if (response.status === 403) {
      alert('You do not have permission to download this report.');
      return;
    }

    if (response.status === 404) {
      alert('Report not found. Please check your email or contact support.');
      return;
    }

    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessment-report-${resultId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download error:', error);
    alert('Failed to download report. Please try again or check your email.');
  }
};

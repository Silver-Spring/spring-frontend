'use client';

import posthog from 'posthog-js';
import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error, {
      error_boundary: 'global_error',
      digest: error.digest,
      critical: true,
    });
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}

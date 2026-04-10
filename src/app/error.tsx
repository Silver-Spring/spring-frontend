'use client';

import posthog from 'posthog-js';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error, {
      error_boundary: 'app_error',
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-16 w-16 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-muted-foreground">
            We apologize for the inconvenience. An error occurred while processing your request.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-left">
            <p className="text-sm font-mono text-destructive">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

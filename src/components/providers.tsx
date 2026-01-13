'use client';

import { CookiesProvider } from 'react-cookie';
import { WithApollo } from '@/lib/apollo';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CookiesProvider>
      <WithApollo>
        {children}
        <Toaster richColors />
      </WithApollo>
    </CookiesProvider>
  );
}

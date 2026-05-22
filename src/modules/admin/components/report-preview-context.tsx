'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

type ReportPreviewRefreshContextValue = {
  refreshKey: number;
  bumpPreview: () => void;
};

const ReportPreviewRefreshContext = createContext<ReportPreviewRefreshContextValue | null>(null);

const ReportPreviewRefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(() => Date.now());

  const bumpPreview = useCallback(() => {
    setRefreshKey(Date.now());
  }, []);

  return (
    <ReportPreviewRefreshContext.Provider value={{ refreshKey, bumpPreview }}>
      {children}
    </ReportPreviewRefreshContext.Provider>
  );
};

const useReportPreviewRefresh = (): ReportPreviewRefreshContextValue => {
  const context = useContext(ReportPreviewRefreshContext);

  if (!context) {
    return {
      refreshKey: Date.now(),
      bumpPreview: () => {},
    };
  }

  return context;
};

export { ReportPreviewRefreshProvider, useReportPreviewRefresh };

'use client';

import {
  AssessmentTypeCode,
  DEFAULT_ASSESSMENT_TYPE,
} from '@/modules/assessment/constants';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type AssessmentTypeContextValue = {
  selectedType: AssessmentTypeCode;
  setSelectedType: (type: AssessmentTypeCode) => void;
};

const AssessmentTypeContext = createContext<AssessmentTypeContextValue | null>(null);

type AssessmentTypeProviderProps = {
  children: ReactNode;
  defaultType?: AssessmentTypeCode;
};

export const AssessmentTypeProvider = ({
  children,
  defaultType = DEFAULT_ASSESSMENT_TYPE,
}: AssessmentTypeProviderProps) => {
  const [selectedType, setSelectedType] = useState<AssessmentTypeCode>(defaultType);

  const value = useMemo(
    () => ({ selectedType, setSelectedType }),
    [selectedType]
  );

  return (
    <AssessmentTypeContext.Provider value={value}>{children}</AssessmentTypeContext.Provider>
  );
};

export const useAssessmentTypeContext = () => {
  const context = useContext(AssessmentTypeContext);
  if (!context) {
    throw new Error('useAssessmentTypeContext must be used within AssessmentTypeProvider');
  }
  return context;
};

export const useOptionalAssessmentTypeContext = () => {
  return useContext(AssessmentTypeContext);
};

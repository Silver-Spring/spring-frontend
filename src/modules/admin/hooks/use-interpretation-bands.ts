'use client';

import { useQuery } from '@apollo/client/react';
import { useCallback } from 'react';
import {
  OverallInterpretationBandsDoc,
  SectionInterpretationBandsDoc,
} from '../graphql';

export type BandScope = 'section' | 'overall';

export type SectionTypeKey =
  | 'psychological'
  | 'social'
  | 'mental'
  | 'physical'
  | 'lifestyle';

export const useInterpretationBands = (assessmentType: string) => {
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
    refetch: refetchSection,
  } = useQuery(SectionInterpretationBandsDoc, {
    variables: { type: assessmentType },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: overallData,
    loading: overallLoading,
    error: overallError,
    refetch: refetchOverall,
  } = useQuery(OverallInterpretationBandsDoc, {
    variables: { type: assessmentType },
    notifyOnNetworkStatusChange: true,
  });

  const sectionBands = sectionData?.assessmentInterpretationBands?.nodes ?? [];
  const overallBands = overallData?.assessmentInterpretationBands?.nodes ?? [];

  const refetch = useCallback(async () => {
    await Promise.all([refetchSection(), refetchOverall()]);
  }, [refetchSection, refetchOverall]);

  return {
    sectionBands,
    overallBands,
    loading: sectionLoading || overallLoading,
    error: sectionError ?? overallError,
    refetch,
  };
};

export type SectionInterpretationBandNode = NonNullable<
  ReturnType<typeof useInterpretationBands>['sectionBands'][number]
>;

export type OverallInterpretationBandNode = NonNullable<
  ReturnType<typeof useInterpretationBands>['overallBands'][number]
>;

export type InterpretationBandNode =
  | SectionInterpretationBandNode
  | OverallInterpretationBandNode;

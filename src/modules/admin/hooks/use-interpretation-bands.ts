'use client';

import { useQuery } from '@apollo/client/react';
import { useCallback } from 'react';
import {
  OverallInterpretationBandsDoc,
  SectionInterpretationBandsDoc,
} from '../graphql';

export type BandScope = 'section' | 'overall';

export type SectionTypeKey = string;

type UseInterpretationBandsOptions = {
  loadSection?: boolean;
  loadOverall?: boolean;
};

export const useInterpretationBands = (
  assessmentType: string,
  options?: UseInterpretationBandsOptions
) => {
  const loadSection = options?.loadSection ?? true;
  const loadOverall = options?.loadOverall ?? true;

  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
    refetch: refetchSection,
  } = useQuery(SectionInterpretationBandsDoc, {
    variables: { type: assessmentType },
    skip: !loadSection,
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: overallData,
    loading: overallLoading,
    error: overallError,
    refetch: refetchOverall,
  } = useQuery(OverallInterpretationBandsDoc, {
    variables: { type: assessmentType },
    skip: !loadOverall,
    notifyOnNetworkStatusChange: true,
  });

  const sectionBands = sectionData?.assessmentInterpretationBands?.nodes ?? [];
  const overallBands = overallData?.assessmentInterpretationBands?.nodes ?? [];

  const refetch = useCallback(async () => {
    await Promise.all([
      loadSection ? refetchSection() : Promise.resolve(),
      loadOverall ? refetchOverall() : Promise.resolve(),
    ]);
  }, [loadSection, loadOverall, refetchSection, refetchOverall]);

  return {
    sectionBands,
    overallBands,
    loading: (loadSection && sectionLoading) || (loadOverall && overallLoading),
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

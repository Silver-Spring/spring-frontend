'use client';

import { useQuery } from '@apollo/client/react';
import { ReminderCandidatesDoc } from '../graphql/reminder-candidates.graphql';

export const useReminderCandidates = (reminderType: string) => {
  const { data, loading, error, refetch } = useQuery(ReminderCandidatesDoc, {
    variables: { reminderType },
    skip: !reminderType,
    fetchPolicy: 'network-only',
  });

  const users = data?.adminReminderCandidates?.users ?? [];
  const totalCount = data?.adminReminderCandidates?.totalCount ?? 0;

  return {
    users,
    totalCount,
    loading,
    error,
    refetch,
  };
};

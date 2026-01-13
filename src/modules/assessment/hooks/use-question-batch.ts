'use client';

import { useQuery } from '@apollo/client/react';
import { GetQuestionBatchDoc } from '../graphql/get-question-batch.graphql';

export const useQuestionBatch = (batchNumber: number) => {
  const { data, loading, error, refetch } = useQuery(GetQuestionBatchDoc, {
    variables: { batchNumber },
    skip: batchNumber < 1 || batchNumber > 10,
    fetchPolicy: 'cache-and-network',
  });

  return {
    batch: data?.getQuestionBatch || null,
    questions: data?.getQuestionBatch?.questions || [],
    batchNumber: data?.getQuestionBatch?.batchNumber || batchNumber,
    totalBatches: data?.getQuestionBatch?.totalBatches || 10,
    currentBatchStartIndex: data?.getQuestionBatch?.currentBatchStartIndex || 0,
    currentBatchEndIndex: data?.getQuestionBatch?.currentBatchEndIndex || 0,
    loading,
    error,
    refetch,
  };
};

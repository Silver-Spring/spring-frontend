'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  useAssessmentProgress,
  useBatchSubmit,
  useCompleteAssessment,
  useQuestionBatch,
  useSessionQuestions,
} from '@/modules/assessment/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface AssessmentPageProps {
  sessionId: string;
}

export const AssessmentPage = ({ sessionId }: AssessmentPageProps) => {
  const router = useRouter();

  // Fetch session to get previous responses and current question number
  const { previousResponses, session, refetch: refetchSession } = useSessionQuestions(sessionId);

  // Calculate which batch to start from based on currentQuestionNumber
  // If user answered questions 1-5, currentQuestionNumber will be 6 (start of batch 2)
  // Formula: batchNumber = Math.ceil(currentQuestionNumber / 5)
  const initialBatchNumber = useMemo(() => {
    const currentQuestionNumber = session?.currentQuestionNumber ?? 1;
    // If currentQuestionNumber is 1-5, batch is 1; 6-10, batch is 2; etc.
    return Math.max(1, Math.ceil(currentQuestionNumber / 5));
  }, [session?.currentQuestionNumber]);

  const [currentBatchNumber, setCurrentBatchNumber] = useState(initialBatchNumber);
  const [batchResponses, setBatchResponses] = useState<Map<string, number>>(new Map());
  const [batchStartTime, setBatchStartTime] = useState(Date.now());
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Update batch number when session data loads (only on initial mount)
  useEffect(() => {
    if (!hasInitialized && initialBatchNumber > 1) {
      setCurrentBatchNumber(initialBatchNumber);
      setHasInitialized(true);
    }
  }, [initialBatchNumber, hasInitialized]);

  // Fetch current batch
  const { batch, loading: batchLoading } = useQuestionBatch(currentBatchNumber);

  const { batchSubmit, loading: submitting } = useBatchSubmit();
  const { completeAssessment, loading: completing } = useCompleteAssessment();
  const { progress, refetch: refetchProgress } = useAssessmentProgress();

  // Build a map of previous answers for easy lookup
  const previousAnswersMap = useMemo(() => {
    const map = new Map<string, number>();
    if (previousResponses && Array.isArray(previousResponses)) {
      previousResponses.forEach((response: { questionId: string; responseValue: number }) => {
        map.set(response.questionId, response.responseValue);
      });
    }
    return map;
  }, [previousResponses]);

  // Initialize batch responses with previous answers
  useEffect(() => {
    if (batch?.questions && batch.questions.length > 0) {
      const newResponses = new Map<string, number>();
      batch.questions.forEach((sessionQuestion) => {
        const previousValue = previousAnswersMap.get(sessionQuestion.questionId);
        if (previousValue) {
          newResponses.set(sessionQuestion.questionId, previousValue);
        }
      });
      setBatchResponses(newResponses);
    }
  }, [batch?.questions, previousAnswersMap]);

  const totalBatches = batch?.totalBatches ?? 10;
  const totalQuestions = totalBatches * 5; // 10 batches × 5 questions each

  // Use backend's progress calculation
  const answeredCount = progress?.answeredQuestions ?? previousAnswersMap.size;
  const progressPercentage = progress?.progressPercentage ?? 0;

  useEffect(() => {
    setBatchStartTime(Date.now());
  }, [currentBatchNumber]);

  const handleSliderChange = (questionId: string, value: number[]) => {
    setBatchResponses(new Map(batchResponses.set(questionId, value[0])));
  };

  // Check if all questions in current batch are answered
  const allBatchQuestionsAnswered = useMemo(() => {
    if (!batch?.questions) return false;
    return batch.questions.every((q) => batchResponses.has(q.questionId));
  }, [batch?.questions, batchResponses]);

  const handleNext = async () => {
    if (!batch || isNavigating) return;

    if (!allBatchQuestionsAnswered) {
      toast.error('Please answer all questions in this batch before continuing');
      return;
    }

    setIsNavigating(true);
    try {
      // Prepare responses array for submission
      const responsesToSubmit = batch.questions.map((sessionQuestion) => {
        const responseValue = batchResponses.get(sessionQuestion.questionId);
        const timeTaken = Math.floor((Date.now() - batchStartTime) / 1000 / batch.questions.length);
        return {
          questionId: sessionQuestion.questionId,
          responseValue: responseValue!,
          timeTakenSeconds: timeTaken,
        };
      });

      // Submit batch responses
      const result = await batchSubmit(sessionId, responsesToSubmit);

      if (!result.success) {
        toast.error(result.message || 'Failed to save your answers. Please try again.');
        return;
      }

      // Refetch session data to get updated previousResponses
      await refetchSession();

      // Refetch progress to get updated answered count
      const updatedProgress = await refetchProgress();
      const allAnswered =
        updatedProgress.data?.assessmentProgress?.answeredQuestions === totalQuestions;

      if (allAnswered) {
        // All questions answered - complete assessment
        const completeResult = await completeAssessment(sessionId);
        if (completeResult.success && completeResult.result?.id) {
          router.replace(`/assessment/results/${completeResult.result.id}`);
        } else {
          toast.error(completeResult.message || 'Failed to complete assessment. Please try again.');
        }
      } else {
        // Move to next batch
        setCurrentBatchNumber(currentBatchNumber + 1);
        setBatchResponses(new Map());
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsNavigating(false);
    }
  };

  const handlePrevious = async () => {
    if (currentBatchNumber > 1 && !isNavigating) {
      setIsNavigating(true);
      try {
        // If user changed any answers, save them before moving
        const changedResponses = batch?.questions.filter((sessionQuestion) => {
          const currentValue = batchResponses.get(sessionQuestion.questionId);
          const previousValue = previousAnswersMap.get(sessionQuestion.questionId);
          return currentValue && currentValue !== previousValue;
        });

        if (changedResponses && changedResponses.length > 0) {
          const responsesToSubmit = changedResponses.map((sessionQuestion) => {
            const responseValue = batchResponses.get(sessionQuestion.questionId);
            const timeTaken = Math.floor(
              (Date.now() - batchStartTime) / 1000 / batch!.questions.length
            );
            return {
              questionId: sessionQuestion.questionId,
              responseValue: responseValue!,
              timeTakenSeconds: timeTaken,
            };
          });

          await batchSubmit(sessionId, responsesToSubmit);
          // Refetch session data after saving changes
          await refetchSession();
        }

        setCurrentBatchNumber(currentBatchNumber - 1);
        setBatchResponses(new Map());
      } catch (error) {
        console.error('Error saving before going back:', error);
        // Still allow navigation even if save fails
        setCurrentBatchNumber(currentBatchNumber - 1);
        setBatchResponses(new Map());
      } finally {
        setIsNavigating(false);
      }
    }
  };

  // Check if all questions are answered OR if user is on last batch with all questions answered
  const allQuestionsAnswered =
    progress?.answeredQuestions === totalQuestions ||
    (currentBatchNumber === totalBatches && allBatchQuestionsAnswered);

  const handleCompleteAssessment = async () => {
    if (!allQuestionsAnswered) {
      toast.error('Please answer all questions before completing the assessment.');
      return;
    }

    setIsNavigating(true);
    try {
      // First, submit the final batch if there are any unsaved responses
      if (batch && allBatchQuestionsAnswered) {
        const responsesToSubmit = batch.questions.map((sessionQuestion) => {
          const responseValue = batchResponses.get(sessionQuestion.questionId);
          const timeTaken = Math.floor(
            (Date.now() - batchStartTime) / 1000 / batch.questions.length
          );
          return {
            questionId: sessionQuestion.questionId,
            responseValue: responseValue!,
            timeTakenSeconds: timeTaken,
          };
        });

        const result = await batchSubmit(sessionId, responsesToSubmit);
        if (!result.success) {
          toast.error(result.message || 'Failed to save your final answers. Please try again.');
          return;
        }
      }

      // Now complete the assessment
      const completeResult = await completeAssessment(sessionId);
      if (completeResult.success && completeResult.result?.id) {
        router.replace(`/assessment/results/${completeResult.result.id}`);
      } else {
        toast.error(completeResult.message || 'Failed to complete assessment. Please try again.');
      }
    } catch (error) {
      console.error('Error completing assessment:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsNavigating(false);
    }
  };

  if (batchLoading) {
    return (
      <ProtectedLayout>
        {() => (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner className="size-8" />
          </div>
        )}
      </ProtectedLayout>
    );
  }

  if (!batch || !batch.questions || batch.questions.length === 0) {
    return (
      <ProtectedLayout>
        {() => (
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>No Questions Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Unable to load assessment questions.</p>
                <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </ProtectedLayout>
    );
  }

  const startQuestionNumber = batch.currentBatchStartIndex;
  const endQuestionNumber = batch.currentBatchEndIndex;

  return (
    <ProtectedLayout>
      {() => (
        <div className="min-h-screen bg-linear-to-b from-green-50/50 to-green-100/30">
          {/* Questions Container */}
          <div className="container mx-auto px-4 py-10 max-w-6xl">
            <div className="bg-white rounded-[50px] p-10 md:p-16 lg:p-20 shadow-none">
              {/* Progress Header */}
              <div className="mb-8 pb-6 border-b">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center w-full">
                    <span className="text-sm font-medium text-foreground shrink-0">
                      Question {startQuestionNumber}-{endQuestionNumber} of {totalQuestions}
                    </span>
                    <div className="flex-1 mx-4">
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <span className="text-sm font-semibold text-foreground shrink-0">
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-12">
                {batch.questions.map((sessionQuestion, index) => {
                  const currentResponse = batchResponses.get(sessionQuestion.questionId);
                  const wasPreviouslyAnswered = previousAnswersMap.has(sessionQuestion.questionId);
                  const questionNumber = startQuestionNumber + index;

                  return (
                    <div key={sessionQuestion.id} className="space-y-6">
                      {/* Question Header */}
                      <div>
                        <h3 className="text-base font-semibold text-foreground leading-relaxed">
                          <span>{questionNumber}.</span> {sessionQuestion.questionText}
                        </h3>
                      </div>

                      {/* Response Scale */}
                      <div className="space-y-4">
                        {/* Value buttons grid */}
                        <div className="grid grid-cols-10 gap-2.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <Button
                              variant="outline"
                              size="lg"
                              key={num}
                              type="button"
                              onClick={() => handleSliderChange(sessionQuestion.questionId, [num])}
                              className={cn(
                                'aspect-square rounded-xl font-medium text-sm transition-all',
                                currentResponse === num
                                  ? 'bg-primary text-primary-foreground shadow-md scale-105 border-primary hover:bg-primary hover:border-primary hover:text-primary-foreground'
                                  : 'bg-white border-2 border-gray-200 text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary'
                              )}
                            >
                              {num}
                            </Button>
                          ))}
                        </div>

                        {/* Scale labels */}
                        <div className="flex justify-between text-xs text-muted-foreground pt-2">
                          <span>Strongly Disagree</span>
                          <span>Neutral</span>
                          <span>Strongly Agree</span>
                        </div>

                        {/* Previously answered indicator */}
                        {wasPreviouslyAnswered && (
                          <div className="flex items-center gap-2 text-xs text-primary bg-primary/5 px-3 py-2 rounded-lg mt-3">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>Previously Answered you can change your Response.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Helper text */}
              {!allBatchQuestionsAnswered && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-8 flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-600 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-sm text-red-800 font-medium">
                    Please Answer all Questions to continue
                  </span>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-end mt-8 gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handlePrevious}
                  disabled={currentBatchNumber === 1 || isNavigating || submitting || completing}
                  className="gap-2 px-6"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>

                {!allQuestionsAnswered ? (
                  <Button
                    size="lg"
                    onClick={handleNext}
                    disabled={
                      !allBatchQuestionsAnswered || isNavigating || submitting || completing
                    }
                    className="gap-2 px-8 min-w-60"
                  >
                    {isNavigating || submitting ? (
                      <>
                        <Spinner className="size-4" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="size-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={handleCompleteAssessment}
                    disabled={isNavigating || submitting || completing}
                    className="gap-2 px-8 bg-green-600 hover:bg-green-700"
                  >
                    {isNavigating || submitting || completing ? (
                      <>
                        <Spinner className="size-4" />
                        Completing...
                      </>
                    ) : (
                      'Complete Assessment'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

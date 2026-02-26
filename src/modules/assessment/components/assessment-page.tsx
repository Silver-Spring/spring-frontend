'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import {
  useCompleteAssessment,
  useCurrentSession,
  useQuestionFlow,
  useSubmitOrUpdateResponse,
} from '@/modules/assessment/hooks';
import { CheckCircleIcon, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface AssessmentPageProps {
  sessionId: string;
}

export const AssessmentPage = ({ sessionId }: AssessmentPageProps) => {
  const router = useRouter();

  const { currentSession, loading: sessionLoading } = useCurrentSession();

  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [optimisticValue, setOptimisticValue] = useState<number | null>(null);

  const [currentProgress, setCurrentProgress] = useState<{
    answeredCount: number;
    totalCount: number;
    percentComplete: number;
  } | null>(null);

  const prevQuestionRef = useRef<HTMLDivElement | null>(null);
  const currentQuestionRef = useRef<HTMLDivElement | null>(null);
  const nextQuestionRef = useRef<HTMLDivElement | null>(null);

  const { current, previous, next } = useQuestionFlow({
    sessionId,
    questionNumber,
    enablePrefetch: true,
  });

  const {
    question,
    currentResponse,
    progress,
    loading: questionLoading,
    error: questionError,
  } = current;

  const prevQuestion = previous?.question;
  const prevResponse = previous?.currentResponse;
  const nextQuestion = next?.question;

  const { submitOrUpdateResponse, loading: submitting } = useSubmitOrUpdateResponse();
  const { completeAssessment, loading: completing } = useCompleteAssessment();

  useEffect(() => {
    if (!isInitialized && currentSession && currentSession.currentQuestionNumber) {
      setQuestionNumber(currentSession.currentQuestionNumber);
      setIsInitialized(true);
    } else if (!isInitialized && !sessionLoading && !currentSession) {
      setIsInitialized(true);
    }
  }, [currentSession, sessionLoading, isInitialized]);

  useEffect(() => {
    if (progress && !currentProgress) {
      setCurrentProgress({
        answeredCount: progress.answeredCount ?? 0,
        totalCount: progress.totalCount ?? 50,
        percentComplete: progress.percentComplete ?? 0,
      });
    }
  }, [progress, currentProgress]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setOptimisticValue(null);
  }, [questionNumber]);

  useEffect(() => {
    if (currentQuestionRef.current) {
      const id = setTimeout(() => {
        currentQuestionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => clearTimeout(id);
    }
  }, [questionNumber]);

  const handleAnswerSelect = async (value: number) => {
    if (isTransitioning || completing || !question) return;

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);

    setOptimisticValue(value);
    setIsTransitioning(true);

    try {
      const result = await submitOrUpdateResponse({
        sessionId,
        questionId: question.questionId,
        questionNumber,
        responseValue: value,
        timeTakenSeconds: timeTaken,
        isNavigatingForward: true,
      });

      if (result.progress) {
        setCurrentProgress({
          answeredCount: result.progress.answeredCount,
          totalCount: result.progress.totalCount,
          percentComplete: result.progress.percentComplete ?? 0,
        });
      }

      setIsFadingOut(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (questionNumber >= 50) {
        await handleComplete();
      } else if (result.nextQuestion.hasNext) {
        setQuestionNumber((prev) => prev + 1);

        setTimeout(() => setIsFadingOut(false), 50);
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
      toast.error('Failed to save answer. Please try again.');
      setOptimisticValue(null);
    } finally {
      setIsTransitioning(false);
    }
  };

  const handlePrevious = async () => {
    if (isTransitioning || questionNumber <= 1) return;

    setIsFadingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setQuestionNumber((prev) => prev - 1);
    setTimeout(() => setIsFadingOut(false), 50);
  };

  const handleBack = () => {
    router.push('/dashboard');
    return;
  };

  const handleComplete = async () => {
    try {
      setShowCompletionMessage(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const result = await completeAssessment(sessionId);

      if (result.success && result.result?.id) {
        router.replace(`/assessment/results/${result.result.id}`);
      } else {
        setShowCompletionMessage(false);
        toast.error(result.message || 'Failed to complete assessment. Please try again.');
      }
    } catch (error) {
      setShowCompletionMessage(false);
      console.error('Failed to complete assessment:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (!isInitialized || (questionLoading && !question)) {
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

  if (questionError || !question) {
    return (
      <ProtectedLayout>
        {() => (
          <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
            <p className="text-muted-foreground text-center">
              {questionError?.message || 'Unable to load assessment question.'}
            </p>
            <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
          </div>
        )}
      </ProtectedLayout>
    );
  }

  const selectedValue = optimisticValue ?? currentResponse?.responseValue ?? null;
  const isDisabled = isTransitioning || completing;

  return (
    <ProtectedLayout>
      {() => (
        <div className="flex flex-col bg-background">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
            <div className="container mx-auto px-4 py-3 max-w-2xl">
              <div className="flex items-center gap-2 mb-2.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  disabled={isDisabled || questionNumber === 1}
                  aria-label="Previous question"
                  className="shrink-0 -ml-2 size-8"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex flex-1 items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    Question <span className="text-primary">{questionNumber}</span>{' '}
                    <span className="text-muted-foreground">of 50</span>
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {Math.round(currentProgress?.percentComplete ?? progress.percentComplete ?? 0)}%
                  </span>
                </div>
              </div>
              <Progress
                value={currentProgress?.percentComplete ?? progress.percentComplete ?? 0}
                className="h-1.5 transition-all duration-500 **:data-[slot=progress-indicator]:bg-green-700"
              />
            </div>
          </div>

          <div className="flex-1 container mx-auto px-4 max-w-2xl py-6">
            <div className="space-y-6">
              {prevQuestion && (
                <div
                  key={`question-${questionNumber - 1}`}
                  ref={prevQuestionRef}
                  onClick={() => !isTransitioning && handlePrevious()}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isTransitioning) {
                      e.preventDefault();
                      handlePrevious();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go back to question ${questionNumber - 1}`}
                  className={`scroll-mt-20 rounded-xl border border-green-100 dark:border-green-900/30 p-6 md:p-8 transition-all duration-500 ease-in-out bg-green-50/30 dark:bg-green-950/10 cursor-pointer ${
                    isFadingOut
                      ? 'opacity-0 -translate-y-4'
                      : 'opacity-40 translate-y-0 hover:opacity-60 hover:border-green-200 dark:hover:border-green-800/40 hover:shadow-sm hover:bg-green-50/40 dark:hover:bg-green-950/15'
                  } ${isTransitioning ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="mb-8">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold shrink-0 mt-0.5 transition-colors duration-300 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        {prevResponse?.responseValue !== undefined ? (
                          <CheckCircleIcon className="size-4" />
                        ) : (
                          questionNumber - 1
                        )}
                      </span>
                      <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/70">
                        {prevQuestion.questionText}
                      </p>
                    </div>
                  </div>
                  {prevResponse && (
                    <div className="flex justify-center">
                      <span className="text-sm text-green-600 dark:text-green-500 italic">
                        Click to edit
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div
                key={`question-${questionNumber}`}
                ref={currentQuestionRef}
                aria-current="step"
                className={`scroll-mt-20 rounded-xl border border-green-200 dark:border-green-800/50 p-6 md:p-8 transition-all duration-500 ease-in-out shadow-md bg-green-50/50 dark:bg-green-950/20 ${
                  isFadingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="mb-8">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold shrink-0 mt-0.5 bg-green-700 dark:bg-green-700 text-white transition-colors duration-300">
                      {questionNumber}
                    </span>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-green-900 dark:text-green-100">
                      {question.questionText}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-green-700 dark:text-green-400 text-center">
                    Tap how much this resonates with you
                  </p>

                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const isSelected = selectedValue === num;
                      return (
                        <Button
                          key={num}
                          type="button"
                          variant={isSelected ? 'default' : 'outline'}
                          onClick={() => handleAnswerSelect(num)}
                          disabled={isDisabled}
                          aria-label={`Option ${num} out of 10`}
                          aria-pressed={isSelected}
                          className={`aspect-square h-auto w-full p-0 rounded-full text-sm font-semibold transition-all duration-150 ${
                            isSelected
                              ? 'bg-green-700 hover:bg-green-800 border-green-700 text-white shadow-md scale-110 ring-2 ring-green-700 ring-offset-2'
                              : 'border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-400 hover:scale-105'
                          }`}
                        >
                          {num}
                        </Button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between text-xs text-green-600/70 dark:text-green-500/70 px-1 pt-1">
                    <span>Strongly Disagree</span>
                    <span>Neutral</span>
                    <span>Strongly Agree</span>
                  </div>
                </div>
              </div>

              {nextQuestion && questionNumber < 50 && (
                <div
                  key={`question-${questionNumber + 1}`}
                  ref={nextQuestionRef}
                  className={`scroll-mt-20 rounded-xl border border-green-100 dark:border-green-900/20 p-6 md:p-8 transition-all duration-500 ease-in-out pointer-events-none bg-green-50/20 dark:bg-green-950/5 ${
                    isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-15 translate-y-0'
                  }`}
                >
                  <div className="mb-8">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold shrink-0 mt-0.5 transition-colors duration-300 bg-green-100/50 dark:bg-green-900/20 text-green-600 dark:text-green-500">
                        {questionNumber + 1}
                      </span>
                      <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground/70">
                        {nextQuestion.questionText}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showCompletionMessage && (
              <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center space-y-4 px-4">
                  <div className="flex justify-center">
                    <Spinner className="size-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                      Crafting Your Personalized Results
                    </h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're analyzing your responses to create meaningful insights tailored just for
                      you...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {(submitting || completing) && !showCompletionMessage && (
              <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/90 border rounded-full px-4 py-2 shadow-sm text-xs text-muted-foreground z-20 pointer-events-none">
                <Spinner className="size-3" />
                <span>{completing ? 'Completing assessment…' : 'Saving…'}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import {
  useCompleteAssessment,
  useCurrentSession,
  useQuestionFlow,
  useSubmitOrUpdateResponse,
} from '@/modules/assessment/hooks';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { TOTAL_QUESTIONS } from '../constants';
import {
  AssessmentHeader,
  CompletionOverlay,
  LoadingScreen,
  LoadingToast,
  QuestionCard,
} from './assessment-components';

interface AssessmentPageProps {
  sessionId: string;
}

export const AssessmentPage = ({ sessionId }: AssessmentPageProps) => {
  const router = useRouter();

  const { currentSession, loading: sessionLoading } = useCurrentSession();

  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [optimisticValue, setOptimisticValue] = useState<number | null>(null);
  const [optimisticProgress, setOptimisticProgress] = useState<number | null>(null);

  const currentQuestionRef = useRef<HTMLDivElement | null>(null);
  const lastProgressRef = useRef<{ questionNumber: number; percent: number } | null>(null);

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
    if (currentSession?.currentQuestionNumber && questionNumber === 1) {
      setQuestionNumber(currentSession.currentQuestionNumber);
    }
  }, [currentSession, questionNumber]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setOptimisticValue(null);
  }, [questionNumber]);

  useEffect(() => {
    const currentPercent = progress.percentComplete;
    
    if (currentPercent !== undefined && optimisticProgress !== null) {
      const lastProgress = lastProgressRef.current;
      const hasProgressChanged =
        !lastProgress ||
        lastProgress.questionNumber !== questionNumber ||
        lastProgress.percent !== currentPercent;

      if (hasProgressChanged) {
        lastProgressRef.current = { questionNumber, percent: currentPercent };
        
        const timer = setTimeout(() => {
          setOptimisticProgress(null);
        }, 100);
        
        return () => clearTimeout(timer);
      }
    }
  }, [progress.percentComplete, questionNumber, optimisticProgress]);

  const progressValue = optimisticProgress ?? progress.percentComplete ?? 0;
  const isResuming = sessionLoading || (!currentSession && !sessionLoading);
  const isLoadingQuestion = questionLoading && !question;
  const isReady = !!question && !!progress && (progress.totalCount ?? 0) > 0;
  const isDisabled = isTransitioning || completing;

  useEffect(() => {
    if (currentQuestionRef.current) {
      const id = setTimeout(() => {
        currentQuestionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => clearTimeout(id);
    }
  }, [questionNumber]);

  const handleBack = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const handlePrevious = useCallback(async () => {
    if (isTransitioning || questionNumber <= 1) return;

    setIsFadingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setQuestionNumber((prev) => prev - 1);
    setTimeout(() => setIsFadingOut(false), 50);
  }, [isTransitioning, questionNumber]);

  const handleComplete = useCallback(async () => {
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
  }, [sessionId, completeAssessment, router]);

  const handleAnswerSelect = useCallback(
    async (value: number) => {
      if (isTransitioning || completing || !question) return;

      const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);

      setOptimisticValue(value);
      setIsTransitioning(true);

      const currentPercent = progress.percentComplete ?? 0;
      const wasAlreadyAnswered = currentResponse?.responseValue !== undefined;
      const incrementPercent = 100 / TOTAL_QUESTIONS;
      const optimisticPercent = wasAlreadyAnswered
        ? currentPercent
        : Math.min(currentPercent + incrementPercent, 100);
      setOptimisticProgress(optimisticPercent);

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
          setOptimisticProgress(result.progress.percentComplete ?? optimisticPercent);
        }

        setIsFadingOut(true);

        await new Promise((resolve) => setTimeout(resolve, 300));

        if (questionNumber >= TOTAL_QUESTIONS) {
          await handleComplete();
        } else if (result.nextQuestion.hasNext) {
          setQuestionNumber((prev) => prev + 1);

          setTimeout(() => setIsFadingOut(false), 50);
        }
      } catch (error) {
        console.error('Failed to submit answer:', error);
        toast.error('Failed to save answer. Please try again.');
        setOptimisticValue(null);
        setOptimisticProgress(null);
      } finally {
        setIsTransitioning(false);
      }
    },
    [
      isTransitioning,
      completing,
      question,
      questionStartTime,
      progress.answeredCount,
      currentResponse?.responseValue,
      submitOrUpdateResponse,
      sessionId,
      questionNumber,
      handleComplete,
    ]
  );

  const handlePreviousClick = useCallback(() => {
    if (!isTransitioning) {
      handlePrevious();
    }
  }, [isTransitioning, handlePrevious]);

  const handlePreviousKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isTransitioning) {
        e.preventDefault();
        handlePrevious();
      }
    },
    [isTransitioning, handlePrevious]
  );

  if (isResuming) {
    return (
      <ProtectedLayout>
        {() => (
          <LoadingScreen
            message="Resuming Assessment"
            description="Loading your progress and questions..."
          />
        )}
      </ProtectedLayout>
    );
  }

  if (isLoadingQuestion || !isReady) {
    return (
      <ProtectedLayout>
        {() => (
          <LoadingScreen
            message="Preparing Assessment"
            description="Setting up your questions..."
          />
        )}
      </ProtectedLayout>
    );
  }

  if (questionError || !question) {
    const errorMessage =
      (questionError && 'message' in questionError
        ? (questionError as { message?: string }).message
        : undefined) || 'Unable to load assessment question.';

    return (
      <ProtectedLayout>
        {() => (
          <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
            <p className="text-muted-foreground text-center">{errorMessage}</p>
            <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
          </div>
        )}
      </ProtectedLayout>
    );
  }

  const selectedValue = optimisticValue ?? currentResponse?.responseValue ?? null;

  return (
    <ProtectedLayout>
      {() => (
        <div className="flex flex-col bg-background">
          <AssessmentHeader
            questionNumber={questionNumber}
            progressPercent={progressValue}
            onBack={handleBack}
            isDisabled={isDisabled}
            canGoBack={questionNumber > 1}
          />

          <div className="flex-1 container mx-auto px-4 max-w-2xl py-6">
            <div className="space-y-6">
              {prevQuestion?.questionText && (
                <QuestionCard
                  key={`question-${questionNumber - 1}`}
                  questionNumber={questionNumber - 1}
                  questionText={prevQuestion.questionText}
                  variant="previous"
                  isAnswered={prevResponse?.responseValue !== undefined}
                  isFadingOut={isFadingOut}
                  isDisabled={isTransitioning}
                  onClick={handlePreviousClick}
                  onKeyDown={handlePreviousKeyDown}
                />
              )}

              <div ref={currentQuestionRef}>
                <QuestionCard
                  key={`question-${questionNumber}`}
                  questionNumber={questionNumber}
                  questionText={question.questionText ?? ''}
                  variant="current"
                  selectedValue={selectedValue}
                  isFadingOut={isFadingOut}
                  isDisabled={isDisabled}
                  onSelect={handleAnswerSelect}
                />
              </div>

              {nextQuestion?.questionText && questionNumber < TOTAL_QUESTIONS && (
                <QuestionCard
                  key={`question-${questionNumber + 1}`}
                  questionNumber={questionNumber + 1}
                  questionText={nextQuestion.questionText}
                  variant="next"
                  isFadingOut={isFadingOut}
                />
              )}
            </div>

            {showCompletionMessage && <CompletionOverlay />}

            {(submitting || completing) && !showCompletionMessage && (
              <LoadingToast message={completing ? 'Completing assessment…' : 'Saving…'} />
            )}
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

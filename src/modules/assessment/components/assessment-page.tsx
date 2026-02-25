'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Spinner } from '@/components/ui/spinner';
import {
  useAssessmentProgress,
  useBatchSubmit,
  useCompleteAssessment,
  useQuestionBatch,
  useSessionQuestions,
} from '@/modules/assessment/hooks';
import { AlertCircleIcon, ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

interface AssessmentPageProps {
  sessionId: string;
}

export const AssessmentPage = ({ sessionId }: AssessmentPageProps) => {
  const router = useRouter();

  const { previousResponses, session, refetch: refetchSession } = useSessionQuestions(sessionId);

  // Derive starting batch and question index from backend session state (for resume support)
  const initialBatchNumber = useMemo(() => {
    const currentQuestionNumber = session?.currentQuestionNumber ?? 1;
    return Math.max(1, Math.ceil(currentQuestionNumber / 5));
  }, [session?.currentQuestionNumber]);

  const initialQuestionIndexInBatch = useMemo(() => {
    const currentQuestionNumber = session?.currentQuestionNumber ?? 1;
    return (currentQuestionNumber - 1) % 5;
  }, [session?.currentQuestionNumber]);

  const [currentBatchNumber, setCurrentBatchNumber] = useState(initialBatchNumber);
  // Which question (0–4) within the current batch is displayed
  const [currentQuestionIndexInBatch, setCurrentQuestionIndexInBatch] = useState(0);
  const [batchResponses, setBatchResponses] = useState<Map<string, number>>(new Map());
  const [batchStartTime, setBatchStartTime] = useState(Date.now());
  const [isNavigating, setIsNavigating] = useState(false);
  // Blocks input during the 300ms auto-advance animation
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [showReminder, setShowReminder] = useState(true);

  // Communicates the desired question index to the batch-load effect.
  // null = don't override (default to 0); number = set that index when batch loads.
  const targetQuestionIndexRef = useRef<number | null>(null);

  // One ref per question card for smooth-scroll focus
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // On session load, restore batch number and question index for resume
  useEffect(() => {
    if (!hasInitialized && session) {
      if (initialBatchNumber > 1 || initialQuestionIndexInBatch > 0) {
        setCurrentBatchNumber(initialBatchNumber);
        // Signal the batch-load effect to start at the correct question
        targetQuestionIndexRef.current = initialQuestionIndexInBatch;
      }
      setHasInitialized(true);
    }
  }, [initialBatchNumber, initialQuestionIndexInBatch, hasInitialized, session]);

  const { batch, loading: batchLoading } = useQuestionBatch(currentBatchNumber);
  // Silently prefetch the next batch while the user answers the current one
  // so the transition is instant — the skip inside the hook handles batch > 10
  useQuestionBatch(currentBatchNumber + 1);

  const { batchSubmit } = useBatchSubmit();
  const { completeAssessment, loading: completing } = useCompleteAssessment();
  const { progress, refetch: refetchProgress } = useAssessmentProgress();
  const [isSavingInBackground, setIsSavingInBackground] = useState(false);
  // Live drag positions (per question) — updated on valueChange, committed on valueCommit
  const [pendingSliderValues, setPendingSliderValues] = useState<Map<string, number>>(new Map());

  const previousAnswersMap = useMemo(() => {
    const map = new Map<string, number>();
    if (previousResponses && Array.isArray(previousResponses)) {
      previousResponses.forEach((response: { questionId: string; responseValue: number }) => {
        map.set(response.questionId, response.responseValue);
      });
    }
    return map;
  }, [previousResponses]);

  // Pre-fill responses from backend when a new batch loads
  useEffect(() => {
    if (batch?.questions && batch.questions.length > 0) {
      const newResponses = new Map<string, number>();
      batch.questions.forEach((sessionQuestion) => {
        const previousValue = previousAnswersMap.get(sessionQuestion.questionId);
        if (previousValue !== undefined) {
          newResponses.set(sessionQuestion.questionId, previousValue);
        }
      });
      setBatchResponses(newResponses);
      // Reset pending slider values when batch changes
      setPendingSliderValues(new Map());
    }
  }, [batch?.questions, previousAnswersMap]);

  // When a new batch loads, set the visible question index from the ref
  useEffect(() => {
    if (!batch?.questions?.length) return;
    if (targetQuestionIndexRef.current !== null) {
      setCurrentQuestionIndexInBatch(targetQuestionIndexRef.current);
      targetQuestionIndexRef.current = null;
    } else {
      setCurrentQuestionIndexInBatch(0);
    }
    setIsTransitioning(false);
  }, [batch?.batchNumber]);

  const totalBatches = batch?.totalBatches ?? 10;
  const totalQuestions = totalBatches * 5;

  // Smooth-scroll the active question into view whenever the index changes
  useEffect(() => {
    const el = questionRefs.current[currentQuestionIndexInBatch];
    if (!el) return;
    // Small delay so layout has settled before scrolling
    const id = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => clearTimeout(id);
  }, [currentQuestionIndexInBatch, batch?.batchNumber]);

  // Global index (0-based) used for immediate progress feedback
  const globalQuestionIndex = (currentBatchNumber - 1) * 5 + currentQuestionIndexInBatch;
  const localProgressPercentage = (globalQuestionIndex / totalQuestions) * 100;
  const backendProgressPercentage = progress?.progressPercentage ?? 0;
  // Always show the higher of local (optimistic) vs confirmed backend progress
  const progressPercentage = Math.max(localProgressPercentage, backendProgressPercentage);

  useEffect(() => {
    setBatchStartTime(Date.now());
  }, [currentBatchNumber]);

  // Accepts an optional responses override so the 5th-question auto-trigger
  // can pass the just-updated map before React flushes the state update.
  const handleNext = async (responsesOverride?: Map<string, number>) => {
    if (!batch || isNavigating) return;

    const responses = responsesOverride ?? batchResponses;
    const allAnswered = batch.questions.every((q) => responses.has(q.questionId));

    if (!allAnswered) {
      toast.error('Please answer all questions before continuing.');
      setIsTransitioning(false);
      return;
    }

    const isLastBatch = currentBatchNumber >= totalBatches;

    const responsesToSubmit = batch.questions.map((sessionQuestion) => {
      const responseValue = responses.get(sessionQuestion.questionId);
      const timeTaken = Math.floor((Date.now() - batchStartTime) / 1000 / batch.questions.length);
      return {
        questionId: sessionQuestion.questionId,
        responseValue: responseValue!,
        timeTakenSeconds: timeTaken,
      };
    });

    if (!isLastBatch) {
      // ── Optimistic advance: move UI immediately, submit in background ──
      setCurrentBatchNumber((prev) => prev + 1);
      setBatchResponses(new Map());

      setIsSavingInBackground(true);
      batchSubmit(sessionId, responsesToSubmit)
        .then(async (result) => {
          if (!result.success) {
            toast.error(
              result.message || 'Failed to save answers. Your progress may not be saved.'
            );
          }
          await refetchSession();
          await refetchProgress();
        })
        .catch((err) => {
          console.error('Background submit error:', err);
          toast.error('Failed to save answers. Your progress may not be saved.');
        })
        .finally(() => setIsSavingInBackground(false));
    } else {
      // ── Last batch: block and complete (we need the result ID to redirect) ──
      setIsNavigating(true);
      try {
        const result = await batchSubmit(sessionId, responsesToSubmit);

        if (!result.success) {
          toast.error(result.message || 'Failed to save your answers. Please try again.');
          setIsTransitioning(false);
          return;
        }

        await refetchSession();

        const updatedProgress = await refetchProgress();
        const allQuestionsAnswered =
          updatedProgress.data?.assessmentProgress?.answeredQuestions === totalQuestions;

        if (allQuestionsAnswered) {
          const completeResult = await completeAssessment(sessionId);
          if (completeResult.success && completeResult.result?.id) {
            router.replace(`/assessment/results/${completeResult.result.id}`);
          } else {
            toast.error(
              completeResult.message || 'Failed to complete assessment. Please try again.'
            );
            setIsTransitioning(false);
          }
        }
      } catch (error) {
        console.error('Error in handleNext:', error);
        toast.error('An error occurred. Please try again.');
        setIsTransitioning(false);
      } finally {
        setIsNavigating(false);
      }
    }
  };

  const handlePreviousBatch = () => {
    if (currentBatchNumber <= 1 || isNavigating) return;

    // Save any changed answers in the background, then immediately navigate back
    const changedResponses = batch?.questions.filter((sessionQuestion) => {
      const currentValue = batchResponses.get(sessionQuestion.questionId);
      const previousValue = previousAnswersMap.get(sessionQuestion.questionId);
      return currentValue !== undefined && currentValue !== previousValue;
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

      setIsSavingInBackground(true);
      batchSubmit(sessionId, responsesToSubmit)
        .then(() => refetchSession())
        .catch((err) => console.error('Background save on back:', err))
        .finally(() => setIsSavingInBackground(false));
    }

    // Optimistic: navigate back immediately
    targetQuestionIndexRef.current = 4;
    setCurrentBatchNumber((prev) => prev - 1);
    setBatchResponses(new Map());
  };

  // Selects an answer, then auto-advances to the next question after 500ms.
  // When the last question of a batch is answered it triggers the batch submit.
  const handleAnswerSelect = (questionId: string, value: number) => {
    // Only block during the animation or when completing (last batch redirect)
    if (isTransitioning || completing) return;

    const newResponses = new Map(batchResponses);
    newResponses.set(questionId, value);
    setBatchResponses(newResponses);

    setIsTransitioning(true);

    setTimeout(() => {
      const batchSize = batch?.questions?.length ?? 5;
      if (currentQuestionIndexInBatch < batchSize - 1) {
        setCurrentQuestionIndexInBatch((prev) => prev + 1);
        setIsTransitioning(false);
      } else {
        // Last question in batch — hand off to batch submit
        handleNext(newResponses);
        // isTransitioning is cleared by the batch-load effect or on error inside handleNext
      }
    }, 500); // 500ms so the user can see the selected slider position before advancing
  };

  // Goes back one question within the batch, or to the previous batch's last question.
  const handlePreviousQuestion = () => {
    if (isTransitioning || isNavigating) return;
    if (currentQuestionIndexInBatch > 0) {
      setCurrentQuestionIndexInBatch((prev) => prev - 1);
    } else if (currentBatchNumber > 1) {
      handlePreviousBatch();
    }
  };

  const isFirstQuestion = currentBatchNumber === 1 && currentQuestionIndexInBatch === 0;
  // Only hard-block during the final completion redirect; normal saves are background
  const isDisabled = isTransitioning || isNavigating || completing;

  // Stable ref callback builder so React doesn't re-create refs on every render
  const setQuestionRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      questionRefs.current[index] = el;
    },
    []
  );

  if (batchLoading && !batch) {
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

  if (!batch || !batch.questions?.length) {
    return (
      <ProtectedLayout>
        {() => (
          <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
            <p className="text-muted-foreground text-center">
              Unable to load assessment questions.
            </p>
            <Button onClick={() => router.push('/dashboard')}>Return to Dashboard</Button>
          </div>
        )}
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      {() => (
        <div className="flex flex-col min-h-screen bg-background">
          {/* ── Sticky progress header ── */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
            <div className="container mx-auto px-4 py-3 max-w-2xl">
              <div className="flex items-center gap-2 mb-2.5">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePreviousQuestion}
                  disabled={isDisabled || isFirstQuestion}
                  aria-label="Previous question"
                  className="shrink-0 -ml-2 size-8"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <div className="flex flex-1 items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    Question <span className="text-primary">{globalQuestionIndex + 1}</span>{' '}
                    <span className="text-muted-foreground">of {totalQuestions}</span>
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-1.5 transition-all duration-500" />
            </div>
          </div>

          {/* ── Main content: scrollable question list ── */}
          <div className="flex-1 container mx-auto px-4 max-w-2xl py-6">
            {/* One-time reminder shown only on the very first question */}
            {isFirstQuestion && showReminder && (
              <Alert className="mt-8 mb-4 bg-primary/5 border-primary/20">
                <AlertCircleIcon />
                <AlertTitle>Before you begin</AlertTitle>
                <AlertDescription>
                  Reflect on the last 6 months. Be honest — there are no right or wrong answers.
                </AlertDescription>
                <AlertAction>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReminder(false)}
                    aria-label="Dismiss reminder"
                  >
                    <X className="size-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </Button>
                </AlertAction>
              </Alert>
            )}

            <div className="space-y-6">
              {batch.questions.map((sessionQuestion, index) => {
                const isActive = index === currentQuestionIndexInBatch;
                const isPast = index < currentQuestionIndexInBatch;
                const response = batchResponses.get(sessionQuestion.questionId);
                const qNum = (currentBatchNumber - 1) * 5 + index + 1;

                return (
                  <div
                    key={sessionQuestion.id}
                    ref={setQuestionRef(index)}
                    aria-current={isActive ? 'step' : undefined}
                    className={`scroll-mt-20 rounded-xl border p-6 md:p-8 transition-all duration-500 ${
                      isActive
                        ? 'opacity-100 border-primary/25 shadow-sm bg-background'
                        : isPast
                          ? 'opacity-40 pointer-events-none bg-background'
                          : 'opacity-15 pointer-events-none bg-muted/30'
                    }`}
                  >
                    {/* Question text */}
                    <div className="mb-8">
                      <div className="flex items-start gap-4">
                        <span
                          className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold shrink-0 mt-0.5 transition-colors duration-300 ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : isPast
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {isPast && response !== undefined ? (
                            <svg
                              className="size-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            qNum
                          )}
                        </span>
                        <p
                          className={`text-xl md:text-2xl font-medium leading-relaxed transition-colors duration-300 ${
                            isActive ? 'text-foreground' : 'text-foreground/70'
                          }`}
                        >
                          {sessionQuestion.questionText}
                        </p>
                      </div>
                    </div>

                    {/* Slider answer */}
                    <div className="space-y-5">
                      {/* Live value display */}
                      <div className="flex justify-center">
                        {response !== undefined ||
                        pendingSliderValues.has(sessionQuestion.questionId) ? (
                          <div
                            className={`flex flex-col items-center gap-0.5 transition-opacity duration-300 ${isTransitioning && isActive ? 'opacity-50' : 'opacity-100'}`}
                          >
                            <span
                              className={`text-4xl font-bold tabular-nums ${
                                isActive ? 'text-primary' : 'text-primary/60'
                              }`}
                            >
                              {pendingSliderValues.get(sessionQuestion.questionId) ?? response}
                            </span>
                            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                              {(() => {
                                const v =
                                  pendingSliderValues.get(sessionQuestion.questionId) ??
                                  response ??
                                  5;
                                if (v <= 2) return 'Strongly Disagree';
                                if (v <= 4) return 'Disagree';
                                if (v <= 6) return 'Neutral';
                                if (v <= 8) return 'Agree';
                                return 'Strongly Agree';
                              })()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm italic text-muted-foreground/60">
                            Move the slider to answer
                          </span>
                        )}
                      </div>

                      {/* Slider */}
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[
                          pendingSliderValues.get(sessionQuestion.questionId) ?? response ?? 5,
                        ]}
                        onValueChange={(vals) => {
                          if (!isActive || isDisabled) return;
                          setPendingSliderValues((prev) => {
                            const next = new Map(prev);
                            next.set(sessionQuestion.questionId, vals[0]);
                            return next;
                          });
                        }}
                        onValueCommit={(vals) => {
                          if (!isActive || isDisabled) return;
                          handleAnswerSelect(sessionQuestion.questionId, vals[0]);
                        }}
                        disabled={!isActive || isDisabled}
                        aria-label={`Answer for question ${qNum}`}
                        aria-valuemin={1}
                        aria-valuemax={10}
                        aria-valuenow={response}
                        className={`w-full transition-opacity duration-300 ${!isActive ? 'opacity-50' : ''}
                          **:data-[slot=slider-track]:h-2.5
                          **:data-[slot=slider-thumb]:size-6
                          **:data-[slot=slider-thumb]:shadow-md
                          ${
                            response !== undefined
                              ? '**:data-[slot=slider-range]:bg-primary'
                              : '**:data-[slot=slider-range]:bg-primary/40'
                          }`}
                      />

                      {/* Scale labels */}
                      {isActive && (
                        <div className="flex justify-between text-xs text-muted-foreground px-0.5">
                          <span>Strongly Disagree</span>
                          <span>Neutral</span>
                          <span>Strongly Agree</span>
                        </div>
                      )}

                      {/* Tick marks */}
                      {isActive && (
                        <div className="flex justify-between px-2.5">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <div key={n} className="flex flex-col items-center gap-0.5">
                              <div
                                className={`w-px h-1.5 rounded-full transition-colors ${
                                  (pendingSliderValues.get(sessionQuestion.questionId) ??
                                    response ??
                                    0) >= n
                                    ? 'bg-primary/60'
                                    : 'bg-muted-foreground/25'
                                }`}
                              />
                              <span className="text-[10px] text-muted-foreground/50 tabular-nums">
                                {n}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Non-blocking background save indicator */}
            {(isSavingInBackground || completing || isNavigating) && (
              <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/90 border rounded-full px-4 py-2 shadow-sm text-xs text-muted-foreground z-20 pointer-events-none">
                <Spinner className="size-3" />
                <span>{completing || isNavigating ? 'Completing assessment…' : 'Saving…'}</span>
              </div>
            )}
          </div>

          {/* ── Sticky bottom: batch dot indicators ── */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-t py-4">
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="flex items-center justify-center gap-2">
                {batch.questions.map((q, index) => {
                  const isAnswered = batchResponses.has(q.questionId);
                  const isCurrent = index === currentQuestionIndexInBatch;
                  return (
                    <div
                      key={q.id}
                      aria-hidden="true"
                      className={`rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'w-6 h-2.5 bg-primary'
                          : isAnswered
                            ? 'w-2.5 h-2.5 bg-primary/60'
                            : 'w-2.5 h-2.5 bg-muted-foreground/25'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

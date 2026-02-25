import { useSessionQuestion } from './use-session-question';

interface UseQuestionFlowOptions {
  sessionId: string;
  questionNumber: number;
  enablePrefetch?: boolean;
}

interface UseQuestionFlowReturn {
  current: {
    question: ReturnType<typeof useSessionQuestion>['question'];
    currentResponse: ReturnType<typeof useSessionQuestion>['currentResponse'];
    navigation: ReturnType<typeof useSessionQuestion>['navigation'];
    progress: ReturnType<typeof useSessionQuestion>['progress'];
    loading: boolean;
    error: ReturnType<typeof useSessionQuestion>['error'];
  };

  previous: {
    question: ReturnType<typeof useSessionQuestion>['question'];
    currentResponse: ReturnType<typeof useSessionQuestion>['currentResponse'];
  } | null;

  next: {
    question: ReturnType<typeof useSessionQuestion>['question'];
  } | null;

  isLoading: boolean;
  hasError: boolean;
}

export const useQuestionFlow = ({
  sessionId,
  questionNumber,
  enablePrefetch = true,
}: UseQuestionFlowOptions): UseQuestionFlowReturn => {
  const {
    question: currentQuestion,
    currentResponse: currentQuestionResponse,
    navigation,
    progress,
    loading: currentLoading,
    error: currentError,
  } = useSessionQuestion({
    sessionId,
    questionNumber,
    enablePrefetch,
  });

  const {
    question: prevQuestion,
    currentResponse: prevResponse,
    loading: prevLoading,
    error: prevError,
  } = useSessionQuestion({
    sessionId,
    questionNumber: questionNumber - 1,
    enablePrefetch: false,
    skip: questionNumber <= 1,
  });

  const {
    question: nextQuestion,
    loading: nextLoading,
    error: nextError,
  } = useSessionQuestion({
    sessionId,
    questionNumber: questionNumber + 1,
    enablePrefetch: false,
    skip: questionNumber >= 50,
  });

  return {
    current: {
      question: currentQuestion,
      currentResponse: currentQuestionResponse,
      navigation,
      progress,
      loading: currentLoading,
      error: currentError,
    },
    previous: prevQuestion
      ? {
        question: prevQuestion,
        currentResponse: prevResponse,
      }
      : null,
    next: nextQuestion
      ? {
        question: nextQuestion,
      }
      : null,
    isLoading: currentLoading || prevLoading || nextLoading,
    hasError: !!(currentError || prevError || nextError),
  };
};

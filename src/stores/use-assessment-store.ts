import { create } from 'zustand';
import { AssessmentStatus } from '@/gql/graphql';

interface AssessmentSession {
  id: string;
  userId: string;
  paymentId: string;
  status: AssessmentStatus;
  currentQuestionNumber: number;
  startTime: string;
  lastActivityTime?: string | null;
  expiresAt: string;
}

interface AssessmentState {
  currentSession: AssessmentSession | null;
  setCurrentSession: (session: AssessmentSession | null) => void;
  clearCurrentSession: () => void;
  updateQuestionNumber: (questionNumber: number) => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  currentSession: null,
  setCurrentSession: (session) => set({ currentSession: session }),
  clearCurrentSession: () => set({ currentSession: null }),
  updateQuestionNumber: (questionNumber) =>
    set((state) => ({
      currentSession: state.currentSession
        ? { ...state.currentSession, currentQuestionNumber: questionNumber }
        : null,
    })),
}));

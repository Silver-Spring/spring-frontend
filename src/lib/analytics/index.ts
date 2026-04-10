import posthog from 'posthog-js';

export * from './error-tracking';

export interface AnalyticsEventData {
  [key: string]: string | number | boolean | null | undefined;
}

export const AnalyticsEvents = {
  USER_REGISTERED: 'user_registered',
  USER_LOGGED_IN: 'user_logged_in',
  ASSESSMENT_STARTED: 'assessment_started',
  ASSESSMENT_PROGRESS: 'assessment_progress',
  ASSESSMENT_COMPLETED: 'assessment_completed',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_CHECKOUT_OPENED: 'payment_checkout_opened',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',
  REPORT_DOWNLOADED: 'report_downloaded',
  REPORT_DOWNLOAD_FAILED: 'report_download_failed',
} as const;

export type AnalyticsEvent = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export const trackEvent = (event: AnalyticsEvent, data?: AnalyticsEventData): void => {
  try {
    if (typeof window !== 'undefined') {
      posthog.capture(event, data);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

export const trackUserRegistration = (userId: string, email: string): void => {
  trackEvent(AnalyticsEvents.USER_REGISTERED, {
    user_id: userId,
    email_domain: email.split('@')[1] || 'unknown',
  });
};

export const trackUserLogin = (userId: string, isAdmin: boolean): void => {
  trackEvent(AnalyticsEvents.USER_LOGGED_IN, {
    user_id: userId,
    is_admin: isAdmin,
  });
};

export const trackAssessmentStarted = (sessionId: string, userId: string): void => {
  trackEvent(AnalyticsEvents.ASSESSMENT_STARTED, {
    session_id: sessionId,
    user_id: userId,
  });
};

export const trackAssessmentProgress = (
  sessionId: string,
  questionNumber: number,
  totalQuestions: number,
  percentComplete: number
): void => {
  trackEvent(AnalyticsEvents.ASSESSMENT_PROGRESS, {
    session_id: sessionId,
    question_number: questionNumber,
    total_questions: totalQuestions,
    percent_complete: percentComplete,
  });
};

export const trackAssessmentCompleted = (
  sessionId: string,
  userId: string,
  totalScore: number | null,
  durationMinutes: number | null
): void => {
  trackEvent(AnalyticsEvents.ASSESSMENT_COMPLETED, {
    session_id: sessionId,
    user_id: userId,
    total_score: totalScore || 0,
    duration_minutes: durationMinutes || 0,
  });
};

export const trackPaymentInitiated = (userId: string): void => {
  trackEvent(AnalyticsEvents.PAYMENT_INITIATED, {
    user_id: userId,
  });
};

export const trackPaymentCheckoutOpened = (
  orderId: string,
  amount: number,
  currency: string
): void => {
  trackEvent(AnalyticsEvents.PAYMENT_CHECKOUT_OPENED, {
    order_id: orderId,
    amount,
    currency,
  });
};

export const trackPaymentSuccess = (
  paymentId: string,
  orderId: string,
  amount: number
): void => {
  trackEvent(AnalyticsEvents.PAYMENT_SUCCESS, {
    payment_id: paymentId,
    order_id: orderId,
    amount,
  });
};

export const trackPaymentFailed = (
  orderId: string,
  errorCode: string,
  errorDescription: string
): void => {
  trackEvent(AnalyticsEvents.PAYMENT_FAILED, {
    order_id: orderId,
    error_code: errorCode,
    error_description: errorDescription,
  });
};

export const trackReportDownloaded = (userId: string, resultId: string): void => {
  trackEvent(AnalyticsEvents.REPORT_DOWNLOADED, {
    user_id: userId,
    result_id: resultId,
  });
};

export const trackReportDownloadFailed = (userId: string, resultId: string, error: string): void => {
  trackEvent(AnalyticsEvents.REPORT_DOWNLOAD_FAILED, {
    user_id: userId,
    result_id: resultId,
    error,
  });
};

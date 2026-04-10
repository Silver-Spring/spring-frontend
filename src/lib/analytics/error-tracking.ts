import posthog from 'posthog-js';

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  [key: string]: string | number | boolean | undefined | null;
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export const captureError = (
  error: Error | unknown,
  context?: ErrorContext,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM
): void => {
  try {
    const errorInstance = error instanceof Error ? error : new Error(String(error));

    posthog.captureException(errorInstance, {
      severity,
      ...context,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Tracking]', {
        error: errorInstance,
        severity,
        context,
      });
    }
  } catch (trackingError) {
    console.error('[Error Tracking Failed]', trackingError);
  }
};

export const captureAuthError = (error: Error | unknown, action: string): void => {
  captureError(error, {
    component: 'Authentication',
    action,
  }, ErrorSeverity.HIGH);
};

export const capturePaymentError = (
  error: Error | unknown,
  orderId?: string,
  paymentId?: string
): void => {
  captureError(error, {
    component: 'Payment',
    action: 'payment_failed',
    order_id: orderId,
    payment_id: paymentId,
  }, ErrorSeverity.CRITICAL);
};

export const captureAssessmentError = (
  error: Error | unknown,
  sessionId?: string,
  questionNumber?: number
): void => {
  captureError(error, {
    component: 'Assessment',
    session_id: sessionId,
    question_number: questionNumber,
  }, ErrorSeverity.HIGH);
};

export const captureAPIError = (
  error: Error | unknown,
  endpoint: string,
  method: string,
  statusCode?: number
): void => {
  captureError(error, {
    component: 'API',
    endpoint,
    method,
    status_code: statusCode,
  }, ErrorSeverity.MEDIUM);
};

export const captureGraphQLError = (
  error: Error | unknown,
  operationName: string,
  variables?: Record<string, unknown>
): void => {
  captureError(error, {
    component: 'GraphQL',
    operation: operationName,
    variables: JSON.stringify(variables),
  }, ErrorSeverity.MEDIUM);
};

export const captureUIError = (
  error: Error | unknown,
  componentName: string,
  action?: string
): void => {
  captureError(error, {
    component: componentName,
    action: action || 'render_error',
  }, ErrorSeverity.LOW);
};

import posthog from 'posthog-js';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

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
  const errorInstance = error instanceof Error ? error : new Error(String(error));
  
  // Log in development, but don't send to PostHog
  if (process.env.NODE_ENV !== 'production') {
    console.error('[Error Tracking - DEV]', {
      error: errorInstance,
      severity,
      context,
    });
    return;
  }

  try {
    posthog.captureException(errorInstance, {
      severity,
      ...context,
      timestamp: new Date().toISOString(),
      environment: 'production',
    });
  } catch (trackingError) {
    console.error('[Error Tracking Failed]', trackingError);
  }
};

// Postgres errcodes the backend deliberately surfaces verbatim to the client
// (see safeErrorCodes in packages/server/src/auth/{login,register}.ts) — these
// are expected user-facing validation outcomes (wrong password, duplicate
// email, etc.), not application bugs, so they shouldn't count as exceptions.
const EXPECTED_AUTH_ERROR_CODES = new Set([
  'CREDS', // invalid email/password
  'ISEXI', // email already registered
  'NODAT', // required field missing
  'WEAKP', // password too short
  'LOCKD', // account locked
  'EMTKN', // invalid/expired email token
  'INVAL', // invalid reset token
]);

const isExpectedAuthError = (error: unknown): boolean =>
  CombinedGraphQLErrors.is(error) &&
  error.errors.every((e) => EXPECTED_AUTH_ERROR_CODES.has(e.extensions?.code as string));

export const captureAuthError = (error: Error | unknown, action: string): void => {
  if (isExpectedAuthError(error)) return;

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

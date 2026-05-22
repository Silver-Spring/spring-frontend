export const isDuplicateInProgressSessionError = (error: unknown): boolean => {
  const message = getErrorMessage(error);
  return /already have an assessment in progress/i.test(message);
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }

  return String(error);
};

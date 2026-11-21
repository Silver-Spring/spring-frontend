export const CAMPAIGN_STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  sending: 'Sending',
  sent: 'Sent',
  cancelled: 'Cancelled',
  failed: 'Failed',
};

export const RECIPIENT_STATUSES = ['queued', 'sending', 'sent', 'failed', 'suppressed'] as const;

export const RECIPIENT_STATUS_LABEL: Record<string, string> = {
  queued: 'Queued',
  sending: 'Sending',
  sent: 'Sent',
  failed: 'Failed',
  suppressed: 'Suppressed',
};

export const statusBadgeVariant = (
  status: string,
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'sent' || status === 'sending') return 'default';
  if (status === 'failed') return 'destructive';
  if (status === 'scheduled') return 'outline';
  return 'secondary';
};

/** "12 Jun, 10:00 am" in India time. */
export const formatIst = (iso: string): string =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

export const formatCount = (n: number): string => new Intl.NumberFormat('en-IN').format(n);

export const peopleLabel = (n: number): string => `${formatCount(n)} ${n === 1 ? 'person' : 'people'}`;

export const errorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message ? error.message : fallback;

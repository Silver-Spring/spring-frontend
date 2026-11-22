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

type RecipientCounts = Record<(typeof RECIPIENT_STATUSES)[number], number>;

export const totalRecipients = (counts: RecipientCounts): number =>
  RECIPIENT_STATUSES.reduce((sum, status) => sum + counts[status], 0);

/** Same rule as the server: never went out, and is not a starter. */
export const canDeleteCampaign = (c: { status: string; isStarter: boolean; counts: RecipientCounts }): boolean =>
  !c.isStarter && ['draft', 'cancelled', 'failed'].includes(c.status) && totalRecipients(c.counts) === 0;

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

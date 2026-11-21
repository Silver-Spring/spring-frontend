'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  useSendWorkshopEmail,
  useWorkshopPendingCount,
  type WorkshopEmailType,
} from '../hooks/use-workshop-registrations';

type WorkshopEmailCardProps = {
  eventId: string;
  type: WorkshopEmailType;
  title: string;
  description: string;
  sendLabel: string;
  onSent: () => void;
  /** Registrations ticked in the table. Empty means "everyone who hasn't got it". */
  selectedIds: string[];
  /** When true the button stays off until at least one person is ticked. */
  requireSelection?: boolean;
};

export const WorkshopEmailCard = ({
  eventId,
  type,
  title,
  description,
  sendLabel,
  onSent,
  selectedIds,
  requireSelection = false,
}: WorkshopEmailCardProps) => {
  const hasSelection = selectedIds.length > 0;
  const { pending, refetch } = useWorkshopPendingCount(
    eventId,
    type,
    hasSelection ? selectedIds : undefined
  );
  const [sendEmail, { loading }] = useSendWorkshopEmail();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [failures, setFailures] = useState<string[]>([]);

  const handleSend = async () => {
    setConfirmOpen(false);
    try {
      const { data } = await sendEmail({
        variables: { eventId, emailType: type, registrationIds: hasSelection ? selectedIds : undefined },
      });
      const result = data?.adminSendWorkshopEmail;
      if (!result) return;
      setFailures(result.failures);
      const more = result.remainingCount > 0 ? ` ${result.remainingCount} still waiting, send again.` : '';
      if (result.failedCount > 0) {
        toast.error(`${result.sentCount} sent, ${result.failedCount} failed.${more}`);
      } else {
        toast.success(`${result.sentCount} sent.${more}`);
      }
      await refetch();
      onSent();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not send the emails');
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <span className="shrink-0 text-right text-sm">
            <strong className="block text-2xl font-bold leading-none">{pending}</strong>
            {hasSelection ? 'of selected waiting' : 'waiting'}
          </span>
        </div>
        <Button
          variant="outline"
          disabled={loading || pending === 0 || (requireSelection && !hasSelection)}
          onClick={() => setConfirmOpen(true)}
        >
          {loading && <Spinner className="size-4" />}
          {hasSelection ? `${sendLabel} (${selectedIds.length} selected)` : sendLabel}
        </Button>
        {requireSelection && !hasSelection && (
          <p className="text-sm text-muted-foreground">
            Tick the people who attended in the table below.
          </p>
        )}
        {failures.length > 0 && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-destructive">
            {failures.map((failure) => (
              <li key={failure}>{failure}</li>
            ))}
          </ul>
        )}
      </CardContent>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{sendLabel}?</AlertDialogTitle>
            <AlertDialogDescription>
              {hasSelection
                ? `This emails the ${pending} of your ${selectedIds.length} selected people who haven't received it yet.`
                : `This emails up to ${Math.min(pending, 100)} of the ${pending} people who haven't received it yet.`}{' '}
              Anyone who already got it is skipped, so nobody gets it twice. Emails can&apos;t be
              unsent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend}>Send</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

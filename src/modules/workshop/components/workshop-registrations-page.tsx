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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAdminWorkshopEvent } from '../hooks/use-admin-workshops';
import {
  useDeleteWorkshopRegistration,
  useDownloadRegistrationsCsv,
  useWorkshopRegistrations,
} from '../hooks/use-workshop-registrations';
import { WorkshopEmailCard } from './workshop-email-card';

const EMAIL_LABEL: Record<string, string> = {
  confirmation: 'Confirmation',
  reminder_day_before: 'Day before',
  reminder_hour_before: 'Hour before',
  thank_you: 'Thank-you',
};

const formatWhen = (iso: string) =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

export const WorkshopRegistrationsPage = ({ id }: { id: string }) => {
  const { workshop, loading: workshopLoading } = useAdminWorkshopEvent(id);
  const { registrations, loading, refetch } = useWorkshopRegistrations(id);
  const [deleteRegistration] = useDeleteWorkshopRegistration();
  const downloadCsv = useDownloadRegistrationsCsv();
  const [toDelete, setToDelete] = useState<{ id: string; name: string } | null>(null);

  if (workshopLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!workshop) return <p className="p-6">Webinar not found.</p>;

  const { event } = workshop;

  const handleDownload = async () => {
    try {
      await downloadCsv(id, event.slug);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not download the CSV');
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteRegistration({ variables: { registrationId: toDelete.id } });
      toast.success('Registration removed');
      await refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not remove the registration');
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="min-w-0 space-y-8 p-6">
      <div className="space-y-3">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1">
          <Link href="/admin/workshops">
            <ArrowLeft className="size-4" /> All webinars
          </Link>
        </Button>
        <AdminPageHeader
          title={event.title}
          description={`${registrations.length} registered${event.capacity ? ` of ${event.capacity} places` : ''}`}
          actions={
            <Button variant="outline" className="gap-2" onClick={handleDownload}>
              <Download className="size-4" /> Download CSV
            </Button>
          }
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Send emails</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <WorkshopEmailCard
            eventId={id}
            type="confirmation"
            title="Confirmation"
            description="Sent automatically when someone registers. Resend it to anyone it didn't reach."
            sendLabel="Resend confirmations"
            onSent={() => refetch()}
          />
          <WorkshopEmailCard
            eventId={id}
            type="reminder_day_before"
            title="Day-before reminder"
            description="Includes the joining link. Needs the joining link on the webinar."
            sendLabel="Send day-before reminder"
            onSent={() => refetch()}
          />
          <WorkshopEmailCard
            eventId={id}
            type="reminder_hour_before"
            title="Hour-before reminder"
            description="A last nudge with the joining link, about an hour before the start."
            sendLabel="Send hour-before reminder"
            onSent={() => refetch()}
          />
          <WorkshopEmailCard
            eventId={id}
            type="thank_you"
            title="Thank-you and feedback"
            description="After the session, with resources and the feedback form. Needs the feedback link."
            sendLabel="Send thank-you email"
            onSent={() => refetch()}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Registrations</h2>
        {loading && registrations.length === 0 ? (
          <div className="flex min-h-40 items-center justify-center">
            <Spinner className="size-6" />
          </div>
        ) : registrations.length === 0 ? (
          <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            No one has registered yet.
          </p>
        ) : (
          <div className="rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Emails</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.fullName}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.phone}</TableCell>
                    <TableCell>{formatWhen(registration.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {registration.emails.map((email) => (
                          <Badge
                            key={email.emailType}
                            variant={email.status === 'failed' ? 'destructive' : 'secondary'}
                            title={email.error ?? undefined}
                          >
                            {EMAIL_LABEL[email.emailType] ?? email.emailType}
                            {email.status === 'sent' ? ' ✓' : ` · ${email.status}`}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        aria-label={`Remove ${registration.fullName}`}
                        onClick={() => setToDelete({ id: registration.id, name: registration.fullName })}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {toDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              They will no longer receive emails for this webinar and their place is freed. This
              can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

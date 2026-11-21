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
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { useSaveCampaign } from '@/modules/emails/hooks/use-campaigns';
import { ArrowLeft, Download, Mail, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAdminWorkshopEvent } from '../hooks/use-admin-workshops';
import {
  useDeleteWorkshopRegistration,
  useDownloadRegistrationsCsv,
  useResendWorkshopConfirmations,
  useWorkshopRegistrations,
} from '../hooks/use-workshop-registrations';
import { WorkshopEmailsTab } from './workshop-emails-tab';

const EMAIL_LABEL: Record<string, string> = {
  confirmation: 'Confirmation',
  registration_thanks: 'Registration thank-you',
  reminder_day_before: 'Day before',
  reminder_today: 'Today',
  joining_details: 'Joining details',
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
  const router = useRouter();
  const [saveCampaign, { loading: emailing }] = useSaveCampaign();
  const [resendConfirmations, { loading: resending }] = useResendWorkshopConfirmations();
  const [resendOpen, setResendOpen] = useState(false);
  const [toDelete, setToDelete] = useState<{ id: string; name: string } | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  // Ignore ids of people removed since they were ticked.
  const selectedIds = registrations.filter((r) => selected.has(r.id)).map((r) => r.id);
  const allSelected = registrations.length > 0 && selectedIds.length === registrations.length;

  const toggleOne = (registrationId: string, checked: boolean) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(registrationId);
      else next.delete(registrationId);
      return next;
    });
  const toggleAll = (checked: boolean) =>
    setSelected(checked ? new Set(registrations.map((r) => r.id)) : new Set());

  if (workshopLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!workshop) return <p className="p-6">Webinar not found.</p>;

  const { event } = workshop;

  const handleEmailSelected = async () => {
    const emails = registrations.filter((r) => selected.has(r.id)).map((r) => r.email);
    if (emails.length === 0) return;
    try {
      const { data } = await saveCampaign({
        variables: {
          input: {
            name: `${event.title}: selected people`,
            subject: event.title,
            bodyMarkdown: '',
            eventId: id,
            audience: {
              match: 'all',
              groups: [
                {
                  match: 'all',
                  rules: [
                    { condition: 'registered_webinar', negate: false, params: { eventId: id } },
                    { condition: 'selected_people', negate: false, params: { emails } },
                  ],
                },
              ],
            },
          },
        },
      });
      const draftId = data?.adminSaveCampaign?.id;
      if (draftId) router.push(`/admin/emails/${draftId}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not start the email');
    }
  };

  const handleResend = async () => {
    setResendOpen(false);
    try {
      const { data } = await resendConfirmations({
        variables: {
          eventId: id,
          registrationIds: selectedIds.length > 0 ? selectedIds : undefined,
        },
      });
      const result = data?.adminResendWorkshopConfirmations;
      if (!result) return;
      const more =
        result.remainingCount > 0 ? ` ${result.remainingCount} still waiting, resend again.` : '';
      if (result.failedCount > 0) {
        toast.error(`${result.sentCount} sent, ${result.failedCount} failed.${more}`);
      } else {
        toast.success(`${result.sentCount} sent.${more}`);
      }
      await refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not resend the confirmations');
    }
  };

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

      <Tabs defaultValue="registrations" className="gap-6">
        <TabsList>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
        </TabsList>

        <TabsContent value="registrations" className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">
              {selectedIds.length > 0
                ? `${selectedIds.length} selected.`
                : 'Tick people to email them, or to resend their confirmation.'}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={resending || registrations.length === 0}
                onClick={() => setResendOpen(true)}
              >
                {resending && <Spinner className="size-4" />}
                {selectedIds.length > 0
                  ? `Resend confirmation (${selectedIds.length})`
                  : 'Resend confirmations'}
              </Button>
              <Button
                disabled={selectedIds.length === 0 || emailing}
                onClick={handleEmailSelected}
                className="gap-2"
              >
                {emailing ? <Spinner className="size-4" /> : <Mail className="size-4" />}
                Email selected
              </Button>
            </div>
          </div>
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
                    <TableHead className="w-10">
                      <Checkbox
                        aria-label="Select all"
                        checked={allSelected}
                        onCheckedChange={(checked) => toggleAll(checked === true)}
                      />
                    </TableHead>
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
                    <TableRow
                      key={registration.id}
                      data-state={selected.has(registration.id) ? 'selected' : undefined}
                    >
                      <TableCell>
                        <Checkbox
                          aria-label={`Select ${registration.fullName}`}
                          checked={selected.has(registration.id)}
                          onCheckedChange={(checked) =>
                            toggleOne(registration.id, checked === true)
                          }
                        />
                      </TableCell>
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
                          onClick={() =>
                            setToDelete({ id: registration.id, name: registration.fullName })
                          }
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
        </TabsContent>

        <TabsContent value="emails">
          <WorkshopEmailsTab eventId={id} />
        </TabsContent>
      </Tabs>

      <AlertDialog open={resendOpen} onOpenChange={setResendOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resend confirmation?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedIds.length > 0
                ? `This resends the confirmation to your ${selectedIds.length} selected people who didn't receive it.`
                : "This resends the confirmation to up to 100 people who didn't receive it."}{' '}
              Anyone who already got it is skipped, so nobody gets it twice.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResend}>Resend</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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

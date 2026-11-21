'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmailEditor } from '@/modules/emails/components/email-editor';
import { useCampaigns, useDuplicateCampaign } from '@/modules/emails/hooks/use-campaigns';
import {
  CAMPAIGN_STATUS_LABEL,
  errorMessage,
  formatCount,
  formatIst,
  statusBadgeVariant,
} from '@/modules/emails/lib/format';
import { ArrowLeft, ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const whenOf = (c: {
  status: string;
  scheduledAt?: string | null;
  startedAt?: string | null;
  finishedAt?: string | null;
}) => (c.status === 'scheduled' ? c.scheduledAt : (c.finishedAt ?? c.startedAt)) ?? null;

/** The emails written for one webinar, plus the ways to start a new one. */
export const WorkshopEmailsTab = ({ eventId }: { eventId: string }) => {
  const router = useRouter();
  const { campaigns, loading } = useCampaigns({ eventId });
  const { campaigns: starters } = useCampaigns({ starters: true });
  const [duplicateCampaign, { loading: duplicating }] = useDuplicateCampaign();
  const [composing, setComposing] = useState(false);

  const openEmail = (id: string) => router.push(`/admin/emails/${id}`);

  const startFromStarter = async (starterId: string) => {
    try {
      const { data } = await duplicateCampaign({ variables: { id: starterId, eventId } });
      const id = data?.adminDuplicateCampaign?.id;
      if (id) openEmail(id);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not start from that email'));
    }
  };

  if (composing) {
    return (
      <div className="min-w-0 max-w-5xl space-y-4">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 gap-1"
          onClick={() => setComposing(false)}
        >
          <ArrowLeft className="size-4" /> Back to this webinar&apos;s emails
        </Button>
        <EmailEditor defaultEventId={eventId} onSaved={openEmail} />
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Reminders, joining details and thank-yous for this webinar. Start from a starter, or write
          a new email.
        </p>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2" disabled={duplicating}>
                {duplicating && <Spinner className="size-4" />}
                New from starter
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {starters.length === 0 ? (
                <DropdownMenuItem disabled>No starters</DropdownMenuItem>
              ) : (
                starters.map((s) => (
                  <DropdownMenuItem key={s.id} onSelect={() => startFromStarter(s.id)}>
                    {s.name}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2" onClick={() => setComposing(true)}>
            <Plus className="size-4" /> New email
          </Button>
        </div>
      </div>

      {loading && campaigns.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center">
          <Spinner className="size-6" />
        </div>
      ) : campaigns.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No emails for this webinar yet.
        </p>
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Recipients</TableHead>
                <TableHead>Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((c) => {
                const total =
                  c.counts.queued +
                  c.counts.sending +
                  c.counts.sent +
                  c.counts.failed +
                  c.counts.suppressed;
                const when = whenOf(c);
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">
                      <Link href={`/admin/emails/${c.id}`} className="hover:underline">
                        {c.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadgeVariant(c.status)}>
                        {CAMPAIGN_STATUS_LABEL[c.status] ?? c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{total ? formatCount(total) : '—'}</TableCell>
                    <TableCell>{when ? formatIst(when) : '—'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};

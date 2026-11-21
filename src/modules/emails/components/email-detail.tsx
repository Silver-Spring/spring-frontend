'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AdminCampaignQuery } from '@/gql/graphql';
import { Copy, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCampaignRecipients, useDuplicateCampaign } from '../hooks/use-campaigns';
import {
  CAMPAIGN_STATUS_LABEL,
  RECIPIENT_STATUSES,
  RECIPIENT_STATUS_LABEL,
  errorMessage,
  formatCount,
  formatIst,
  statusBadgeVariant,
} from '../lib/format';

type Campaign = NonNullable<AdminCampaignQuery['adminCampaign']>;

const PAGE_SIZE = 50;
const ALL = '__all__';

const KIND_LABEL: Record<string, string> = {
  webinar_update: 'Webinar update',
  promotional: 'Promotional',
};

/** An email that has started sending (or was cancelled): status, counts by status and who got it. */
export const EmailDetail = ({ campaign, onRefresh }: { campaign: Campaign; onRefresh: () => void }) => {
  const router = useRouter();
  const [status, setStatus] = useState(ALL);
  const [page, setPage] = useState(0);
  const { recipients, loading, refetch } = useCampaignRecipients(
    campaign.id,
    status === ALL ? null : status,
    page * PAGE_SIZE,
    PAGE_SIZE,
  );
  const [duplicate, { loading: duplicating }] = useDuplicateCampaign();

  const handleDuplicate = async () => {
    try {
      const { data } = await duplicate({ variables: { id: campaign.id } });
      const id = data?.adminDuplicateCampaign.id;
      if (!id) return;
      toast.success('Copied to a new draft');
      router.push(`/admin/emails/${id}`);
    } catch (error) {
      toast.error(errorMessage(error, 'Could not duplicate the email'));
    }
  };

  const handleRefresh = () => {
    onRefresh();
    refetch();
  };

  const times = [
    campaign.scheduledAt && `Scheduled ${formatIst(campaign.scheduledAt)}`,
    campaign.startedAt && `Started ${formatIst(campaign.startedAt)}`,
    campaign.finishedAt && `Finished ${formatIst(campaign.finishedAt)}`,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={statusBadgeVariant(campaign.status)}>
          {CAMPAIGN_STATUS_LABEL[campaign.status] ?? campaign.status}
        </Badge>
        <Badge variant="outline">{KIND_LABEL[campaign.kind] ?? campaign.kind}</Badge>
        <span className="text-sm text-muted-foreground">{times.join(' · ')}</span>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleRefresh}>
            <RefreshCw className="size-4" /> Refresh
          </Button>
          <Button size="sm" className="gap-2" onClick={handleDuplicate} disabled={duplicating}>
            {duplicating ? <Spinner className="size-4" /> : <Copy className="size-4" />}
            Duplicate
          </Button>
        </div>
      </div>

      <p className="text-sm">
        <span className="text-muted-foreground">Subject: </span>
        <span className="font-medium">{campaign.subject}</span>
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {RECIPIENT_STATUSES.map((s) => (
          <Card key={s} className="py-4">
            <CardContent className="space-y-1 px-4">
              <p className="text-xs text-muted-foreground">{RECIPIENT_STATUS_LABEL[s]}</p>
              <p className="text-2xl font-bold">{formatCount(campaign.counts[s])}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Recipients</h2>
          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
              setPage(0);
            }}
          >
            <SelectTrigger className="h-9 w-44" aria-label="Filter by status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All statuses</SelectItem>
              {RECIPIENT_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {RECIPIENT_STATUS_LABEL[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Error</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && recipients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <Spinner className="mx-auto size-5" />
                  </TableCell>
                </TableRow>
              ) : recipients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No recipients{status === ALL ? ' yet' : ' with this status'}.
                  </TableCell>
                </TableRow>
              ) : (
                recipients.map((r) => (
                  <TableRow key={r.email}>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.name ?? '—'}</TableCell>
                    <TableCell>{RECIPIENT_STATUS_LABEL[r.status] ?? r.status}</TableCell>
                    <TableCell>{r.sentAt ? formatIst(r.sentAt) : '—'}</TableCell>
                    <TableCell className="max-w-xs truncate text-destructive" title={r.error ?? undefined}>
                      {r.error ?? ''}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page + 1}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={recipients.length < PAGE_SIZE}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

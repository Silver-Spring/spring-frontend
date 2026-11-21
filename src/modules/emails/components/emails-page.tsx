'use client';

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
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useCampaigns } from '../hooks/use-campaigns';
import { CAMPAIGN_STATUS_LABEL, formatCount, formatIst, statusBadgeVariant } from '../lib/format';

type Counts = { queued: number; sending: number; sent: number; failed: number; suppressed: number };

const totalRecipients = (c: Counts): number => c.queued + c.sending + c.sent + c.failed + c.suppressed;

const whenOf = (c: { status: string; scheduledAt?: string | null; startedAt?: string | null; finishedAt?: string | null }) => {
  if (c.status === 'scheduled') return c.scheduledAt ?? null;
  return c.finishedAt ?? c.startedAt ?? null;
};

export const EmailsPage = () => {
  const { campaigns, loading, refetch } = useCampaigns();
  const { campaigns: starters, loading: startersLoading } = useCampaigns({ starters: true });

  return (
    <div className="min-w-0 space-y-6 p-6">
      <AdminPageHeader
        title="Emails"
        description="Write an email, choose who gets it, preview it, then send it now or at a set time."
        onRefresh={() => refetch()}
        refreshing={loading}
        actions={
          <Button asChild className="gap-2">
            <Link href="/admin/emails/new">
              <Plus className="size-4" />
              New email
            </Link>
          </Button>
        }
      />

      {loading && campaigns.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : campaigns.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No emails yet. Write the first one, or start from a starter below.
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
                const total = totalRecipients(c.counts);
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

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Starter emails</h2>
          <p className="text-sm text-muted-foreground">
            Ready-made webinar emails. Open one and use &quot;New from starter&quot; to make a draft for a webinar.
          </p>
        </div>
        {startersLoading && starters.length === 0 ? (
          <Spinner className="size-6" />
        ) : starters.length === 0 ? (
          <p className="text-sm text-muted-foreground">No starters.</p>
        ) : (
          <ul className="divide-y rounded-xl border">
            {starters.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm">
                <Link href={`/admin/emails/${s.id}`} className="font-medium hover:underline">
                  {s.name}
                </Link>
                <span className="truncate text-muted-foreground">{s.subject}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

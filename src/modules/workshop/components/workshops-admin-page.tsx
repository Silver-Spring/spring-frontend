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
import { ExternalLink, Pencil, Plus } from 'lucide-react';
import Link from 'next/link';
import { useAdminWorkshopEvents } from '../hooks/use-admin-workshops';

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft',
  published: 'Published',
  closed: 'Closed',
};

const formatWhen = (iso: string) =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));

export const WorkshopsAdminPage = () => {
  const { workshops, loading, refetch } = useAdminWorkshopEvents();

  return (
    <div className="space-y-6 p-6">
      <AdminPageHeader
        title="Workshops"
        description="Create workshops, set their status and share the page link."
        onRefresh={() => refetch()}
        refreshing={loading}
        actions={
          <Button asChild className="gap-2">
            <Link href="/admin/workshops/new">
              <Plus className="size-4" />
              New workshop
            </Link>
          </Button>
        }
      />

      {loading && workshops.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center">
          <Spinner className="size-8" />
        </div>
      ) : workshops.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No workshops yet. Create the first one.
        </p>
      ) : (
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Registered</TableHead>
                <TableHead className="w-40" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {workshops.map(({ event, registrationCount }) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{formatWhen(event.startsAt)}</TableCell>
                  <TableCell>
                    <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                      {STATUS_LABEL[event.status] ?? event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {registrationCount}
                    {event.capacity ? ` / ${event.capacity}` : ''}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/workshops/${event.id}`}>
                          <Pencil className="size-3.5" /> Edit
                        </Link>
                      </Button>
                      <Button asChild size="icon-sm" variant="ghost" aria-label="Open public page">
                        <Link href={`/workshops/${event.slug}`} target="_blank">
                          <ExternalLink className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

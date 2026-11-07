'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { AdminPageHeader } from '@/modules/admin/components/shared/admin-page-header';
import { ExternalLink, MoreHorizontal, Pencil, Plus, Trash2, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
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
import { useAdminWorkshopEvents, useDeleteWorkshop } from '../hooks/use-admin-workshops';

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
  const [deleteWorkshop] = useDeleteWorkshop();
  const [toDelete, setToDelete] = useState<{ id: string; title: string } | null>(null);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteWorkshop({ variables: { id: toDelete.id } });
      toast.success('Workshop deleted');
      await refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not delete the workshop');
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="min-w-0 space-y-6 p-6">
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
                <TableHead className="w-12" />
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
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" aria-label={`Actions for ${event.title}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/workshops/${event.id}/registrations`}>
                              <Users className="mr-2 h-4 w-4" />
                              Registrations
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/workshops/${event.id}`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit workshop
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/workshops/${event.slug}`} target="_blank">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open public page
                            </Link>
                          </DropdownMenuItem>
                          {event.status === 'draft' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => setToDelete({ id: event.id, title: event.title })}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={Boolean(toDelete)} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {toDelete?.title}?</AlertDialogTitle>
            <AlertDialogDescription>
              Only drafts can be deleted. This can&apos;t be undone. To stop a live workshop, set it
              to Closed instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

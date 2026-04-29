'use client';

import { DataTable } from '@/components/ui/data-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getInitials } from '@/lib/utils';
import { type ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { useMemo } from 'react';
import { ArrowUpDown, Key, ShieldCheck, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUsersWithoutAssessment } from '../../hooks';

interface UsersWithoutAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserWithoutAssessment {
  id: string;
  email: string;
  name: string | null;
  phoneNumber: string | null;
  isAdmin: boolean;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
}

export const UsersWithoutAssessmentDialog = ({
  open,
  onOpenChange,
}: UsersWithoutAssessmentDialogProps) => {
  const { users, totalCount, loading } = useUsersWithoutAssessment();

  const columns: ColumnDef<UserWithoutAssessment>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              User
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-medium truncate">{user.name || 'N/A'}</span>
              </div>
            </div>
          );
        },
        filterFn: (row, id, value) => {
          const user = row.original;
          const searchValue = value.toLowerCase();
          return (
            (user.name?.toLowerCase().includes(searchValue) ?? false) ||
            user.email.toLowerCase().includes(searchValue)
          );
        },
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground truncate block">
            {row.getValue('email')}
          </span>
        ),
      },
      {
        accessorKey: 'phoneNumber',
        header: 'Phone Number',
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.getValue('phoneNumber') || 'N/A'}
          </span>
        ),
      },
      {
        id: 'role',
        header: 'Role & Access',
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex flex-wrap gap-1">
              {user.isAdmin ? (
                <Badge variant="default" className="gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Admin
                </Badge>
              ) : user.isInternal ? (
                <Badge variant="outline" className="gap-1 border-orange-600 text-orange-600">
                  <Key className="h-3 w-3" />
                  Internal
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <UserCheck className="h-3 w-3" />
                  User
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Created
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(row.getValue('createdAt')), { addSuffix: true })}
          </span>
        ),
        sortingFn: (rowA, rowB) => {
          return (
            new Date(rowA.getValue('createdAt')).getTime() -
            new Date(rowB.getValue('createdAt')).getTime()
          );
        },
      },
    ],
    []
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-6xl max-h-[90vh] p-0 flex flex-col gap-0">
        <div className="px-6 pt-6">
          <DialogHeader>
            <DialogTitle>Users Without Assessment</DialogTitle>
            <DialogDescription>
              Users who have not completed their assessment yet ({totalCount} total)
            </DialogDescription>
          </DialogHeader>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8 px-6">
            <Spinner className="h-8 w-8" />
          </div>
        ) : (
          <div className="mt-4 overflow-y-auto flex-1 px-6 pb-6">
            {users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users found. All users have completed their assessments!
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={users as any}
                filterColumn="name"
                filterPlaceholder="Search by name..."
                emptyMessage="No users found."
                rowsPerPageId="rows-per-page-users-without-assessment"
              />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

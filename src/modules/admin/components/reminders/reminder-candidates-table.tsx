'use client';

import { useMemo } from 'react';
import { type ColumnDef, type RowSelectionState } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import type { ReminderCandidatesQuery } from '@/gql/graphql';

type ReminderCandidateUser = NonNullable<
  ReminderCandidatesQuery['adminReminderCandidates']
>['users'][number];

interface ReminderCandidatesTableProps {
  data: ReminderCandidateUser[];
  rowSelection: RowSelectionState;
  onRowSelectionChange: (selection: RowSelectionState) => void;
}

export const ReminderCandidatesTable = ({
  data,
  rowSelection,
  onRowSelectionChange,
}: ReminderCandidatesTableProps) => {
  const columns: ColumnDef<ReminderCandidateUser>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <div className="text-sm">{row.getValue('email')}</div>,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <div className="text-sm text-muted-foreground">{row.getValue('name') || 'N/A'}</div>
        ),
      },
      {
        accessorKey: 'daysSinceSignup',
        header: 'Days Since Signup',
        cell: ({ row }) => {
          const days = row.getValue('daysSinceSignup') as number;
          return <div className="text-sm">{days.toFixed(1)}d</div>;
        },
      },
      {
        accessorKey: 'reminderCount',
        header: 'Reminders Sent',
        cell: ({ row }) => <div className="text-sm">{row.getValue('reminderCount')}</div>,
      },
      {
        accessorKey: 'lastReminder',
        header: 'Last Reminder',
        cell: ({ row }) => {
          const lastReminder = row.getValue('lastReminder') as string | null;
          return (
            <div className="text-sm text-muted-foreground">
              {lastReminder ? new Date(lastReminder).toLocaleDateString() : 'Never'}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="email"
      filterPlaceholder="Filter by email..."
      emptyMessage="No users currently match this segment."
      rowsPerPageId="rows-per-page-reminder-candidates"
      enableRowSelection
      rowSelection={rowSelection}
      onRowSelectionChange={onRowSelectionChange}
    />
  );
};

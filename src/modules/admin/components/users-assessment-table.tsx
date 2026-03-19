'use client';

import { useMemo, useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Copy, Eye, Mail, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/ui/data-table';
import { useResendReport, useUsersWithAssessment } from '../../assessment/hooks';
import type { UserAssessmentInfo } from '@/gql/graphql';
import { RefreshCw } from 'lucide-react';

const getStatusColor = (status: string): string =>
  status === 'completed'
    ? 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium'
    : 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium';

export const UsersAssessmentTable = () => {
  const { users, totalCount, completedCount, inProgressCount, loading, refetch } =
    useUsersWithAssessment();
  const { resendReport, loading: resending } = useResendReport();
  const [resendingId, setResendingId] = useState<string | null>(null);

  const handleResendReport = async (resultId: string, userEmail: string) => {
    setResendingId(resultId);
    try {
      await resendReport(resultId);
      toast.success(`Report resent to ${userEmail}`);
    } catch (error) {
      toast.error('Failed to resend report');
    } finally {
      setResendingId(null);
    }
  };

  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success('Data refreshed');
    } catch (error) {
      toast.error('Failed to refresh data');
    }
  };

  const columns: ColumnDef<UserAssessmentInfo>[] = useMemo(
    () => [
      {
        accessorKey: 'userName',
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
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium">{row.original.userName || 'N/A'}</span>
            <span className="text-sm text-muted-foreground">{row.original.userEmail}</span>
          </div>
        ),
        filterFn: (row, id, value) => {
          const user = row.original;
          const searchValue = value.toLowerCase();
          return (
            (user.userName?.toLowerCase().includes(searchValue) ?? false) ||
            user.userEmail.toLowerCase().includes(searchValue)
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <span className={getStatusColor(row.getValue('status'))}>
            {row.getValue('status') === 'completed' ? 'Completed' : 'In Progress'}
          </span>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: 'startedAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Started
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <span className="text-sm">
            {formatDistanceToNow(new Date(row.getValue('startedAt')), { addSuffix: true })}
          </span>
        ),
        sortingFn: (rowA, rowB) => {
          return (
            new Date(rowA.getValue('startedAt')).getTime() -
            new Date(rowB.getValue('startedAt')).getTime()
          );
        },
      },
      {
        accessorKey: 'completedAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Completed
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const completedAt = row.getValue('completedAt') as string | null;
          return completedAt ? (
            <span className="text-sm">
              {formatDistanceToNow(new Date(completedAt), { addSuffix: true })}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          );
        },
        sortingFn: (rowA, rowB) => {
          const a = rowA.getValue('completedAt') as string | null;
          const b = rowB.getValue('completedAt') as string | null;
          if (!a && !b) return 0;
          if (!a) return 1;
          if (!b) return -1;
          return new Date(a).getTime() - new Date(b).getTime();
        },
      },
      {
        accessorKey: 'totalScore',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Score
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const score = row.getValue('totalScore') as number | null;
          return score !== null ? (
            <span className="font-medium">{score}</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
      },
      {
        accessorKey: 'interpretationLabel',
        header: 'Interpretation',
        cell: ({ row }) => {
          const label = row.getValue('interpretationLabel') as string | null;
          return label ? (
            <span className="font-medium">{label}</span>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const user = row.original;
          const isCompleted = user.resultId && user.status === 'completed';

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {isCompleted ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={`/assessment/results/${user.resultId}?from=admin`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Result
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleResendReport(user.resultId!, user.userEmail)}
                      disabled={resending && resendingId === user.resultId}
                    >
                      {resending && resendingId === user.resultId ? (
                        <>
                          <Spinner className="h-4 w-4 mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Resend Report
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                ) : null}
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(user.sessionId);
                    toast.success('Session ID copied to clipboard');
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Session ID
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(user.userEmail);
                    toast.success('Email copied to clipboard');
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Email
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [resending, resendingId, handleResendReport]
  );

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <Spinner className="h-8 w-8" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <CardTitle>Users Assessment Overview</CardTitle>
            <CardDescription>
              Total: {totalCount} | Completed: {completedCount} | In Progress: {inProgressCount}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="w-full md:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No users have taken the assessment yet.
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={users}
            filterColumn="userName"
            filterPlaceholder="Filter by user name or email..."
            emptyMessage="No users found."
            rowsPerPageId="rows-per-page-users"
          />
        )}
      </CardContent>
    </Card>
  );
};

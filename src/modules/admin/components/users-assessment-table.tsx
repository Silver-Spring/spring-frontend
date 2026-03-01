'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { useResendReport, useUsersWithAssessment } from '../../assessment/hooks';

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

  const getStatusColor = (status: string) => {
    return status === 'completed'
      ? 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium'
      : 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium';
  };

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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Users Assessment Overview</CardTitle>
            <CardDescription>
              Total: {totalCount} | Completed: {completedCount} | In Progress: {inProgressCount}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Completed</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Interpretation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.sessionId}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.userName || 'N/A'}</span>
                        <span className="text-sm text-muted-foreground">{user.userEmail}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={getStatusColor(user.status)}>
                        {user.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {formatDistanceToNow(new Date(user.startedAt), { addSuffix: true })}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.completedAt ? (
                        <span className="text-sm">
                          {formatDistanceToNow(new Date(user.completedAt), { addSuffix: true })}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.totalScore !== null ? (
                        <span className="font-medium">{user.totalScore}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.interpretationLabel ? (
                        <span className="font-medium">{user.interpretationLabel}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.resultId && user.status === 'completed' ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-8"
                            aria-label={`View results for ${user.userName || user.userEmail}`}
                            tabIndex={0}
                          >
                            <Link href={`/assessment/results/${user.resultId}?from=admin`}>
                              <Eye className="h-3 w-3 mr-1" />
                              View Result
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResendReport(user.resultId!, user.userEmail)}
                            disabled={resending && resendingId === user.resultId}
                            className="h-8"
                            aria-label={`Resend report to ${user.userEmail}`}
                            tabIndex={0}
                          >
                            {resending && resendingId === user.resultId ? (
                              <>
                                <Spinner className="h-3 w-3 mr-1" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Mail className="h-3 w-3 mr-1" />
                                Resend Report
                              </>
                            )}
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not available</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

'use client';

import { AdminSidebarLayout } from '@/components/layouts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
import { useUserStore } from '@/stores';
import { formatDistanceToNow } from 'date-fns';
import {
  RefreshCw,
  ShieldCheck,
  ShieldOff,
  UserCheck,
  UserPlus,
  Users as UsersIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useAllUsers, useGrantAdmin, useRevokeAdmin } from '../hooks';
import { getInitials } from '@/lib/utils';

export const UsersPage = () => {
  const { users, totalCount, adminCount, regularUserCount, newThisMonth, loading, refetch } =
    useAllUsers();
  const { grantAdmin, loading: granting } = useGrantAdmin();
  const { revokeAdmin, loading: revoking } = useRevokeAdmin();
  const currentUserId = useUserStore((state) => state.user?.id);
  const [actionUserId, setActionUserId] = useState<string | null>(null);

  const handleGrantAdmin = async (userId: string, userEmail: string) => {
    setActionUserId(userId);
    try {
      await grantAdmin(userId);
      await refetch();
    } finally {
      setActionUserId(null);
    }
  };

  const handleRevokeAdmin = async (userId: string, userEmail: string) => {
    setActionUserId(userId);
    try {
      await revokeAdmin(userId);
      await refetch();
    } finally {
      setActionUserId(null);
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  return (
    <AdminSidebarLayout>
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage user accounts, permissions, and access control
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">{totalCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Admin Users</CardDescription>
              <CardTitle className="text-3xl">{adminCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <ShieldCheck className="h-4 w-4 text-green-600" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Regular Users</CardDescription>
              <CardTitle className="text-3xl">{regularUserCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <UserCheck className="h-4 w-4 text-blue-600" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>New This Month</CardDescription>
              <CardTitle className="text-3xl">{newThisMonth}</CardTitle>
            </CardHeader>
            <CardContent>
              <UserPlus className="h-4 w-4 text-purple-600" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
            <CardDescription>View and manage all user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Spinner className="h-8 w-8" />
              </div>
            ) : users.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No users found
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => {
                      const isCurrentUser = user.id === currentUserId;
                      const isProcessing = actionUserId === user.id && (granting || revoking);

                      return (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="text-xs">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {user.name || 'N/A'}
                                  {isCurrentUser && (
                                    <span className="ml-2 text-xs text-muted-foreground">
                                      (You)
                                    </span>
                                  )}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {user.phoneNumber || 'N/A'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {user.isAdmin ? (
                              <Badge variant="default" className="gap-1">
                                <ShieldCheck className="h-3 w-3" />
                                Admin
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="gap-1">
                                <UserCheck className="h-3 w-3" />
                                User
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(user.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {user.isAdmin ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRevokeAdmin(user.id, user.email)}
                                disabled={isCurrentUser || isProcessing}
                                className="h-8"
                                aria-label={`Revoke admin access from ${user.email}`}
                                tabIndex={0}
                              >
                                {isProcessing ? (
                                  <>
                                    <Spinner className="h-3 w-3 mr-1" />
                                    Revoking...
                                  </>
                                ) : (
                                  <>
                                    <ShieldOff className="h-3 w-3 mr-1" />
                                    Revoke Admin
                                  </>
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleGrantAdmin(user.id, user.email)}
                                disabled={isProcessing}
                                className="h-8"
                                aria-label={`Grant admin access to ${user.email}`}
                                tabIndex={0}
                              >
                                {isProcessing ? (
                                  <>
                                    <Spinner className="h-3 w-3 mr-1" />
                                    Granting...
                                  </>
                                ) : (
                                  <>
                                    <ShieldCheck className="h-3 w-3 mr-1" />
                                    Grant Admin
                                  </>
                                )}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminSidebarLayout>
  );
};

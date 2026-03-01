'use client';

import { AdminSidebarLayout } from '@/components/layouts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { getInitials } from '@/lib/utils';
import { useUserStore } from '@/stores';
import { formatDistanceToNow } from 'date-fns';
import {
  MoreVertical,
  RefreshCw,
  ShieldCheck,
  ShieldOff,
  Trash2,
  UserCheck,
  UserPlus,
  Users as UsersIcon,
} from 'lucide-react';
import { useState } from 'react';
import { DeleteUserDialog, GrantAdminDialog, RevokeAdminDialog } from './dialogs';
import { useAllUsers, useDeleteUser, useGrantAdmin, useRevokeAdmin } from '../hooks';

type ConfirmDialogType = 'grant' | 'revoke' | 'delete' | null;

interface SelectedUser {
  id: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
}

export const UsersPage = () => {
  const { users, totalCount, adminCount, regularUserCount, newThisMonth, loading, refetch } =
    useAllUsers();
  const { grantAdmin, loading: granting } = useGrantAdmin();
  const { revokeAdmin, loading: revoking } = useRevokeAdmin();
  const { deleteUser, loading: deleting } = useDeleteUser();
  const currentUserId = useUserStore((state) => state.user?.id);
  const [actionUserId, setActionUserId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogType>(null);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  const handleOpenConfirmDialog = (type: ConfirmDialogType, user: SelectedUser) => {
    setSelectedUser(user);
    setConfirmDialog(type);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog(null);
    setSelectedUser(null);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser) return;

    setActionUserId(selectedUser.id);
    try {
      switch (confirmDialog) {
        case 'grant':
          await grantAdmin(selectedUser.id);
          break;
        case 'revoke':
          await revokeAdmin(selectedUser.id);
          break;
        case 'delete':
          await deleteUser(selectedUser.id);
          break;
      }
      await refetch();
      handleCloseConfirmDialog();
    } finally {
      setActionUserId(null);
    }
  };

  const handleRefresh = async () => {
    await refetch();
  };

  const isProcessing = granting || revoking || deleting;

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
              <div className="rounded-md border max-h-[600px] overflow-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-[200px]">User</TableHead>
                      <TableHead className="w-[220px]">Email</TableHead>
                      <TableHead className="w-[150px]">Phone Number</TableHead>
                      <TableHead className="w-[120px]">Role</TableHead>
                      <TableHead className="w-[150px]">Created</TableHead>
                      <TableHead className="w-[80px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => {
                      const isCurrentUser = user.id === currentUserId;
                      const isUserProcessing = actionUserId === user.id && isProcessing;

                      return (
                        <TableRow key={user.id}>
                          <TableCell className="w-[200px]">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 shrink-0">
                                <AvatarFallback className="text-xs">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col min-w-0">
                                <span className="font-medium truncate">
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
                          <TableCell className="w-[220px]">
                            <span className="text-sm text-muted-foreground truncate block">
                              {user.email}
                            </span>
                          </TableCell>
                          <TableCell className="w-[150px]">
                            <span className="text-sm text-muted-foreground">
                              {user.phoneNumber || 'N/A'}
                            </span>
                          </TableCell>
                          <TableCell className="w-[120px]">
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
                          <TableCell className="w-[150px]">
                            <span className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(user.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="w-[80px] text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  disabled={isUserProcessing}
                                  aria-label={`Actions for ${user.email}`}
                                >
                                  {isUserProcessing ? (
                                    <Spinner className="h-4 w-4" />
                                  ) : (
                                    <MoreVertical className="h-4 w-4" />
                                  )}
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {user.isAdmin ? (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleOpenConfirmDialog('revoke', {
                                        id: user.id,
                                        email: user.email,
                                        name: user.name || null,
                                        isAdmin: user.isAdmin,
                                      })
                                    }
                                    disabled={isCurrentUser}
                                  >
                                    <ShieldOff className="h-4 w-4 mr-2" />
                                    Revoke Admin
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleOpenConfirmDialog('grant', {
                                        id: user.id,
                                        email: user.email,
                                        name: user.name || null,
                                        isAdmin: user.isAdmin,
                                      })
                                    }
                                  >
                                    <ShieldCheck className="h-4 w-4 mr-2" />
                                    Grant Admin
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() =>
                                    handleOpenConfirmDialog('delete', {
                                      id: user.id,
                                      email: user.email,
                                      name: user.name || null,
                                      isAdmin: user.isAdmin,
                                    })
                                  }
                                  disabled={isCurrentUser}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

      <GrantAdminDialog
        open={confirmDialog === 'grant'}
        onOpenChange={handleCloseConfirmDialog}
        onConfirm={handleConfirmAction}
        userEmail={selectedUser?.email || ''}
        loading={granting}
      />

      <RevokeAdminDialog
        open={confirmDialog === 'revoke'}
        onOpenChange={handleCloseConfirmDialog}
        onConfirm={handleConfirmAction}
        userEmail={selectedUser?.email || ''}
        loading={revoking}
      />

      <DeleteUserDialog
        open={confirmDialog === 'delete'}
        onOpenChange={handleCloseConfirmDialog}
        onConfirm={handleConfirmAction}
        userEmail={selectedUser?.email || ''}
        loading={deleting}
      />
    </AdminSidebarLayout>
  );
};

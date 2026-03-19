'use client';

import { useMemo, useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Key,
  MoreVertical,
  RefreshCw,
  ShieldCheck,
  ShieldOff,
  Trash2,
  UserCheck,
  UserPlus,
  Users as UsersIcon,
  XCircle,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { AdminSidebarLayout } from '@/components/layouts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { DataTable } from '@/components/ui/data-table';
import { getInitials } from '@/lib/utils';
import { useUserStore } from '@/stores';
import type { UserInfo } from '@/gql/graphql';
import {
  DeleteUserDialog,
  GrantAdminDialog,
  RevokeAdminDialog,
  GrantInternalAccessDialog,
  RevokeInternalAccessDialog,
} from './dialogs';
import {
  useAllUsers,
  useDeleteUser,
  useGrantAdmin,
  useRevokeAdmin,
  useGrantInternalAccess,
  useRevokeInternalAccess,
} from '../hooks';

type ConfirmDialogType = 'grant' | 'revoke' | 'delete' | 'grantInternal' | 'revokeInternal' | null;

interface SelectedUser {
  id: string;
  email: string;
  name: string | null;
  isAdmin: boolean;
  isInternal: boolean;
}

export const UsersPage = () => {
  const {
    users,
    totalCount,
    adminCount,
    internalUserCount,
    regularUserCount,
    newThisMonth,
    loading,
    refetch,
  } = useAllUsers();
  const { grantAdmin, loading: granting } = useGrantAdmin();
  const { revokeAdmin, loading: revoking } = useRevokeAdmin();
  const { grantInternalAccess, loading: grantingInternal } = useGrantInternalAccess();
  const { revokeInternalAccess, loading: revokingInternal } = useRevokeInternalAccess();
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
        case 'grantInternal':
          await grantInternalAccess(selectedUser.id);
          break;
        case 'revokeInternal':
          await revokeInternalAccess(selectedUser.id);
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

  const isProcessing = granting || revoking || grantingInternal || revokingInternal || deleting;

  const columns: ColumnDef<UserInfo>[] = useMemo(
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
          const isCurrentUser = user.id === currentUserId;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-medium truncate">
                  {user.name || 'N/A'}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-muted-foreground">(You)</span>
                  )}
                </span>
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
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const user = row.original;
          const isCurrentUser = user.id === currentUserId;
          const isUserProcessing = actionUserId === user.id && isProcessing;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
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
                        isInternal: user.isInternal,
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
                        isInternal: user.isInternal,
                      })
                    }
                  >
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Grant Admin
                  </DropdownMenuItem>
                )}
                {!user.isAdmin && (
                  <>
                    {user.isInternal ? (
                      <DropdownMenuItem
                        onClick={() =>
                          handleOpenConfirmDialog('revokeInternal', {
                            id: user.id,
                            email: user.email,
                            name: user.name || null,
                            isAdmin: user.isAdmin,
                            isInternal: user.isInternal,
                          })
                        }
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Revoke Internal Access
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() =>
                          handleOpenConfirmDialog('grantInternal', {
                            id: user.id,
                            email: user.email,
                            name: user.name || null,
                            isAdmin: user.isAdmin,
                            isInternal: user.isInternal,
                          })
                        }
                      >
                        <Key className="h-4 w-4 mr-2" />
                        Grant Internal Access
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() =>
                    handleOpenConfirmDialog('delete', {
                      id: user.id,
                      email: user.email,
                      name: user.name || null,
                      isAdmin: user.isAdmin,
                      isInternal: user.isInternal,
                    })
                  }
                  disabled={isCurrentUser}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [currentUserId, actionUserId, isProcessing, handleOpenConfirmDialog]
  );

  return (
    <AdminSidebarLayout>
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6 lg:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">User Management</h1>
              <p className="text-sm text-muted-foreground mt-1 md:text-base md:mt-2">
                Manage user accounts, permissions, and access control
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="w-full md:w-auto"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                <ShieldCheck className="h-4 w-4 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Internal Users</CardDescription>
                <CardTitle className="text-3xl">{internalUserCount}</CardTitle>
              </CardHeader>
              <CardContent>
                <Key className="h-4 w-4 text-orange-600" />
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
                <DataTable
                  columns={columns}
                  data={users}
                  filterColumn="name"
                  filterPlaceholder="Filter by name..."
                  emptyMessage="No users found."
                  rowsPerPageId="rows-per-page-users-list"
                />
              )}
            </CardContent>
          </Card>
        </div>
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

      <GrantInternalAccessDialog
        open={confirmDialog === 'grantInternal'}
        onOpenChange={handleCloseConfirmDialog}
        onConfirm={handleConfirmAction}
        userEmail={selectedUser?.email || ''}
        loading={grantingInternal}
      />

      <RevokeInternalAccessDialog
        open={confirmDialog === 'revokeInternal'}
        onOpenChange={handleCloseConfirmDialog}
        onConfirm={handleConfirmAction}
        userEmail={selectedUser?.email || ''}
        loading={revokingInternal}
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

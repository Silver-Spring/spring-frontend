'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AssessmentStatus } from '@/modules/assessment/components';
import { PhoneNumberDialog } from '@/modules/auth/components';
import { useLogout } from '@/modules/auth/hooks';
import { useUserStore } from '@/stores';
import { Calendar, LayoutDashboard, LogOut, Mail, Phone, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getGreeting, getInitials } from '../utils';

export const DashboardPage = () => {
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const currentUser = useUserStore((state) => state.user);
  const { logout, loading: logoutLoading } = useLogout();

  useEffect(() => {
    if (currentUser && !currentUser.phoneNumber) {
      setShowPhoneDialog(true);
    }
  }, [currentUser]);

  return (
    <ProtectedLayout>
      {({ currentUser, isAdmin }) => (
        <div className="min-h-screen flex flex-col bg-background">
          <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
            <div className="mx-auto px-8 sm:px-6 h-14 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/silverspring_logo.jpeg"
                  alt="Silver Spring"
                  width={28}
                  height={28}
                  className="rounded-sm object-cover"
                  priority
                />
                <span className="font-semibold text-sm tracking-tight">Silver Spring</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-xs font-medium">
                      {getInitials(currentUser?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground hidden sm:block">
                    {currentUser?.name}
                  </span>
                </div>
                {isAdmin && (
                  <Button asChild variant="ghost" size="sm" className="gap-1.5">
                    <Link href="/admin">
                      <LayoutDashboard className="size-4" />
                      <span className="hidden sm:inline">Admin</span>
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  disabled={logoutLoading}
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">
                    {logoutLoading ? 'Logging out...' : 'Logout'}
                  </span>
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">
                {getGreeting()}, {currentUser?.name?.split(' ')[0] || 'there'}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Here&apos;s an overview of your profile and assessment status.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Your Profile</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground w-12 shrink-0">Name</span>
                    <span className="ml-auto font-medium truncate">{currentUser?.name || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground w-12 shrink-0">Email</span>
                    <span className="ml-auto font-medium truncate">
                      {currentUser?.email || '—'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground w-12 shrink-0">Age</span>
                    <span className="ml-auto font-medium truncate">{currentUser?.age || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="size-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground w-12 shrink-0">Phone</span>
                    <span className="ml-auto font-medium">
                      {currentUser?.phoneNumber ?? (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => setShowPhoneDialog(true)}
                          className="text-primary underline underline-offset-4 text-xs font-normal"
                        >
                          Add number
                        </Button>
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <AssessmentStatus />
            </div>
          </main>

          <PhoneNumberDialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog} />
        </div>
      )}
    </ProtectedLayout>
  );
};

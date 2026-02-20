'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/modules/auth/hooks';
import { useCurrentUser } from '@/modules/auth/hooks/use-current-user';
import { getInitials } from '@/modules/dashboard/utils';
import { LayoutDashboard, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  const { currentUser, isLoggedIn, isAdmin } = useCurrentUser();
  const { logout, loading: logoutLoading } = useLogout();

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image
            src="/silverspring_logo.jpeg"
            alt="Silver Spring"
            width={32}
            height={32}
            className="rounded-sm object-cover"
            priority
          />
          <span className="font-semibold text-base tracking-tight">Silver Spring</span>
        </Link>

        {isLoggedIn && (
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <Link href="/admin">
                  <LayoutDashboard className="size-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              </Button>
            )}
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
        )}
      </div>
    </header>
  );
}

'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { getInitials } from '@/lib/utils';
import { AdminAssessmentSidebarNav } from '@/modules/admin/components/admin-assessment-sidebar-nav';
import { useLogout } from '@/modules/auth/hooks';
import { BarChart3, CreditCard, Home, LayoutDashboard, LogOut, Mail, Ticket, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';
import { AuthLayout, AuthRestrict, type LayoutChildProps } from './auth-layout';

interface AdminSidebarLayoutProps {
  children: ReactNode | ((props: LayoutChildProps) => ReactNode);
}

const platformItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard, exact: true },
  { title: 'Users', url: '/admin/users', icon: Users, exact: false },
  { title: 'Analytics', url: '/admin/analytics', icon: BarChart3, exact: false },
  { title: 'Payments', url: '/admin/payments', icon: CreditCard, exact: false },
  { title: 'Coupons', url: '/admin/coupons', icon: Ticket, exact: false },
  { title: 'Reminders', url: '/admin/reminders', icon: Mail, exact: false },
];

export const AdminSidebarLayout = ({ children }: AdminSidebarLayoutProps) => {
  const pathname = usePathname();
  const { logout, loading: loggingOut } = useLogout();

  return (
    <AuthLayout forbidWhen={AuthRestrict.LOGGED_OUT | AuthRestrict.NOT_ADMIN}>
      {(props) => (
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="border-b h-14 justify-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                    {getInitials(props.currentUser?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {props.currentUser?.name || props.currentUser?.email}
                  </p>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              {/* Platform section */}
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {platformItems.map((item) => {
                      const isActive = item.exact
                        ? pathname === item.url
                        : pathname.startsWith(item.url);
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />

              {/* Assessments section */}
              <SidebarGroup>
                <SidebarGroupLabel>Assessments</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <Suspense fallback={null}>
                      <AdminAssessmentSidebarNav />
                    </Suspense>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-3 space-y-1.5">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                asChild
                aria-label="Go to Homepage"
              >
                <Link href="/">
                  <Home className="mr-2 size-4" />
                  Homepage
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={logout}
                disabled={loggingOut}
                aria-label="Logout"
              >
                {loggingOut ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 size-4" />
                    Logout
                  </>
                )}
              </Button>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur px-6">
              <SidebarTrigger />
              <div className="h-4 w-px bg-border" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </header>
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              {typeof children === 'function' ? children(props) : children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      )}
    </AuthLayout>
  );
};

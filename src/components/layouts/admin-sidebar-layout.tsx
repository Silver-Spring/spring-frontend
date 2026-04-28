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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Spinner } from '@/components/ui/spinner';
import { getInitials } from '@/lib/utils';
import { useLogout } from '@/modules/auth/hooks';
import {
  BarChart3,
  ClipboardList,
  CreditCard,
  Home,
  LayoutDashboard,
  LogOut,
  Ticket,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import { AuthLayout, AuthRestrict, type LayoutChildProps } from './auth-layout';

interface AdminSidebarLayoutProps {
  children: ReactNode | ((props: LayoutChildProps) => ReactNode);
}

const menuItems = [
  {
    title: 'Overview',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Assessment Management',
    url: '/admin/assessment',
    icon: ClipboardList,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Payments',
    url: '/admin/payments',
    icon: CreditCard,
  },
  {
    title: 'Coupons',
    url: '/admin/coupons',
    icon: Ticket,
  },
];

export const AdminSidebarLayout = ({ children }: AdminSidebarLayoutProps) => {
  const pathname = usePathname();
  const { logout, loading: loggingOut } = useLogout();

  return (
    <AuthLayout forbidWhen={AuthRestrict.LOGGED_OUT | AuthRestrict.NOT_ADMIN}>
      {(props) => (
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="border-b h-16 justify-center ">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {getInitials(props.currentUser?.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">
                    {props.currentUser?.name || props.currentUser?.email}
                  </h2>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => {
                      const isActive = pathname === item.url;
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={item.url}>
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <Button
                variant="outline"
                className="w-full justify-start mb-2"
                asChild
                aria-label="Go to Homepage"
                tabIndex={0}
              >
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Homepage
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={logout}
                disabled={loggingOut}
                aria-label="Logout"
                tabIndex={0}
              >
                {loggingOut ? (
                  <>
                    <Spinner className="h-4 w-4 mr-2" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </>
                )}
              </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
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

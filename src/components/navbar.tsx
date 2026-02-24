'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getInitials } from '@/lib/utils';
import { useLogout } from '@/modules/auth/hooks';
import { useUserStore } from '@/stores';
import { LayoutDashboard, LogOut, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = useUserStore((state) => state.user);
  const isAdmin = currentUser?.isAdmin;
  const { logout, loading: logoutLoading } = useLogout();

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 relative">
        <div className="h-full grid grid-cols-2 md:grid-cols-3 items-center">
          <div className="flex items-center gap-2 justify-start">
            <Image
              src="/silverspring_logo.jpeg"
              alt="Silver Spring"
              width={40}
              height={40}
              className="rounded-sm object-cover"
              priority
            />
          </div>

          <nav className="hidden md:flex items-center justify-center gap-8">
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL}
              className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors"
            >
              Home
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/about-us`}
              className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors"
            >
              About Us
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/resources`}
              className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors"
            >
              Resources
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/blog`}
              className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors"
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3 justify-end">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <nav className="flex flex-col gap-4 p-8">
                  <Link
                    href={process.env.NEXT_PUBLIC_APP_URL || '/'}
                    className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    Home
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/about-us`}
                    className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    About Us
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/resources`}
                    className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    Resources
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/blog`}
                    className="text-base font-semibold text-green-800 hover:text-green-700 transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    Blog
                  </Link>

                  {currentUser && (
                    <>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Avatar className="size-8">
                            <AvatarFallback className="text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                              {getInitials(currentUser?.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground">{currentUser?.name}</span>
                        </div>
                      </div>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 text-base font-medium text-foreground hover:text-foreground/80 py-2"
                          onClick={handleMobileNavClick}
                        >
                          <LayoutDashboard className="size-4" />
                          <span>Admin</span>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          logout();
                          handleMobileNavClick();
                        }}
                        disabled={logoutLoading}
                        className="justify-start gap-2 text-foreground hover:text-foreground/80"
                      >
                        <LogOut className="size-4" />
                        <span>{logoutLoading ? 'Logging out...' : 'Logout'}</span>
                      </Button>
                    </>
                  )}

                  {!currentUser && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white shadow-md mt-4"
                    >
                      <Link href="/auth/login" onClick={handleMobileNavClick}>
                        Start Your Journey
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-3">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                        {getInitials(currentUser?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground hidden lg:block">
                      {currentUser?.name}
                    </span>
                  </div>
                  {isAdmin && (
                    <Button asChild variant="ghost" size="sm" className="gap-1.5">
                      <Link href="/admin">
                        <LayoutDashboard className="size-4" />
                        <span>Admin</span>
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    disabled={logoutLoading}
                    className="gap-1.5 text-foreground hover:text-foreground/80"
                  >
                    <LogOut className="size-4" />
                    <span className="hidden sm:inline">
                      {logoutLoading ? 'Logging out...' : 'Logout'}
                    </span>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white shadow-md"
                >
                  <Link href="/auth/login">Start Your Journey</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 relative">
        <div className="h-full grid grid-cols-2 lg:grid-cols-3 items-center">
          <Link
            href={process.env.NEXT_PUBLIC_APP_URL || '/'}
            aria-label="Go to landing page"
            tabIndex={0}
            className="flex items-center gap-2 justify-start"
          >
            <Image
              src="/silverspring_logo.png"
              alt="Silver Spring"
              width={40}
              height={40}
              className="rounded-sm object-cover"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
            <Link
              href={process.env.NEXT_PUBLIC_APP_URL}
              className="text-base font-semibold text-primary/80 hover:text-primary transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/about-us`}
              className="text-base font-semibold text-primary/80 hover:text-primary transition-colors whitespace-nowrap"
            >
              About Us
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/resources`}
              className="text-base font-semibold text-primary/80 hover:text-primary transition-colors whitespace-nowrap"
            >
              Resources
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/blog`}
              className="text-base font-semibold text-primary/80 hover:text-primary transition-colors whitespace-nowrap"
            >
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-3 justify-end">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigate to different sections of Silver Spring
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4 px-4">
                  <Link
                    href={process.env.NEXT_PUBLIC_APP_URL || '/'}
                    className="text-base font-semibold text-primary/80 hover:text-primary transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    Home
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/about-us`}
                    className="text-base font-semibold text-primary/80 hover:text-primary transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    About Us
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/resources`}
                    className="text-base font-semibold text-primary/80 hover:text-primary transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    Resources
                  </Link>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/blog`}
                    className="text-base font-semibold text-primary/80 hover:text-primary transition-colors py-2"
                    onClick={handleMobileNavClick}
                  >
                    Blog
                  </Link>

                  {currentUser && (
                    <>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-8">
                            <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                              {getInitials(currentUser?.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground">{currentUser?.name}</span>
                        </div>
                      </div>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 text-base font-medium text-foreground hover:text-foreground/80"
                          onClick={handleMobileNavClick}
                        >
                          <LayoutDashboard className="size-4" />
                          <span>Admin</span>
                        </Link>
                      )}
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => {
                          logout();
                          handleMobileNavClick();
                        }}
                        disabled={logoutLoading}
                        className="justify-start gap-2 text-foreground px-0! hover:text-foreground/80"
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
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md mt-4"
                    >
                      <Link href="/auth/login" onClick={handleMobileNavClick}>
                        Start Your Journey
                      </Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-3">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                        {getInitials(currentUser?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-foreground hidden xl:block whitespace-nowrap">
                      {currentUser?.name}
                    </span>
                  </div>
                  {isAdmin && (
                    <Button asChild variant="ghost" size="sm" className="gap-1.5 whitespace-nowrap">
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
                    className="gap-1.5 text-foreground hover:text-foreground/80 whitespace-nowrap"
                  >
                    <LogOut className="size-4" />
                    <span className="hidden xl:inline">
                      {logoutLoading ? 'Logging out...' : 'Logout'}
                    </span>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md whitespace-nowrap"
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

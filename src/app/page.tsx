'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/components/layouts';
import { useLogout } from '@/modules/auth/hooks';
import Link from 'next/link';

export default function HomePage() {
  const { logout, loading: logoutLoading } = useLogout();

  return (
    <PublicLayout>
      {({ isLoggedIn, currentUser, isAdmin }) => (
        <div className="container mx-auto p-8">
          <header className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">Welcome to Our App</h1>
                {isLoggedIn && <p className="text-gray-600">Hello, {currentUser?.name}! 👋</p>}
              </div>
              {isLoggedIn && (
                <Button onClick={logout} disabled={logoutLoading} variant="secondary">
                  {logoutLoading ? 'Logging out...' : 'Logout'}
                </Button>
              )}
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Guest Section - Only for Non-Logged In Users */}
            {!isLoggedIn && (
              <>
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle>🔐 Login</CardTitle>
                    <CardDescription>
                      Already have an account? Sign in to access your dashboard.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle>✨ Sign Up</CardTitle>
                    <CardDescription>New here? Create an account to get started.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/auth/register">Create Account</Link>
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* User Section - Only for Logged In Users */}
            {isLoggedIn && (
              <>
                <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle>📊 Dashboard</CardTitle>
                    <CardDescription>
                      View your personal dashboard and manage your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Admin Section - Only for Admin Users */}
            {isAdmin && (
              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle>⚙️ Admin Panel</CardTitle>
                  <CardDescription>Access admin tools and manage the system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="destructive">
                    <Link href="/admin">Admin Area</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* User Info - Only for Logged In Users */}
            {isLoggedIn && (
              <Card>
                <CardHeader>
                  <CardTitle>👤 Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {currentUser?.name || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {currentUser?.email}
                    </p>
                    <p>
                      <span className="font-medium">Type:</span> {currentUser?.type}
                    </p>
                    <p>
                      <span className="font-medium">Role:</span>{' '}
                      {isAdmin ? (
                        <span className="text-red-600 font-semibold">Admin</span>
                      ) : (
                        <span>User</span>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">✨ Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <h3 className="font-semibold">Secure Authentication</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Role-based access control with automatic redirects
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-semibold">Fast & Modern</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Built with Next.js 14+ and React best practices
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="font-semibold">Beautiful UI</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Responsive design with dark mode support
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">📱</span>
                <div>
                  <h3 className="font-semibold">Mobile Friendly</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Optimized for all devices and screen sizes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}

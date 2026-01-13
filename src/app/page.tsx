'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PublicLayout } from '@/components/layouts';
import { useLogout } from '@/modules/auth/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, Heart, Sparkles, Users, TreeDeciduous, Target } from 'lucide-react';

export default function HomePage() {
  const { logout, loading: logoutLoading } = useLogout();

  return (
    <PublicLayout>
      {({ isLoggedIn, currentUser, isAdmin }) => (
        <div className="min-h-screen max-w-[1920px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/silverspring_logo.jpeg"
                  alt="Silver Spring Logo"
                  width={32}
                  height={32}
                  className="rounded-sm object-cover"
                  priority
                />
                <Badge variant="secondary" className="text-xs">
                  Beta
                </Badge>
              </div>
              <nav className="flex items-center gap-4">
                {isLoggedIn ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      Hello, {currentUser?.name}
                    </span>
                    {isAdmin && (
                      <Button asChild variant="ghost" size="sm">
                        <Link href="/admin">Admin</Link>
                      </Button>
                    )}
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button onClick={logout} disabled={logoutLoading} variant="outline" size="sm">
                      {logoutLoading ? 'Logging out...' : 'Logout'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/auth/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </nav>
            </div>
          </header>

          <main className="container mx-auto px-4 py-16">
            <section className="text-center mb-16 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                India&apos;s First Dedicated Retirement Transition Coaching Practice
              </h2>
              <p className="text-xl text-muted-foreground mb-4">
                Helping you navigate life beyond finances
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                After decades of climbing the professional ladder, you&apos;ve planned and saved for
                retirement. But have you thought about how you&apos;ll live your retirement, not
                just spend it?
              </p>
              {!isLoggedIn && (
                <div className="flex gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/auth/register">Begin Your Journey</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </div>
              )}
              {isLoggedIn && (
                <Button asChild size="lg">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              )}
            </section>

            <section className="mb-16 max-w-3xl mx-auto">
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <p className="text-lg leading-relaxed">
                  Retirement is not an ending, but the beginning of a new chapter, one that deserves
                  as much planning and intention as the years spent building a career.
                </p>
              </div>
            </section>

            <section className="mb-16 max-w-5xl mx-auto">
              <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/silverspring_cover.jpeg"
                  alt="Your season of contentment and clarity"
                  width={1600}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </section>

            <Separator className="my-12" />

            <section className="mb-16">
              <h3 className="text-3xl font-semibold text-center mb-4">Our Approach</h3>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                A tailored retirement transition coaching program built on three pillars
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <Target className="h-12 w-12 text-primary mb-3" />
                    <CardTitle className="text-xl">Intentional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Retirement isn&apos;t one-size-fits-all. We co-create personalized, practical
                      plans for your unique goals and dreams.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <Heart className="h-12 w-12 text-primary mb-3" />
                    <CardTitle className="text-xl">Compassionate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      With freedom often comes uncertainty. We guide you with empathy as you
                      navigate clarity and purpose.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <Sparkles className="h-12 w-12 text-primary mb-3" />
                    <CardTitle className="text-xl">Empowering</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      We equip you with the tools, wisdom, and an extended network to stay in the
                      driver&apos;s seat of your journey.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-12" />

            <section className="mb-16">
              <h3 className="text-2xl font-semibold text-center mb-10">What We Focus On</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <Users className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Social Connections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Building and nurturing meaningful relationships beyond the workplace
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Heart className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Emotional Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Understanding and managing the emotional transitions of retirement
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <TreeDeciduous className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Physical Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Creating sustainable routines for long-term wellness and vitality
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Compass className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>Sense of Purpose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Discovering what gives your life meaning beyond professional identity
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-3xl font-semibold mb-4">Ready to Begin Your Next Chapter?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
                Because how you spend your time in retirement is just as important as how you spent
                years saving for it.
              </p>
              {!isLoggedIn ? (
                <Button asChild size="lg">
                  <Link href="/auth/register">Start Your Journey</Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link href="/dashboard">Access Dashboard</Link>
                </Button>
              )}
            </section>
          </main>

          <footer className="border-t mt-16">
            <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2026 Silver Spring. All rights reserved.</p>
              <p className="mt-2">Beta Version - Platform under active development</p>
              <p className="mt-2">
                India&apos;s First Dedicated Retirement Transition Coaching Practice
              </p>
            </div>
          </footer>
        </div>
      )}
    </PublicLayout>
  );
}

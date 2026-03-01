'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useResetPassword } from '../hooks';
import { resetPasswordSchema } from '../schema';

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps extends React.ComponentProps<'div'> {
  userId?: string;
  resetToken?: string;
}

export function ResetPasswordForm({
  className,
  userId = '',
  resetToken = '',
  ...props
}: ResetPasswordFormProps) {
  const { initialValues, loading, handleSubmit, validationSchema } = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      ...initialValues,
      userId,
      resetToken,
    },
    resolver: zodResolver(validationSchema),
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Hidden fields for userId and resetToken */}
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <FormField
                  control={form.control}
                  name="resetToken"
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="newPassword"
                          placeholder="Enter your new password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="confirmPassword"
                          placeholder="Confirm your new password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-green-700 hover:bg-green-800 text-white" 
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Remember your password?{' '}
            <Link href="/auth/login" className="underline text-green-700 dark:text-green-500 hover:text-green-800 dark:hover:text-green-400">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

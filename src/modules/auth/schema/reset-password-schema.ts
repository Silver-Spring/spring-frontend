import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    userId: z.string().uuid('Please enter a valid user ID'),
    resetToken: z.string().min(1, 'Reset token is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

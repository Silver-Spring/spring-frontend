import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name must be at most 50 characters long'),
    email: z.email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters long')
      .max(100, 'Confirm Password must be at most 100 characters long'),
    age: z
      .number({
        error: 'Age is required',
      })
      .int('Age must be a whole number')
      .min(0, 'Age must be at least 0')
      .max(150, 'Age must be at most 150'),
    gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say'], {
      error: 'Please select a valid gender',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
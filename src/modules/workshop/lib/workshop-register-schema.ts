import { z } from 'zod';

// Mirrors the backend's rules so the messages match.
export const workshopRegisterSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your full name'),
  // Indian mobile numbers only: the field shows +91, so exactly 10 digits starting with 6-9.
  phone: z
    .string()
    .trim()
    .refine((value) => /^[6-9]\d{9}$/.test(value.replace(/[\s-]/g, '')), {
      message: 'Please enter a valid 10-digit mobile number',
    }),
  email: z.string().trim().email('Please enter a valid email address'),
});

export type WorkshopRegisterValues = z.infer<typeof workshopRegisterSchema>;

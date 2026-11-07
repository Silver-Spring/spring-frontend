import { z } from 'zod';

// Mirrors the backend's rules so the messages match.
export const workshopRegisterSchema = z.object({
  fullName: z.string().trim().min(1, 'Please enter your full name'),
  phone: z.string().superRefine((value, ctx) => {
    const digits = value.replace(/\D/g, '');
    const hasPlus = value.trim().startsWith('+');
    const validChars = !/[^0-9+\s()-]/.test(value);
    const validLength = hasPlus ? digits.length >= 7 && digits.length <= 15 : digits.length === 10;
    if (!validChars || !validLength) {
      ctx.addIssue({ code: 'custom', message: 'Please enter a valid phone number' });
    }
  }),
  email: z.string().trim().email('Please enter a valid email address'),
});

export type WorkshopRegisterValues = z.infer<typeof workshopRegisterSchema>;

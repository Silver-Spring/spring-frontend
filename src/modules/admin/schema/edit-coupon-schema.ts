import { z } from 'zod';

export const createEditCouponSchema = (currentUses: number) =>
  z.object({
    description: z.string().optional(),
    validUntil: z.string().optional(),
    isActive: z.boolean(),
    maxTotalUses: z
      .number()
      .int('Max uses must be a whole number')
      .min(currentUses, `Cannot be less than current uses (${currentUses})`)
      .positive('Max uses must be positive')
      .optional(),
  });

export type EditCouponFormValues = z.infer<ReturnType<typeof createEditCouponSchema>>;

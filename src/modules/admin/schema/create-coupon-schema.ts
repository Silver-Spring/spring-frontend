import { z } from 'zod';

const couponCodeRegex = /^[A-Z0-9_-]+$/i;

// Assessment price: ₹2500 = 250000 paise
const ASSESSMENT_PRICE_RUPEES = 2500;

export const createCouponSchema = z
  .object({
    code: z
      .string()
      .min(3, 'Coupon code must be at least 3 characters')
      .max(50, 'Coupon code must be at most 50 characters')
      .regex(couponCodeRegex, 'Only letters, numbers, dashes, and underscores allowed')
      .transform((val) => val.toUpperCase().trim()),
    description: z.string().optional(),
    discountType: z.enum(['PERCENTAGE', 'FLAT'], {
      error: 'Please select a discount type',
    }),
    discountValue: z
      .number({
        error: 'Discount value is required',
      })
      .positive('Discount value must be positive'),
    maxDiscountAmount: z.number().positive('Max discount must be positive').optional(),
    validFrom: z.string().optional(),
    validUntil: z.string().optional(),
    maxTotalUses: z
      .number()
      .int('Max uses must be a whole number')
      .positive('Max uses must be positive')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.discountType === 'PERCENTAGE') {
        return data.discountValue >= 1 && data.discountValue <= 100;
      }
      return true;
    },
    {
      message: 'Percentage discount must be between 1 and 100',
      path: ['discountValue'],
    }
  )
  .refine(
    (data) => {
      if (data.discountType === 'FLAT') {
        // For flat discount: ensure it doesn't exceed assessment price
        return data.discountValue <= ASSESSMENT_PRICE_RUPEES;
      }
      return true;
    },
    {
      message: `Flat discount cannot exceed ₹${ASSESSMENT_PRICE_RUPEES} (the assessment price)`,
      path: ['discountValue'],
    }
  )
  .refine(
    (data) => {
      if (data.validFrom && data.validUntil) {
        return new Date(data.validUntil) > new Date(data.validFrom);
      }
      return true;
    },
    {
      message: 'End date must be after start date',
      path: ['validUntil'],
    }
  );

export type CreateCouponFormValues = z.infer<typeof createCouponSchema>;

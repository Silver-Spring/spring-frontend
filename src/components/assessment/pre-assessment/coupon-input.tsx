'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useValidateCoupon } from '@/modules/payment/hooks';
import { Tag, Check } from 'lucide-react';
import { toast } from 'sonner';

interface CouponInputProps {
  onCouponApplied: (couponCode: string, finalAmount: number, discountAmount: number) => void;
  onCouponRemoved: () => void;
  originalAmount: number;
}

export const CouponInput = ({
  onCouponApplied,
  onCouponRemoved,
  originalAmount,
}: CouponInputProps) => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    finalAmount: number;
    discountAmount: number;
  } | null>(null);

  const { validateCoupon, loading } = useValidateCoupon();

  const handleValidate = async () => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setError(null);

    try {
      const result = await validateCoupon(couponCode);

      if (result?.valid) {
        setAppliedCoupon({
          code: couponCode.trim().toUpperCase(),
          finalAmount: result.finalAmount,
          discountAmount: result.discountAmount,
        });
        onCouponApplied(couponCode.trim().toUpperCase(), result.finalAmount, result.discountAmount);

        // Show special message for 100% discount
        if (result.finalAmount === 0) {
          toast.success(
            '🎉 ' + (result.message || 'Coupon applied! Assessment is FREE (100% discount)')
          );
        } else {
          toast.success(result.message || 'Coupon applied successfully!');
        }
      } else {
        setError(result?.message || 'Invalid coupon code');
        setAppliedCoupon(null);
      }
    } catch (err) {
      setError('Failed to validate coupon. Please try again.');
      setAppliedCoupon(null);
    }
  };

  const handleBlur = () => {
    if (couponCode.trim() && !appliedCoupon) {
      handleValidate();
    }
  };

  const handleRemove = () => {
    setCouponCode('');
    setError(null);
    setAppliedCoupon(null);
    onCouponRemoved();
    toast.info('Coupon removed');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCouponCode(value);
    setError(null);

    // Remove applied coupon if user starts typing again
    if (appliedCoupon) {
      setAppliedCoupon(null);
      onCouponRemoved();
    }
  };

  return (
    <div className="mt-6">
      <Accordion type="single" collapsible className="w-full rounded-2xl border border-border">
        <AccordionItem value="coupon" className="px-4">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Have a promo code?</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pt-1">
            <div className="space-y-3 px-1">
              {appliedCoupon ? (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">
                          Coupon Applied: {appliedCoupon.code}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {appliedCoupon.finalAmount === 0
                            ? '🎉 FREE - 100% discount!'
                            : `You saved ₹${(appliedCoupon.discountAmount / 100).toFixed(2)}!`}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemove}
                      className="h-8 text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Enter code"
                        value={couponCode}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={loading}
                        className={`uppercase ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        aria-label="Coupon code"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleValidate}
                      disabled={loading || !couponCode.trim()}
                      className="px-6"
                    >
                      {loading ? (
                        <>
                          <Spinner className="h-4 w-4 mr-2" />
                          Applying
                        </>
                      ) : (
                        'Apply'
                      )}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                      {error}
                    </p>
                  )}
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

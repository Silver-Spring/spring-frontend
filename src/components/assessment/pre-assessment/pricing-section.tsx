'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { CouponInput } from './coupon-input';

interface PricingSectionProps {
  onCtaClick?: (couponCode?: string) => void;
  isLoading?: boolean;
}

const ORIGINAL_PRICE = 250000; // ₹2500 in rupees

export function PricingSection({ onCtaClick, isLoading = false }: PricingSectionProps) {
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    finalAmount: number;
    discountAmount: number;
  } | null>(null);

  const handleCouponApplied = (code: string, finalAmount: number, discountAmount: number) => {
    setAppliedCoupon({ code, finalAmount, discountAmount });
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(null);
  };

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick(appliedCoupon?.code);
    }
  };
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-0">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Start your <span className="text-primary">assessment</span> today
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
          One assessment. Lifetime access. No subscriptions or hidden fees.
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        <div className="rounded-3xl border-2 border-primary/20 bg-card shadow-xl">
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="mb-2 flex items-baseline gap-2">
                {appliedCoupon ? (
                  <>
                    <span className="text-lg font-semibold text-muted-foreground line-through md:text-xl">
                      ₹2500.00
                    </span>
                    <span className="text-4xl font-bold text-primary md:text-6xl">
                      {appliedCoupon.finalAmount === 0
                        ? 'FREE'
                        : `₹${(appliedCoupon.finalAmount / 100).toFixed(2)}`}
                    </span>
                  </>
                ) : (
                  <span className="text-6xl font-bold md:text-7xl">₹2500.00</span>
                )}
              </div>
            </div>

            <div className="mb-8 flex items-start gap-3">
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-3 text-primary" />
              </div>
              <span className="text-foreground">
                Downloadable PDF report with Lifetime access to results
              </span>
            </div>

            <CouponInput
              onCouponApplied={handleCouponApplied}
              onCouponRemoved={handleCouponRemoved}
              originalAmount={ORIGINAL_PRICE}
            />

            <Button
              size="lg"
              className="mt-6 h-14 w-full gap-2 rounded-full text-base font-medium shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
              onClick={handleCtaClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className="size-4" />
                  Processing...
                </>
              ) : (
                <>
                  Begin Assessment
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

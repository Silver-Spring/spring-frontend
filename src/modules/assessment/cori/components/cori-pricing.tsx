'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { CouponInput } from '@/components/assessment/pre-assessment/coupon-input';
import { ArrowRight, KeyRound, Users } from 'lucide-react';

interface CoriPricingProps {
  onPartnerAClick: (couponCode?: string) => void;
  onPartnerBJoin: (inviteCode: string) => void;
  isPartnerALoading: boolean;
  isPartnerBLoading: boolean;
}

export function CoriPricing({
  onPartnerAClick,
  onPartnerBJoin,
  isPartnerALoading,
  isPartnerBLoading,
}: CoriPricingProps) {
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    finalAmount: number;
    discountAmount: number;
  } | null>(null);
  const [inviteCode, setInviteCode] = useState('');

  const handleCouponApplied = (code: string, finalAmount: number, discountAmount: number) => {
    setAppliedCoupon({ code, finalAmount, discountAmount });
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(null);
  };

  const handlePartnerAClick = () => {
    onPartnerAClick(appliedCoupon?.code);
  };

  const handlePartnerBJoin = () => {
    const trimmed = inviteCode.trim().toUpperCase();
    if (trimmed.length > 0) {
      onPartnerBJoin(trimmed);
    }
  };

  return (
    <section id="pricing-section" className="mx-auto max-w-7xl px-4 pb-12 pt-0">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Ready to <span className="text-primary">begin together?</span>
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
          One partner starts and shares an invite code. The other joins for free.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Partner A panel */}
        <div className="rounded-3xl border-2 border-primary/20 bg-card shadow-xl">
          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Begin Together</h3>
                <p className="text-xs text-muted-foreground">Partner A starts the assessment</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="text-5xl font-bold md:text-6xl">FREE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                No payment required during the launch period.
              </p>
            </div>

            <div className="mb-6 space-y-2 text-sm text-muted-foreground">
              <p>→ Covers both partners</p>
              <p>→ Receive an invite code to share</p>
              <p>→ Full couples report when both complete</p>
            </div>

            <CouponInput
              onCouponApplied={handleCouponApplied}
              onCouponRemoved={handleCouponRemoved}
              originalAmount={0}
            />

            <Button
              size="lg"
              className="mt-6 h-14 w-full gap-2 rounded-full text-base font-medium shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
              onClick={handlePartnerAClick}
              disabled={isPartnerALoading}
            >
              {isPartnerALoading ? (
                <>
                  <Spinner className="size-4" />
                  Starting...
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

        {/* Partner B panel */}
        <div className="rounded-3xl border-2 border-border bg-card shadow-sm">
          <div className="p-8 md:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <KeyRound className="size-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Join Your Partner</h3>
                <p className="text-xs text-muted-foreground">Partner B enters invite code</p>
              </div>
            </div>

            <p className="mb-6 text-sm text-muted-foreground">
              Your partner has already started the assessment and shared an 8-character invite code
              with you. Enter it below to join.
            </p>

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium" htmlFor="invite-code">
                Invite Code
              </label>
              <Input
                id="invite-code"
                type="text"
                placeholder="e.g. A3F7B2D9"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePartnerBJoin();
                }}
                className="text-center font-mono text-lg tracking-widest uppercase"
                maxLength={12}
                disabled={isPartnerBLoading}
              />
            </div>

            <Button
              size="lg"
              variant="outline"
              className="h-14 w-full gap-2 rounded-full text-base font-medium transition-all hover:scale-[1.02]"
              onClick={handlePartnerBJoin}
              disabled={isPartnerBLoading || inviteCode.trim().length === 0}
            >
              {isPartnerBLoading ? (
                <>
                  <Spinner className="size-4" />
                  Joining...
                </>
              ) : (
                <>
                  Join Assessment
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

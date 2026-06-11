'use client';

import { Spinner } from '@/components/ui/spinner';
import { usePayment, usePaymentStatus } from '@/modules/payment/hooks';
import { useUserStore } from '@/stores';
import posthog from 'posthog-js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  useAssessmentStatus,
  useCurrentSession,
  useStartCoupleAssessment,
  useJoinCoupleAssessment,
} from '../../hooks';
import { CoriHero } from './cori-hero';
import { CoriHowItWorks } from './cori-how-it-works';
import { CoriDomains } from './cori-domains';
import { CoriPricing } from './cori-pricing';
import { CoriInviteReveal } from './cori-invite-reveal';

const CORI_TYPE = 'cori';

export function CoriAssessmentPage() {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const isInternal = useMemo(() => currentUser?.isInternal ?? false, [currentUser?.isInternal]);

  const [inviteReveal, setInviteReveal] = useState<{
    inviteCode: string;
    sessionId: string;
  } | null>(null);

  const {
    hasActiveSession,
    loading: statusLoading,
    refetch: refetchStatus,
  } = useAssessmentStatus(CORI_TYPE);

  const {
    currentSession,
    loading: sessionLoading,
    refetch: refetchCurrentSession,
  } = useCurrentSession();

  const {
    hasPaid,
    paymentId,
    loading: paymentLoading,
    refetch: refetchPaymentStatus,
  } = usePaymentStatus(CORI_TYPE);

  const { initiatePayment, isProcessing: paymentProcessing } = usePayment();
  const { startCoupleAssessment, loading: startingCouple } = useStartCoupleAssessment();
  const { joinCoupleAssessment, loading: joiningCouple } = useJoinCoupleAssessment();

  const isLoading = statusLoading || sessionLoading || paymentLoading;
  const isPartnerAProcessing = paymentProcessing || startingCouple;
  const isPartnerBProcessing = joiningCouple;

  useEffect(() => {
    refetchPaymentStatus();
    refetchStatus();
    refetchCurrentSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartCoupleWithPayment = useCallback(
    async (resolvedPaymentId: string) => {
      try {
        const result = await startCoupleAssessment(resolvedPaymentId, CORI_TYPE);

        if (result.session?.id && result.inviteCode) {
          posthog.capture('couple_assessment_started', {
            session_id: result.session.id,
            payment_id: resolvedPaymentId,
            assessment_type: CORI_TYPE,
          });
          await Promise.all([refetchStatus(), refetchCurrentSession()]);
          setInviteReveal({ inviteCode: result.inviteCode, sessionId: result.session.id });
        } else {
          toast.error('Unable to start assessment. Please try again.');
        }
      } catch {
        toast.error('Failed to start couples assessment. Please try again.');
      }
    },
    [startCoupleAssessment, refetchStatus, refetchCurrentSession]
  );

  const handlePartnerAClick = useCallback(
    async (couponCode?: string) => {
      if (isInternal) {
        try {
          const result = await startCoupleAssessment(null, CORI_TYPE);
          if (result.session?.id && result.inviteCode) {
            posthog.capture('couple_assessment_started', {
              session_id: result.session.id,
              is_internal: true,
              assessment_type: CORI_TYPE,
            });
            await Promise.all([refetchStatus(), refetchCurrentSession()]);
            setInviteReveal({ inviteCode: result.inviteCode, sessionId: result.session.id });
          } else {
            toast.error('Unable to start assessment. Please try again.');
          }
        } catch {
          toast.error('Failed to start couples assessment. Please try again.');
        }
        return;
      }

      if (hasPaid && paymentId) {
        await handleStartCoupleWithPayment(paymentId);
        return;
      }

      await initiatePayment(
        async (newPaymentId) => {
          if (newPaymentId) {
            await refetchPaymentStatus();
            toast.success('Payment successful! Starting your assessment...');
            await handleStartCoupleWithPayment(newPaymentId);
          } else {
            // Free (price=0) — backend auto-created a payment
            const { data: paymentData } = await refetchPaymentStatus();
            const autoPaymentId = paymentData?.currentUserPaymentStatus?.paymentId;
            if (autoPaymentId) {
              await handleStartCoupleWithPayment(autoPaymentId);
            } else {
              toast.error('Could not retrieve payment. Please contact support.');
            }
          }
        },
        () => {
          toast.error('Payment failed. Please try again.');
        },
        couponCode,
        CORI_TYPE
      );
    },
    [
      isInternal,
      hasPaid,
      paymentId,
      initiatePayment,
      refetchPaymentStatus,
      handleStartCoupleWithPayment,
      startCoupleAssessment,
      refetchStatus,
      refetchCurrentSession,
    ]
  );

  const handlePartnerBJoin = useCallback(
    async (inviteCode: string) => {
      try {
        const result = await joinCoupleAssessment(inviteCode);
        if (result.session?.id) {
          posthog.capture('couple_assessment_joined', {
            session_id: result.session.id,
            assessment_type: CORI_TYPE,
          });
          router.push(`/assessment/${result.session.id}`);
        } else {
          toast.error('Unable to join assessment. Please check the invite code and try again.');
        }
      } catch {
        // error toast handled in hook
      }
    },
    [joinCoupleAssessment, router]
  );

  const handleScrollToPricing = useCallback(() => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleScrollToJoin = useCallback(() => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleResumeAssessment = useCallback(() => {
    if (currentSession?.id) {
      posthog.capture('assessment_resumed', { session_id: currentSession.id });
      router.push(`/assessment/${currentSession.id}`);
    }
  }, [currentSession, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (hasActiveSession && currentSession?.id) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
        <h2 className="text-2xl font-semibold">Assessment In Progress</h2>
        <p className="text-muted-foreground">You have a CORI assessment in progress.</p>
        <button
          onClick={handleResumeAssessment}
          className="rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-md hover:bg-primary/90"
        >
          Resume Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {inviteReveal && (
        <CoriInviteReveal
          inviteCode={inviteReveal.inviteCode}
          onStartAssessment={() => router.push(`/assessment/${inviteReveal.sessionId}`)}
        />
      )}

      <div className="flex flex-col gap-16 lg:gap-20">
        <CoriHero
          onPartnerAClick={handleScrollToPricing}
          onPartnerBClick={handleScrollToJoin}
          isLoading={isPartnerAProcessing}
          isInProgress={hasActiveSession}
        />

        <CoriHowItWorks />
        <CoriDomains />

        <CoriPricing
          onPartnerAClick={handlePartnerAClick}
          onPartnerBJoin={handlePartnerBJoin}
          isPartnerALoading={isPartnerAProcessing}
          isPartnerBLoading={isPartnerBProcessing}
        />
      </div>
    </div>
  );
}

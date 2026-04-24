'use client';

import { DeleteAssessmentDialog } from '@/components/assessment/dialogs';
import {
  CtaSection,
  DimensionsSection,
  FeaturesBento,
  HeroSection,
  PricingSection,
} from '@/components/assessment/pre-assessment';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { usePayment, usePaymentStatus } from '@/modules/payment/hooks';
import { useUserStore } from '@/stores';
import { CheckCircle2, FileText, Info, Trash2, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  useAssessmentStatus,
  useCurrentSession,
  useDeleteMyAssessment,
  useStartAssessment,
} from '../hooks';

export function AssessmentStatus() {
  const router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const isInternal = useMemo(() => currentUser?.isInternal ?? false, [currentUser?.isInternal]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const {
    hasCompletedAssessment,
    hasActiveSession,
    completedAt,
    resultId,
    totalReadinessIndex,
    loading: statusLoading,
    refetch: refetchAssessmentStatus,
  } = useAssessmentStatus();

  const {
    currentSession,
    loading: sessionLoading,
    refetch: refetchCurrentSession,
  } = useCurrentSession();

  const { startAssessment, loading: starting } = useStartAssessment();
  const { initiatePayment, isProcessing: paymentProcessing } = usePayment();
  const { deleteMyAssessment, loading: deleting } = useDeleteMyAssessment();

  const {
    hasPaid,
    paymentId,
    loading: paymentLoading,
    refetch: refetchPaymentStatus,
  } = usePaymentStatus();

  const isLoading = useMemo(
    () => statusLoading || sessionLoading || paymentLoading,
    [statusLoading, sessionLoading, paymentLoading]
  );

  const formattedCompletedDate = useMemo(() => {
    if (!completedAt) return null;
    return new Date(completedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [completedAt]);

  const isInProgress = useMemo(() => hasActiveSession, [hasActiveSession]);
  const isProcessing = useMemo(() => paymentProcessing || starting, [paymentProcessing, starting]);

  useEffect(() => {
    refetchPaymentStatus();
    refetchAssessmentStatus();
    refetchCurrentSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartAssessmentWithPayment = useCallback(
    async (newPaymentId: string) => {
      try {
        const result = await startAssessment(newPaymentId);

        if (result.session?.id) {
          posthog.capture('assessment_started', {
            session_id: result.session.id,
            payment_id: newPaymentId,
          });
          await Promise.all([refetchAssessmentStatus(), refetchCurrentSession()]);
          router.push(`/assessment/${result.session.id}`);
        } else {
          toast.error('Unable to start assessment. Please try again.');
        }
      } catch (error) {
        toast.error('Failed to start assessment. Please try again.');
      }
    },
    [startAssessment, refetchAssessmentStatus, refetchCurrentSession, router]
  );

  const handlePaymentAndStart = useCallback(async () => {
    try {
      await initiatePayment(
        async (newPaymentId) => {
          if (newPaymentId) {
            await refetchPaymentStatus();
            toast.success('Payment successful! Starting your assessment...');
            await handleStartAssessmentWithPayment(newPaymentId);
          }
        },
        (error) => {
          toast.error('Payment failed. Please try again.');
        }
      );
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  }, [initiatePayment, refetchPaymentStatus, handleStartAssessmentWithPayment]);

  const handleStartAssessmentClick = useCallback(async () => {
    if (isInternal) {
      try {
        const result = await startAssessment(null);

        if (result.session?.id) {
          posthog.capture('assessment_started', {
            session_id: result.session.id,
            is_internal: true,
          });
          await Promise.all([refetchAssessmentStatus(), refetchCurrentSession()]);
          router.push(`/assessment/${result.session.id}`);
        } else {
          toast.error('Unable to start assessment. Please try again.');
        }
      } catch (error) {
        toast.error('Failed to start assessment. Please try again.');
      }
    } else if (!hasPaid) {
      handlePaymentAndStart();
    } else {
      try {
        if (!paymentId) {
          toast.error('Please complete payment first');
          return;
        }

        const result = await startAssessment(paymentId);

        if (result.session?.id) {
          posthog.capture('assessment_started', {
            session_id: result.session.id,
            payment_id: paymentId,
          });
          await Promise.all([refetchAssessmentStatus(), refetchCurrentSession()]);
          router.push(`/assessment/${result.session.id}`);
        } else {
          toast.error('Unable to start assessment. Please try again.');
        }
      } catch (error) {
        toast.error('Failed to start assessment. Please try again.');
      }
    }
  }, [
    isInternal,
    hasPaid,
    paymentId,
    startAssessment,
    refetchAssessmentStatus,
    refetchCurrentSession,
    router,
    handlePaymentAndStart,
  ]);

  const handleResumeAssessment = useCallback(() => {
    if (currentSession?.id) {
      posthog.capture('assessment_resumed', {
        session_id: currentSession.id,
      });
      router.push(`/assessment/${currentSession.id}`);
    }
  }, [currentSession?.id, router]);

  const handleViewResults = useCallback(() => {
    if (resultId) {
      posthog.capture('results_viewed', { result_id: resultId });
      router.push(`/assessment/results/${resultId}`);
    } else {
      toast.error('Unable to find result ID. Please contact support.');
    }
  }, [resultId, router]);

  const handleDeleteAssessment = useCallback(async () => {
    try {
      const result = await deleteMyAssessment();
      if (result?.success) {
        posthog.capture('assessment_deleted');
        await Promise.all([refetchAssessmentStatus(), refetchCurrentSession()]);
        setShowDeleteDialog(false);
        router.push('/assessment');
      }
    } catch (error) {
      toast.error('Failed to delete assessment. Please try again.');
    }
  }, [deleteMyAssessment, refetchAssessmentStatus, refetchCurrentSession, router]);

  const handleOpenDeleteDialog = useCallback(() => {
    setShowDeleteDialog(true);
  }, []);

  const handleButtonClick = useMemo(
    () => (isInProgress ? handleResumeAssessment : handleStartAssessmentClick),
    [isInProgress, handleResumeAssessment, handleStartAssessmentClick]
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (hasCompletedAssessment) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Assessment Complete!
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Congratulations on completing your retirement readiness assessment. Your results are
            ready to view.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <TrendingUp className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Your SSRI Score</h3>
                <p className="text-xs text-muted-foreground">
                  Silver Spring Retirement Readiness Index
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-primary">{totalReadinessIndex}</span>
              <span className="text-lg text-muted-foreground">/ 500</span>
            </div>
            {formattedCompletedDate && (
              <p className="mt-4 text-xs text-muted-foreground">
                Completed on {formattedCompletedDate}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="size-6 text-primary" />
              </div>
              <h3 className="font-semibold">Your Results Are Ready</h3>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              View your detailed report to understand your strengths, areas for growth, and
              personalized recommendations to enhance your retirement readiness.
            </p>
            <Button
              size="lg"
              className="h-12 w-full gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
              onClick={handleViewResults}
            >
              <FileText className="size-4" />
              View Your Results
            </Button>
          </div>
        </div>

        {isInternal && (
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card/50 p-6 text-center shadow-sm">
            <Alert className="mb-4 border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertTitle className="font-semibold text-primary">Internal User</AlertTitle>
              <AlertDescription className="mt-2 text-foreground/80">
                You can delete this assessment and retake the test multiple times.
              </AlertDescription>
            </Alert>
            <Button
              size="lg"
              variant="destructive"
              className="h-12 w-full gap-2 rounded-xl bg-red-700 text-base font-semibold shadow-md transition-all hover:bg-red-700/90 hover:shadow-lg sm:w-auto sm:min-w-[240px]"
              onClick={handleOpenDeleteDialog}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Spinner className="size-4" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete Assessment
                </>
              )}
            </Button>
          </div>
        )}

        <DeleteAssessmentDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDeleteAssessment}
          loading={deleting}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-16 lg:gap-20">
        <HeroSection
          onCtaClick={handleButtonClick}
          isLoading={isProcessing}
          isInProgress={isInProgress}
        />

        <DimensionsSection />

        <FeaturesBento />

        {isInternal ? (
          <section className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
                Internal User Access
              </h2>
            </div>
            <Alert className="max-w-2xl border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertTitle className="font-semibold text-primary">
                Silver Spring Internal User
              </AlertTitle>
              <AlertDescription className="mt-2 text-foreground/80">
                You can start the assessment without payment. You can also delete and retake the
                test multiple times.
              </AlertDescription>
            </Alert>
          </section>
        ) : (
          !hasPaid && <PricingSection onCtaClick={handleButtonClick} isLoading={isProcessing} />
        )}

        {isInProgress && (
          <CtaSection
            onCtaClick={handleButtonClick}
            isLoading={isProcessing}
            isInternal={isInternal}
            isInProgress={isInProgress}
            onDeleteClick={handleOpenDeleteDialog}
            deleteLoading={deleting}
          />
        )}
      </div>

      <DeleteAssessmentDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteAssessment}
        loading={deleting}
      />
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { usePayment, usePaymentStatus } from '@/modules/payment/hooks';
import { ArrowRight, CheckCircle2, Clock, FileText, Lock, Save } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAssessmentStatus, useCurrentSession, useStartAssessment } from '../hooks';
import {
  DimensionsSection,
  DiscoverSection,
  ExperiencePreviewSection,
  HeroSection,
  HowItWorksSection,
  PricingSection,
} from './pre-assessment';

export function AssessmentStatus() {
  const router = useRouter();

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

  const {
    hasPaid,
    paymentId,
    loading: paymentLoading,
    refetch: refetchPaymentStatus,
  } = usePaymentStatus();

  useEffect(() => {
    refetchPaymentStatus();
    refetchAssessmentStatus();
    refetchCurrentSession();
  }, [refetchPaymentStatus, refetchAssessmentStatus, refetchCurrentSession]);

  const handleStartAssessmentWithPayment = async (newPaymentId: string) => {
    try {
      const result = await startAssessment(newPaymentId);

      if (result.session?.id) {
        await Promise.all([refetchAssessmentStatus(), refetchCurrentSession()]);
        router.push(`/assessment/${result.session.id}`);
      } else {
        console.error('No session ID in result:', result);
        toast.error('Unable to start assessment. Please try again.');
      }
    } catch (error) {
      console.error('Failed to start assessment:', error);
    }
  };

  const handlePaymentAndStart = async () => {
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
          console.error('Payment failed:', error);
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const handleStartAssessmentClick = async () => {
    if (!hasPaid) {
      handlePaymentAndStart();
    } else {
      try {
        if (!paymentId) {
          toast.error('Please complete payment first');
          return;
        }

        const result = await startAssessment(paymentId);

        if (result.session?.id) {
          await Promise.all([refetchAssessmentStatus(), refetchCurrentSession()]);
          router.push(`/assessment/${result.session.id}`);
        } else {
          console.error('No session ID in result:', result);
          toast.error('Unable to start assessment. Please try again.');
        }
      } catch (error) {
        console.error('Failed to start assessment:', error);
      }
    }
  };

  const handleResumeAssessment = () => {
    if (currentSession?.id) {
      router.push(`/assessment/${currentSession.id}`);
    }
  };

  const handleViewResults = () => {
    if (resultId) {
      router.push(`/assessment/results/${resultId}`);
    } else {
      toast.error('Unable to find result ID. Please contact support.');
    }
  };

  if (statusLoading || sessionLoading || paymentLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center p-4">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (hasCompletedAssessment) {
    return (
      <div className="max-w-4xl mx-auto py-8 md:py-12 px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-12">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/images/start-assessment-image.png"
                alt="Retirement journey illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500 shrink-0 mt-1" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Thank You!</h1>
                <p className="text-lg text-muted-foreground">Your assessment is complete</p>
              </div>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground/90 leading-relaxed mb-4">
                Congratulations on completing your psychometric assessment. Your responses have been
                carefully analyzed to provide you with personalized insights into your retirement
                readiness.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Your <strong>Silver Spring Retirement Readiness Index (SSRI)</strong> score is{' '}
                <strong className="text-green-600 dark:text-green-500 text-xl">
                  {totalReadinessIndex}
                </strong>
                . Visit your results page to explore a comprehensive breakdown of your readiness
                across all key dimensions.
              </p>
              {completedAt && (
                <p className="text-xs text-muted-foreground mt-4">
                  Completed on{' '}
                  {new Date(completedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-green-50/30 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30 rounded-lg p-6 md:p-8 mb-12">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Your Results Are Ready
              </h3>
              <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                View your detailed report to understand your strengths, areas for growth, and
                personalized recommendations to enhance your retirement readiness.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="w-full md:w-auto min-w-[240px] h-12 text-base bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
            onClick={handleViewResults}
          >
            <FileText className="mr-2 h-5 w-5" />
            View Your Results
          </Button>
        </div>
      </div>
    );
  }

  const isInProgress = hasActiveSession;
  const buttonText = isInProgress ? 'Resume Assessment' : 'Begin Your Assessment';
  const handleButtonClick = isInProgress ? handleResumeAssessment : handleStartAssessmentClick;
  const isProcessing = paymentProcessing || starting;

  return (
    <div className="mx-auto px-4 py-10 lg:py-16">
      <div className="flex flex-col gap-16 lg:gap-20">
        <HeroSection onCtaClick={handleButtonClick} ctaText={buttonText} isLoading={isProcessing} />

        <Separator className="mx-auto w-24" />

        <DiscoverSection />

        <Separator className="mx-auto w-24" />

        <ExperiencePreviewSection />

        <Separator className="mx-auto w-24" />

        <DimensionsSection />

        <Separator className="mx-auto w-24" />

        <HowItWorksSection />

        <Separator className="mx-auto w-24" />

        <PricingSection />

        <section className="flex flex-col items-center gap-8 rounded-2xl bg-green-50/30 dark:bg-green-950/10 px-6 py-12 text-center ring-1 ring-green-200/50 dark:ring-green-900/30 sm:px-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
              {isInProgress ? 'Welcome Back!' : 'Ready to begin?'}
            </h2>
            <p className="mx-auto max-w-lg text-pretty text-muted-foreground">
              {isInProgress
                ? 'Continue where you left off. Your progress has been saved.'
                : 'Take the first step toward a more confident, well-rounded retirement. Your results are private, and you can save and resume at any time.'}
            </p>
          </div>

          <Button
            size="lg"
            className="h-12 min-w-[260px] gap-2 rounded-xl bg-green-700 hover:bg-green-800 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg"
            onClick={handleButtonClick}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Spinner className="size-4" />
                {paymentProcessing ? 'Processing Payment...' : 'Starting Assessment...'}
              </>
            ) : (
              <>
                {buttonText}
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-green-600 dark:text-green-500" />
              Takes about 15 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Save className="size-3.5 text-green-600 dark:text-green-500" />
              Save & resume anytime
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="size-3.5 text-green-600 dark:text-green-500" />
              Private & secure
            </span>
          </div>

          {!isInProgress && (
            <blockquote className="mx-auto max-w-md border-l-2 border-green-600/30 dark:border-green-500/30 pl-4 text-left text-sm italic text-muted-foreground">
              &quot;SSRI helped me identify specific areas that I probably need to work on more, and
              the suggestions were practical and implementable.&quot;
              <footer className="mt-2 text-xs font-medium not-italic text-green-700 dark:text-green-400">
                — Priya S., 58, Mumbai
              </footer>
            </blockquote>
          )}
        </section>
      </div>
    </div>
  );
}

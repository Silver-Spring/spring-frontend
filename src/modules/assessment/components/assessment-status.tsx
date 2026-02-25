'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { usePayment, usePaymentStatus } from '@/modules/payment/hooks';
import { CheckCircle2, Clock, FileText, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAssessmentStatus, useCurrentSession, useStartAssessment } from '../hooks';

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
      <div className="max-w-4xl mx-auto py-8 md:py-12">
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

        <div className="bg-muted/30 rounded-lg p-6 md:p-8 mb-12">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Your Results Are Ready</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
  return (
    <>
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-12">
          <div className="w-full md:w-2/5 shrink-0">
            <div className="relative aspect-square max-w-sm mx-auto">
              <Image
                src="/images/start-assessment-image.png"
                alt="Retirement journey illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 space-y-6">
            <div className="space-y-4">
              <p className="text-base md:text-2xl text-green-700 dark:text-green-700 leading-relaxed font-bold italic">
                The Silver Spring Retirement Readiness Index (SSRI) is a structured self-assessment
                designed to help you understand your readiness for your next phase in life beyond
                full-time work. It focuses on the non-financial dimensions of transition, including
                psychological, social, mental, physical and lifestyle preparedness.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-12">
          <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  About 15 minutes
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                  The assessment should take about 15 minutes to complete. As you respond, please
                  reflect specifically on your experiences and patterns over the{' '}
                  <strong>last six months</strong>, rather than how you felt years ago or how you
                  hope to feel in the future.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  No right or wrong answers
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                  There are no right or wrong answers. Be honest with yourself. This is not about
                  judgment; it&apos;s about clarity. The more authentic your responses, the more
                  meaningful and accurate your readiness insights will be.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="w-full md:w-auto min-w-[240px] h-12 text-base bg-green-700 hover:bg-green-800 text-white shadow-md hover:shadow-lg transition-all"
            onClick={handleButtonClick}
            disabled={paymentProcessing || starting}
          >
            {paymentProcessing ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Processing Payment...
              </>
            ) : starting ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Starting Assessment...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-5 w-5" />
                {buttonText}
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

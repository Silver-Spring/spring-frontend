'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { usePayment, usePaymentStatus } from '@/modules/payment/hooks';
import { AlertCircle, CheckCircle2, FileText, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAssessmentStatus, useCurrentSession, useStartAssessment } from '../hooks';
import { AssessmentInstructionsDialog } from './assessment-instructions-dialog';

export function AssessmentStatus() {
  const router = useRouter();
  const [showInstructions, setShowInstructions] = useState(false);

  // Use the new assessmentStatus query for efficient status checking
  const {
    hasCompletedAssessment,
    hasActiveSession,
    completedAt,
    resultId,
    totalReadinessIndex,
    loading: statusLoading,
  } = useAssessmentStatus();

  const { currentSession, loading: sessionLoading } = useCurrentSession();
  const { startAssessment, loading: starting } = useStartAssessment();
  const { initiatePayment, isProcessing: paymentProcessing } = usePayment();

  // Check payment status from backend (CRITICAL - prevents duplicate payments)
  const {
    hasPaid,
    paymentId,
    loading: paymentLoading,
    refetch: refetchPaymentStatus,
  } = usePaymentStatus();

  // Refetch payment status when component mounts to ensure latest data
  useEffect(() => {
    refetchPaymentStatus();
  }, [refetchPaymentStatus]);

  const handlePayment = async () => {
    try {
      await initiatePayment(
        async (newPaymentId) => {
          if (newPaymentId) {
            // Payment successful - refetch payment status to update hasPaid flag
            await refetchPaymentStatus();
            toast.success('Payment successful! You can now start the assessment.');
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

  const handleStartAssessmentClick = () => {
    setShowInstructions(true);
  };

  const handleConfirmStart = async () => {
    setShowInstructions(false);
    
    try {
      if (!paymentId) {
        toast.error('Please complete payment first');
        return;
      }

      const result = await startAssessment(paymentId);

      if (result.session?.id) {
        router.push(`/assessment/${result.session.id}`);
      } else {
        console.error('No session ID in result:', result);
        toast.error('Unable to start assessment. Please try again.');
      }
    } catch (error) {
      // Error toast is already handled in the hook's onError
      console.error('Failed to start assessment:', error);
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
      <div className="flex items-center justify-center p-4">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  // Assessment completed - Use the new assessmentStatus data
  if (hasCompletedAssessment) {
    return (
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-900 dark:text-green-100">
              Assessment Completed
            </CardTitle>
          </div>
          <CardDescription className="text-green-800 dark:text-green-200">
            You have successfully completed the psychometric assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedAt && (
              <p className="text-sm text-green-800 dark:text-green-200">
                Completed on:{' '}
                {new Date(completedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            {totalReadinessIndex && (
              <div className="bg-white dark:bg-green-950 rounded-lg p-4">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                  Your Total Readiness Index
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {totalReadinessIndex}/500
                </p>
              </div>
            )}
            <Button variant="default" className="w-full" onClick={handleViewResults}>
              <FileText className="mr-2 h-4 w-4" />
              View Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Assessment in progress - Use the new assessmentStatus data
  if (hasActiveSession) {
    const progress = currentSession?.currentQuestionNumber || 0;
    return (
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Assessment In Progress
            </CardTitle>
          </div>
          <CardDescription className="text-blue-800 dark:text-blue-200">
            You have an assessment in progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Resume from question {progress}
            </p>
            <Button className="w-full" onClick={handleResumeAssessment}>
              <PlayCircle className="mr-2 h-4 w-4" />
              Resume Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No payment made yet - Check backend payment status (CRITICAL)
  if (!hasPaid) {
    return (
      <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-yellow-900 dark:text-yellow-100">Payment Required</CardTitle>
          </div>
          <CardDescription className="text-yellow-800 dark:text-yellow-200">
            Complete payment to access the psychometric assessment test.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handlePayment} disabled={paymentProcessing}>
            {paymentProcessing ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Processing Payment...
              </>
            ) : (
              'Make Payment'
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Payment made but assessment not started
  return (
    <>
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900 dark:text-blue-100">Ready to Start</CardTitle>
          </div>
          <CardDescription className="text-blue-800 dark:text-blue-200">
            Payment confirmed. You can now take the assessment test.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleStartAssessmentClick} disabled={starting}>
            {starting ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Starting...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Take Assessment Test
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AssessmentInstructionsDialog
        open={showInstructions}
        onOpenChange={setShowInstructions}
        onConfirm={handleConfirmStart}
      />
    </>
  );
}

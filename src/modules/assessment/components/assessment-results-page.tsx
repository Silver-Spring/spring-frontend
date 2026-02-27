'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
  CohortComparisonCard,
  SectionBreakdownCard,
  TabbedRadarChart,
  TotalScoreCard,
} from '@/modules/assessment/components/results';
import { useAssessmentResults, useDownloadReport } from '@/modules/assessment/hooks';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface AssessmentResultsPageProps {
  resultId: string;
}

const formatGender = (gender: string): string => {
  const map: Record<string, string> = {
    male: 'Men',
    female: 'Women',
    other: 'People',
    prefer_not_to_say: 'Users',
  };
  return map[gender.toLowerCase()] || 'Users';
};

export const AssessmentResultsPage = ({ resultId }: AssessmentResultsPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { result, loading } = useAssessmentResults(resultId);
  const { downloadReport, isDownloading, isGenerating } = useDownloadReport();

  const isAdminView = useMemo(() => searchParams.get('from') === 'admin', [searchParams]);
  const backPath = isAdminView ? '/admin/assessment' : '/dashboard';

  const handleDownloadPDF = async () => {
    if (!result?.id) return;
    await downloadReport({ resultId: result.id });
  };

  const sectionResults = useMemo(() => {
    return result?.assessmentSectionResultsByResultId?.nodes || [];
  }, [result]);

  // Prepare cohort data for components
  const cohortData = useMemo(() => {
    if (!result?.cohortComparison) return null;

    const comparison = result.cohortComparison;

    const ageCohort = comparison.ageCohort
      ? {
          label: `Age ${comparison.ageCohort.ageRange}`,
          cohortSize: comparison.ageCohort.cohortSize,
          totalScore: comparison.ageCohort.totalScore,
          sectionScores: comparison.ageCohort.sectionScores,
        }
      : null;

    const genderCohort = comparison.genderCohort
      ? {
          label: `All ${formatGender(comparison.userGender)}`,
          cohortSize: comparison.genderCohort.cohortSize,
          totalScore: comparison.genderCohort.totalScore,
          sectionScores: comparison.genderCohort.sectionScores,
        }
      : null;

    const overallCohort = comparison.overallCohort
      ? {
          label: 'All Users',
          cohortSize: comparison.overallCohort.cohortSize,
          totalScore: comparison.overallCohort.totalScore,
          sectionScores: comparison.overallCohort.sectionScores,
        }
      : null;

    return {
      ageCohort,
      genderCohort,
      overallCohort,
    };
  }, [result]);

  if (loading) {
    return (
      <ProtectedLayout>
        {() => (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner className="size-8" />
          </div>
        )}
      </ProtectedLayout>
    );
  }

  if (!result) {
    return (
      <ProtectedLayout>
        {() => (
          <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Results Not Found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Unable to load assessment results.</p>
                <Button onClick={() => router.push(backPath)}>
                  Return to {isAdminView ? 'Admin Dashboard' : 'Dashboard'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </ProtectedLayout>
    );
  }

  const hasAnyCohort =
    cohortData?.ageCohort || cohortData?.genderCohort || cohortData?.overallCohort;

  return (
    <ProtectedLayout>
      {() => (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.push(backPath)} className="mb-4">
              <ArrowLeft className="mr-2 size-4" />
              Back to {isAdminView ? 'Admin Dashboard' : 'Dashboard'}
            </Button>
            <h1 className="text-3xl font-bold mb-2">Your Assessment Results</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your readiness assessment
            </p>
          </div>

          {/* Total Score - Hero */}
          <TotalScoreCard
            totalScore={result.totalReadinessIndex}
            completedDate={result.createdAt}
          />

          {/* Two Column Grid - Section Breakdown & Cohort Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Section Breakdown */}
            <SectionBreakdownCard sectionResults={sectionResults} />

            {/* 3-Bar Cohort Comparison */}
            {hasAnyCohort && (
              <CohortComparisonCard
                userScore={result.totalReadinessIndex}
                ageCohort={cohortData?.ageCohort}
                genderCohort={cohortData?.genderCohort}
                overallCohort={cohortData?.overallCohort}
              />
            )}
          </div>

          {/* Radar Chart - Centered in Next Row */}
          {hasAnyCohort && (
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-3xl">
                <TabbedRadarChart
                  ageCohort={cohortData?.ageCohort}
                  genderCohort={cohortData?.genderCohort}
                  overallCohort={cohortData?.overallCohort}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={handleDownloadPDF}
              size="lg"
              disabled={isDownloading}
              className="bg-green-700 hover:bg-green-800 text-white dark:bg-green-500 dark:hover:bg-green-600"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  {isGenerating ? 'Generating...' : 'Downloading...'}
                </>
              ) : (
                <>
                  <Download className="mr-2 size-4" />
                  Download PDF Report
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => router.push(backPath)} size="lg">
              Return to {isAdminView ? 'Admin Dashboard' : 'Dashboard'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm font-medium">
              For detailed analysis and personalized recommendations, download your PDF report.
            </p>
            {hasAnyCohort && (
              <p className="text-xs text-muted-foreground">
                Cohort comparisons are provided for contextual understanding and are not indicative
                of better or worse performance.
              </p>
            )}
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

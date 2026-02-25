'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { useAssessmentResults, useDownloadReport } from '@/modules/assessment/hooks';
import { ArrowLeft, Download, Loader2, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

interface AssessmentResultsPageProps {
  resultId: string;
}

const SECTION_NAMES: Record<string, string> = {
  psychological: 'Psychological Readiness',
  social: 'Social Support',
  mental: 'Mental Wellness',
  physical: 'Physical Health',
  lifestyle: 'Lifestyle Factors',
};

const INTERPRETATION_COLORS: Record<string, string> = {
  vulnerable: 'text-red-600 dark:text-red-400',
  emerging: 'text-orange-600 dark:text-orange-400',
  developing: 'text-yellow-600 dark:text-yellow-400',
  proactive: 'text-blue-600 dark:text-blue-400',
  thriving: 'text-green-600 dark:text-green-400',
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

  const sectionResults = result.assessmentSectionResultsByResultId?.nodes || [];

  return (
    <ProtectedLayout>
      {() => (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.push(backPath)} className="mb-4">
              <ArrowLeft className="mr-2 size-4" />
              Back to {isAdminView ? 'Admin Dashboard' : 'Dashboard'}
            </Button>
            <h1 className="text-3xl font-bold mb-2">Assessment Results</h1>
            <p className="text-muted-foreground">
              Completed on {new Date(result.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Total Readiness Index */}
          <Card className="mb-8 bg-linear-to-br from-primary/10 via-primary/5 to-background">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Total Readiness Index</CardTitle>
              <div className="text-6xl font-bold text-primary my-4">
                {result.totalReadinessIndex}
              </div>
            </CardHeader>
            <CardContent className="text-center">
              {result.isEmailed && (
                <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                  <Mail className="size-4" />
                  <span className="text-sm">Results have been emailed to you</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Section Breakdown</CardTitle>
              <CardDescription>Detailed scores across all assessment areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sectionResults.map((section) => (
                <div key={section.sectionType} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {SECTION_NAMES[section.sectionType] || section.sectionType}
                    </h3>
                    <div className="text-right">
                      <div className="text-lg font-bold">{section.score}</div>
                      <div
                        className={`text-sm font-medium ${
                          INTERPRETATION_COLORS[section.interpretationLabel?.toLowerCase() || ''] ||
                          ''
                        }`}
                      >
                        {section.interpretationLabel}
                      </div>
                    </div>
                  </div>
                  <Progress value={section.score} className="h-3" />
                  {section.interpretationNarrative && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {section.interpretationNarrative}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownloadPDF} size="lg" disabled={isDownloading}>
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
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              These results have been calculated based on your responses to the psychometric
              assessment. For detailed recommendations and next steps, please refer to the PDF
              report.
            </p>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

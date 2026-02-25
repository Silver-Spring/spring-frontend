'use client';

import { ProtectedLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Spinner } from '@/components/ui/spinner';
import { useAssessmentResults, useDownloadReport } from '@/modules/assessment/hooks';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

interface AssessmentResultsPageProps {
  resultId: string;
}

const SECTION_NAMES: Record<string, string> = {
  psychological: 'Psychological',
  social: 'Social',
  mental: 'Mental',
  physical: 'Physical',
  lifestyle: 'Lifestyle',
};

const SECTION_DISPLAY_NAMES: Record<string, string> = {
  psychological: 'Psychological Readiness',
  social: 'Social Support',
  mental: 'Mental Wellness',
  physical: 'Physical Health',
  lifestyle: 'Lifestyle Factors',
};

const INTERPRETATION_COLORS: Record<string, string> = {
  vulnerable: 'text-green-500 dark:text-green-400',
  emerging: 'text-green-600 dark:text-green-400',
  developing: 'text-emerald-600 dark:text-emerald-400',
  proactive: 'text-teal-600 dark:text-teal-400',
  thriving: 'text-green-700 dark:text-green-300',
};

const STAGE_BADGES: Record<string, string> = {
  vulnerable: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  emerging: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  developing: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  proactive: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  thriving: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
};

const CHART_COLORS = [
  '#16a34a', // green-600
  '#059669', // emerald-600
  '#0d9488', // teal-600
  '#4ade80', // green-400
  '#6ee7b7', // emerald-300
  '#86efac', // green-300
  '#34d399', // emerald-400
];

export const AssessmentResultsPage = ({ resultId }: AssessmentResultsPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { result, loading } = useAssessmentResults(resultId);
  const { downloadReport, isDownloading, isGenerating } = useDownloadReport();
  const [isClient, setIsClient] = useState(false);
  const [formattedDate, setFormattedDate] = useState<string>('');

  // Ensure all hooks are called before any early returns
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (result?.createdAt && isClient) {
      const date = new Date(result.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setFormattedDate(date);
    }
  }, [result?.createdAt, isClient]);

  const isAdminView = useMemo(() => searchParams.get('from') === 'admin', [searchParams]);
  const backPath = isAdminView ? '/admin/assessment' : '/dashboard';

  // Wrap sectionResults in useMemo to ensure consistent hook order
  const sectionResults = useMemo(
    () => result?.assessmentSectionResultsByResultId?.nodes || [],
    [result?.assessmentSectionResultsByResultId?.nodes]
  );

  // Calculate average scores for cohort comparison (mock data - in production, fetch from server)
  const avgScores = useMemo(() => {
    const sectionMap: Record<string, number> = {
      psychological: 68,
      social: 65,
      mental: 72,
      physical: 70,
      lifestyle: 66,
    };
    return sectionMap;
  }, []);

  // Prepare data for cohort comparison chart
  const cohortComparisonData = useMemo(() => {
    return sectionResults.map((section) => ({
      name: SECTION_NAMES[section.sectionType],
      'Your Score': section.score,
      'Cohort Average': avgScores[section.sectionType] || 65,
    }));
  }, [sectionResults, avgScores]);

  // Age group distribution data - memoized
  const ageGroupData = useMemo(
    () => [
      { name: '55-60', value: 18, color: '#6366f1' },
      { name: '60-65', value: 28, color: '#ec4899' },
      { name: '65-70', value: 32, color: '#14b8a6' },
      { name: '70+', value: 22, color: '#f59e0b' },
    ],
    []
  );

  // Gender distribution data - memoized
  const genderData = useMemo(
    () => [
      { name: 'Male', value: 52, color: '#3b82f6' },
      { name: 'Female', value: 48, color: '#f472b6' },
    ],
    []
  );

  // Prepare data for overall score distribution (percentile positioning)
  const distributionData = useMemo(
    () => [
      { range: '0-100', count: 5, percentage: 2 },
      { range: '100-200', count: 12, percentage: 6 },
      { range: '200-300', count: 45, percentage: 22 },
      { range: '300-400', count: 98, percentage: 48 },
      { range: '400-500', count: 50, percentage: 22 },
    ],
    []
  );

  // Calculate percentile (rough calculation)
  const percentile = useMemo(() => {
    if (!result) return 0;
    const totalBelow = distributionData
      .filter((d) => {
        const maxInRange = parseInt(d.range.split('-')[1]);
        return maxInRange <= result.totalReadinessIndex;
      })
      .reduce((sum, d) => sum + d.percentage, 0);
    return Math.min(100, totalBelow + 15); // Add some buffer for current score
  }, [result?.totalReadinessIndex, distributionData]);

  // Get interpretation stage for overall score
  const getInterpretationForScore = (score: number): string => {
    if (score < 100) return 'Vulnerable';
    if (score < 200) return 'Emerging';
    if (score < 300) return 'Developing';
    if (score < 400) return 'Proactive';
    return 'Thriving';
  };

  const overallStage = useMemo(
    () => getInterpretationForScore(result?.totalReadinessIndex || 0),
    [result?.totalReadinessIndex]
  );

  const overallStageColor = useMemo(
    () => STAGE_BADGES[overallStage.toLowerCase()] || STAGE_BADGES.developing,
    [overallStage]
  );

  // Get strongest and weakest dimensions
  const strongestDimension = useMemo(() => {
    const sorted = [...sectionResults].sort((a, b) => b.score - a.score);
    return sorted[0];
  }, [sectionResults]);

  const weakestDimension = useMemo(() => {
    const sorted = [...sectionResults].sort((a, b) => b.score - a.score);
    return sorted[sorted.length - 1];
  }, [sectionResults]);

  const chartConfig = useMemo(
    () =>
      ({
        'Your Score': {
          label: 'Your Score',
          color: 'var(--primary)',
        },
        'Cohort Average': {
          label: 'Cohort Average',
          color: 'var(--muted-foreground)',
        },
      }) satisfies ChartConfig,
    []
  );

  const handleDownloadPDF = async () => {
    if (!result?.id) return;
    await downloadReport({ resultId: result.id });
  };

  if (loading || !result) {
    return (
      <ProtectedLayout>
        {() => (
          <div className="flex items-center justify-center min-h-screen">
            {loading ? (
              <Spinner className="size-8" />
            ) : (
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
            )}
          </div>
        )}
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      {() => (
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* 1️⃣ HEADER BLOCK */}
            <div className="mb-12 text-center pb-8 border-b-2 border-green-300/20 dark:border-green-700/20">
              <div className="inline-block mb-4 px-4 py-2 bg-linear-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full">
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Assessment Results
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                Assessment Report
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We have analyzed your responses and prepared a detailed readiness report based on
                your assessment.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {isClient && formattedDate ? `Completed on ${formattedDate}` : ''}
              </p>
            </div>

            {/* 2️⃣ MAIN ANALYTICS GRID (Two-Column Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* LEFT COLUMN — Total Readiness + Cohort Charts */}
              <div className="space-y-6">
                {/* Total Readiness Index */}
                <Card className="bg-linear-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20 border-2 border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-500/10">
                  <CardContent className="pt-6 pb-4 text-center">
                    <p className="text-sm font-semibold text-green-700 dark:text-green-300 uppercase tracking-widest mb-2">
                      Total Readiness Index
                    </p>
                    <div className="text-7xl font-black bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent leading-none mb-2">
                      {result.totalReadinessIndex}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">out of 500</p>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-bold ${overallStageColor}`}
                    >
                      {overallStage}
                    </span>
                  </CardContent>
                </Card>

                {/* Comparison with Age Group & Gender */}
                <Card className="border-2 border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-500/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-green-700 dark:text-green-300">
                      Comparison with Your Cohort
                    </CardTitle>
                    <CardDescription>Age group & gender distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Pie charts row */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {/* Age Group Pie */}
                      <div>
                        <p className="text-sm font-semibold text-center text-muted-foreground mb-3">
                          Age Group
                        </p>
                        <ChartContainer config={chartConfig} className="h-64 w-full">
                          <PieChart width={250} height={250}>
                            <Pie
                              data={ageGroupData}
                              cx="50%"
                              cy="50%"
                              innerRadius={65}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {ageGroupData.map((entry, index) => (
                                <Cell key={`age-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => `${value}%`}
                              contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: 'none',
                                borderRadius: '8px',
                              }}
                            />
                          </PieChart>
                        </ChartContainer>
                        <div className="space-y-1.5 mt-3">
                          {ageGroupData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs">
                              <div
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-muted-foreground truncate">
                                {item.name}: <strong>{item.value}%</strong>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gender Pie */}
                      <div>
                        <p className="text-sm font-semibold text-center text-muted-foreground mb-3">
                          Gender
                        </p>
                        <ChartContainer config={chartConfig} className="h-64 w-full">
                          <PieChart width={250} height={250}>
                            <Pie
                              data={genderData}
                              cx="50%"
                              cy="50%"
                              innerRadius={65}
                              outerRadius={100}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {genderData.map((entry, index) => (
                                <Cell key={`gender-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => `${value}%`}
                              contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: 'none',
                                borderRadius: '8px',
                              }}
                            />
                          </PieChart>
                        </ChartContainer>
                        <div className="space-y-1.5 mt-3">
                          {genderData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs">
                              <div
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-muted-foreground">
                                {item.name}: <strong>{item.value}%</strong>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN — Dimension Overview (dot-on-track) */}
              <div>
                <Card className="border-2 border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-500/10 bg-linear-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="bg-linear-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                      Dimension Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {sectionResults.map((section) => {
                      const stageLabel = section.interpretationLabel?.toLowerCase() || 'developing';
                      const stageColor = STAGE_BADGES[stageLabel];
                      return (
                        <div key={section.sectionType}>
                          {/* Dimension Name + Stage Badge */}
                          <div className="flex items-center justify-between mb-2 gap-2">
                            <span className="text-sm font-bold text-green-900 dark:text-green-100">
                              {SECTION_NAMES[section.sectionType]}
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 ${stageColor}`}
                            >
                              {section.interpretationLabel}
                            </span>
                          </div>
                          {/* Track with dot marker */}
                          <div className="relative h-2.5 bg-green-100 dark:bg-green-900/40 rounded-full">
                            <div
                              className="absolute inset-y-0 left-0 bg-green-300 dark:bg-green-700 rounded-full"
                              style={{ width: `${section.score}%` }}
                            />
                            <div
                              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-green-600 dark:bg-green-400 border-2 border-background shadow"
                              style={{ left: `${section.score}%` }}
                            />
                          </div>
                          {/* Scale labels */}
                          <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                            <span>Vulnerable</span>
                            <span>Thriving</span>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 3️⃣ OVERALL COHORT COMPARISON — Full Width */}
            <Card className="mb-12 border-2 border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-500/10 bg-linear-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10">
              <CardHeader>
                <CardTitle className="bg-linear-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  Overall Cohort Comparison
                </CardTitle>
                <CardDescription>
                  How your total score compares to the broader population
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-72 w-full">
                  <BarChart
                    data={distributionData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="range"
                      label={{ value: 'Score Range', position: 'insideBottomRight', offset: -10 }}
                    />
                    <YAxis label={{ value: 'Cohort (%)', angle: -90, position: 'insideLeft' }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="percentage" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* 4️⃣ REPORT SUMMARY */}
            <Card className="mb-12 border-2 border-green-200/50 dark:border-green-800/50 shadow-lg shadow-green-500/10 bg-linear-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/10 dark:to-emerald-950/10">
              <CardContent className="pt-8 pb-8 px-8">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Based on your responses, your Silver Spring Retirement Readiness Index stands at{' '}
                  <strong className="text-foreground">
                    {result.totalReadinessIndex} out of 500
                  </strong>
                  , placing you in the{' '}
                  <strong className="text-green-700 dark:text-green-300">{overallStage}</strong>{' '}
                  stage.
                  {strongestDimension && (
                    <>
                      {' '}
                      Your{' '}
                      <strong className="text-foreground">
                        {SECTION_DISPLAY_NAMES[strongestDimension.sectionType]}
                      </strong>{' '}
                      is your strongest area at{' '}
                      <strong className="text-foreground">{strongestDimension.score}/100</strong>,
                      reflecting meaningful preparation in that dimension.
                    </>
                  )}
                  {weakestDimension && (
                    <>
                      {' '}
                      At the same time, your{' '}
                      <strong className="text-foreground">
                        {SECTION_DISPLAY_NAMES[weakestDimension.sectionType]}
                      </strong>{' '}
                      score of{' '}
                      <strong className="text-foreground">{weakestDimension.score}/100</strong>{' '}
                      highlights a focused area for growth as you approach retirement.
                    </>
                  )}{' '}
                  Overall, your profile shows{' '}
                  {overallStage === 'Thriving'
                    ? 'a high level of readiness across the key pillars of a fulfilling retirement.'
                    : overallStage === 'Proactive'
                      ? 'solid groundwork with clear opportunities to strengthen your retirement readiness further.'
                      : overallStage === 'Developing'
                        ? 'a developing foundation with meaningful steps you can take to build greater readiness.'
                        : 'an early stage of readiness with important areas to address as you plan ahead.'}
                </p>
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  For a personalised breakdown of each dimension, actionable recommendations, and a
                  step-by-step improvement roadmap, download your full PDF report below.
                </p>
              </CardContent>
            </Card>

            {/* 5️⃣ ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 pt-8 border-t-2 border-green-300/20 dark:border-green-700/20">
              <Button
                onClick={handleDownloadPDF}
                size="lg"
                disabled={isDownloading}
                className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-500/50 transition-all duration-300"
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
              <Button
                variant="outline"
                onClick={() => router.push(backPath)}
                size="lg"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950/20 font-bold transition-all duration-300"
              >
                <ArrowLeft className="mr-2 size-4" />
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  );
};

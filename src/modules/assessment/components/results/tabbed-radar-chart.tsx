'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from 'recharts';

interface CohortData {
  label: string;
  cohortSize: number;
  totalScore: {
    userScore: number;
    cohortAverage: number;
  };
  sectionScores: {
    sectionType: string;
    sectionName: string;
    userScore: number;
    cohortAverage: number;
  }[];
}

interface TabbedRadarChartProps {
  ageCohort?: CohortData | null;
  genderCohort?: CohortData | null;
  overallCohort?: CohortData | null;
}

const CHART_CONFIG = {
  userScore: {
    label: 'Your Score',
    color: 'var(--chart-1)',
  },
  cohortAverage: {
    label: 'Cohort Average',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const SECTION_SHORT_NAMES: Record<string, string> = {
  'Psychological Readiness': 'Psychological',
  'Social Support': 'Social',
  'Mental Wellness': 'Mental',
  'Physical Health': 'Physical',
  'Lifestyle Factors': 'Lifestyle',
};

const shortenSectionName = (name: string): string => {
  const mapped = SECTION_SHORT_NAMES[name];
  if (mapped) return mapped;
  return name.replace(/\s+Readiness$/i, '');
};

export const TabbedRadarChart = ({
  ageCohort,
  genderCohort,
  overallCohort,
}: TabbedRadarChartProps) => {
  const tabs = [];
  if (ageCohort) tabs.push({ value: 'age', label: ageCohort.label, data: ageCohort });
  if (genderCohort) tabs.push({ value: 'gender', label: genderCohort.label, data: genderCohort });
  if (overallCohort) tabs.push({ value: 'overall', label: 'All Users', data: overallCohort });

  const [activeTab, setActiveTab] = useState(tabs[0]?.value || 'age');

  if (tabs.length === 0) return null;

  return (
    <Card className="bg-linear-to-br from-green-50 via-green-50/30 to-background dark:from-green-950/30 dark:via-green-950/10 dark:to-background border-green-200 dark:border-green-900/40 shadow-none">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-100/50 dark:bg-green-900/30">
            <BarChart3 className="size-5 text-green-600 dark:text-green-500" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-green-900 dark:text-green-100">
              Multi-Dimensional Analysis
            </CardTitle>
            <CardDescription className="text-green-800/70 dark:text-green-200/70">
              Section-wise comparison across different cohorts
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="grid w-full mb-4 bg-green-100/80 dark:bg-green-900/20"
            style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-green-700 data-[state=active]:text-white dark:data-[state=active]:bg-green-800"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => {
            const radarData = [
              ...tab.data.sectionScores.map((section) => ({
                subject: shortenSectionName(section.sectionName),
                fullName: section.sectionName,
                userScore: section.userScore,
                cohortAverage: section.cohortAverage,
                fullMark: 100,
              })),
            ];

            return (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="w-full h-[450px]">
                  <ChartContainer config={CHART_CONFIG} className="w-full h-full">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
                      <PolarGrid gridType="polygon" stroke="var(--border)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: 'var(--foreground)', fontSize: 12, fontWeight: 500 }}
                        tickLine={false}
                      />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} tickCount={6} />
                      <Radar
                        name="Your Score"
                        dataKey="userScore"
                        stroke="var(--color-userScore)"
                        fill="var(--color-userScore)"
                        fillOpacity={0.6}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Cohort Average"
                        dataKey="cohortAverage"
                        stroke="var(--color-cohortAverage)"
                        fill="var(--color-cohortAverage)"
                        fillOpacity={0.4}
                        strokeWidth={2}
                      />
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          const data = payload[0].payload;

                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-md">
                              <p className="font-semibold mb-2">{data.fullName}</p>
                              <div className="space-y-1 text-sm">
                                <p className="flex justify-between gap-4">
                                  <span className="text-muted-foreground">Your Score:</span>
                                  <span className="font-bold" style={{ color: 'var(--chart-1)' }}>
                                    {Math.round(data.userScore)}
                                  </span>
                                </p>
                                <p className="flex justify-between gap-4">
                                  <span className="text-muted-foreground">Cohort Avg:</span>
                                  <span className="font-bold" style={{ color: 'var(--chart-2)' }}>
                                    {Math.round(data.cohortAverage)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          );
                        }}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                        formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                      />
                    </RadarChart>
                  </ChartContainer>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

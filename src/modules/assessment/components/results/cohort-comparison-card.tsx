'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Users } from 'lucide-react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface CohortData {
  label: string;
  cohortSize: number;
  totalScore: {
    userScore: number;
    cohortAverage: number;
  };
}

interface CohortComparisonCardProps {
  userScore: number;
  ageCohort?: CohortData | null;
  genderCohort?: CohortData | null;
  overallCohort?: CohortData | null;
}

const chartConfig = {
  userScore: {
    label: 'Your Score',
    color: 'var(--chart-1)',
  },
  ageAverage: {
    label: 'Age Cohort',
    color: 'var(--chart-2)',
  },
  genderAverage: {
    label: 'Gender Cohort',
    color: 'var(--chart-3)',
  },
  overallAverage: {
    label: 'Overall',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

export const CohortComparisonCard = ({
  userScore,
  ageCohort,
  genderCohort,
  overallCohort,
}: CohortComparisonCardProps) => {
  const chartData = useMemo(() => {
    const data: any[] = [
      {
        category: 'Total Score',
        userScore,
      },
    ];

    if (ageCohort) {
      data[0].ageAverage = Math.round(ageCohort.totalScore.cohortAverage);
    }
    if (genderCohort) {
      data[0].genderAverage = Math.round(genderCohort.totalScore.cohortAverage);
    }
    if (overallCohort) {
      data[0].overallAverage = Math.round(overallCohort.totalScore.cohortAverage);
    }

    return data;
  }, [userScore, ageCohort, genderCohort, overallCohort]);

  if (!ageCohort && !genderCohort && !overallCohort) {
    return null;
  }

  return (
    <Card className="bg-green-50/30 dark:bg-green-950/10 border-green-100 dark:border-green-900/30 justify-around">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-100/50 dark:bg-green-900/30">
            <Users className="size-5 text-green-600 dark:text-green-500" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-green-900 dark:text-green-100">Cohort Comparison</CardTitle>
            <CardDescription className="text-green-800/70 dark:text-green-200/70">
              Your score compared across different cohort groups
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Bar Chart */}
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="userScore"
              fill="var(--color-userScore)"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
            {ageCohort && (
              <Bar
                dataKey="ageAverage"
                fill="var(--color-ageAverage)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            )}
            {genderCohort && (
              <Bar
                dataKey="genderAverage"
                fill="var(--color-genderAverage)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            )}
            {overallCohort && (
              <Bar
                dataKey="overallAverage"
                fill="var(--color-overallAverage)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            )}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

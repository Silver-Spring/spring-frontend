'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from '@/components/ui/chart';
import { SECTION_SCORE_BANDS } from '@/modules/assessment/constants/interpretation-bands';
import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Cell, Label, Pie, PieChart as RechartsPieChart } from 'recharts';

interface SectionResult {
  sectionType: string;
  score: number;
  interpretationLabel: string;
  interpretationNarrative?: string | null;
}

interface SectionBreakdownCardProps {
  sectionResults: SectionResult[];
}

const SECTION_NAMES: Record<string, string> = {
  psychological: 'Psychological Readiness',
  social: 'Social Support',
  mental: 'Mental Wellness',
  physical: 'Physical Health',
  lifestyle: 'Lifestyle Factors',
};

const chartConfig = {
  score: {
    label: 'Score',
  },
  psychological: {
    label: 'Psychological Readiness',
    color: 'var(--chart-1)',
  },
  social: {
    label: 'Social Support',
    color: 'var(--chart-2)',
  },
  mental: {
    label: 'Mental Wellness',
    color: 'var(--chart-3)',
  },
  physical: {
    label: 'Physical Health',
    color: 'var(--chart-4)',
  },
  lifestyle: {
    label: 'Lifestyle Factors',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export const SectionBreakdownCard = ({ sectionResults }: SectionBreakdownCardProps) => {
  const totalScore = useMemo(() => {
    return sectionResults.reduce((sum, section) => sum + section.score, 0);
  }, [sectionResults]);

  const chartData = useMemo(() => {
    return sectionResults.map((section) => {
      const sectionKey = section.sectionType.toLowerCase();
      return {
        section: sectionKey,
        score: section.score,
        label: SECTION_NAMES[section.sectionType] || section.sectionType,
        fill: `var(--color-${sectionKey})`,
      };
    });
  }, [sectionResults]);

  return (
    <Card className="bg-green-50/30 dark:bg-green-950/10 border-green-100 dark:border-green-900/30">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-100/50 dark:bg-green-900/30">
            <TrendingUp className="size-5 text-green-600 dark:text-green-500" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-green-900 dark:text-green-100">Section Breakdown</CardTitle>
            <CardDescription className="text-green-800/70 dark:text-green-200/70">
              Distribution of your scores across assessment areas
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <RechartsPieChart>
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0];
                  const section = sectionResults.find(
                    (s) => s.sectionType.toLowerCase() === data.payload.section
                  );
                  const band = SECTION_SCORE_BANDS.find(
                    (b) => section && section.score >= b.min && section.score <= b.max
                  );

                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <p className="font-semibold mb-2">{data.name}</p>
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Score:</span>
                          <span className="font-bold">{data.value}</span>
                        </p>
                        <p className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Level:</span>
                          <span className={`font-medium ${band?.color || ''}`}>
                            {section?.interpretationLabel}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                }}
              />
              <Pie
                data={chartData}
                dataKey="score"
                nameKey="section"
                innerRadius={70}
                outerRadius={140}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {totalScore}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 28}
                            className="fill-muted-foreground text-sm"
                          >
                            Total Score
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
              <ChartLegend 
                content={<ChartLegendContent className="flex-wrap" />}
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </RechartsPieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

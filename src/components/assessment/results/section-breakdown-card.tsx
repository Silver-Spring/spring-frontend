'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useIsMobile } from '@/hooks';
import { SECTION_SCORE_BANDS } from '@/modules/assessment/constants/interpretation-bands';
import { TrendingUp } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Cell, Label, Pie, PieChart as RechartsPieChart, Sector } from 'recharts';

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, payload }: any) => {
  const radius = outerRadius + 40;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const isLeft = x < cx;
  const lines = payload.label.split(' ');

  return (
    <text
      x={x}
      y={y}
      textAnchor={isLeft ? 'end' : 'start'}
      dominantBaseline="central"
      className="fill-foreground text-xs font-semibold hidden lg:block"
    >
      {lines.map((line: string, index: number) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : '1.2em'}>
          {line}
        </tspan>
      ))}
      <tspan x={x} dy="1.4em" className="fill-primary font-bold text-sm">
        {payload.score}
      </tspan>
    </text>
  );
};

const renderMobileLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-sm font-bold lg:hidden"
    >
      {value}
    </text>
  );
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))',
      }}
    />
  );
};

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
  const isMobile = useIsMobile();

  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

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

  const handleMouseEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(undefined);
  }, []);

  const renderTooltipContent = useCallback(
    ({ active, payload }: any) => {
      if (!active || !payload?.length) return null;
      const data = payload[0];
      const section = sectionResults.find(
        (s) => s.sectionType.toLowerCase() === data.payload.section
      );
      const band = SECTION_SCORE_BANDS.find(
        (b) => section && section.score >= b.min && section.score <= b.max
      );

      const percentage = (((section?.score || 0) / totalScore) * 100).toFixed(1);

      return (
        <div className="rounded-lg border bg-background p-4 shadow-xl max-w-xs">
          <p className="font-bold text-base mb-3 text-foreground">{data.payload.label}</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Score:</span>
              <span className="font-bold text-lg text-foreground">{data.value}</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Contribution:</span>
              <span className="font-semibold text-foreground">{percentage}%</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Level:</span>
              <span className={`font-semibold ${band?.color || ''}`}>
                {section?.interpretationLabel}
              </span>
            </div>
            {section?.interpretationNarrative && (
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t italic">
                {section.interpretationNarrative}
              </p>
            )}
          </div>
        </div>
      );
    },
    [sectionResults, totalScore]
  );

  return (
    <Card className="bg-linear-to-br from-primary/8 via-primary/5 to-background border-primary/20 shadow-none">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="size-5 text-primary" />
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
        <div className="h-[400px] md:h-[500px] will-change-transform">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <RechartsPieChart>
              <ChartTooltip content={renderTooltipContent} />
              <Pie
                data={chartData}
                dataKey="score"
                nameKey="section"
                innerRadius={70}
                outerRadius={120}
                strokeWidth={2}
                label={(props) => {
                  if (isMobile) {
                    return renderMobileLabel(props);
                  }
                  return renderCustomLabel(props);
                }}
                labelLine={false}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isAnimationActive={false}
                style={{
                  cursor: 'pointer',
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    fillOpacity={activeIndex === undefined || activeIndex === index ? 1 : 0.35}
                  />
                ))}
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
                content={<ChartLegendContent nameKey="section" />}
                wrapperStyle={{ paddingTop: '20px', maxWidth: '100%' }}
                className="lg:hidden flex-wrap"
              />
            </RechartsPieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Spinner } from '@/components/ui/spinner';
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

const chartConfig = {
  completedCount: {
    label: 'Completed',
    color: '#3b82f6',
  },
  inProgressCount: {
    label: 'In Progress',
    color: '#8b5cf6',
  },
  startedCount: {
    label: 'Started',
    color: '#10b981',
  },
  count: {
    label: 'Count',
    color: '#3b82f6',
  },
} satisfies ChartConfig;

type TrendPoint = {
  day: string;
  date: string;
  completedCount: number;
  inProgressCount: number;
  startedCount: number;
};

type DistributionPoint = {
  range: string;
  count: number;
};

type AnalyticsTrendChartProps = {
  data: TrendPoint[];
  loading: boolean;
};

const AnalyticsTrendChart = ({ data, loading }: AnalyticsTrendChartProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No trend data available
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          left: 0,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          allowDecimals={false}
          width={30}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="completedCount"
          type="monotone"
          stroke="var(--color-completedCount)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="inProgressCount"
          type="monotone"
          stroke="var(--color-inProgressCount)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

type AnalyticsScoreDistributionChartProps = {
  distribution: DistributionPoint[];
  loading: boolean;
  isAllTypes: boolean;
};

const AnalyticsScoreDistributionChart = ({
  distribution,
  loading,
  isAllTypes,
}: AnalyticsScoreDistributionChartProps) => {
  if (isAllTypes) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground text-center px-6">
        Score distribution is available per assessment type. Choose a specific type above.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  if (distribution.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No score data available
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={distribution}
        margin={{
          left: 0,
          right: 12,
          top: 12,
          bottom: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="range" tickLine={false} tickMargin={10} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export { AnalyticsScoreDistributionChart, AnalyticsTrendChart };

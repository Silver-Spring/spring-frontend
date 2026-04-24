'use client';

import { useState, useCallback, useMemo, memo } from 'react';
import Image from 'next/image';
import { BarChart3, FileText, Lightbulb, Users, TrendingUp } from 'lucide-react';

interface DimensionItem {
  name: string;
  value: number;
}

const DIMENSION_DATA: DimensionItem[] = [
  { name: 'Psychological', value: 78 },
  { name: 'Social', value: 65 },
  { name: 'Wellness', value: 72 },
  { name: 'Physical', value: 58 },
  { name: 'Lifestyle', value: 70 },
];

const RATING_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const REPORT_FEATURES = [
  'Detailed breakdown of all 5 dimensions',
  'Personalized insights based on your responses',
  'Actionable steps for improvement',
  'Share with your financial advisor',
] as const;

const DimensionBar = memo(({ item, index }: { item: DimensionItem; index: number }) => (
  <div className="flex items-center gap-3">
    <span className="w-20 text-xs text-muted-foreground">{item.name}</span>
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
      <div
        className={`dimension-bar dimension-bar-${index + 1} h-full rounded-full bg-primary transition-all duration-300`}
        style={{ width: `${item.value}%` }}
      />
    </div>
  </div>
));

DimensionBar.displayName = 'DimensionBar';

const RatingButton = memo(
  ({ num, isSelected, onClick }: { num: number; isSelected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex size-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-200 hover:scale-110 sm:size-11 ${
        isSelected
          ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
          : 'border-primary/30 bg-background text-foreground hover:border-primary/60'
      }`}
      aria-label={`Rate ${num}`}
      aria-pressed={isSelected}
    >
      {num}
    </button>
  )
);

RatingButton.displayName = 'RatingButton';

export function FeaturesBento() {
  const [selectedValue, setSelectedValue] = useState<number>(4);

  const handleRatingClick = useCallback((num: number) => {
    setSelectedValue(num);
  }, []);

  return (
    <section id="features-bento" className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-16 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
          What you get
        </p>
        <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Everything you&apos;ll <span className="text-primary">discover</span>
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
          Your assessment unlocks comprehensive insights into your retirement readiness.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Score Card */}
        <div className="score-card group flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <div>
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 will-change-transform group-hover:scale-110">
              <TrendingUp className="size-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Your Readiness Score</h3>
            <p className="text-sm text-muted-foreground">
              A comprehensive score from 0-500 reflecting your overall retirement readiness across
              all dimensions.
            </p>
          </div>

          {/* Circular Progress Visualization */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative">
              <svg className="size-32" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="score-circle text-primary transition-all duration-500 will-change-[stroke-dasharray]"
                  strokeDasharray="171.6 251"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="score-number text-2xl font-bold tabular-nums text-primary transition-all duration-300 will-change-transform">
                  342
                </span>
                <span className="text-xs text-muted-foreground">of 500</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Sample score preview</p>
        </div>

        {/* Dimension Breakdown */}
        <div className="dimensions-card group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 will-change-transform group-hover:scale-110">
            <BarChart3 className="size-5" />
          </div>
          <h3 className="mb-2 font-semibold">5-Dimension Breakdown</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            See exactly where you stand across each key area.
          </p>
          <div className="space-y-3">
            {DIMENSION_DATA.map((item, index) => (
              <DimensionBar key={item.name} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Peer Comparison */}
        <div className="peer-card group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 will-change-transform group-hover:scale-110">
            <Users className="size-5" />
          </div>
          <h3 className="mb-2 font-semibold">Peer Comparison</h3>
          <p className="mb-6 text-sm text-muted-foreground">
            See how you compare to others in your age group.
          </p>
          <div className="flex items-end justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-20 w-10 overflow-hidden rounded-md bg-muted">
                <div
                  className="peer-bar peer-bar-1 absolute bottom-0 w-full bg-muted-foreground/30 transition-all duration-500 will-change-transform"
                  style={{ height: '55%' }}
                />
              </div>
              <span className="text-xs text-muted-foreground">Age</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-20 w-10 overflow-hidden rounded-md bg-muted">
                <div
                  className="peer-bar peer-bar-2 absolute bottom-0 w-full bg-primary transition-all duration-500 will-change-transform"
                  style={{ height: '80%' }}
                />
              </div>
              <span className="text-xs font-medium text-primary">You</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="relative h-20 w-10 overflow-hidden rounded-md bg-muted">
                <div
                  className="peer-bar peer-bar-3 absolute bottom-0 w-full bg-muted-foreground/30 transition-all duration-500 will-change-transform"
                  style={{ height: '70%' }}
                />
              </div>
              <span className="text-xs text-muted-foreground">Gender</span>
            </div>
          </div>
        </div>

        {/* Interactive Question Preview */}
        <div className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 lg:col-span-2">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Try it yourself
              </p>
              <h3 className="font-semibold">Simple 1-10 scale questions</h3>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Interactive
            </span>
          </div>
          <div className="rounded-xl bg-muted/50 p-6">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                1
              </span>
              <p className="pt-1 font-medium leading-relaxed">
                I feel excited about the possibilities that retirement will bring.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {RATING_NUMBERS.map((num) => (
                <RatingButton
                  key={num}
                  num={num}
                  isSelected={selectedValue === num}
                  onClick={() => handleRatingClick(num)}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-primary/80">
              <span>Strongly Disagree</span>
              <span>Neutral</span>
              <span>Strongly Agree</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No typing required. Just tap to respond to 50 reflective questions.
          </p>
        </div>

        {/* Personalized Insights with Half-Cropped Stacked Images */}
        <div className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <div className="p-8">
            <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 will-change-transform group-hover:scale-110">
              <Lightbulb className="size-5" />
            </div>
            <h3 className="mb-2 font-semibold">Personalized Insights</h3>
            <p className="text-sm text-muted-foreground">
              Actionable recommendations tailored to your unique profile and circumstances.
            </p>
          </div>

          {/* Half-cropped stacked flyer images - anchored to bottom, extending beyond */}
          <div className="relative mt-auto flex-1">
            <div className="absolute inset-x-0 top-0 flex justify-center">
              {/* Back page (slightly offset) */}
              <div
                className="absolute h-64 w-44 origin-top transition-all duration-500 ease-out will-change-transform group-hover:-translate-x-10 group-hover:translate-y-2 group-hover:-rotate-8 group-hover:scale-105"
                style={{
                  transform: 'translateX(25px) translateY(15px) rotate(5deg)',
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-t-xl border border-border/50 bg-card shadow-lg shadow-black/10">
                  <Image
                    src="/images/dimensions/psychological-3.jpg"
                    alt="Report page preview"
                    fill
                    className="object-cover object-top"
                    sizes="176px"
                    priority={false}
                  />
                </div>
              </div>

              {/* Front page (main) - What This Means for Your Journey */}
              <div className="relative h-64 w-44 origin-top transition-all duration-500 ease-out will-change-transform group-hover:translate-x-8 group-hover:translate-y-1 group-hover:rotate-5 group-hover:scale-110">
                <div className="relative h-full w-full overflow-hidden rounded-t-xl border border-border/50 bg-card shadow-xl shadow-black/15">
                  <Image
                    src="/images/insights-journey.jpg"
                    alt="What This Means for Your Journey - Personalized insights"
                    fill
                    className="object-cover object-top"
                    sizes="176px"
                    priority={false}
                  />
                </div>
                <div className="absolute left-2 top-2 size-5 border-l-2 border-t-2 border-primary/50 rounded-tl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

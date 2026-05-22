'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TotalScoreCardProps {
  totalScore: number;
  completedDate: string;
  assessmentTypeName?: string | null;
  minScore?: number | null;
  maxScore?: number | null;
  interpretationLabel?: string | null;
  interpretationNarrative?: string | null;
  interpretationKeyMindset?: string | null;
}

export const TotalScoreCard = ({
  totalScore,
  completedDate,
  assessmentTypeName,
  minScore,
  maxScore,
  interpretationLabel,
  interpretationNarrative,
  interpretationKeyMindset,
}: TotalScoreCardProps) => {
  const title = assessmentTypeName?.trim() || 'Total Readiness Index';
  const showBounds = minScore != null && maxScore != null;

  return (
    <Card className="bg-linear-to-br from-primary/8 via-primary/5 to-background border-primary/20 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl mb-2 text-green-900 dark:text-green-100">
          {title}
        </CardTitle>
        <div className="text-6xl font-bold my-4" style={{ color: 'var(--chart-1)' }}>
          {totalScore}
          {showBounds && (
            <span className="text-2xl text-muted-foreground font-normal ml-2">
              / {maxScore}
            </span>
          )}
        </div>
        {interpretationLabel && (
          <>
            <div className="text-xl font-semibold mb-4 text-primary">
              {interpretationLabel}
            </div>
            {interpretationNarrative && (
              <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap">
                {interpretationNarrative}
              </p>
            )}
            {interpretationKeyMindset && (
              <blockquote className="mt-4 text-sm italic text-muted-foreground max-w-xl mx-auto border-l-2 border-primary/30 pl-4">
                {interpretationKeyMindset}
              </blockquote>
            )}
          </>
        )}
      </CardHeader>
      <CardContent className="text-center space-y-2">
        <p className="text-sm text-primary">
          Completed on {new Date(completedDate).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

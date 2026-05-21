'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getBandLabelColor } from '@/modules/assessment/constants/interpretation-bands';

interface TotalScoreCardProps {
  totalScore: number;
  completedDate: string;
  interpretationLabel?: string | null;
  interpretationNarrative?: string | null;
  interpretationKeyMindset?: string | null;
}

export const TotalScoreCard = ({
  totalScore,
  completedDate,
  interpretationLabel,
  interpretationNarrative,
  interpretationKeyMindset,
}: TotalScoreCardProps) => {
  const labelColor = getBandLabelColor(interpretationLabel);

  return (
    <Card className="bg-linear-to-br from-primary/8 via-primary/5 to-background border-primary/20 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl mb-2 text-green-900 dark:text-green-100">
          Total Readiness Index
        </CardTitle>
        <div className="text-6xl font-bold my-4" style={{ color: 'var(--chart-1)' }}>
          {totalScore}
        </div>
        {interpretationLabel && (
          <>
            <div className={`text-xl font-semibold mb-4 ${labelColor}`}>
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

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getInterpretationBand } from '@/modules/assessment/constants/interpretation-bands';
import { useMemo } from 'react';

interface TotalScoreCardProps {
  totalScore: number;
  completedDate: string;
}

export const TotalScoreCard = ({ totalScore, completedDate }: TotalScoreCardProps) => {
  const interpretationBand = useMemo(() => {
    return getInterpretationBand(totalScore, true);
  }, [totalScore]);

  return (
    <Card className="bg-linear-to-br from-primary/8 via-primary/5 to-background border-primary/20 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl mb-2 text-green-900 dark:text-green-100">
          Total Readiness Index
        </CardTitle>
        <div className="text-6xl font-bold my-4" style={{ color: 'var(--chart-1)' }}>
          {totalScore}
        </div>
        {interpretationBand && (
          <>
            <div className="text-xl font-semibold text-primary mb-4">
              {interpretationBand.label}
            </div>
            <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed max-w-2xl mx-auto">
              {interpretationBand.description}
            </p>
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

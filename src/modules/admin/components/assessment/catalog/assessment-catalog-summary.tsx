import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type AssessmentCatalogSummaryProps = {
  totalCount: number;
  liveCount: number;
  draftCount: number;
};

const AssessmentCatalogSummary = ({
  totalCount,
  liveCount,
  draftCount,
}: AssessmentCatalogSummaryProps) => (
  <Card>
    <CardContent className="flex flex-wrap items-center gap-2">
      <Badge variant="default">{liveCount} Live</Badge>
      <Badge variant="secondary">{draftCount} Draft</Badge>
      <Badge variant="outline">{totalCount} Total</Badge>
      {totalCount === 0 ? (
        <span className="text-sm text-muted-foreground">No types yet</span>
      ) : null}
    </CardContent>
  </Card>
);

export { AssessmentCatalogSummary };

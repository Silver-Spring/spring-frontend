import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { buildAssessmentHref } from '@/modules/admin/hooks/use-admin-assessment-workspace';

const AssessmentTypeNotFound = ({ typeCode }: { typeCode: string }) => (
  <Card className="p-8 text-center space-y-4">
    <p className="text-muted-foreground">
      Assessment type <span className="font-mono font-medium text-foreground">{typeCode}</span>{' '}
      was not found. It may have been removed or the URL is incorrect.
    </p>
    <Button asChild>
      <Link href={buildAssessmentHref('catalog')}>Back to all types</Link>
    </Button>
  </Card>
);

export { AssessmentTypeNotFound };

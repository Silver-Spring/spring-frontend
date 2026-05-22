import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  onRefresh?: () => void;
  refreshing?: boolean;
  className?: string;
};

const AdminPageHeader = ({
  eyebrow,
  title,
  description,
  actions,
  onRefresh,
  refreshing = false,
  className,
}: AdminPageHeaderProps) => (
  <div className={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', className)}>
    <div className="space-y-2 min-w-0">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
      {description ? (
        <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl">{description}</p>
      ) : null}
    </div>
    {(actions || onRefresh) && (
      <div className="flex shrink-0 items-center gap-2">
        {onRefresh ? (
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={refreshing}>
            <RefreshCw className={cn('size-4 mr-2', refreshing && 'animate-spin')} aria-hidden="true" />
            Refresh
          </Button>
        ) : null}
        {actions}
      </div>
    )}
  </div>
);

export { AdminPageHeader };

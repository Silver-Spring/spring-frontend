import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type AdminKpiCardProps = {
  label: string;
  value: string | number;
  insight: string;
  icon: LucideIcon;
  loading?: boolean;
  tone?: 'default' | 'success' | 'warning' | 'muted';
  className?: string;
};

const toneClasses: Record<NonNullable<AdminKpiCardProps['tone']>, string> = {
  default: 'text-foreground',
  success: 'text-emerald-600 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  muted: 'text-muted-foreground',
};

const AdminKpiCard = ({
  label,
  value,
  insight,
  icon: Icon,
  loading = false,
  tone = 'default',
  className,
}: AdminKpiCardProps) => (
  <Card className={cn('hover:shadow-sm transition-shadow', className)}>
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </div>
      {loading ? (
        <Spinner className="size-7 mt-1" />
      ) : (
        <p className={cn('text-3xl font-bold tracking-tight mt-1', toneClasses[tone])}>{value}</p>
      )}
    </CardHeader>
    <CardContent>
      <p className="text-xs leading-relaxed text-muted-foreground">{insight}</p>
    </CardContent>
  </Card>
);

export { AdminKpiCard };

'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { formatAmount, getPaymentStatusColor } from '@/lib/payment-utils';
import { getInitials } from '@/lib/utils';
import type { AdminWorkbookPurchaseItem } from '@/gql/graphql';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

type DashboardRecentPurchasesProps = {
  purchases: AdminWorkbookPurchaseItem[];
  loading?: boolean;
};

const DashboardRecentPurchases = ({ purchases, loading = false }: DashboardRecentPurchasesProps) => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <CardTitle className="text-base">Recent workbook purchases</CardTitle>
          <CardDescription>Latest buyers across all statuses</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild aria-label="View all workbook purchases">
          <Link href="/admin/workbooks">
            View all
            <ArrowRight className="ml-1 size-3.5" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner className="size-6" />
        </div>
      ) : purchases.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 h-40 text-center">
          <BookOpen className="size-8 text-muted-foreground/50" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">No workbook purchases yet.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="text-xs font-semibold">
                  {getInitials(purchase.userName || purchase.userEmail)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  {purchase.userName || purchase.userEmail}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {formatDistanceToNow(new Date(purchase.createdAt), { addSuffix: true })}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-medium">
                  {purchase.isFree ? 'Free' : formatAmount(purchase.amountInr)}
                </span>
                <Badge variant={getPaymentStatusColor(purchase.status)}>
                  {purchase.status === 'created' ? 'pending' : purchase.status}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

export { DashboardRecentPurchases };

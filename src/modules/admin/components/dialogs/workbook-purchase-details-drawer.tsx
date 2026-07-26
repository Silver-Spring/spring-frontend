'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks';
import { formatAmount, getPaymentStatusColor } from '@/lib/payment-utils';
import type { AdminWorkbookPurchaseItem } from '@/gql/graphql';
import { AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface WorkbookPurchaseDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchase: AdminWorkbookPurchaseItem | null;
}

const DetailRow = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex items-start justify-between gap-4 py-2">
    <p className="text-sm text-muted-foreground shrink-0">{label}</p>
    <div className="text-sm font-medium text-right min-w-0 break-all">{value ?? '—'}</div>
  </div>
);

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground pt-4 pb-1">
    {children}
  </p>
);

const PurchaseDetailsContent = ({ purchase }: { purchase: AdminWorkbookPurchaseItem }) => {
  const statusLabel =
    purchase.status === 'created' ? 'Pending' : purchase.status === 'captured' ? 'Captured' : 'Failed';

  return (
    <div className="pb-4">
      {purchase.status === 'failed' && (purchase.errorCode || purchase.errorDescription) ? (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{purchase.errorCode || 'Payment failed'}</AlertTitle>
          <AlertDescription>{purchase.errorDescription || 'No error details recorded.'}</AlertDescription>
        </Alert>
      ) : null}

      <SectionTitle>Buyer</SectionTitle>
      <DetailRow label="Name" value={purchase.userName || 'Unnamed user'} />
      <DetailRow label="Email" value={purchase.userEmail} />
      <DetailRow label="Phone" value={purchase.userPhone || '—'} />

      <Separator className="my-2" />

      <SectionTitle>Purchase</SectionTitle>
      <DetailRow
        label="Status"
        value={<Badge variant={getPaymentStatusColor(purchase.status)}>{statusLabel}</Badge>}
      />
      <DetailRow
        label="Amount paid"
        value={purchase.isFree ? <Badge variant="secondary">Free</Badge> : formatAmount(purchase.amountInr)}
      />
      {purchase.originalAmountInr != null && purchase.discountAmountInr > 0 ? (
        <>
          <DetailRow label="Original price" value={formatAmount(purchase.originalAmountInr)} />
          <DetailRow label="Discount" value={`- ${formatAmount(purchase.discountAmountInr)}`} />
        </>
      ) : null}
      <DetailRow
        label="Coupon"
        value={
          purchase.couponCode ? (
            <Badge variant="outline" className="font-mono uppercase">
              {purchase.couponCode}
            </Badge>
          ) : (
            '—'
          )
        }
      />

      <Separator className="my-2" />

      <SectionTitle>Payment</SectionTitle>
      <DetailRow label="Method" value={<span className="capitalize">{purchase.paymentMethod || '—'}</span>} />
      <DetailRow
        label="Order ID"
        value={<span className="font-mono text-xs">{purchase.razorpayOrderId || '—'}</span>}
      />
      <DetailRow
        label="Payment ID"
        value={<span className="font-mono text-xs">{purchase.razorpayPaymentId || '—'}</span>}
      />

      <Separator className="my-2" />

      <SectionTitle>Timeline</SectionTitle>
      <DetailRow label="Purchased at" value={new Date(purchase.createdAt).toLocaleString()} />
      <DetailRow label="Last updated" value={new Date(purchase.updatedAt).toLocaleString()} />
      <DetailRow
        label="Purchase ID"
        value={<span className="font-mono text-xs">{purchase.id}</span>}
      />
    </div>
  );
};

export const WorkbookPurchaseDetailsDrawer = ({
  open,
  onOpenChange,
  purchase,
}: WorkbookPurchaseDetailsDrawerProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[96vh] flex flex-col">
          <DrawerHeader className="text-left shrink-0">
            <DrawerTitle>Workbook Purchase</DrawerTitle>
            <DrawerDescription>Buyer, payment and coupon details</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="flex-1 overflow-y-auto px-4">
            {purchase ? <PurchaseDetailsContent purchase={purchase} /> : null}
          </ScrollArea>
          <DrawerFooter className="pt-2 shrink-0">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 shrink-0">
          <DialogTitle>Workbook Purchase</DialogTitle>
          <DialogDescription>Buyer, payment and coupon details</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-y-auto px-6 pb-6">
          {purchase ? <PurchaseDetailsContent purchase={purchase} /> : null}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

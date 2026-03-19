'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useAdminPaymentDetails } from '../../hooks/use-admin-payment-details';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface PaymentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentId: string | null;
}

export const PaymentDetailsDialog = ({
  open,
  onOpenChange,
  paymentId,
}: PaymentDetailsDialogProps) => {
  const { getPaymentDetails, loading, error } = useAdminPaymentDetails();
  const [details, setDetails] = useState<{
    razorpayData: any;
    dbData: any;
  } | null>(null);

  useEffect(() => {
    if (open && paymentId) {
      getPaymentDetails(paymentId).then((data) => {
        if (data) {
          setDetails(data);
        }
      });
    } else {
      setDetails(null);
    }
  }, [open, paymentId, getPaymentDetails]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Detailed information from Razorpay and local database
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden px-6 pb-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <Spinner className="h-8 w-8" />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to load payment details: {error.message}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && details && (
            <Tabs defaultValue="razorpay" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 shrink-0">
                <TabsTrigger value="razorpay">Razorpay Data</TabsTrigger>
                <TabsTrigger value="database">Database Record</TabsTrigger>
              </TabsList>

              <TabsContent value="razorpay" className="flex-1 mt-4 overflow-hidden">
                <div className="h-full rounded-md border overflow-hidden">
                  <ScrollArea className="h-full w-full">
                    <div className="p-4 min-w-max">
                      <pre className="text-sm whitespace-pre">
                        {JSON.stringify(details.razorpayData, null, 2)}
                      </pre>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="database" className="flex-1 mt-4 overflow-hidden">
                <div className="h-full rounded-md border overflow-hidden">
                  <ScrollArea className="h-full w-full">
                    {details.dbData ? (
                      <div className="p-4 min-w-max">
                        <pre className="text-sm whitespace-pre">
                          {JSON.stringify(details.dbData, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No database record found
                      </div>
                    )}
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

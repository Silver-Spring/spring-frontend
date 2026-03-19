'use client';

import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useAdminPaymentDetails } from '../../hooks/use-admin-payment-details';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks';

interface PaymentDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentId: string | null;
}

export const PaymentDetailsDrawer = ({
  open,
  onOpenChange,
  paymentId,
}: PaymentDetailsDrawerProps) => {
  const isMobile = useIsMobile();
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

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[96vh] flex flex-col">
          <DrawerHeader className="text-left shrink-0">
            <DrawerTitle>Payment Details</DrawerTitle>
            <DrawerDescription>
              Detailed information from Razorpay and local database
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex-1 overflow-hidden px-4">
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

          <DrawerFooter className="pt-4 shrink-0">
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
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 shrink-0">
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

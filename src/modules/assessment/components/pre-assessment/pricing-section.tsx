import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

export function PricingSection() {
  return (
    <section className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
          {'Pricing & Access'}
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
          One assessment. Lifetime access to your results.
        </p>
      </div>

      <Card className="w-full max-w-md bg-green-50/30 dark:bg-green-950/10 border-green-200 dark:border-green-900/40 shadow-lg">
        <CardHeader className="text-center">
          <Badge variant="secondary" className="mx-auto mb-3 w-fit px-3 py-1 text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-100/80 dark:hover:bg-green-900/60">
            One-Time Payment
          </Badge>
          <CardTitle className="text-4xl font-bold">{'₹2,500'}</CardTitle>
          <CardDescription className="text-base">
            Full access to the Silver Spring Retirement Readiness Index
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-center text-muted-foreground">
            One-time payment for your comprehensive retirement readiness report
          </p>

          <div className="flex items-center justify-center gap-2 rounded-lg bg-green-100/50 dark:bg-green-900/30 px-4 py-3 text-sm text-green-800 dark:text-green-200">
            <ShieldCheck className="size-4 text-green-600 dark:text-green-400" />
            <span>100% satisfaction guaranteed</span>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Payment is handled securely on the next step. No hidden fees.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

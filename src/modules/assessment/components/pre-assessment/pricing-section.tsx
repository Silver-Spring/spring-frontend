import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

export function PricingSection() {
  return (
    <section className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
          Investment in Your Future
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground px-4">
          This assessment represents years of research into what truly makes retirement fulfilling
          beyond finances. Your investment supports the continued development of this research and
          provides you with personalized insights you can act on today.
        </p>
      </div>

      <Card className="w-full max-w-md bg-primary/5 border-primary/20 shadow-lg">
        <CardHeader className="text-center">
          <Badge
            variant="secondary"
            className="mx-auto mb-3 w-fit px-3 py-1 text-xs bg-primary/10 text-primary hover:bg-primary/15"
          >
            One-Time Assessment Fee
          </Badge>
          <CardTitle className="text-4xl font-bold">{'₹2,500'}</CardTitle>
          <CardDescription className="text-base mt-2">
            For your comprehensive psychometric assessment and personalized report
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              What you receive:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• Research-backed psychometric assessment</li>
              <li>• Personalized readiness score and analysis</li>
              <li>• Actionable insights across 5 key dimensions</li>
              <li>• Downloadable PDF report for your records</li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm text-primary">
            <ShieldCheck className="size-4 text-primary" />
            <span>Secure payment • Lifetime access to your results</span>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            All payments are processed securely. No subscriptions or hidden fees.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

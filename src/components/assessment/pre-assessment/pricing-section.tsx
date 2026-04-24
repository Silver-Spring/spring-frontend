import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingSectionProps {
  onCtaClick?: () => void;
  isLoading?: boolean;
}

export function PricingSection({ onCtaClick, isLoading = false }: PricingSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-0">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Start your <span className="text-primary">assessment</span> today
        </h2>
        <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
          One assessment. Lifetime access. No subscriptions or hidden fees.
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        <div className="overflow-hidden rounded-3xl border-2 border-primary/20 bg-card shadow-xl">
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-6xl font-bold md:text-7xl">₹2500</span>
              </div>
            </div>

            <div className="mb-8 flex items-start gap-3">
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-3 text-primary" />
              </div>
              <span className="text-foreground">
                Downloadable PDF report with Lifetime access to results
              </span>
            </div>

            <Button
              size="lg"
              className="h-14 w-full gap-2 rounded-full text-base font-medium shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
              onClick={onCtaClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className="size-4" />
                  Processing...
                </>
              ) : (
                <>
                  Begin Assessment
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

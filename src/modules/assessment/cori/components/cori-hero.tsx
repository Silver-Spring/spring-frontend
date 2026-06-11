'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ArrowRight, Heart } from 'lucide-react';

interface CoriHeroProps {
  onPartnerAClick: () => void;
  onPartnerBClick: () => void;
  isLoading: boolean;
  isInProgress?: boolean;
}

export function CoriHero({
  onPartnerAClick,
  onPartnerBClick,
  isLoading,
  isInProgress = false,
}: CoriHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-28 md:pb-0 md:pt-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Heart className="size-3.5 fill-primary" />
            <span>For Couples Navigating Retirement Together</span>
          </div>

          <h1 className="mb-6 max-w-5xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
            {isInProgress ? (
              <>
                Continue your
                <span className="text-primary"> couples assessment</span>
              </>
            ) : (
              <>
                Retire with
                <span className="text-primary"> clarity — together</span>
              </>
            )}
          </h1>

          <p className="mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            {isInProgress
              ? 'Pick up where you left off. Your partner can still join with the invite code.'
              : 'The Couples Retirement Index measures nine dimensions of relationship readiness — revealing both your individual strengths and how well your visions align.'}
          </p>

          {!isInProgress && (
            <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 gap-2.5 rounded-full px-8 text-base font-medium shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                onClick={onPartnerAClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner className="size-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    Begin Together
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 gap-2.5 rounded-full px-8 text-base font-medium"
                onClick={onPartnerBClick}
                disabled={isLoading}
              >
                Join with Invite Code
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

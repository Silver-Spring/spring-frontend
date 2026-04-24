'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
  isLoading: boolean;
  isInProgress?: boolean;
}

export function HeroSection({ onCtaClick, isLoading, isInProgress = false }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-28 md:pb-0 md:pt-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-6 max-w-5xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-8xl">
            {isInProgress ? (
              <>
                Welcome back! Continue your
                <span className="text-primary"> assessment</span>
              </>
            ) : (
              <>
                Understand your
                <span className="text-primary"> retirement readiness</span>
              </>
            )}
          </h1>

          <p className="mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            {isInProgress
              ? 'Pick up where you left off. Your responses have been saved and you can complete your assessment at your own pace.'
              : 'A 15-minute psychometric assessment that reveals your complete readiness picture across 5 key dimensions of well-being.'}
          </p>

          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-14 gap-2.5 rounded-full px-8 text-base font-medium shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
              onClick={onCtaClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner className="size-4" />
                  {isLoading ? 'Processing Payment...' : 'Starting Assessment...'}
                </>
              ) : (
                <>
                  {isInProgress ? 'Resume Assessment' : 'Begin Your Assessment'}
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

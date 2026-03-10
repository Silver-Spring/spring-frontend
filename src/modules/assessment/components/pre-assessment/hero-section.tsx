import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Grainient from '@/components/ui/grainient';
import { Clock, Shield, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onCtaClick?: () => void;
  ctaText?: string;
  isLoading?: boolean;
}

export function HeroSection({
  onCtaClick,
  ctaText = 'Begin Your Assessment',
  isLoading = false,
}: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 text-center mx-auto min-h-[600px] overflow-hidden rounded-3xl w-full">
      <div className="absolute inset-0 z-0">
        <Grainient
          color1="#076506"
          color2="#bbbdbd"
          color3="#0f570c"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-8 md:px-12">
        <Badge
          variant="secondary"
          className="w-fit gap-1.5 px-3 py-1 text-xs font-medium bg-white/90 dark:bg-black/50 backdrop-blur-sm"
        >
          <Shield className="size-3.5" />
          Private & Secure Assessment
        </Badge>

        <div className="flex flex-col gap-3">
          <h1 className="text-balance text-3xl font-bold tracking-tight lg:text-4xl">
            You&apos;re ready to discover your retirement readiness
          </h1>
          <p className="mx-auto max-w-3xl text-pretty leading-relaxed lg:text-lg">
            15 minutes to understand your retirement readiness beyond finances. The Silver Spring
            Retirement Readiness Index goes deeper than money to give you a complete picture of how
            prepared you truly are.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4 text-primary" />
            ~15 minutes
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            |
          </span>
          <span>50 reflective questions</span>
          <span className="hidden sm:inline" aria-hidden="true">
            |
          </span>
          <span>Save & resume anytime</span>
        </div>

        {onCtaClick && (
          <Button
            size="lg"
            className="h-12 w-fit gap-2 rounded-xl bg-primary hover:bg-primary/90 text-base font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg"
            onClick={onCtaClick}
            disabled={isLoading}
          >
            {ctaText}
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </section>
  );
}

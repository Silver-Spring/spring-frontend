'use client';

import { useEffect, useState, useCallback, useMemo, memo, useRef } from 'react';
import { Brain, Users, HeartPulse, Activity, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Dimension {
  iconType: 'brain' | 'users' | 'heartPulse' | 'activity' | 'leaf';
  name: string;
  tagline: string;
  description: string;
  images: string[];
}

const DimensionIcon = memo(({ type }: { type: Dimension['iconType'] }) => {
  const iconProps = { className: 'size-6' };

  switch (type) {
    case 'brain':
      return <Brain {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    case 'heartPulse':
      return <HeartPulse {...iconProps} />;
    case 'activity':
      return <Activity {...iconProps} />;
    case 'leaf':
      return <Leaf {...iconProps} />;
  }
});

DimensionIcon.displayName = 'DimensionIcon';

const dimensions: Dimension[] = [
  {
    iconType: 'brain',
    name: 'Psychological Readiness',
    tagline: 'Your mental foundation',
    description:
      'Mental preparedness for the identity shift from working professional to retiree. Includes sense of purpose, future orientation, and emotional readiness for this major life transition.',
    images: [
      '/images/dimensions/psychological-2.jpg',
      '/images/dimensions/psychological-1.jpg',
      '/images/dimensions/psychological-3.jpg',
    ],
  },
  {
    iconType: 'users',
    name: 'Social Connection',
    tagline: 'Your support network',
    description:
      'Quality of relationships, community involvement, and social support systems. Strong connections predict better retirement outcomes and overall life satisfaction.',
    images: [
      '/images/dimensions/social-2.jpg',
      '/images/dimensions/social-1.jpg',
      '/images/dimensions/social-3.jpg',
    ],
  },
  {
    iconType: 'heartPulse',
    name: 'Mental Wellness',
    tagline: 'Your emotional resilience',
    description:
      'Emotional resilience, stress management capabilities, and psychological well-being. How well-equipped you are to handle the emotional aspects of retirement.',
    images: [
      '/images/dimensions/mental-2.jpg',
      '/images/dimensions/mental-1.jpg',
      '/images/dimensions/mental-3.jpg',
    ],
  },
  {
    iconType: 'activity',
    name: 'Physical Vitality',
    tagline: 'Your energy & health',
    description:
      'Health habits, energy levels, and proactive approach to maintaining physical wellness. The foundation that enables you to fully enjoy retirement.',
    images: [
      '/images/dimensions/physical-2.jpg',
      '/images/dimensions/physical-1.jpg',
      '/images/dimensions/physical-3.jpg',
    ],
  },
  {
    iconType: 'leaf',
    name: 'Lifestyle Design',
    tagline: 'Your daily fulfillment',
    description:
      'Daily routines, hobbies, interests, and readiness to design a fulfilling life structure. How prepared you are to fill your days with meaningful activities.',
    images: [
      '/images/dimensions/lifestyle-2.jpg',
      '/images/dimensions/lifestyle-1.jpg',
      '/images/dimensions/lifestyle-3.jpg',
    ],
  },
];

const FAN_DIRECTIONS = [
  { x: -20, y: -15, rotate: -5 },
  { x: 15, y: 0, rotate: 0 },
  { x: 30, y: 25, rotate: 8 },
] as const;

const AUTO_SCROLL_INTERVAL = 4000;
const RESUME_DELAY = 5000;

interface StackedImagesProps {
  images: string[];
  dimensionName: string;
  activeIndex: number;
  isHovered: boolean;
  isTransitioning: boolean;
}

const StackedImages = memo(
  ({ images, dimensionName, activeIndex, isHovered, isTransitioning }: StackedImagesProps) => {
    return (
      <>
        {images.map((image, imgIndex) => {
          const totalImages = images.length;
          const isTop = imgIndex === 0;
          const baseOffset = imgIndex * 12;
          const baseRotation = imgIndex * 3;
          const direction = FAN_DIRECTIONS[imgIndex] || { x: 0, y: 0, rotate: 0 };

          let translateX = baseOffset;
          let translateY = baseOffset;
          let rotation = baseRotation;
          let scale = 1;
          let opacity = 1;

          if (isTransitioning) {
            translateX = baseOffset + direction.x * 2;
            translateY = baseOffset + direction.y * 2;
            rotation = baseRotation + direction.rotate * 2;
            scale = 0.9;
            opacity = 0;
          } else if (isHovered) {
            translateX = baseOffset + direction.x;
            translateY = baseOffset + direction.y;
            rotation = baseRotation + direction.rotate;
            scale = 1.05;
          }

          return (
            <div
              key={`${activeIndex}-${imgIndex}`}
              className={cn(
                'absolute inset-0 overflow-hidden rounded-xl transition-all duration-500 ease-out',
                isTop ? 'shadow-2xl shadow-black/30' : 'shadow-lg shadow-black/15'
              )}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
                zIndex: totalImages - imgIndex,
                opacity,
              }}
            >
              {isTop && (
                <>
                  <div className="absolute left-1.5 top-1.5 z-10 size-4 border-l-2 border-t-2 border-primary/60 rounded-tl" />
                  <div className="absolute bottom-1.5 right-1.5 z-10 size-4 border-b-2 border-r-2 border-primary/60 rounded-br" />
                </>
              )}

              <Image
                src={image}
                alt={`${dimensionName} report preview ${imgIndex + 1}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 176px, (max-width: 1024px) 224px, 256px"
                loading="eager"
              />
            </div>
          );
        })}
      </>
    );
  }
);

StackedImages.displayName = 'StackedImages';

export function DimensionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isImagesHovered, setIsImagesHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevIndexRef = useRef(0);

  const pauseWithAutoResume = useCallback(() => {
    setIsPaused(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  }, []);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % dimensions.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + dimensions.length) % dimensions.length);
  }, []);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleNextClick = useCallback(() => {
    goToNext();
    pauseWithAutoResume();
  }, [goToNext, pauseWithAutoResume]);

  const handlePrevClick = useCallback(() => {
    goToPrev();
    pauseWithAutoResume();
  }, [goToPrev, pauseWithAutoResume]);

  const handleDotClick = useCallback(
    (index: number) => {
      goToIndex(index);
      pauseWithAutoResume();
    },
    [goToIndex, pauseWithAutoResume]
  );

  const handleMouseEnterSection = useCallback(() => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseLeaveSection = useCallback(() => {
    setIsPaused(false);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnterImages = useCallback(() => {
    setIsImagesHovered(true);
  }, []);

  const handleMouseLeaveImages = useCallback(() => {
    setIsImagesHovered(false);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  useEffect(() => {
    if (prevIndexRef.current !== activeIndex) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        prevIndexRef.current = activeIndex;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const activeDimension = useMemo(() => dimensions[activeIndex], [activeIndex]);

  return (
    <section
      className="relative py-12 md:py-0"
      id="dimensions"
      onMouseEnter={handleMouseEnterSection}
      onMouseLeave={handleMouseLeaveSection}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-linear-to-br from-secondary/80 via-background to-accent/30 p-6 md:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-1/4 -top-1/4 size-[400px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-1/4 -left-1/4 size-[350px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute right-1/3 top-1/2 size-[200px] rounded-full bg-primary/3 blur-2xl" />
          </div>

          <div className="relative mb-8 text-center md:mb-10">
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              The <span className="text-primary">5 Dimensions</span> We Measure
            </h2>
            <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
              Beyond finances, we assess five research-backed dimensions that determine how
              fulfilling your retirement will be.
            </p>
          </div>

          <div className="relative grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="relative">
              <div className="absolute -left-1.5 -top-1.5 size-6 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
              <div className="absolute -bottom-1.5 -right-1.5 size-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card/80 p-6 shadow-lg shadow-primary/5 backdrop-blur-sm md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-green-500/8 via-emerald-500/6 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />
                <div className="pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-emerald-500/8 blur-3xl" />
                <div
                  key={activeIndex}
                  className="relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <DimensionIcon type={activeDimension.iconType} />
                    </div>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {activeIndex + 1} of 5
                    </span>
                  </div>

                  <h3 className="mb-1.5 text-2xl font-semibold text-foreground md:text-3xl">
                    {activeDimension.name}
                  </h3>

                  <p className="mb-3 text-sm font-medium text-primary">{activeDimension.tagline}</p>

                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {activeDimension.description}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center gap-3">
                  <button
                    onClick={handlePrevClick}
                    className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95"
                    aria-label="Previous dimension"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <div className="flex gap-1.5">
                    {dimensions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-300',
                          activeIndex === index
                            ? 'w-6 bg-primary'
                            : 'w-1.5 bg-primary/30 hover:bg-primary/50'
                        )}
                        aria-label={`Go to ${dimensions[index].name}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextClick}
                    className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-105 active:scale-95"
                    aria-label="Next dimension"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center py-4 lg:py-0">
              <div
                className="relative h-64 w-44 md:h-80 md:w-56 lg:h-96 lg:w-64 cursor-pointer"
                onMouseEnter={handleMouseEnterImages}
                onMouseLeave={handleMouseLeaveImages}
              >
                <StackedImages
                  images={activeDimension.images}
                  dimensionName={activeDimension.name}
                  activeIndex={activeIndex}
                  isHovered={isImagesHovered}
                  isTransitioning={isTransitioning}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

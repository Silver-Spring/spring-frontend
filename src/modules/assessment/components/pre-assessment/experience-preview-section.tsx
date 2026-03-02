'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, SlidersHorizontal } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const carouselImages = [
  {
    id: 1,
    src: '/images/assessment-preview-1.png',
    alt: 'Assessment Preview 1',
  },
  {
    id: 2,
    src: '/images/assessment-preview-2.png',
    alt: 'Assessment Preview 2',
  },
];

export function ExperiencePreviewSection() {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
          Experience Preview
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
          See what the assessment looks like and what kind of report you'll receive.
        </p>
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'center',
            loop: true,
          }}
        >
          <CarouselContent>
            {carouselImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="p-1">
                  <Card className="bg-green-50/30 dark:bg-green-950/10 border-green-100 dark:border-green-900/30 overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <div className="relative w-full h-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain"
                          priority={image.id === 1}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-xs font-normal border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
        >
          <Info className="size-3" />
          No right or wrong answers
        </Badge>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-xs font-normal border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
        >
          <Info className="size-3" />
          Reflect on the last 6 months
        </Badge>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-xs font-normal border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
        >
          <SlidersHorizontal className="size-3" />
          Be honest with yourself
        </Badge>
      </div>
    </section>
  );
}

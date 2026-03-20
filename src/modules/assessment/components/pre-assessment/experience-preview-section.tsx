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
  {
    id: 3,
    src: '/images/assessment-preview-3.png',
    alt: 'Assessment Preview 3',
  },
];

export function ExperiencePreviewSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
          Experience Preview
        </h2>
        <p className="mx-auto max-w-2xl text-pretty text-muted-foreground px-4">
          See what the assessment looks like and what kind of report you'll receive.
        </p>
      </div>

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'center',
            loop: true,
            dragFree: false,
          }}
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {carouselImages.map((image) => (
              <CarouselItem key={image.id} className="pl-2 sm:pl-4">
                <div className="p-1">
                  <Card className="bg-primary/5 border-primary/10 overflow-hidden">
                    <CardContent className="flex items-center justify-center p-0">
                      <div className="relative w-full aspect-4/3 sm:aspect-video">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain p-2 sm:p-4"
                          priority={image.id === 1}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12" />
          <CarouselNext className="hidden sm:flex -right-4 lg:-right-12" />
        </Carousel>

        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {carouselImages.map((_, index) => (
            <div key={index} className="h-1.5 w-8 rounded-full bg-primary/25" aria-hidden="true" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-xs font-normal border-primary/20 text-primary"
        >
          <Info className="size-3" />
          No right or wrong answers
        </Badge>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-xs font-normal border-primary/20 text-primary"
        >
          <Info className="size-3" />
          Reflect on the last 6 months
        </Badge>
        <Badge
          variant="outline"
          className="gap-1.5 px-3 py-1.5 text-xs font-normal border-primary/20 text-primary"
        >
          <SlidersHorizontal className="size-3" />
          Be honest with yourself
        </Badge>
      </div>
    </section>
  );
}

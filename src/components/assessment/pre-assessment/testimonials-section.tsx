'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'This assessment helped me realize I was more ready than I thought - and showed me exactly where to focus next. The insights about my social connections were eye-opening.',
    author: 'Priya Sharma',
    role: '58, Financial Consultant, Mumbai',
    highlight: 'More ready than I thought',
  },
  {
    quote:
      'Finally, a retirement tool that looks beyond just the financial aspects. The 5-dimension breakdown gave me a complete picture I never had before.',
    author: 'Rajesh Mehta',
    role: '62, Former IT Director, Bangalore',
    highlight: 'Beyond just finances',
  },
  {
    quote:
      'I took this with my wife and it sparked the most meaningful conversation we have had about retirement in years. Highly recommend for couples.',
    author: 'Anita & Vikram K.',
    role: 'Both 56, Delhi',
    highlight: 'Sparked meaningful conversations',
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-7xl px-4">
      <div className="mb-16 flex flex-col items-center text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
          What people say
        </p>
        <h2 className="mb-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          <span className="text-primary">Trusted</span> by those preparing for retirement
        </h2>
      </div>

      {/* Featured testimonial */}
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl border-primary p-8 md:p-12 lg:p-16 border-2 bg-card shadow-xl">
          <Quote className="absolute top-8 left-8 size-12 text-primary/10 md:size-16" />

          <div className="relative">
            <p className="mb-2 text-sm font-medium text-primary">
              {testimonials[activeIndex].highlight}
            </p>
            <blockquote className="mb-8 text-xl font-medium leading-relaxed text-foreground md:text-2xl lg:text-3xl">
              {`"${testimonials[activeIndex].quote}"`}
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{testimonials[activeIndex].author}</p>
                <p className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-full"
                  onClick={prev}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-full"
                  onClick={next}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'size-2 rounded-full transition-all',
                activeIndex === index ? 'w-6 bg-primary' : 'bg-border hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

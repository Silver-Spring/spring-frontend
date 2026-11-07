'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useWorkshopEvent } from '../hooks/use-workshop-event';
import {
  buildWorkshopDescription,
  formatWorkshopDate,
  splitWorkshopTitle,
} from '../lib/workshop-format';
import { WorkshopLeaves } from './workshop-leaves';
import { WorkshopRegisterCard } from './workshop-register-card';

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen bg-secondary p-3 sm:p-6 lg:p-10">
    <div className="relative mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-3xl border border-[oklch(0.92_0.02_120)] bg-[oklch(0.975_0.012_85)] px-6 pb-6 pt-8 text-[oklch(0.24_0.05_155)] sm:px-10 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center lg:gap-14 lg:px-18 lg:py-14">
      <WorkshopLeaves />
      {children}
    </div>
  </main>
);

const Brand = () => (
  <span className="flex items-center gap-3 text-lg font-semibold text-primary">
    <Image src="/silverspring_logo.png" alt="" width={44} height={44} className="rounded-[10px]" />
    Silver Spring
  </span>
);

export const WorkshopPage = ({ slug }: { slug: string }) => {
  const { event, loading } = useWorkshopEvent(slug);

  if (loading) {
    return (
      <PageShell>
        <div className="relative z-10 flex flex-col gap-8">
          <Skeleton className="h-11 w-48" />
          <Skeleton className="h-40 w-full max-w-xl" />
          <Skeleton className="h-16 w-72" />
        </div>
        <Skeleton className="relative z-10 h-96 rounded-2xl" />
      </PageShell>
    );
  }

  if (!event) {
    return (
      <PageShell>
        <div className="relative z-10 flex flex-col gap-6">
          <Brand />
          <h1 className="text-4xl font-bold tracking-tight">We couldn&apos;t find this workshop</h1>
          <p className="max-w-md text-lg">
            The link may be incorrect, or the workshop is not open yet. Write to
            support@silverspring.in and we&apos;ll help.
          </p>
        </div>
      </PageShell>
    );
  }

  const { lead, highlight } = splitWorkshopTitle(event.title);
  const date = formatWorkshopDate(event.startsAt);
  const description = buildWorkshopDescription(event.subtitle, event.speakers[0]);
  const isOpen = event.registrationOpen;
  const pillLabel = isOpen
    ? 'Registrations open'
    : event.status === 'draft'
      ? 'Draft preview'
      : event.status === 'closed'
        ? 'Registrations closed'
        : 'Fully booked';

  return (
    <PageShell>
      <section className="relative z-10 flex flex-col gap-8 lg:min-h-[600px] lg:justify-between lg:gap-14">
        <Brand />
        <div className="flex flex-col gap-7">
          <h1 className="text-balance text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl xl:text-7xl">
            {lead}
            {highlight && (
              <span className="mt-1 block text-primary after:mt-5 after:block after:h-1.5 after:w-28 after:rounded-full after:bg-[oklch(0.62_0.12_130)]">
                {highlight}
              </span>
            )}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[oklch(0.32_0.04_155)] sm:text-xl">
            {description.host}
            {description.speaker && (
              <>
                , led by <strong className="font-semibold">{description.speaker}</strong>
              </>
            )}
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <div className="flex items-center gap-4">
            <span className="text-6xl font-bold leading-none tracking-tighter text-primary">
              {date.day}
            </span>
            <span className="flex flex-col gap-0.5 border-l-2 border-[oklch(0.62_0.12_130)] pl-4 text-lg font-semibold leading-6">
              {date.monthYear}
              <em className="font-normal not-italic text-[oklch(0.38_0.04_155)]">{date.weekday}</em>
            </span>
          </div>
          <span className="inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground">
            <i
              aria-hidden="true"
              className="size-2 rounded-full bg-[oklch(0.88_0.08_155)]"
            />
            {pillLabel}
          </span>
        </div>
      </section>
      <WorkshopRegisterCard slug={event.slug} status={event.status} registrationOpen={isOpen} />
    </PageShell>
  );
};

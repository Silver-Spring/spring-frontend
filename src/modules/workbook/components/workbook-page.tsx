'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { CouponInput } from '@/components/assessment/pre-assessment/coupon-input';
import { useUserStore } from '@/stores/use-user-store';
import {
  useWorkbookStatus,
  useCreateWorkbookOrder,
  useDownloadWorkbook,
} from '@/modules/workbook/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { Check, Download, FileText, LogIn, PartyPopper } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const WORKBOOK_PRICE_PAISE = 30000; // ₹300

const previewPages = [
  { src: '/workbook/page-1.png', label: 'Cover' },
  { src: '/workbook/page-2.png', label: 'Welcome' },
  { src: '/workbook/page-3.png', label: 'Introduction' },
  { src: '/workbook/page-4.png', label: 'Table of Contents' },
  { src: '/workbook/page-5.png', label: 'Contents (cont.)' },
];

const includes = [
  '15 guided exercises across 5 dimensions',
  'Psychological, Social, Family, Mental & Physical readiness',
  'Reflection prompts, self-assessments, and worksheets',
  'Final Action Blueprint — your personal 3–6 month plan',
  '49 pages, print-friendly PDF format',
];

export const WorkbookPage = () => {
  // Carousel state
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  // ponytail: useState lazy init avoids accessing ref.current during render (React Compiler rule)
  const [autoplayPlugin] = useState(() =>
    Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })
  );

  // Auth + purchase state
  const { user, _hasHydrated } = useUserStore();
  const { hasPurchased, loading: statusLoading, refetch } = useWorkbookStatus(!user);
  const { createWorkbookOrder, isProcessing } = useCreateWorkbookOrder();
  const { downloadWorkbook, isDownloading } = useDownloadWorkbook();

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    finalAmount: number;
    discountAmount: number;
  } | null>(null);

  // Whether the purchase just completed this session
  const [justPurchased, setJustPurchased] = useState(false);

  // Carousel sync
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Sticky bar trigger
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleThumbClick = useCallback(
    (i: number) => {
      api?.scrollTo(i);
    },
    [api]
  );

  const handleDownload = () => {
    downloadWorkbook();
  };

  const handleBuy = async () => {
    await createWorkbookOrder(
      async () => {
        await refetch();
        setJustPurchased(true);
      },
      (error) => {
        if (error instanceof Error && error.message !== 'PAYMENT_CANCELLED') {
          toast.error('Payment failed. Please try again.');
        }
      },
      appliedCoupon?.code,
      { name: user?.name ?? '', email: user?.email ?? '' }
    );
  };

  // Derived display price
  const displayPrice = appliedCoupon
    ? appliedCoupon.finalAmount === 0
      ? 'FREE'
      : `₹${(appliedCoupon.finalAmount / 100).toFixed(0)}`
    : '₹300';

  const originalPriceStruck = appliedCoupon != null;

  // CTA panel — three states
  const ctaPanel = () => {
    if (!_hasHydrated || (user && statusLoading)) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      );
    }

    if (hasPurchased || justPurchased) {
      return (
        <div className="space-y-3">
          {justPurchased && (
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3">
              <PartyPopper className="h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm font-medium text-primary">Thank you! Your workbook is ready.</p>
            </div>
          )}
          <Button
            size="lg"
            className="w-full gap-2 text-base font-semibold"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <Download className="h-4 w-4" />
            {isDownloading ? 'Preparing…' : 'Download Workbook'}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            You can download again any time from this page.
          </p>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">₹300</span>
            <span className="text-sm text-muted-foreground">one-time purchase</span>
          </div>
          <Button size="lg" className="w-full gap-2 text-base font-semibold" asChild>
            <Link href="/auth/login?redirect=/workbook">
              <LogIn className="h-4 w-4" />
              Sign in to purchase
            </Link>
          </Button>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            Instant PDF download · Print-friendly
          </div>
        </div>
      );
    }

    // Logged in, not purchased
    return (
      <div className="space-y-3">
        <div className="flex items-baseline gap-3">
          {originalPriceStruck && (
            <span className="text-lg text-muted-foreground line-through">₹300</span>
          )}
          <span className="text-3xl font-bold text-foreground">{displayPrice}</span>
          {!originalPriceStruck && (
            <span className="text-sm text-muted-foreground">one-time purchase</span>
          )}
          {appliedCoupon && appliedCoupon.discountAmount > 0 && (
            <span className="text-sm font-medium text-primary">
              Save ₹{(appliedCoupon.discountAmount / 100).toFixed(0)}
            </span>
          )}
        </div>

        <CouponInput
          originalAmount={WORKBOOK_PRICE_PAISE}
          onCouponApplied={(code, finalAmount, discountAmount) =>
            setAppliedCoupon({ code, finalAmount, discountAmount })
          }
          onCouponRemoved={() => setAppliedCoupon(null)}
        />

        <Button
          size="lg"
          className="w-full gap-2 text-base font-semibold"
          onClick={handleBuy}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>Processing…</>
          ) : appliedCoupon?.finalAmount === 0 ? (
            <>
              <Download className="h-4 w-4" />
              Get for Free
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Buy Now
            </>
          )}
        </Button>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          Instant PDF download · Print-friendly
        </div>
      </div>
    );
  };

  // Sticky bar CTA label
  const stickyLabel = hasPurchased || justPurchased ? 'Download Workbook' : 'Buy Now';
  const stickyAction = hasPurchased || justPurchased ? handleDownload : handleBuy;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-6 py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_480px]">
          {/* Left — image carousel */}
          <div className="space-y-3">
            <Carousel
              setApi={setApi}
              opts={{ loop: true }}
              plugins={[autoplayPlugin]}
              className="w-full"
            >
              <CarouselContent>
                {previewPages.map((p) => (
                  <CarouselItem key={p.src}>
                    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-border bg-muted lg:h-[460px]">
                      <Image
                        src={p.src}
                        alt={p.label}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="flex gap-2">
              {previewPages.map((p, i) => (
                <button
                  key={p.src}
                  onClick={() => handleThumbClick(i)}
                  aria-label={p.label}
                  className={`relative h-14 flex-1 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    current === i
                      ? 'border-primary opacity-100'
                      : 'border-border opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={p.src} alt={p.label} fill sizes="10vw" className="object-cover" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              {previewPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleThumbClick(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`cursor-pointer rounded-full transition-all duration-300 ${
                    current === i
                      ? 'h-1.5 w-5 bg-primary'
                      : 'h-1.5 w-1.5 bg-border hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — product details */}
          <div className="flex flex-col gap-6 lg:pt-2">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-xs tracking-widest uppercase font-medium">
                Digital Workbook · PDF
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground leading-[1.1] sm:text-5xl">
                Designing Your Next Phase
              </h1>
              <p className="text-sm text-muted-foreground">
                By <span className="font-semibold text-foreground">Rajat Mathur</span> — Founder,
                Silver Spring
              </p>
            </div>

            <p className="border-l-2 border-primary/30 pl-4 text-sm leading-relaxed text-muted-foreground">
              A guided workbook to help you reflect on the non-financial side of retirement —
              purpose, identity, relationships, health, and the life you want to build.
            </p>

            <Separator />

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                What&apos;s included
              </p>
              <ul className="space-y-2.5">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Price + CTA — observed for sticky bar */}
            <div ref={ctaRef}>{ctaPanel()}</div>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {/* ── From Thought to Clarity — editorial blurb ── */}
      <section className="bg-[oklch(0.97_0.005_155)]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            <div className="lg:pt-2">
              <div className="sticky top-8 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  About this workbook
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground leading-snug">
                  From Thought
                  <br />
                  to Clarity
                </h2>
                <div className="h-px w-8 bg-primary/40" />
              </div>
            </div>

            <div className="space-y-5 text-[15px] leading-[1.8] text-muted-foreground">
              <p className="text-lg font-medium text-foreground leading-relaxed">
                Most people think about retirement. Far fewer actually think it through.
              </p>
              <p>
                Ideas, hopes, concerns, and unanswered questions often remain floating around in our
                heads. But thoughts that stay in our heads are rarely fully processed.
              </p>
              <p>
                There is something powerful that happens when we write things down. Thoughts become
                clearer. Priorities emerge. Assumptions get challenged. What felt vague starts to
                take shape.
              </p>
              <p>This workbook is designed to help you do exactly that.</p>
              <p>
                Through a series of simple, practical, and reflective exercises, you will explore
                the non-financial side of retirement readiness — from purpose and identity to
                relationships, health, lifestyle, and curiosity.
              </p>
              <blockquote className="my-6 border-l-4 border-primary py-1 pl-5">
                <p className="text-lg font-medium not-italic leading-relaxed text-foreground">
                  Think of this workbook as a conversation with yourself about the next phase of
                  your life.
                </p>
              </blockquote>
              <p>
                Because retirement is too important to leave as a collection of unprocessed
                thoughts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Sticky buy bar ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-foreground">Designing Your Next Phase</p>
            <p className="text-xs text-muted-foreground">By Rajat Mathur · 49-page PDF</p>
          </div>
          <Button
            size="default"
            className="gap-2 font-semibold sm:ml-auto"
            onClick={stickyAction}
            disabled={isProcessing || isDownloading}
          >
            <Download className="h-4 w-4" />
            {stickyLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

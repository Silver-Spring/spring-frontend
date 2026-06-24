import { Button } from '@/components/ui/button';
import { ArrowLeft, Compass } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found · Silver Spring',
};

export default function NotFound() {
  return (
    <>
      <style>{`
        @keyframes ss-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes ss-rise {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ss-float { animation: none !important; }
          .ss-rise  { animation: none !important; }
        }
        .ss-float { animation: ss-float 6s ease-in-out infinite; }
        .ss-rise-1 { animation: ss-rise 0.6s ease both; }
        .ss-rise-2 { animation: ss-rise 0.6s 0.12s ease both; }
        .ss-rise-3 { animation: ss-rise 0.6s 0.24s ease both; }
        .ss-rise-4 { animation: ss-rise 0.6s 0.36s ease both; }
      `}</style>

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center">

        {/* Ghost 404 — giant background text */}
        <span
          aria-hidden="true"
          className="ss-float pointer-events-none absolute select-none font-black text-primary/[0.06] dark:text-primary/[0.08]"
          style={{ fontSize: 'clamp(10rem, 35vw, 28rem)', letterSpacing: '-0.06em', lineHeight: 1 }}
        >
          404
        </span>

        {/* Horizon SVG — sun rising over a line */}
        <div className="ss-rise-1 relative z-10 mb-8">
          <svg
            width="80"
            height="52"
            viewBox="0 0 80 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-primary"
          >
            {/* Horizon line */}
            <line x1="0" y1="44" x2="80" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
            {/* Sun arc (semicircle above horizon) */}
            <path
              d="M14 44 A26 26 0 0 1 66 44"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Sun rays */}
            <line x1="40" y1="4"  x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="56" y1="8"  x2="53" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="24" y1="8"  x2="27" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="65" y1="24" x2="59" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="15" y1="24" x2="21" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* Copy */}
        <div className="relative z-10 max-w-md space-y-3">
          <h1 className="ss-rise-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            This page has retired.
          </h1>
          <p className="ss-rise-3 text-base leading-relaxed text-muted-foreground">
            Looks like the page you&apos;re looking for has moved on to its next phase.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* CTAs */}
        <div className="ss-rise-4 relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-semibold">
            <Link href="/assessment">
              <Compass className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Footer brand line */}
        <p className="absolute bottom-8 text-xs text-muted-foreground/50 tracking-widest uppercase">
          Silver Spring
        </p>

      </div>
    </>
  );
}

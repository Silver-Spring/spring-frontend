import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Save, Lock } from "lucide-react"

export function CtaSection() {
  return (
    <section className="flex flex-col items-center gap-8 rounded-2xl bg-primary/5 px-6 py-12 text-center ring-1 ring-primary/10 sm:px-12">
      <div className="flex flex-col gap-3">
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-3xl">
          Ready to begin?
        </h2>
        <p className="mx-auto max-w-lg text-pretty text-muted-foreground">
          Take the first step toward a more confident, well-rounded retirement.
          Your results are private, and you can save and resume at any time.
        </p>
      </div>

      <Button
        size="lg"
        className="h-12 min-w-[260px] gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
      >
        Begin Your Assessment
        <ArrowRight className="size-4" />
      </Button>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" />
          Takes about 15 minutes
        </span>
        <span className="flex items-center gap-1.5">
          <Save className="size-3.5" />
          {"Save & resume anytime"}
        </span>
        <span className="flex items-center gap-1.5">
          <Lock className="size-3.5" />
          {"Private & secure"}
        </span>
      </div>

      <blockquote className="mx-auto max-w-md border-l-2 border-primary/30 pl-4 text-left text-sm italic text-muted-foreground">
        {"\"This assessment helped me realize I was more ready than I thought — and showed me exactly where to focus next.\""}
        <footer className="mt-2 text-xs font-medium not-italic">
          — Priya S., 58, Mumbai
        </footer>
      </blockquote>
    </section>
  )
}

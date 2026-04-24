import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ArrowRight, Clock, Lock, Save, Trash2 } from 'lucide-react';

interface CtaSectionProps {
  onCtaClick: () => void;
  isLoading?: boolean;
  showFeatures?: boolean;
  isInternal?: boolean;
  isInProgress?: boolean;
  onDeleteClick?: () => void;
  deleteLoading?: boolean;
}

export function CtaSection({
  onCtaClick,
  isLoading = false,
  showFeatures = false,
  isInternal = false,
  isInProgress = false,
  onDeleteClick,
  deleteLoading = false,
}: CtaSectionProps) {
  const showDeleteButton = isInternal && isInProgress && onDeleteClick;
  const showInternalBadge = isInternal;

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-2xl border border-border bg-card/50 p-8 text-center shadow-sm">
        {showInternalBadge && (
          <div className="mb-6 flex items-center justify-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/15">
              Internal User
            </Badge>
          </div>
        )}

        <h2 className="mb-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          Welcome Back!
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-pretty text-muted-foreground">
          Continue where you left off. Your progress has been saved and you can complete your
          assessment at your own pace.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-12 min-w-[240px] gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
            onClick={onCtaClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="size-4" />
                Processing...
              </>
            ) : (
              <>
                Resume Assessment
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>

          {showDeleteButton && onDeleteClick && (
            <Button
              size="lg"
              variant="destructive"
              className="h-12 min-w-[240px] gap-2 rounded-xl bg-red-700 text-base font-semibold shadow-md transition-all hover:bg-red-700/90 hover:shadow-lg"
              onClick={onDeleteClick}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <>
                  <Spinner className="size-4" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4" />
                  Delete Assessment
                </>
              )}
            </Button>
          )}
        </div>

        {showFeatures && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" />
              15 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Save className="size-3.5 text-primary" />
              Save and resume
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="size-3.5 text-primary" />
              Private and secure
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

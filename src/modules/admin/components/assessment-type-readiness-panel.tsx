'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  buildAssessmentHref,
  useActivateAssessmentType,
  useAdminAssessmentTypes,
  useAssessmentTypeReadiness,
  useDeactivateAssessmentType,
  type AssessmentTypeReadinessCheckKey,
} from '@/modules/admin/hooks';
import {
  getReadinessFixViewLabel,
  isProtectedAssessmentType,
  READINESS_CHECK_FIX_VIEWS,
} from '@/modules/admin/lib/assessment-type-lifecycle';
import { CheckCircle2, CircleAlert, RefreshCw, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const getCheckFixHref = (checkKey: string, assessmentType: string) => {
  const view = READINESS_CHECK_FIX_VIEWS[checkKey as AssessmentTypeReadinessCheckKey];
  if (!view) return null;
  return buildAssessmentHref(view, assessmentType);
};

type AssessmentTypeReadinessSummaryProps = {
  assessmentType: string;
  isActive: boolean;
};

const DraftReadinessSummary = ({ assessmentType }: { assessmentType: string }) => {
  const { ready, checks, loading, error } = useAssessmentTypeReadiness(assessmentType);

  if (loading) {
    return (
      <p className="text-xs text-muted-foreground flex items-center gap-2 mt-3">
        <Spinner className="size-3" />
        Checking readiness...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-xs text-destructive mt-3" role="alert">
        Could not load readiness status
      </p>
    );
  }

  if (checks.length === 0) {
    return <p className="text-xs text-muted-foreground mt-3">No readiness checks available</p>;
  }

  const passedCount = checks.filter((check) => check.passed).length;
  const firstFailed = checks.find((check) => !check.passed);

  if (ready) {
    return (
      <p className="text-xs mt-3 flex items-center gap-1.5 text-primary font-medium">
        <CheckCircle2 className="size-3.5 shrink-0" />
        Ready to publish — open Overview to go live
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-1">
      <p className="text-xs text-muted-foreground">
        Readiness: {passedCount}/{checks.length} checks passed
      </p>
      {firstFailed && <p className="text-xs text-destructive line-clamp-2">{firstFailed.detail}</p>}
    </div>
  );
};

export const AssessmentTypeReadinessSummary = ({
  assessmentType,
  isActive,
}: AssessmentTypeReadinessSummaryProps) => {
  if (isActive) {
    return (
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
        Published and visible to users
      </p>
    );
  }

  return <DraftReadinessSummary assessmentType={assessmentType} />;
};

type AssessmentTypeReadinessPanelProps = {
  assessmentType: string;
};

export const AssessmentTypeReadinessPanel = ({
  assessmentType,
}: AssessmentTypeReadinessPanelProps) => {
  const { assessmentTypes } = useAdminAssessmentTypes();
  const { ready, checks, sectionCount, requiredSectionBands, loading, error, refetch } =
    useAssessmentTypeReadiness(assessmentType);
  const { activateAssessmentType, loading: activating } = useActivateAssessmentType();
  const { deactivateAssessmentType, loading: deactivating } = useDeactivateAssessmentType();

  const type = assessmentTypes.find((t) => t.code === assessmentType);
  const isProtected = isProtectedAssessmentType(assessmentType);

  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPublishError(null);
  }, [assessmentType]);

  const handleRefreshReadiness = async () => {
    setPublishError(null);
    await refetch();
  };

  const handlePublish = async () => {
    setPublishError(null);
    const result = await activateAssessmentType(assessmentType);
    setPublishDialogOpen(false);

    if (result && !result.success) {
      setPublishError(
        result.message ||
          'Assessment type is not ready to activate. Review the failed checks below.'
      );
    }
  };

  const handleConfirmDeactivate = async () => {
    await deactivateAssessmentType(assessmentType);
    setDeactivateDialogOpen(false);
  };

  const failedChecks = checks.filter((check) => !check.passed);

  return (
    <>
      <Card className="p-6 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">Publish checklist</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All checks must pass before publishing.
              {sectionCount != null && requiredSectionBands != null && (
                <>
                  {' '}
                  Needs {sectionCount} sections, {requiredSectionBands} section bands, 5 overall
                  bands.
                </>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRefreshReadiness}
              disabled={loading}
              aria-label="Refresh readiness checklist"
            >
              <RefreshCw className={cn('size-4 mr-1.5', loading && 'animate-spin')} />
              Refresh
            </Button>
            {type && (
              <Badge variant={type.isActive ? 'default' : 'secondary'}>
                {type.isActive ? 'Live' : 'Draft'}
              </Badge>
            )}
          </div>
        </div>

        {type?.isActive && (
          <Alert>
            <CheckCircle2 />
            <AlertTitle>Published</AlertTitle>
            <AlertDescription>
              This assessment type is visible to users in{' '}
              <span className="font-medium">availableAssessments</span>. Existing results are
              preserved if you deactivate it later.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Could not load readiness</AlertTitle>
            <AlertDescription className="flex flex-wrap items-center gap-3">
              <span>{error.message || 'Something went wrong while loading the checklist.'}</span>
              <Button type="button" variant="outline" size="sm" onClick={handleRefreshReadiness}>
                Try again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {loading && checks.length === 0 ? (
          <div className="flex items-center gap-2 text-muted-foreground py-4">
            <Spinner className="size-4" />
            Loading readiness checklist...
          </div>
        ) : (
          <ul className="space-y-3" aria-label="Readiness checklist">
            {checks.map((check) => {
              const fixHref = !check.passed ? getCheckFixHref(check.key, assessmentType) : null;
              const fixLabel = getReadinessFixViewLabel(check.key);

              return (
                <li
                  key={check.key}
                  className={cn(
                    'flex gap-3 rounded-lg border p-3',
                    check.passed ? 'border-primary/20 bg-primary/5' : 'border-destructive/20'
                  )}
                >
                  {check.passed ? (
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  ) : (
                    <XCircle className="size-5 text-destructive shrink-0 mt-0.5" aria-hidden />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{check.label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{check.detail}</p>
                    {fixHref && fixLabel && (
                      <Button variant="link" className="h-auto p-0 mt-2 text-sm" asChild>
                        <Link href={fixHref}>Fix in {fixLabel}</Link>
                      </Button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {!type?.isActive && !loading && !error && (
          <div className="rounded-lg border border-dashed p-4 space-y-3">
            <div className="flex items-start gap-2">
              <CircleAlert className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                {ready
                  ? 'All checks passed. You can publish this assessment type.'
                  : failedChecks.length > 0
                    ? `Complete ${failedChecks.length} failed check${failedChecks.length === 1 ? '' : 's'} before publishing.`
                    : 'Complete the failed checks above before publishing.'}
              </p>
            </div>

            {publishError && (
              <Alert variant="destructive">
                <CircleAlert />
                <AlertTitle>Publish failed</AlertTitle>
                <AlertDescription>{publishError}</AlertDescription>
              </Alert>
            )}

            <Button onClick={() => setPublishDialogOpen(true)} disabled={!ready || activating}>
              {activating ? 'Publishing...' : 'Publish assessment type'}
            </Button>
          </div>
        )}

        {type?.isActive && !isProtected && (
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              onClick={() => setDeactivateDialogOpen(true)}
              disabled={deactivating}
            >
              {deactivating ? 'Deactivating...' : 'Deactivate (hide from users)'}
            </Button>
          </div>
        )}

        {type?.isActive && isProtected && (
          <p className="text-xs text-muted-foreground border-t pt-4">
            {assessmentType.toUpperCase()} is a protected baseline type and cannot be deactivated.
          </p>
        )}
      </Card>

      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Publish {type?.name ?? assessmentType.toUpperCase()}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This makes the assessment type visible in availableAssessments. Users can purchase and
              start it immediately. You can deactivate it later to hide it from new users.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={activating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={activating}
              onClick={(event) => {
                event.preventDefault();
                void handlePublish();
              }}
            >
              {activating ? 'Publishing...' : 'Publish'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deactivate {type?.name ?? assessmentType.toUpperCase()}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This hides the assessment type from users. New purchases and starts will not be
              available until you publish again. Existing completed results are preserved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deactivating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={deactivating}
              onClick={(event) => {
                event.preventDefault();
                void handleConfirmDeactivate();
              }}
            >
              {deactivating ? 'Deactivating...' : 'Deactivate'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

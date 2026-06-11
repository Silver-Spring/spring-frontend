'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { AssessmentTypeCode, formatPriceFromPaise } from '@/modules/assessment/constants';
import {
  buildAssessmentHref,
  useAdminAssessmentTypes,
  useRecomputeAutoStageRanges,
  useUpdateAssessmentType,
} from '@/modules/admin/hooks';
import { useGetSections } from '@/modules/assessment/hooks';
import Link from 'next/link';
import { CircleAlert, Info } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

type AssessmentTypePanelProps = {
  assessmentType: AssessmentTypeCode;
};

export const AssessmentTypeSettingsPanel = ({ assessmentType }: AssessmentTypePanelProps) => {
  const { assessmentTypes, loading, refetch } = useAdminAssessmentTypes();
  const { updateAssessmentType, loading: updating } = useUpdateAssessmentType();
  const { sections } = useGetSections(assessmentType);

  const type = assessmentTypes.find((t) => t.code === assessmentType);

  const activeSectionCount = useMemo(
    () => sections.filter((section) => section.isActive).length,
    [sections]
  );

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    priceAmount: '',
    sectionCount: '',
    responseScaleMin: '',
    responseScaleMax: '',
    profileQuestionsCount: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showRecomputePrompt, setShowRecomputePrompt] = useState(false);
  const { recomputeAutoStageRanges, loading: recomputingRanges } = useRecomputeAutoStageRanges();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsEditing(false);
    setShowRecomputePrompt(false);
  }, [assessmentType]);

  const startEdit = () => {
    if (!type) return;
    setEditForm({
      name: type.name,
      description: type.description || '',
      priceAmount: String(type.priceAmount / 100),
      sectionCount: String(type.sectionCount),
      responseScaleMin: String(type.responseScaleMin ?? 1),
      responseScaleMax: String(type.responseScaleMax ?? 10),
      profileQuestionsCount: String(type.profileQuestionsCount ?? 0),
    });
    setIsEditing(true);
  };

  const parsedSectionCount = parseInt(editForm.sectionCount, 10);
  const showSectionCountWarning =
    isEditing &&
    !type?.isActive &&
    Number.isFinite(parsedSectionCount) &&
    activeSectionCount > parsedSectionCount;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;

    const nextSectionCount = parseInt(editForm.sectionCount, 10);
    if (!type.isActive && Number.isFinite(nextSectionCount)) {
      if (nextSectionCount < 1 || nextSectionCount > 10) {
        toast.error('Section count must be between 1 and 10');
        return;
      }
    }

    const previousSectionCount = type.sectionCount;

    const parsedScaleMin = parseInt(editForm.responseScaleMin, 10);
    const parsedScaleMax = parseInt(editForm.responseScaleMax, 10);
    const parsedProfileCount = parseInt(editForm.profileQuestionsCount, 10);

    const result = await updateAssessmentType({
      code: type.code,
      name: editForm.name.trim(),
      description: editForm.description.trim() || undefined,
      priceAmount: Math.round(parseFloat(editForm.priceAmount) * 100),
      ...(!type.isActive && Number.isFinite(nextSectionCount)
        ? { sectionCount: nextSectionCount }
        : {}),
      ...(Number.isFinite(parsedScaleMin) ? { responseScaleMin: parsedScaleMin } : {}),
      ...(Number.isFinite(parsedScaleMax) ? { responseScaleMax: parsedScaleMax } : {}),
      ...(Number.isFinite(parsedProfileCount) ? { profileQuestionsCount: parsedProfileCount } : {}),
    });

    if (result?.success) {
      setIsEditing(false);
      refetch();
      if (
        !type.isActive &&
        Number.isFinite(nextSectionCount) &&
        nextSectionCount !== previousSectionCount
      ) {
        setShowRecomputePrompt(true);
      }
    }
  };

  const handleRecomputeStageRanges = async () => {
    await recomputeAutoStageRanges(assessmentType);
    setShowRecomputePrompt(false);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Spinner className="size-4" />
          Loading type settings...
        </div>
      </Card>
    );
  }

  if (!type) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Assessment type not found.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-end gap-4">
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={startEdit}>
            Edit
          </Button>
        )}
      </div>

      {showRecomputePrompt && (
        <Alert>
          <CircleAlert />
          <AlertTitle>Update stage score ranges?</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>
              Section count changed. Overall score bounds were recalculated, but stage ranges were
              not. Reset ranges to match the new bounds, or edit them manually in Scoring.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleRecomputeStageRanges}
                disabled={recomputingRanges}
              >
                {recomputingRanges ? 'Resetting...' : 'Reset to auto ranges'}
              </Button>
              <Button type="button" size="sm" variant="outline" asChild>
                <Link href={buildAssessmentHref('scoring', assessmentType)}>Open Score bands</Link>
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setShowRecomputePrompt(false)}
              >
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {type.isActive && (
        <Alert>
          <Info />
          <AlertTitle>Live type</AlertTitle>
          <AlertDescription>
            Section and scoring configuration cannot be changed while this type is published.
            Deactivate this type from Overview to edit structure.
          </AlertDescription>
        </Alert>
      )}

      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {showSectionCountWarning && (
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>Active sections exceed new target</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>
                  This type has {activeSectionCount} active section
                  {activeSectionCount === 1 ? '' : 's'}. Lowering the target to {parsedSectionCount}{' '}
                  will fail readiness until you deactivate or remove{' '}
                  {activeSectionCount - parsedSectionCount} section
                  {activeSectionCount - parsedSectionCount === 1 ? '' : 's'}.
                </p>
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link href={buildAssessmentHref('content', assessmentType)}>Manage sections</Link>
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="settings-name">Name</Label>
              <Input
                id="settings-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="settings-price">Price (₹)</Label>
              <Input
                id="settings-price"
                type="number"
                min={1}
                step="0.01"
                value={editForm.priceAmount}
                onChange={(e) => setEditForm({ ...editForm, priceAmount: e.target.value })}
                className="mt-2"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="settings-desc">Description</Label>
              <Textarea
                id="settings-desc"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="mt-2"
              />
            </div>
            {!type.isActive && (
              <div>
                <Label htmlFor="settings-section-count">Target section count</Label>
                <Input
                  id="settings-section-count"
                  type="number"
                  min={1}
                  max={10}
                  value={editForm.sectionCount}
                  onChange={(e) => setEditForm({ ...editForm, sectionCount: e.target.value })}
                  className="mt-2"
                  aria-describedby="settings-section-count-help"
                />
                <p id="settings-section-count-help" className="text-xs text-muted-foreground mt-1">
                  Readiness requires exactly this many active sections (max 10). Preset seed covers
                  only the first 5.
                </p>
              </div>
            )}
          </div>

          {!type.isActive && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="settings-scale-min">Answer scale min</Label>
                <Input
                  id="settings-scale-min"
                  type="number"
                  min={1}
                  value={editForm.responseScaleMin}
                  onChange={(e) => setEditForm({ ...editForm, responseScaleMin: e.target.value })}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Default: 1</p>
              </div>
              <div>
                <Label htmlFor="settings-scale-max">Answer scale max</Label>
                <Input
                  id="settings-scale-max"
                  type="number"
                  min={2}
                  value={editForm.responseScaleMax}
                  onChange={(e) => setEditForm({ ...editForm, responseScaleMax: e.target.value })}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Default: 10</p>
              </div>
              <div>
                <Label htmlFor="settings-profile-count">Profile questions</Label>
                <Input
                  id="settings-profile-count"
                  type="number"
                  min={0}
                  value={editForm.profileQuestionsCount}
                  onChange={(e) =>
                    setEditForm({ ...editForm, profileQuestionsCount: e.target.value })
                  }
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Unscored questions shown first</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={updating}>
              Save Changes
            </Button>
            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Code</dt>
            <dd className="font-medium mt-0.5">{type.code}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Status</dt>
            <dd className="mt-0.5 flex flex-wrap gap-1">
              <Badge variant={type.isActive ? 'default' : 'secondary'}>
                {type.isActive ? 'Live' : 'Draft'}
              </Badge>
              {type.isDyadic && <Badge variant="secondary">Couples</Badge>}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Price</dt>
            <dd className="font-medium mt-0.5">{formatPriceFromPaise(type.priceAmount)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Structure</dt>
            <dd className="font-medium mt-0.5">
              {type.sectionCount} sections × {type.questionsPerSection} questions
              {(type.profileQuestionsCount ?? 0) > 0 && (
                <span className="text-muted-foreground font-normal">
                  {' '}
                  + {type.profileQuestionsCount} profile
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Scoring</dt>
            <dd className="font-medium mt-0.5">
              {type.isDyadic
                ? 'Dyadic (domain averages + couple total)'
                : `${type.scoringFormula} (${type.minScore}–${type.maxScore})`}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Answer scale</dt>
            <dd className="font-medium mt-0.5">
              {type.responseScaleMin ?? 1}–{type.responseScaleMax ?? 10}
            </dd>
          </div>
          {type.description && (
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Description</dt>
              <dd className="mt-0.5">{type.description}</dd>
            </div>
          )}
        </dl>
      )}
    </Card>
  );
};

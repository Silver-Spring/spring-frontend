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
    displayOrder: '',
    sectionCount: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
  }, [assessmentType]);

  const startEdit = () => {
    if (!type) return;
    setEditForm({
      name: type.name,
      description: type.description || '',
      priceAmount: String(type.priceAmount),
      displayOrder: String(type.displayOrder),
      sectionCount: String(type.sectionCount),
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
      if (nextSectionCount < 1 || nextSectionCount > 5) {
        toast.error('Section count must be between 1 and 5');
        return;
      }
    }

    const result = await updateAssessmentType({
      code: type.code,
      name: editForm.name.trim(),
      description: editForm.description.trim() || undefined,
      priceAmount: parseInt(editForm.priceAmount, 10),
      displayOrder: parseInt(editForm.displayOrder, 10),
      ...(!type.isActive && Number.isFinite(nextSectionCount)
        ? { sectionCount: nextSectionCount }
        : {}),
    });

    if (result?.success) {
      setIsEditing(false);
      refetch();
    }
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">Type Configuration</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Pricing and display settings for {type.code.toUpperCase()}. Publish or deactivate from
            Overview.
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={startEdit}>
            Edit
          </Button>
        )}
      </div>

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
                  <Link href={buildAssessmentHref('content', assessmentType)}>
                    Manage sections in Content
                  </Link>
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
              <Label htmlFor="settings-price">Price (paise)</Label>
              <Input
                id="settings-price"
                type="number"
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
            <div>
              <Label htmlFor="settings-order">Display Order</Label>
              <Input
                id="settings-order"
                type="number"
                value={editForm.displayOrder}
                onChange={(e) => setEditForm({ ...editForm, displayOrder: e.target.value })}
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
                  max={5}
                  value={editForm.sectionCount}
                  onChange={(e) => setEditForm({ ...editForm, sectionCount: e.target.value })}
                  className="mt-2"
                  aria-describedby="settings-section-count-help"
                />
                <p id="settings-section-count-help" className="text-xs text-muted-foreground mt-1">
                  Readiness requires exactly this many active sections. Does not auto-add or remove
                  rows — use Content to match.
                </p>
              </div>
            )}
          </div>
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
            <dd className="mt-0.5">
              <Badge variant={type.isActive ? 'default' : 'secondary'}>
                {type.isActive ? 'Live' : 'Draft'}
              </Badge>
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
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Scoring</dt>
            <dd className="font-medium mt-0.5">
              {type.scoringFormula} ({type.minScore}–{type.maxScore})
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

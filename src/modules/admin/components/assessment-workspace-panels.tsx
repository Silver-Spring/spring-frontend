'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import {
  AssessmentTypeCode,
  formatPriceFromPaise,
  TEMPLATE_CONTENT_KEYS,
  type TemplateContentKey,
} from '@/modules/assessment/constants';
import {
  useAdminAssessmentTypes,
  useResetTemplateContent,
  useUpdateAssessmentType,
  useUpdateTemplateContent,
} from '@/modules/admin/hooks';
import { useEffect, useState } from 'react';

type AssessmentTypePanelProps = {
  assessmentType: AssessmentTypeCode;
};

export const TemplateContentEditor = ({ assessmentType }: AssessmentTypePanelProps) => {
  const { updateTemplateContent, loading: updatingTemplate } = useUpdateTemplateContent();
  const { resetTemplateContent, loading: resettingTemplate } = useResetTemplateContent();
  const [templateKey, setTemplateKey] = useState<TemplateContentKey>('report_title');
  const [templateValue, setTemplateValue] = useState('');

  const handleUpdateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateTemplateContent({
      assessmentType,
      contentKey: templateKey,
      contentValue: templateValue,
    });
    setTemplateValue('');
  };

  const handleResetTemplate = async () => {
    await resetTemplateContent(assessmentType, templateKey);
  };

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div>
        <h3 className="font-semibold">Report Template</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Override PDF report copy for {assessmentType.toUpperCase()}.
        </p>
      </div>
      <form onSubmit={handleUpdateTemplate} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="template-key">Content Key</Label>
            <Select
              value={templateKey}
              onValueChange={(value) => setTemplateKey(value as TemplateContentKey)}
            >
              <SelectTrigger id="template-key" className="mt-2 w-full">
                <SelectValue placeholder="Select content key" />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_CONTENT_KEYS.map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="template-value">Content Value</Label>
            <Textarea
              id="template-value"
              value={templateValue}
              onChange={(e) => setTemplateValue(e.target.value)}
              placeholder="Enter template content value"
              className="mt-2"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={updatingTemplate}>
            {updatingTemplate ? 'Updating...' : 'Update Template'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={resettingTemplate}
            onClick={handleResetTemplate}
          >
            Reset to Default
          </Button>
        </div>
      </form>
    </Card>
  );
};

export const AssessmentTypeSettingsPanel = ({ assessmentType }: AssessmentTypePanelProps) => {
  const { assessmentTypes, loading, refetch } = useAdminAssessmentTypes();
  const { updateAssessmentType, loading: updating } = useUpdateAssessmentType();

  const type = assessmentTypes.find((t) => t.code === assessmentType);

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    priceAmount: '',
    displayOrder: '',
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
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) return;
    await updateAssessmentType({
      code: type.code,
      name: editForm.name.trim(),
      description: editForm.description.trim() || undefined,
      priceAmount: parseInt(editForm.priceAmount, 10),
      displayOrder: parseInt(editForm.displayOrder, 10),
    });
    setIsEditing(false);
    refetch();
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

      {isEditing ? (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
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

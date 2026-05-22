'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { NarrativeTextarea } from '@/components/ui/narrative-textarea';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useReportPreviewRefresh } from '@/modules/admin/components/report-preview-context';
import { ReportFieldHint } from '@/modules/admin/components/report-field-hint';
import type { ReportFieldHintId } from '@/modules/admin/lib/report-field-hints';
import {
  AssessmentTypeCode,
  isTemplateContentArrayKey,
  TEMPLATE_CONTENT_KEYS,
  TEMPLATE_CONTENT_LABELS,
  type TemplateContentKey,
} from '@/modules/assessment/constants';
import {
  useAdminAssessmentTypes,
  useAssessmentTemplateContents,
  useResetTemplateContent,
  useUpdateTemplateContent,
} from '@/modules/admin/hooks';
import { narrativeArrayToText, narrativeTextToArray } from '@/modules/admin/lib/narrative-content';
import { CircleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

type TemplateContentEditorProps = {
  assessmentType: AssessmentTypeCode;
};

const TEMPLATE_SECTIONS: {
  title: string;
  description?: string;
  keys: readonly TemplateContentKey[];
  columns: 1 | 2;
}[] = [
  {
    title: 'Header & report name',
    keys: ['header_title', 'report_title'],
    columns: 1,
  },
  {
    title: 'About page',
    keys: ['about_intro', 'about_report_includes', 'about_closing', 'about_disclaimer'],
    columns: 1,
  },
];

const isNarrativeTemplateKey = (key: TemplateContentKey): boolean =>
  isTemplateContentArrayKey(key) || key === 'about_closing';

const toEditorValue = (key: TemplateContentKey, raw: unknown): string => {
  if (isTemplateContentArrayKey(key)) {
    return narrativeArrayToText(raw);
  }

  if (raw == null) {
    return '';
  }

  return typeof raw === 'string' ? raw : String(raw);
};

const toContentValue = (key: TemplateContentKey, text: string): string | string[] => {
  if (isTemplateContentArrayKey(key)) {
    return narrativeTextToArray(text);
  }

  return text;
};

type TemplateContentFieldProps = {
  fieldKey: TemplateContentKey;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  resetting: boolean;
  isSaving: boolean;
  isResetting: boolean;
};

const TEMPLATE_FIELD_HINTS: Partial<Record<TemplateContentKey, ReportFieldHintId>> = {
  report_title: 'template.report_title',
  header_title: 'template.header_title',
  cover_title: 'template.cover_title',
  cover_subtitle: 'template.cover_subtitle',
  about_intro: 'template.about_intro',
  about_report_includes: 'template.about_report_includes',
  about_closing: 'template.about_closing',
  about_disclaimer: 'template.about_disclaimer',
};

const TemplateContentField = ({
  fieldKey,
  value,
  onChange,
  onSave,
  onReset,
  saving,
  resetting,
  isSaving,
  isResetting,
}: TemplateContentFieldProps) => {
  const isNarrative = isNarrativeTemplateKey(fieldKey);
  const isCoverTitle = fieldKey === 'cover_title';
  const fieldHelper: Partial<Record<TemplateContentKey, string>> = {
    header_title: 'Plain text, shown uppercase in the top-right header bar on inner pages.',
    report_title: 'Plain text — fills “About the …” on About (1) and the PDF document title.',
    cover_subtitle: 'Plain text prefix; participant name is appended at render time.',
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1">
          <Label htmlFor={`template-${fieldKey}`} className="text-sm font-medium leading-none">
            {TEMPLATE_CONTENT_LABELS[fieldKey]}
          </Label>
          {TEMPLATE_FIELD_HINTS[fieldKey] ? (
            <ReportFieldHint hintId={TEMPLATE_FIELD_HINTS[fieldKey]!} />
          ) : null}
        </div>
        <div className="flex shrink-0 gap-1.5">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-8 px-2.5"
            onClick={onReset}
            disabled={resetting || saving || isResetting}
          >
            {isResetting ? 'Resetting...' : 'Reset'}
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-8 px-2.5"
            onClick={onSave}
            disabled={saving || resetting || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      {isNarrative ? (
        <NarrativeTextarea
          id={`template-${fieldKey}`}
          value={value}
          onChange={onChange}
          rows={5}
          showParagraphCount
          showFormatting
        />
      ) : (
        <div className="space-y-2">
          <Textarea
            id={`template-${fieldKey}`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            rows={isCoverTitle ? 3 : 2}
            className="min-h-0 resize-y text-sm"
            placeholder={isCoverTitle ? 'Use <br> for line breaks' : 'Enter template text'}
          />
          {isCoverTitle ? (
            <p className="text-xs text-muted-foreground">
              Cover title is not paragraph-normalized. Use <code>&lt;br&gt;</code> for line breaks.
            </p>
          ) : fieldHelper[fieldKey] ? (
            <p className="text-xs text-muted-foreground">{fieldHelper[fieldKey]}</p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export const TemplateContentEditor = ({ assessmentType }: TemplateContentEditorProps) => {
  const { assessmentTypes } = useAdminAssessmentTypes();
  const typeInfo = assessmentTypes.find((type) => type.code === assessmentType);
  const isDraft = typeInfo ? !typeInfo.isActive : false;

  const { contentByKey, loading, refetch } = useAssessmentTemplateContents(assessmentType);
  const { updateTemplateContent, loading: saving } = useUpdateTemplateContent();
  const { resetTemplateContent, loading: resetting } = useResetTemplateContent();

  const [drafts, setDrafts] = useState<Record<TemplateContentKey, string>>(
    () =>
      Object.fromEntries(TEMPLATE_CONTENT_KEYS.map((key) => [key, ''])) as Record<
        TemplateContentKey,
        string
      >
  );
  const [savingKey, setSavingKey] = useState<TemplateContentKey | null>(null);
  const [resettingKey, setResettingKey] = useState<TemplateContentKey | null>(null);
  const { bumpPreview } = useReportPreviewRefresh();

  useEffect(() => {
    const next = Object.fromEntries(
      TEMPLATE_CONTENT_KEYS.map((key) => [key, toEditorValue(key, contentByKey[key])])
    ) as Record<TemplateContentKey, string>;
    setDrafts(next);
  }, [contentByKey]);

  const handleSave = async (key: TemplateContentKey) => {
    setSavingKey(key);
    await updateTemplateContent({
      assessmentType,
      contentKey: key,
      contentValue: toContentValue(key, drafts[key]),
    });
    setSavingKey(null);
    await refetch();
    bumpPreview();
  };

  const handleReset = async (key: TemplateContentKey) => {
    setResettingKey(key);
    await resetTemplateContent(assessmentType, key);
    setResettingKey(null);
    await refetch();
    bumpPreview();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
          <Spinner className="size-4" />
          Loading...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6">
        {!isDraft ? (
          <Alert className="py-3">
            <CircleAlert className="size-4" />
            <AlertTitle className="text-sm">Live type</AlertTitle>
            <AlertDescription className="text-sm">
              Edits apply on the next PDF download. Use Preview report in the header after saving.
            </AlertDescription>
          </Alert>
        ) : null}

        {TEMPLATE_SECTIONS.map((section, sectionIndex) => (
          <div key={section.title}>
            {sectionIndex > 0 ? <Separator className="mb-6" /> : null}
            <div className="mb-4 flex flex-col gap-1">
              <h3 className="text-sm font-medium">{section.title}</h3>
              {section.description ? (
                <p className="text-xs text-muted-foreground">{section.description}</p>
              ) : null}
            </div>
            <div
              className={cn(
                'gap-x-6 gap-y-5',
                section.columns === 2 ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'
              )}
            >
              {section.keys.map((key) => (
                <TemplateContentField
                  key={key}
                  fieldKey={key}
                  value={drafts[key]}
                  onChange={(value) => setDrafts((current) => ({ ...current, [key]: value }))}
                  onSave={() => handleSave(key)}
                  onReset={() => handleReset(key)}
                  saving={saving}
                  resetting={resetting}
                  isSaving={savingKey === key}
                  isResetting={resettingKey === key}
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HexColorPicker } from '@/components/ui/hex-color-picker';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useReportPreviewRefresh } from '@/modules/admin/components/report-preview-context';
import {
  useAssessmentTemplateContents,
  useResetTemplateContent,
  useUpdateTemplateContent,
} from '@/modules/admin/hooks';
import {
  PDF_COLOR_KEYS,
  PDF_FONT_KEYS,
  PDF_FONT_OPTIONS,
  PDF_THEME_DEFAULTS,
  PDF_THEME_LABELS,
  PDF_THEME_KEYS,
  type AssessmentTypeCode,
  type PdfThemeKey,
} from '@/modules/assessment/constants';
import { CircleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

const SSRI_SWATCHES = [
  '#16a34a',
  '#15803d',
  '#0d9488',
  '#0284c7',
  '#7c3aed',
  '#dc2626',
  '#d97706',
  '#db2777',
  '#0891b2',
  '#059669',
];

type PdfThemeEditorProps = {
  assessmentType: AssessmentTypeCode;
};

export const PdfThemeEditor = ({ assessmentType }: PdfThemeEditorProps) => {
  const { contentByKey, loading, refetch } = useAssessmentTemplateContents(assessmentType);
  const { updateTemplateContent, loading: saving } = useUpdateTemplateContent();
  const { resetTemplateContent, loading: resetting } = useResetTemplateContent();
  const { bumpPreview } = useReportPreviewRefresh();

  const [drafts, setDrafts] = useState<Record<PdfThemeKey, string>>(
    () => Object.fromEntries(PDF_THEME_KEYS.map((k) => [k, ''])) as Record<PdfThemeKey, string>
  );
  const [savingKey, setSavingKey] = useState<PdfThemeKey | null>(null);
  const [resettingKey, setResettingKey] = useState<PdfThemeKey | null>(null);

  useEffect(() => {
    const next = Object.fromEntries(
      PDF_THEME_KEYS.map((key) => {
        const raw = contentByKey[key];
        return [key, typeof raw === 'string' && raw.trim() ? raw.trim() : PDF_THEME_DEFAULTS[key]];
      })
    ) as Record<PdfThemeKey, string>;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDrafts(next);
  }, [contentByKey]);

  const handleSave = async (key: PdfThemeKey) => {
    setSavingKey(key);
    await updateTemplateContent({
      assessmentType,
      contentKey: key,
      contentValue: drafts[key],
    });
    setSavingKey(null);
    await refetch();
    bumpPreview();
  };

  const handleReset = async (key: PdfThemeKey) => {
    setResettingKey(key);
    await resetTemplateContent(assessmentType, key, `${PDF_THEME_LABELS[key]} reset to default`);
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
        <Alert className="py-3">
          <CircleAlert className="size-4" />
          <AlertTitle className="text-sm">Changes apply on next PDF generation</AlertTitle>
          <AlertDescription className="text-sm">
            After saving, use &ldquo;Preview Report&rdquo; in the header to see the updated output.
            Blank values fall back to the SSRI default for that token.
          </AlertDescription>
        </Alert>

        {/* Colors */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium">Brand colors</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Controls which colors are used throughout the generated PDF.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PDF_COLOR_KEYS.map((key) => (
              <ThemeColorField
                key={key}
                fieldKey={key}
                value={drafts[key]}
                defaultValue={PDF_THEME_DEFAULTS[key]}
                onChange={(v) => setDrafts((cur) => ({ ...cur, [key]: v }))}
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

        <Separator />

        {/* Fonts */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium">Typography</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fonts must be pre-embedded in the PDF template build. Only listed options are
              available.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {PDF_FONT_KEYS.map((key) => (
              <ThemeFontField
                key={key}
                fieldKey={key}
                value={drafts[key]}
                defaultValue={PDF_THEME_DEFAULTS[key]}
                onChange={(v) => setDrafts((cur) => ({ ...cur, [key]: v }))}
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
      </CardContent>
    </Card>
  );
};

type ThemeFieldBaseProps = {
  fieldKey: PdfThemeKey;
  value: string;
  defaultValue: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  resetting: boolean;
  isSaving: boolean;
  isResetting: boolean;
};

const ThemeFieldActions = ({
  onSave,
  onReset,
  saving,
  resetting,
  isSaving,
  isResetting,
}: Pick<
  ThemeFieldBaseProps,
  'onSave' | 'onReset' | 'saving' | 'resetting' | 'isSaving' | 'isResetting'
>) => (
  <div className="flex gap-1.5">
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
);

const ThemeColorField = ({
  fieldKey,
  value,
  defaultValue,
  onChange,
  onSave,
  onReset,
  saving,
  resetting,
  isSaving,
  isResetting,
}: ThemeFieldBaseProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-2">
      <Label className="text-sm font-medium leading-none">{PDF_THEME_LABELS[fieldKey]}</Label>
      <ThemeFieldActions
        onSave={onSave}
        onReset={onReset}
        saving={saving}
        resetting={resetting}
        isSaving={isSaving}
        isResetting={isResetting}
      />
    </div>
    <HexColorPicker
      value={value}
      onChange={onChange}
      swatches={SSRI_SWATCHES}
      placeholder={defaultValue}
    />
    <p className="text-xs text-muted-foreground">Default: {defaultValue}</p>
  </div>
);

const ThemeFontField = ({
  fieldKey,
  value,
  defaultValue,
  onChange,
  onSave,
  onReset,
  saving,
  resetting,
  isSaving,
  isResetting,
}: ThemeFieldBaseProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between gap-2">
      <Label className="text-sm font-medium leading-none">{PDF_THEME_LABELS[fieldKey]}</Label>
      <ThemeFieldActions
        onSave={onSave}
        onReset={onReset}
        saving={saving}
        resetting={resetting}
        isSaving={isSaving}
        isResetting={isResetting}
      />
    </div>
    <Select value={value || defaultValue} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Default: ${defaultValue}`} />
      </SelectTrigger>
      <SelectContent>
        {PDF_FONT_OPTIONS.map((font) => (
          <SelectItem key={font} value={font}>
            {font}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <p className="text-xs text-muted-foreground">Default: {defaultValue}</p>
  </div>
);

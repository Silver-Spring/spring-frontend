'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  type CreateAssessmentTypeWizardValues,
  SKIP_CLONE_TEMPLATE_VALUE,
} from '@/modules/admin/schema';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type CloneStepFieldsProps = {
  templateOptions: { code: string; name: string; isActive: boolean }[];
};

export const CloneStepFields = ({ templateOptions }: CloneStepFieldsProps) => {
  const form = useFormContext<CreateAssessmentTypeWizardValues>();
  const sectionCount = useWatch({ control: form.control, name: 'sectionCount' }) ?? 5;
  const seedSections = useWatch({ control: form.control, name: 'seedSections' }) ?? true;
  const seedPresetCount = Math.min(sectionCount, 5);

  useEffect(() => {
    if (sectionCount > 5) {
      form.setValue('seedSections', false);
    }
  }, [sectionCount, form]);

  return (
    <div className="space-y-6">
      <FormField
        name="seedSections"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
            <div className="space-y-1">
              <FormLabel className="text-sm font-medium">
                Seed standard dimension sections
              </FormLabel>
              <FormDescription>
                {sectionCount > 5 ? (
                  <>
                    Preset seed supports up to 5 sections. With {sectionCount} sections you&apos;ll
                    add sections manually in Content after creation.
                  </>
                ) : (
                  <>
                    Creates the first {seedPresetCount} preset dimension
                    {seedPresetCount === 1 ? '' : 's'} (Psychological, Financial, etc.). Recommended
                    unless you&apos;re building a fully custom structure.
                  </>
                )}
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
                disabled={sectionCount > 5}
                aria-label="Seed standard dimension sections"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="cloneFromTemplate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Clone interpretation bands from</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={SKIP_CLONE_TEMPLATE_VALUE}>
                  None — I&apos;ll set up scoring manually
                </SelectItem>
                {templateOptions.map((type) => (
                  <SelectItem key={type.code} value={type.code}>
                    {type.name} ({type.code.toUpperCase()}){!type.isActive ? ' · draft' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Copies section and overall interpretation bands plus recommended actions from the
              selected type. Questions are never cloned — you&apos;ll add those in Content.
            </FormDescription>
          </FormItem>
        )}
      />

      {seedSections && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground text-sm">What will be created</p>
          <ul className="mt-1 space-y-0.5 list-disc list-inside">
            <li>
              {seedPresetCount} dimension section{seedPresetCount !== 1 ? 's' : ''} (no questions
              yet)
            </li>
            <li>Score bands cloned from template, or empty if None selected</li>
            <li>
              Type starts as <strong>Draft</strong> — invisible to users
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

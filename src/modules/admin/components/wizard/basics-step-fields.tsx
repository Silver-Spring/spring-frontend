'use client';

import { cn } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { formatPriceFromPaise } from '@/modules/assessment/constants';
import { type CreateAssessmentTypeWizardValues } from '@/modules/admin/schema';
import { StructurePreview } from './structure-preview';
import { ChevronDown, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
    {children}
  </div>
);

export const BasicsStepFields = ({ existingCodes }: { existingCodes: Set<string> }) => {
  const form = useFormContext<CreateAssessmentTypeWizardValues>();
  const watchedCode = useWatch({ control: form.control, name: 'code' })?.toLowerCase().trim();
  const codeCollision = Boolean(watchedCode && existingCodes.has(watchedCode));
  const isDyadic = useWatch({ control: form.control, name: 'isDyadic' }) ?? false;
  const [showCustomScale, setShowCustomScale] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isDyadic) setShowCustomScale(true);
  }, [isDyadic]);

  const showScale = showCustomScale || isDyadic;

  return (
    <div className="space-y-8">
      {/* Identity */}
      <FormSection title="Identity">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g. prai"
                    autoComplete="off"
                    className="font-mono"
                  />
                </FormControl>
                <FormDescription>
                  Lowercase slug — letters, numbers, <code>-</code>, <code>_</code>. Permanent after
                  creation.
                </FormDescription>
                {codeCollision && (
                  <p className="text-sm text-destructive" role="alert">
                    Code already in use. Choose another.
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Retirement Readiness Index" />
                </FormControl>
                <FormDescription>Shown to users on the assessment page.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className="text-muted-foreground font-normal">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Internal notes or a short summary for the admin catalog"
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <Separator />

      {/* Pricing */}
      <FormSection title="Pricing">
        <FormField
          name="priceAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={1}
                  step="0.01"
                  className="max-w-xs"
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                />
              </FormControl>
              <FormDescription>
                {field.value
                  ? `= ${formatPriceFromPaise(Math.round(field.value * 100))}`
                  : 'Enter amount in rupees'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormSection>

      <Separator />

      {/* Structure */}
      <FormSection title="Structure">
        {/* Couples mode — top of structure because it fundamentally changes scoring */}
        <FormField
          name="isDyadic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
              <div className="space-y-1">
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground" aria-hidden="true" />
                  Couples assessment
                </FormLabel>
                <FormDescription>
                  Two partners take the assessment independently under one payment. Scoring is
                  computed across both sessions (domain averages, alignment gaps, couple total).
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Enable couples (dyadic) assessment"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="sectionCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sections</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={1}
                    max={10}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormDescription>Number of scored dimensions (1–10).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="questionsPerSection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Questions per section</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={1}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormDescription>Minimum required per section to publish.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Scoring formula — hidden for couples, shown for standard */}
        {!isDyadic && (
          <FormField
            name="scoringFormula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scoring formula</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sum">Sum — add all section scores</SelectItem>
                    <SelectItem value="average">Average — divide by section count</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Custom answer scale — collapsed by default, auto-opens for couples */}
        <div className="rounded-lg border">
          <button
            type="button"
            onClick={() => !isDyadic && setShowCustomScale((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm"
          >
            <span className="font-medium">
              Custom answer scale
              {!showScale && (
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  default: 1–10 numeric
                </span>
              )}
            </span>
            {isDyadic ? (
              <span className="text-xs text-muted-foreground">Required for couples</span>
            ) : (
              <ChevronDown
                className={cn(
                  'size-4 text-muted-foreground transition-transform',
                  showScale && 'rotate-180'
                )}
              />
            )}
          </button>

          {showScale && (
            <div className="border-t px-4 py-4 space-y-3">
              {isDyadic && (
                <p className="text-xs text-muted-foreground">
                  Couples assessments typically use a 1–4 labeled scale. Set the range to match your
                  answer options.
                </p>
              )}
              <div className="flex items-end gap-3">
                <FormField
                  name="responseScaleMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Min</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          className="w-24"
                          onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="pb-2 text-muted-foreground">–</span>
                <FormField
                  name="responseScaleMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Max</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={2}
                          className="w-24"
                          onChange={(e) => field.onChange(e.target.valueAsNumber || 10)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </div>

        <StructurePreview />
      </FormSection>
    </div>
  );
};

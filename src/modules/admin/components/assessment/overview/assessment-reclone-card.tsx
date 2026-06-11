'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAdminAssessmentTypes, useSeedAssessmentTypeContent } from '@/modules/admin/hooks';
import { getDefaultTemplateCode } from '@/modules/admin/lib/assessment-type-lifecycle';
import { Copy } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type AssessmentRecloneCardProps = {
  assessmentType: string;
};

export const AssessmentRecloneCard = ({ assessmentType }: AssessmentRecloneCardProps) => {
  const { assessmentTypes } = useAdminAssessmentTypes();
  const { seedAssessmentTypeContent, loading: seeding } = useSeedAssessmentTypeContent();

  const [templateCode, setTemplateCode] = useState('');
  const [cloneBands, setCloneBands] = useState(true);

  const templateOptions = useMemo(
    () => assessmentTypes.filter((t) => t.code !== assessmentType),
    [assessmentTypes, assessmentType]
  );

  useEffect(() => {
    if (templateOptions.length === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTemplateCode((current) => {
      if (templateOptions.some((opt) => opt.code === current)) return current;
      return getDefaultTemplateCode(templateOptions);
    });
  }, [templateOptions]);

  const handleReclone = async () => {
    if (!templateCode) return;
    await seedAssessmentTypeContent({
      assessmentTypeCode: assessmentType,
      templateCode,
      cloneBands,
      cloneTemplateContent: false,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Copy className="size-4 text-muted-foreground" aria-hidden="true" />
          <CardTitle className="text-sm font-semibold">Clone bands from template</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Copy missing interpretation bands from another type. Existing bands with the same label
          and dimension are skipped.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {templateOptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No other types available yet. Create another type first, or use the wizard&apos;s clone
            option on initial setup.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-40 max-w-xs">
                <Label htmlFor="reclone-template" className="text-xs">
                  Template type
                </Label>
                <Select value={templateCode} onValueChange={setTemplateCode}>
                  <SelectTrigger id="reclone-template" className="mt-1.5">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code}>
                        {option.name} ({option.code.toUpperCase()})
                        {!option.isActive ? ' — draft' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="secondary"
                onClick={handleReclone}
                disabled={seeding || !templateCode || !cloneBands}
              >
                {seeding ? 'Cloning…' : 'Run clone'}
              </Button>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={cloneBands}
                onCheckedChange={(checked) => setCloneBands(checked === true)}
                aria-label="Clone interpretation bands"
              />
              Clone interpretation bands
            </label>
          </>
        )}
      </CardContent>
    </Card>
  );
};

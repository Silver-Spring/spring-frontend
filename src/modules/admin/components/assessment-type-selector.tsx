'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
  ALL_ASSESSMENT_TYPES_FILTER,
  AssessmentTypeFilter,
  DEFAULT_ASSESSMENT_TYPE,
} from '@/modules/assessment/constants';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks';

type AssessmentTypeSelectorProps = {
  value?: AssessmentTypeFilter;
  onChange?: (type: AssessmentTypeFilter) => void;
  label?: string;
  className?: string;
  includeAllTypes?: boolean;
  layout?: 'stacked' | 'inline';
};

export const AssessmentTypeSelector = ({
  value,
  onChange,
  label = 'Assessment Type',
  className,
  includeAllTypes = false,
  layout = 'stacked',
}: AssessmentTypeSelectorProps) => {
  const { assessmentTypes, loading } = useAdminAssessmentTypes();

  const selectedType = value ?? DEFAULT_ASSESSMENT_TYPE;

  const handleChange = (nextType: string) => {
    onChange?.(nextType);
  };

  if (loading && assessmentTypes.length === 0) {
    return (
      <div className={cn(layout === 'inline' && 'flex items-center gap-3', className)}>
        <Label className={cn(layout === 'inline' && 'shrink-0')}>{label}</Label>
        <div
          className={cn(
            'flex items-center gap-2 text-sm text-muted-foreground',
            layout === 'stacked' && 'mt-2'
          )}
        >
          <Spinner className="size-4" />
          Loading types...
        </div>
      </div>
    );
  }

  const options =
    assessmentTypes.length > 0
      ? assessmentTypes
      : [{ code: DEFAULT_ASSESSMENT_TYPE, name: 'SSRI', isActive: true }];

  const isInline = layout === 'inline';

  return (
    <div className={cn(isInline ? 'flex items-center gap-3' : 'space-y-2', className)}>
      <Label
        htmlFor="assessment-type-select"
        className={cn(isInline && 'shrink-0 whitespace-nowrap')}
      >
        {label}
      </Label>
      <Select value={selectedType} onValueChange={handleChange}>
        <SelectTrigger
          id="assessment-type-select"
          className={cn('w-full', isInline ? 'h-9 min-w-[160px] max-w-[200px]' : 'max-w-xs')}
        >
          <SelectValue placeholder="Select assessment type" />
        </SelectTrigger>
        <SelectContent>
          {includeAllTypes && (
            <SelectItem value={ALL_ASSESSMENT_TYPES_FILTER}>All types</SelectItem>
          )}
          {options.map((type) => (
            <SelectItem key={type.code} value={type.code}>
              {type.name} ({type.code.toUpperCase()})
              {!type.isActive ? ' — draft' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

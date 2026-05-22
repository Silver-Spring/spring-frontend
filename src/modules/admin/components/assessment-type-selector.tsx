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
import {
  ALL_ASSESSMENT_TYPES_FILTER,
  AssessmentTypeFilter,
  DEFAULT_ASSESSMENT_TYPE,
} from '@/modules/assessment/constants';
import { useAdminAssessmentTypes } from '@/modules/admin/hooks';
import { useOptionalAssessmentTypeContext } from '../context/assessment-type-context';

type AssessmentTypeSelectorProps = {
  value?: AssessmentTypeFilter;
  onChange?: (type: AssessmentTypeFilter) => void;
  label?: string;
  className?: string;
  includeAllTypes?: boolean;
};

export const AssessmentTypeSelector = ({
  value,
  onChange,
  label = 'Assessment Type',
  className,
  includeAllTypes = false,
}: AssessmentTypeSelectorProps) => {
  const context = useOptionalAssessmentTypeContext();
  const { assessmentTypes, loading } = useAdminAssessmentTypes();

  const selectedType = value ?? context?.selectedType ?? DEFAULT_ASSESSMENT_TYPE;

  const handleChange = (nextType: string) => {
    if (onChange) {
      onChange(nextType);
      return;
    }
    context?.setSelectedType(nextType);
  };

  if (loading && assessmentTypes.length === 0) {
    return (
      <div className={className}>
        <Label>{label}</Label>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
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

  return (
    <div className={className}>
      <Label htmlFor="assessment-type-select">{label}</Label>
      <Select value={selectedType} onValueChange={handleChange}>
        <SelectTrigger id="assessment-type-select" className="mt-2 w-full max-w-xs">
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

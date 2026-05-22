'use client';

import { Badge } from '@/components/ui/badge';
import type { BandScope } from '@/modules/admin/hooks';
import { OVERALL_AFFECTS, SECTION_AFFECTS } from './constants';

export const BandAffectsChips = ({ bandScope }: { bandScope: BandScope }) => {
  const items = bandScope === 'section' ? SECTION_AFFECTS : OVERALL_AFFECTS;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge key={item} variant="secondary" className="text-xs font-normal">
          {item}
        </Badge>
      ))}
    </div>
  );
};

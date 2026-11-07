import { Badge } from '@/components/ui/badge';
import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { ReactNode } from 'react';

type Where = 'On page' | 'Emails only' | 'Controls the page';

type WorkshopFieldProps = {
  label: string;
  where: Where;
  required?: boolean;
  hint: string;
  children: ReactNode;
};

/** A form row that says what the field does and where it shows up. */
export const WorkshopField = ({ label, where, required, hint, children }: WorkshopFieldProps) => (
  <FormItem className="grid gap-x-8 gap-y-2 border-b py-6 last:border-b-0 md:grid-cols-[240px_minmax(0,1fr)]">
    <div className="flex flex-col items-start gap-1.5">
      <FormLabel className="text-base font-semibold">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </FormLabel>
      <Badge variant={where === 'On page' ? 'default' : 'secondary'} className="font-medium">
        {where}
      </Badge>
    </div>
    <div className="flex flex-col gap-2">
      {children}
      <FormDescription className="text-sm leading-relaxed">{hint}</FormDescription>
      <FormMessage />
    </div>
  </FormItem>
);

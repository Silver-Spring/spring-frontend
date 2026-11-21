'use client';

import { Button } from '@/components/ui/button';

type VariableChipsProps = {
  variables: string[];
  onInsert: (token: string) => void;
  disabled?: boolean;
};

/** One button per variable; clicking puts {{variable}} at the cursor of the last field you typed in. */
export const VariableChips = ({ variables, onInsert, disabled = false }: VariableChipsProps) => (
  <div className="flex flex-wrap items-center gap-1.5">
    {variables.map((name) => (
      <Button
        key={name}
        type="button"
        variant="outline"
        size="sm"
        className="h-7 rounded-full px-2.5 font-mono text-xs"
        disabled={disabled}
        // Keep focus (and the cursor) in the field being edited.
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => onInsert(`{{${name}}}`)}
      >
        {`{{${name}}}`}
      </Button>
    ))}
  </div>
);

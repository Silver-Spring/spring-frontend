'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

export type AnswerOption = { value: number; label: string };

type AnswerOptionsEditorProps = {
  options: AnswerOption[] | null;
  onChange: (options: AnswerOption[] | null) => void;
};

export const AnswerOptionsEditor = ({ options, onChange }: AnswerOptionsEditorProps) => (
  <div className="space-y-2 pt-1">
    <div className="flex items-center justify-between">
      <Label className="text-xs">Answer options</Label>
      {options === null ? (
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-6 px-2 text-xs"
          onClick={() => onChange([{ value: 1, label: '' }])}
        >
          <Plus className="size-3 mr-1" />
          Add options
        </Button>
      ) : (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs text-muted-foreground"
          onClick={() => onChange(null)}
        >
          Remove all
        </Button>
      )}
    </div>

    {options !== null ? (
      <div className="space-y-1.5 rounded-md border p-2 bg-muted/20">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground w-4 text-right shrink-0">
              {opt.value}
            </span>
            <Input
              value={opt.label}
              onChange={(e) => {
                const next = [...options];
                next[i] = { ...opt, label: e.target.value };
                onChange(next);
              }}
              placeholder={`Option ${opt.value} label`}
              className="h-7 text-xs flex-1"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => {
                const next = options.filter((_, idx) => idx !== i);
                onChange(next.length ? next : null);
              }}
            >
              <Trash2 className="size-3" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs w-full"
          onClick={() => {
            const nextValue = options.length > 0 ? Math.max(...options.map((o) => o.value)) + 1 : 1;
            onChange([...options, { value: nextValue, label: '' }]);
          }}
        >
          <Plus className="size-3 mr-1" />
          Add option
        </Button>
      </div>
    ) : (
      <p className="text-[10px] text-muted-foreground">
        No options set — uses numeric scale from assessment type.
      </p>
    )}
  </div>
);

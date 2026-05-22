'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const DEFAULT_SWATCHES = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#0ea5e9',
  '#3b82f6',
];

const normalizeHexColor = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  if (!/^#[0-9A-Fa-f]{6}$/.test(withHash)) return null;

  return withHash.toLowerCase();
};

type HexColorPickerProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  swatches?: string[];
  placeholder?: string;
  className?: string;
};

const HexColorPicker = ({
  id,
  label,
  value,
  onChange,
  swatches = DEFAULT_SWATCHES,
  placeholder = '#6366f1',
  className,
}: HexColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const normalizedValue = normalizeHexColor(value) ?? '';
  const pickerValue = normalizedValue || '#6366f1';

  const handleSelectColor = (nextColor: string) => {
    onChange(nextColor);
  };

  const handleHexInputChange = (nextValue: string) => {
    onChange(nextValue);
  };

  const handleClearColor = () => {
    onChange('');
    setOpen(false);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            className="w-full justify-between gap-2 font-normal"
            aria-label={label ? `Choose ${label.toLowerCase()}` : 'Choose color'}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="size-4 shrink-0 rounded-sm border border-border"
                style={{ backgroundColor: normalizedValue || 'transparent' }}
                aria-hidden="true"
              />
              <span className={cn('truncate', !normalizedValue && 'text-muted-foreground')}>
                {normalizedValue || placeholder}
              </span>
            </span>
            <ChevronDownIcon className="size-4 shrink-0 opacity-60" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 space-y-3 p-3" align="start">
          <div className="flex items-center gap-2">
            <label
              htmlFor={id ? `${id}-native` : undefined}
              className="relative size-10 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border"
              aria-label="Native color picker"
            >
              <span
                className="absolute inset-0"
                style={{ backgroundColor: pickerValue }}
                aria-hidden="true"
              />
              <input
                id={id ? `${id}-native` : undefined}
                type="color"
                value={pickerValue}
                onChange={(event) => handleSelectColor(event.target.value.toLowerCase())}
                className="absolute inset-0 size-full cursor-pointer opacity-0"
              />
            </label>
            <Input
              value={value}
              onChange={(event) => handleHexInputChange(event.target.value)}
              placeholder={placeholder}
              aria-label="Hex color value"
              className="font-mono text-sm"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {swatches.map((swatch) => (
              <button
                key={swatch}
                type="button"
                onClick={() => handleSelectColor(swatch)}
                aria-label={`Set color to ${swatch}`}
                aria-pressed={normalizedValue === swatch}
                className={cn(
                  'size-8 rounded-md border border-border transition-transform hover:scale-105',
                  normalizedValue === swatch && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
                )}
                style={{ backgroundColor: swatch }}
              />
            ))}
          </div>
          {normalizedValue ? (
            <Button type="button" variant="ghost" size="sm" className="w-full" onClick={handleClearColor}>
              Clear color
            </Button>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { HexColorPicker, normalizeHexColor, DEFAULT_SWATCHES };

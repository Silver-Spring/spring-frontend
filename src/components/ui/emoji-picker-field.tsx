'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from '@/components/ui/emoji-picker';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type EmojiPickerFieldProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const EmojiPickerField = ({
  id,
  label,
  value,
  onChange,
  placeholder = 'Pick emoji',
  className,
}: EmojiPickerFieldProps) => {
  const [open, setOpen] = useState(false);

  const handleEmojiSelect = ({ emoji }: { emoji: string }) => {
    onChange(emoji);
    setOpen(false);
  };

  const handleClearEmoji = () => {
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
            className="w-full justify-start gap-2 font-normal"
            aria-label={label ? `Choose ${label.toLowerCase()}` : 'Choose emoji'}
          >
            {value ? (
              <span className="text-lg leading-none" aria-hidden="true">
                {value}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
          <EmojiPicker className="h-[320px] w-[280px]" onEmojiSelect={handleEmojiSelect}>
            <EmojiPickerSearch placeholder="Search emoji..." />
            <EmojiPickerContent />
            <EmojiPickerFooter />
          </EmojiPicker>
          {value ? (
            <div className="border-t p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={handleClearEmoji}
              >
                Clear emoji
              </Button>
            </div>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { EmojiPickerField };

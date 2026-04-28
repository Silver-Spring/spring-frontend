'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

export const DateTimePicker = ({
  value,
  onChange,
  placeholder = 'Select date and time',
  disabled = false,
  id,
}: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);
  
  const selectedDate = value ? new Date(value) : undefined;
  const [hours, setHours] = useState(
    selectedDate ? selectedDate.getHours().toString().padStart(2, '0') : '00'
  );
  const [minutes, setMinutes] = useState(
    selectedDate ? selectedDate.getMinutes().toString().padStart(2, '0') : '00'
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const newDate = new Date(date);
    newDate.setHours(parseInt(hours) || 0);
    newDate.setMinutes(parseInt(minutes) || 0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    onChange(newDate.toISOString());
  };

  const handleTimeChange = (newHours: string, newMinutes: string) => {
    setHours(newHours);
    setMinutes(newMinutes);

    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(newHours) || 0);
      newDate.setMinutes(parseInt(newMinutes) || 0);
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);

      onChange(newDate.toISOString());
    }
  };

  const handleClear = () => {
    onChange('');
    setHours('00');
    setMinutes('00');
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(new Date(value), 'PPP p')
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          initialFocus
        />
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Time</Label>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => {
                const val = e.target.value.padStart(2, '0');
                if (parseInt(val) >= 0 && parseInt(val) <= 23) {
                  handleTimeChange(val, minutes);
                }
              }}
              className="w-16 text-center"
              placeholder="HH"
            />
            <span className="text-lg font-medium">:</span>
            <Input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => {
                const val = e.target.value.padStart(2, '0');
                if (parseInt(val) >= 0 && parseInt(val) <= 59) {
                  handleTimeChange(hours, val);
                }
              }}
              className="w-16 text-center"
              placeholder="MM"
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

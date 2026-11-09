'use client';

import { DateTimePicker } from '@/components/ui/date-time-picker';

// The shared picker works in the browser's time zone. Webinar times are always India time (IST),
// so this wrapper shows and reads the picked clock time as IST whatever the browser's zone is.
const IST_OFFSET_MS = 330 * 60 * 1000;

// Real moment -> a date whose browser-local clock reads the IST wall time.
export const toIstWallClock = (iso: string) => {
  if (!iso) return '';
  const ist = new Date(new Date(iso).getTime() + IST_OFFSET_MS);
  return new Date(
    ist.getUTCFullYear(),
    ist.getUTCMonth(),
    ist.getUTCDate(),
    ist.getUTCHours(),
    ist.getUTCMinutes(),
  ).toISOString();
};

// Browser-local clock reading picked in the picker -> the real moment it means in IST.
export const fromIstWallClock = (iso: string) => {
  if (!iso) return '';
  const l = new Date(iso);
  return new Date(
    Date.UTC(l.getFullYear(), l.getMonth(), l.getDate(), l.getHours(), l.getMinutes()) -
      IST_OFFSET_MS,
  ).toISOString();
};

type Props = { id?: string; value: string; onChange: (value: string) => void; placeholder?: string };

export const IstDateTimePicker = ({ id, value, onChange, placeholder }: Props) => (
  <DateTimePicker
    id={id}
    value={toIstWallClock(value)}
    onChange={(v) => onChange(fromIstWallClock(v))}
    placeholder={placeholder}
  />
);

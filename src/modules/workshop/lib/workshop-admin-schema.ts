import { z } from 'zod';

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === '' || /^https?:\/\//i.test(v), 'Enter a full link starting with https://');

export const WORKSHOP_STATUSES = ['draft', 'published', 'closed'] as const;

export const workshopAdminSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required'),
    subtitle: z.string().trim(),
    speakerName: z.string().trim().min(1, 'Add the speaker who leads the workshop'),
    speakerRole: z.string().trim().min(1, 'Add the speaker role, e.g. Founder'),
    startsAt: z.string().min(1, 'Start date and time is required'),
    endsAt: z.string().min(1, 'End time is required'),
    status: z.enum(WORKSHOP_STATUSES),
    capacity: z.string().refine((v) => v === '' || /^[1-9]\d*$/.test(v), 'Use a whole number above 0, or leave empty'),
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Lowercase letters, numbers and hyphens only'),
    joiningUrl: optionalUrl,
    formatLabel: z.string().trim(),
    feedbackFormUrl: optionalUrl,
    resourcesNote: z.string().trim(),
  })
  .refine((v) => !v.startsAt || !v.endsAt || new Date(`${v.endsAt}:00+05:30`) > new Date(`${v.startsAt}:00+05:30`), {
    message: 'End time must be after the start time',
    path: ['endsAt'],
  });

export type WorkshopAdminValues = z.infer<typeof workshopAdminSchema>;

/** ISO instant to the `YYYY-MM-DDTHH:mm` value a datetime-local input expects, in IST. */
export const isoToIstInput = (iso: string) => {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(iso));
  return parts.replace(' ', 'T');
};

export const istInputToIso = (value: string) => `${value}:00+05:30`;

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

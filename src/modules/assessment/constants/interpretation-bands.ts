const BAND_LABEL_COLORS: Record<string, string> = {
  Vulnerable: 'text-red-600 dark:text-red-400',
  Emerging: 'text-orange-600 dark:text-orange-400',
  Developing: 'text-yellow-600 dark:text-yellow-400',
  Proactive: 'text-blue-600 dark:text-blue-400',
  Thriving: 'text-green-600 dark:text-green-400',
};

export const getBandLabelColor = (label: string | null | undefined): string => {
  if (!label) return '';
  return BAND_LABEL_COLORS[label] ?? 'text-primary';
};

export const AGE_RANGES = [
  { label: '18-25', min: 18, max: 25 },
  { label: '26-35', min: 26, max: 35 },
  { label: '36-45', min: 36, max: 45 },
  { label: '46-55', min: 46, max: 55 },
  { label: '56-65', min: 56, max: 65 },
  { label: '66+', min: 66, max: 150 },
];

export const getAgeRange = (age: number): string => {
  const range = AGE_RANGES.find((r) => age >= r.min && age <= r.max);
  return range?.label || 'Unknown';
};

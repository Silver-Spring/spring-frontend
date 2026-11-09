const IST = 'Asia/Kolkata';

export const splitWorkshopTitle = (title: string) => {
  const index = title.indexOf(':');
  if (index === -1) return { lead: title.trim(), highlight: '' };
  return { lead: title.slice(0, index + 1).trim(), highlight: title.slice(index + 1).trim() };
};

export const formatWorkshopDate = (iso: string) => {
  const date = new Date(iso);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-IN', { timeZone: IST, ...options }).format(date);
  return {
    day: part({ day: 'numeric' }),
    monthYear: part({ month: 'long', year: 'numeric' }),
    weekday: part({ weekday: 'long' }),
  };
};

type Speaker = { name: string; role: string };

export const buildWorkshopDescription = (subtitle: string | null | undefined, speaker?: Speaker) => {
  const topic = subtitle?.trim().replace(/\.$/, '');
  const host = topic
    ? `A webinar hosted by Silver Spring on ${topic}`
    : 'A webinar hosted by Silver Spring';
  return { host, speakerName: speaker?.name ?? '', speakerRole: speaker?.role ?? '' };
};

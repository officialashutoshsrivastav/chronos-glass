// Author: @officialashutoshsrivastav - Full Stack Developer

export interface TimeParts {
  hours: string;
  minutes: string;
  seconds: string;
  period: 'AM' | 'PM';
  hour24: number;
  dayProgressPercent: number;
}

export interface DateParts {
  weekday: string;
  month: string;
  day: string;
  year: string;
  formattedDate: string;
}

export interface TimeZoneDetails {
  code: string;
  name: string;
  formatted: string;
  offsetLabel: string;
  iana: string;
}

export interface PresetTimeZone {
  id: string;
  label: string;
  iana: string | undefined;
  codeHint?: string;
  nameHint?: string;
}

export const PRESET_TIMEZONES: PresetTimeZone[] = [
  { id: 'local', label: 'Local Time', iana: undefined },
  {
    id: 'ist',
    label: 'IST · Mumbai / New Delhi',
    iana: 'Asia/Kolkata',
    codeHint: 'IST',
    nameHint: 'India Standard Time',
  },
  {
    id: 'utc',
    label: 'UTC · Meridian Reference',
    iana: 'UTC',
    codeHint: 'UTC',
    nameHint: 'Coordinated Universal Time',
  },
  {
    id: 'cet',
    label: 'CET · Geneva / Zurich',
    iana: 'Europe/Zurich',
    codeHint: 'CET',
    nameHint: 'Central European Time',
  },
  {
    id: 'jst',
    label: 'JST · Tokyo',
    iana: 'Asia/Tokyo',
    codeHint: 'JST',
    nameHint: 'Japan Standard Time',
  },
  {
    id: 'est',
    label: 'EST · New York',
    iana: 'America/New_York',
  },
];

const KNOWN_TZ_MAPPING: Record<string, { code: string; name: string }> = {
  'Asia/Kolkata': { code: 'IST', name: 'India Standard Time' },
  'Asia/Calcutta': { code: 'IST', name: 'India Standard Time' },
  UTC: { code: 'UTC', name: 'Coordinated Universal Time' },
  'Etc/UTC': { code: 'UTC', name: 'Coordinated Universal Time' },
  'Asia/Tokyo': { code: 'JST', name: 'Japan Standard Time' },
  'Europe/Zurich': { code: 'CET', name: 'Central European Time' },
  'Europe/Paris': { code: 'CET', name: 'Central European Time' },
  'Europe/Berlin': { code: 'CET', name: 'Central European Time' },
  'Europe/London': { code: 'GMT', name: 'Greenwich Mean Time' },
  'America/New_York': { code: 'EST', name: 'Eastern Standard Time' },
  'America/Los_Angeles': { code: 'PST', name: 'Pacific Standard Time' },
  'America/Chicago': { code: 'CST', name: 'Central Standard Time' },
  'Asia/Singapore': { code: 'SGT', name: 'Singapore Standard Time' },
  'Asia/Dubai': { code: 'GST', name: 'Gulf Standard Time' },
  'Australia/Sydney': { code: 'AEST', name: 'Australian Eastern Time' },
};

export function formatTimeParts(
  date: Date,
  is24Hour: boolean,
  timeZone?: string
): TimeParts {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    ...(timeZone ? { timeZone } : {}),
  };

  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
  let rawHour = 0;
  let rawMinute = 0;
  let rawSecond = 0;

  for (const part of parts) {
    if (part.type === 'hour') {
      const parsed = parseInt(part.value, 10);
      rawHour = parsed === 24 ? 0 : parsed;
    } else if (part.type === 'minute') {
      rawMinute = parseInt(part.value, 10);
    } else if (part.type === 'second') {
      rawSecond = parseInt(part.value, 10);
    }
  }

  const period: 'AM' | 'PM' = rawHour >= 12 ? 'PM' : 'AM';
  let displayHour = rawHour;

  if (!is24Hour) {
    displayHour = rawHour % 12;
    if (displayHour === 0) displayHour = 12;
  }

  const hours = String(displayHour).padStart(2, '0');
  const minutes = String(rawMinute).padStart(2, '0');
  const seconds = String(rawSecond).padStart(2, '0');

  const totalSecondsInDay = rawHour * 3600 + rawMinute * 60 + rawSecond;
  const dayProgressPercent = Number(
    ((totalSecondsInDay / 86400) * 100).toFixed(2)
  );

  return {
    hours,
    minutes,
    seconds,
    period,
    hour24: rawHour,
    dayProgressPercent,
  };
}

export function formatDateParts(date: Date, timeZone?: string): DateParts {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(timeZone ? { timeZone } : {}),
  };

  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
  let weekday = '';
  let month = '';
  let day = '';
  let year = '';

  for (const part of parts) {
    if (part.type === 'weekday') weekday = part.value;
    if (part.type === 'month') month = part.value;
    if (part.type === 'day') day = part.value;
    if (part.type === 'year') year = part.value;
  }

  const formattedDate = `${weekday}, ${month} ${day}, ${year}`;
  return { weekday, month, day, year, formattedDate };
}

export function getDynamicGreeting(
  hour24: number
): 'Good Morning' | 'Good Afternoon' | 'Good Evening' | 'Good Night' {
  const normalized = ((hour24 % 24) + 24) % 24;
  if (normalized >= 5 && normalized < 12) {
    return 'Good Morning';
  }
  if (normalized >= 12 && normalized < 17) {
    return 'Good Afternoon';
  }
  if (normalized >= 17 && normalized < 21) {
    return 'Good Evening';
  }
  return 'Good Night';
}

export function getTimeZoneDetails(
  date: Date,
  timeZoneOverride?: string
): TimeZoneDetails {
  const resolvedIana =
    timeZoneOverride ||
    Intl.DateTimeFormat().resolvedOptions().timeZone ||
    'UTC';

  let offsetLabel = 'UTC';
  try {
    const shortOffsetParts = new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedIana,
      timeZoneName: 'shortOffset',
    }).formatToParts(date);
    const offsetPart = shortOffsetParts.find((p) => p.type === 'timeZoneName');
    if (offsetPart?.value) {
      offsetLabel = offsetPart.value.replace('GMT', 'UTC');
    }
  } catch {
    offsetLabel = 'UTC';
  }

  const known = KNOWN_TZ_MAPPING[resolvedIana];
  if (known) {
    try {
      const longParts = new Intl.DateTimeFormat('en-US', {
        timeZone: resolvedIana,
        timeZoneName: 'long',
      }).formatToParts(date);
      const longName =
        longParts.find((p) => p.type === 'timeZoneName')?.value || known.name;

      const shortParts = new Intl.DateTimeFormat('en-US', {
        timeZone: resolvedIana,
        timeZoneName: 'short',
      }).formatToParts(date);
      const shortCode =
        shortParts.find((p) => p.type === 'timeZoneName')?.value || known.code;

      const cleanCode =
        shortCode.startsWith('GMT') || shortCode.startsWith('UTC')
          ? known.code
          : shortCode;

      const cleanName =
        resolvedIana === 'Asia/Kolkata' || resolvedIana === 'Asia/Calcutta'
          ? 'India Standard Time'
          : longName;

      return {
        code: cleanCode,
        name: cleanName,
        formatted: `${cleanCode} — ${cleanName}`,
        offsetLabel,
        iana: resolvedIana,
      };
    } catch {
      return {
        code: known.code,
        name: known.name,
        formatted: `${known.code} — ${known.name}`,
        offsetLabel,
        iana: resolvedIana,
      };
    }
  }

  let code = 'LOC';
  let name = resolvedIana.replace(/_/g, ' ');

  try {
    const shortParts = new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedIana,
      timeZoneName: 'short',
    }).formatToParts(date);
    const shortVal = shortParts.find((p) => p.type === 'timeZoneName')?.value;

    const longParts = new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedIana,
      timeZoneName: 'long',
    }).formatToParts(date);
    const longVal = longParts.find((p) => p.type === 'timeZoneName')?.value;

    if (longVal) {
      name = longVal;
    }
    if (shortVal && !shortVal.includes('+') && !shortVal.includes('-')) {
      code = shortVal;
    } else if (longVal) {
      const acronym = longVal
        .split(/\s+/)
        .map((w) => w[0]?.toUpperCase() || '')
        .join('');
      if (acronym.length >= 2 && acronym.length <= 5) {
        code = acronym;
      }
    }
  } catch {
    code = 'LOC';
  }

  return {
    code,
    name,
    formatted: `${code} — ${name}`,
    offsetLabel,
    iana: resolvedIana,
  };
}

const SEGMENT_MAP: Record<
  string,
  [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
> = {
  '0': [true, true, true, true, true, true, false],
  '1': [false, true, true, false, false, false, false],
  '2': [true, true, false, true, true, false, true],
  '3': [true, true, true, true, false, false, true],
  '4': [false, true, true, false, false, true, true],
  '5': [true, false, true, true, false, true, true],
  '6': [true, false, true, true, true, true, true],
  '7': [true, true, true, false, false, false, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true],
};

export function getSevenSegmentBars(
  digit: string
): [boolean, boolean, boolean, boolean, boolean, boolean, boolean] {
  return (
    SEGMENT_MAP[digit] ?? [false, false, false, false, false, false, false]
  );
}

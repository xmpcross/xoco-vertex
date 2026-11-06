import { siteConfig } from "@/config/site";

const dateFormat = new Intl.DateTimeFormat(siteConfig.dateLocale, {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatDate = (date: Date) => dateFormat.format(date);

const shortFormat = new Intl.DateTimeFormat(siteConfig.dateLocale, {
  day: "numeric",
  month: "short",
});

export const formatShortDate = (date: Date) => shortFormat.format(date);

/** An event's date and time, in the event's own city where we know the zone. */
export const formatEventTime = (date: Date, timeZone = "UTC") =>
  new Intl.DateTimeFormat(siteConfig.dateLocale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  }).format(date);

export const eventParts = (date: Date, timeZone = "UTC") => {
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(siteConfig.dateLocale, { ...options, timeZone }).format(date);
  return {
    day: part({ day: "2-digit" }),
    month: part({ month: "short" }),
    year: part({ year: "numeric" }),
  };
};

/** "A", "A and B", "A, B and C". */
export const joinNames = (names: string[]) =>
  names.length < 2 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;

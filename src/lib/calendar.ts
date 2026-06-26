import type { Opportunity } from "@/types/opportunity";

type CalendarOpportunity = Pick<
  Opportunity,
  | "title"
  | "description"
  | "provider_name"
  | "location_name"
  | "address"
  | "city"
  | "start_date"
  | "end_date"
  | "registration_url"
  | "source_url"
>;

type CalendarDate = {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
  hasTime: boolean;
};

const googleCalendarUrl = "https://calendar.google.com/calendar/render";

function parseCalendarDate(value: string | null | undefined): CalendarDate | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(trimmed);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hasTime = match[4] !== undefined && match[5] !== undefined;
  const hour = hasTime ? Number(match[4]) : undefined;
  const minute = hasTime ? Number(match[5]) : undefined;
  const second = hasTime ? Number(match[6] ?? "0") : undefined;

  const date = new Date(year, month - 1, day, hour ?? 0, minute ?? 0, second ?? 0);
  const validDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;
  const validTime =
    !hasTime ||
    (date.getHours() === hour && date.getMinutes() === minute && date.getSeconds() === second);

  if (!validDate || !validTime) return null;

  return { year, month, day, hour, minute, second, hasTime };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatDate(date: CalendarDate) {
  return `${date.year}${pad(date.month)}${pad(date.day)}`;
}

function formatDateTime(date: CalendarDate) {
  return `${formatDate(date)}T${pad(date.hour ?? 0)}${pad(date.minute ?? 0)}${pad(date.second ?? 0)}`;
}

function nextDay(date: CalendarDate) {
  const next = new Date(date.year, date.month - 1, date.day + 1);
  return {
    year: next.getFullYear(),
    month: next.getMonth() + 1,
    day: next.getDate(),
    hasTime: false,
  };
}

function joinPresent(parts: Array<string | null | undefined>, separator = ", ") {
  return parts.map((part) => part?.trim()).filter(Boolean).join(separator);
}

export function buildGoogleCalendarUrl(
  opportunity: CalendarOpportunity,
  currentPageUrl?: string
) {
  const start = parseCalendarDate(opportunity.start_date);
  if (!start) return null;

  const end = parseCalendarDate(opportunity.end_date);
  const dates = start.hasTime && end?.hasTime
    ? `${formatDateTime(start)}/${formatDateTime(end)}`
    : `${formatDate(start)}/${formatDate(nextDay(start))}`;

  const details = joinPresent([
    opportunity.description,
    opportunity.provider_name ? `Provider: ${opportunity.provider_name}` : null,
    opportunity.registration_url ? `Registration: ${opportunity.registration_url}` : null,
    opportunity.source_url ? `Source: ${opportunity.source_url}` : null,
    currentPageUrl ? `Listing: ${currentPageUrl}` : null,
  ], "\n\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opportunity.title,
    dates,
  });
  const location = joinPresent([opportunity.location_name, opportunity.address, opportunity.city]);

  if (location) params.set("location", location);
  if (details) params.set("details", details);

  return `${googleCalendarUrl}?${params.toString()}`;
}

import opportunitiesData from "@/data/opportunities.json";
import type { Opportunity } from "@/types/opportunity";

type RawOpportunity = {
  id?: unknown;
  title?: unknown;
  provider?: unknown;
  category?: unknown;
  description?: unknown;
  city?: unknown;
  age_min?: unknown;
  age_max?: unknown;
  is_free?: unknown;
  cost?: unknown;
  schedule?: unknown;
  start_date?: unknown;
  end_date?: unknown;
  location?: unknown;
  registration_url?: unknown;
  website?: unknown;
  source?: unknown;
};

function normalizeString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeDate(value: unknown) {
  return normalizeString(value) || undefined;
}

function normalizeNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeCost(value: unknown, isFree: boolean) {
  if (isFree) {
    return "Free";
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return value === 0 ? "Free" : `$${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
  }

  return normalizeString(value, "Contact provider");
}

function buildSchedule(startDate?: string, endDate?: string, explicitSchedule?: unknown) {
  const schedule = normalizeString(explicitSchedule);

  if (schedule) {
    return schedule;
  }

  if (startDate && endDate && startDate !== endDate) {
    return `${startDate} to ${endDate}`;
  }

  return startDate ?? "Contact provider";
}

function normalizeOpportunity(raw: RawOpportunity): Opportunity {
  const isFree = normalizeBoolean(raw.is_free, raw.cost === 0);
  const startDate = normalizeDate(raw.start_date);
  const endDate = normalizeDate(raw.end_date);
  const registrationUrl =
    normalizeString(raw.registration_url) ||
    normalizeString(raw.website) ||
    normalizeString(raw.source, "#");

  return {
    id: normalizeString(raw.id),
    title: normalizeString(raw.title, "Untitled opportunity"),
    provider: normalizeString(raw.provider, "Unknown provider"),
    category: normalizeString(raw.category, "Other"),
    description: normalizeString(raw.description, "No description available."),
    city: normalizeString(raw.city, "Unknown"),
    ageMin: normalizeNumber(raw.age_min, 0),
    ageMax: normalizeNumber(raw.age_max, 18),
    isFree,
    cost: normalizeCost(raw.cost, isFree),
    schedule: buildSchedule(startDate, endDate, raw.schedule),
    startDate,
    endDate,
    location: normalizeString(raw.location, "Contact provider"),
    registrationUrl,
  };
}

export const opportunities = (opportunitiesData as RawOpportunity[]).map(normalizeOpportunity);

export function getOpportunityById(id: string) {
  return opportunities.find((opportunity) => opportunity.id === id);
}

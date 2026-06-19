import { buildGmailComposeUrl } from "@/lib/email";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { Opportunity } from "@/types/opportunity";

export const opportunityDataUnavailableMessage =
  "Opportunities are temporarily unavailable. Please check back soon.";

const opportunityColumns = [
  "id", "slug", "title", "description", "provider_id", "provider_name", "category",
  "age_min", "age_max", "city", "location_name", "address", "start_date", "end_date",
  "registration_deadline", "cost_type", "cost_amount", "registration_url", "contact_email",
  "contact_phone", "source_url", "image_url", "status", "featured", "created_at", "updated_at",
].join(",");

function todayAsDateString() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function reportError(context: string, error: unknown) {
  console.error(`[Supabase] ${context}`, error);
}

export async function getActiveOpportunities(
  { includeExpired = false }: { includeExpired?: boolean } = {}
): Promise<Opportunity[]> {
  if (!supabase) return [];

  let query = supabase
    .from("opportunities")
    .select(opportunityColumns)
    .eq("status", "published");

  if (!includeExpired) {
    query = query.or(`end_date.is.null,end_date.gte.${todayAsDateString()}`);
  }

  const { data, error } = await query.order("start_date", {
    ascending: true,
    nullsFirst: false,
  });

  if (error) {
    reportError("Could not load active opportunities", error);
    return [];
  }

  return (data ?? []) as unknown as Opportunity[];
}

export function getPublishedOpportunities(): Promise<Opportunity[]> {
  return getActiveOpportunities({ includeExpired: true });
}

export async function getFeaturedOpportunities(): Promise<Opportunity[]> {
  const opportunities = await getActiveOpportunities();
  return opportunities.filter((opportunity) => opportunity.featured);
}

export async function getOpportunityBySlug(slug: string): Promise<Opportunity | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("opportunities")
    .select(opportunityColumns)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    reportError(`Could not load opportunity ${slug}`, error);
    return null;
  }

  return data as unknown as Opportunity | null;
}

export async function getCategories(): Promise<string[]> {
  if (!supabase) return [];

  const { data, error } = await supabase.from("categories").select("name").order("name");
  if (error) {
    reportError("Could not load categories", error);
    return [];
  }

  return (data ?? [])
    .map((category) => category.name)
    .filter((name): name is string => typeof name === "string" && name.length > 0);
}

export function hasOpportunityDataConfiguration() {
  return isSupabaseConfigured;
}

const exactCategoryGroups: Record<string, string> = {
  Sports: "Sports", Camps: "Camps", "Library Programs": "Library",
  "Arts & Culture": "Arts", "Community & Family": "Community", "Local Activities": "Local",
};

const categoryIcons: Record<string, string> = {
  Sports: "⚽", Arts: "🎨", Library: "📚", Camps: "🏕️",
  Community: "👨‍👩‍👧", Local: "📍", Other: "⭐",
};

export function getCategoryGroup(category: string | null) {
  const trimmed = category?.trim() ?? "";
  if (!trimmed) return "Other";
  if (exactCategoryGroups[trimmed]) return exactCategoryGroups[trimmed];
  const normalized = trimmed.toLowerCase();
  if (normalized.includes("library")) return "Library";
  if (normalized.includes("art") || normalized.includes("culture")) return "Arts";
  if (normalized.includes("camp")) return "Camps";
  if (["sport", "soccer", "tennis", "golf", "judo", "gymnastics", "skating", "basketball"]
    .some((keyword) => normalized.includes(keyword))) return "Sports";
  return trimmed;
}

export function getCategoryIcon(category: string | null) {
  return categoryIcons[getCategoryGroup(category)] ?? categoryIcons.Other;
}

export function getProviderName(opportunity: Opportunity) {
  return opportunity.provider_name?.trim() || "Unknown provider";
}

export function getOpportunityCost(opportunity: Opportunity) {
  if (isOpportunityFree(opportunity)) return "Free";
  if (typeof opportunity.cost_amount === "number") {
    return `$${opportunity.cost_amount.toFixed(Number.isInteger(opportunity.cost_amount) ? 0 : 2)}`;
  }
  return "Contact provider";
}

export function isOpportunityFree(opportunity: Pick<Opportunity, "cost_type" | "cost_amount">) {
  return opportunity.cost_type?.toLowerCase() === "free" || opportunity.cost_amount === 0;
}

export function getOpportunityLocation(opportunity: Opportunity) {
  return opportunity.location_name || opportunity.address || "Contact provider";
}

export function getOfficialUrl(opportunity: Opportunity) {
  return opportunity.source_url || opportunity.registration_url || "#";
}

export function formatOpportunityDate(value: string | null | undefined) {
  const date = parseLocalDate(value);
  return date
    ? new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric" }).format(date)
    : "Date unavailable";
}

export function getOutdatedReportUrl(
  opportunity: Pick<Opportunity, "slug" | "title" | "provider_name" | "city">,
  listingUrl = `/opportunities/${opportunity.slug}`
) {
  const body = [
    `Program name: ${opportunity.title}`,
    `Provider: ${opportunity.provider_name ?? ""}`,
    `City: ${opportunity.city ?? ""}`,
    `Listing URL: ${listingUrl}`,
    "", "Issue:", "Correct information:", "Your name:", "Your contact email:",
  ].join("\n");
  return buildGmailComposeUrl(`Report an Issue - ${opportunity.title}`, body);
}

export function getOpportunityCostBadgeLabel(opportunity: Pick<Opportunity, "cost_type" | "cost_amount">) {
  if (isOpportunityFree(opportunity)) return "Free!";
  if (typeof opportunity.cost_amount !== "number" || opportunity.cost_amount <= 0) return "Contact Provider";
  return `$${opportunity.cost_amount.toFixed(Number.isInteger(opportunity.cost_amount) ? 0 : 2)}`;
}

function parseLocalDate(value: string | null | undefined) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? "");
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
    ? date
    : null;
}

export function isOpportunityUpcoming(opportunity: Opportunity, today = new Date()) {
  const start = parseLocalDate(opportunity.start_date);
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  return start !== null && start.getTime() >= todayStart;
}

export function isOpportunityOngoing(
  opportunity: Pick<Opportunity, "title" | "description">
) {
  return /\b(?:ongoing|year[- ]round)\b/i.test(
    `${opportunity.title} ${opportunity.description ?? ""}`
  );
}

export function sortOpportunitiesByDate(items: readonly Opportunity[], today = new Date()) {
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  return [...items].sort((a, b) => {
    const aStart = parseLocalDate(a.start_date);
    const bStart = parseLocalDate(b.start_date);
    const aEnd = parseLocalDate(a.end_date);
    const bEnd = parseLocalDate(b.end_date);
    const aExpired = aEnd !== null
      ? aEnd.getTime() < todayStart
      : aStart !== null && aStart.getTime() < todayStart && !isOpportunityOngoing(a);
    const bExpired = bEnd !== null
      ? bEnd.getTime() < todayStart
      : bStart !== null && bStart.getTime() < todayStart && !isOpportunityOngoing(b);
    const aGroup = aExpired
      ? 2
      : isOpportunityOngoing(a) || aStart === null || aStart.getTime() < todayStart
        ? 1
        : 0;
    const bGroup = bExpired
      ? 2
      : isOpportunityOngoing(b) || bStart === null || bStart.getTime() < todayStart
        ? 1
        : 0;

    if (aGroup !== bGroup) return aGroup - bGroup;

    if (aGroup !== 1) {
      const aSortTime = aStart?.getTime();
      const bSortTime = bStart?.getTime();

      if (aSortTime !== undefined && bSortTime !== undefined && aSortTime !== bSortTime) {
        return aGroup === 2 ? bSortTime - aSortTime : aSortTime - bSortTime;
      }
    }

    return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
  });
}

export function getCategoriesByActivityCount(items: readonly Opportunity[]) {
  const counts = new Map<string, number>();
  items.forEach((item) => {
    const category = item.category?.trim();
    if (!category || category.toLowerCase() === "free") return;

    const group = getCategoryGroup(category);
    if (group.toLowerCase() === "free") return;
    counts.set(group, (counts.get(group) ?? 0) + 1);
  });
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name);
}

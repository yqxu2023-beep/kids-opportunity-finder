import type { Metadata } from "next";
import { ActivityLandingPage } from "@/components/ActivityLandingPage";
import { getActiveOpportunities, isOpportunityFree, sortOpportunitiesByDate } from "@/lib/opportunities";

export const metadata: Metadata = { title: "Free Kids Activities in Yellowknife | Kids Opportunity Finder", description: "Discover free activities, events, and programs for children and teens in Yellowknife.", alternates: { canonical: "/free-activities" } };

export default async function FreeActivitiesPage() {
  const opportunities = await getActiveOpportunities();
  return <ActivityLandingPage eyebrow="Budget-friendly fun" title="Free Kids Activities in Yellowknife" description="Find no-cost programs and events, with age ranges, dates, locations, and direct links to official information." activities={sortOpportunitiesByDate(opportunities.filter(isOpportunityFree))} />;
}

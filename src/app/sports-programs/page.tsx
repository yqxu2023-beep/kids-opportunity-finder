import type { Metadata } from "next";
import { ActivityLandingPage } from "@/components/ActivityLandingPage";
import { getActiveOpportunities, getCategoryGroup, sortOpportunitiesByDate } from "@/lib/opportunities";

export const metadata: Metadata = { title: "Kids Sports Programs in Yellowknife | Kids Opportunity Finder", description: "Find youth sports programs, clubs, lessons, and beginner-friendly activities in Yellowknife.", alternates: { canonical: "/sports-programs" } };

export default async function SportsProgramsPage() {
  const opportunities = await getActiveOpportunities();
  return <ActivityLandingPage eyebrow="Get active" title="Kids Sports Programs in Yellowknife" description="Compare local teams, lessons, clinics, and recreation programs by age, cost, schedule, and location." activities={sortOpportunitiesByDate(opportunities.filter((item) => getCategoryGroup(item.category) === "Sports"))} />;
}

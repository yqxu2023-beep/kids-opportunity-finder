import type { Metadata } from "next";
import { ActivityLandingPage } from "@/components/ActivityLandingPage";
import { getActiveOpportunities, getCategoryGroup, sortOpportunitiesByDate } from "@/lib/opportunities";

export const metadata: Metadata = { title: "Summer Camps in Yellowknife | Kids Opportunity Finder", description: "Find summer camps and school-break programs for children and teens in Yellowknife and nearby communities.", alternates: { canonical: "/summer-camps" } };

export default async function SummerCampsPage() {
  const opportunities = await getActiveOpportunities();
  const activities = sortOpportunitiesByDate(opportunities.filter((item) => getCategoryGroup(item.category) === "Camps"));
  return <ActivityLandingPage eyebrow="School-break ideas" title="Summer Camps in Yellowknife" description="Compare local day camps, seasonal programs, ages, costs, dates, and official registration links in one parent-friendly place." activities={activities} />;
}

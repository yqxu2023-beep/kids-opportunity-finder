import type { Metadata } from "next";
import { ActivityLandingPage } from "@/components/ActivityLandingPage";
import { opportunities, sortOpportunitiesByDate } from "@/lib/opportunities";

export const metadata: Metadata = { title: "Summer Camps in Yellowknife | Kids Opportunity Finder", description: "Find summer camps and school-break programs for children and teens in Yellowknife and nearby communities." };

export default function SummerCampsPage() {
  const activities = sortOpportunitiesByDate(opportunities.filter((item) => item.categoryGroup === "Camps"));
  return <ActivityLandingPage eyebrow="School-break ideas" title="Summer Camps in Yellowknife" description="Compare local day camps, seasonal programs, ages, costs, dates, and official registration links in one parent-friendly place." activities={activities} />;
}

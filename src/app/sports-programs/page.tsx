import type { Metadata } from "next";
import { ActivityLandingPage } from "@/components/ActivityLandingPage";
import { opportunities, sortOpportunitiesByDate } from "@/lib/opportunities";

export const metadata: Metadata = { title: "Kids Sports Programs in Yellowknife | Kids Opportunity Finder", description: "Find youth sports programs, clubs, lessons, and beginner-friendly activities in Yellowknife.", alternates: { canonical: "/sports-programs" } };

export default function SportsProgramsPage() {
  return <ActivityLandingPage eyebrow="Get active" title="Kids Sports Programs in Yellowknife" description="Compare local teams, lessons, clinics, and recreation programs by age, cost, schedule, and location." activities={sortOpportunitiesByDate(opportunities.filter((item) => item.categoryGroup === "Sports"))} />;
}

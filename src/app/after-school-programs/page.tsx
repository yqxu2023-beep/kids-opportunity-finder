import type { Metadata } from "next";
import { ActivityLandingPage } from "@/components/ActivityLandingPage";
import { opportunities, sortOpportunitiesByDate } from "@/lib/opportunities";

export const metadata: Metadata = { title: "After-School Programs in Yellowknife | Kids Opportunity Finder", description: "Find after-school activities and weekday programs for kids and teens in Yellowknife." };

export default function AfterSchoolProgramsPage() {
  const activities = opportunities.filter((item) => /after.?school|weekday|monday|tuesday|wednesday|thursday|friday/i.test(`${item.title} ${item.description} ${item.schedule}`));
  return <ActivityLandingPage eyebrow="Weekday activities" title="After-School Programs in Yellowknife" description="Discover programs that fit the school week, including sports, learning, arts, and community activities." activities={sortOpportunitiesByDate(activities)} />;
}

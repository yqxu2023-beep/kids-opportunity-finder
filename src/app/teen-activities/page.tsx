import type { Metadata } from "next";
import { ActivityLandingPage } from "@/components/ActivityLandingPage";
import { opportunities, sortOpportunitiesByDate } from "@/lib/opportunities";

export const metadata: Metadata = { title: "Teen Activities in Yellowknife | Kids Opportunity Finder", description: "Explore sports, arts, camps, and community programs for teens in Yellowknife.", alternates: { canonical: "/teen-activities" } };

export default function TeenActivitiesPage() {
  return <ActivityLandingPage eyebrow="For ages 13-18" title="Teen Activities in Yellowknife" description="Explore programs that welcome at least one teen age, from skill-building and sports to creative and community activities." activities={sortOpportunitiesByDate(opportunities.filter((item) => item.ageMax >= 13 && item.ageMin <= 18))} />;
}

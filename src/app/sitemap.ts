import type { MetadataRoute } from "next";
import { getActiveOpportunities } from "@/lib/opportunities";
import { getSiteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/opportunities",
  "/about",
  "/for-providers",
  "/privacy",
  "/contact",
  "/submit-activity",
  "/free-activities",
  "/summer-camps",
  "/teen-activities",
  "/sports-programs",
  "/after-school-programs",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const opportunities = await getActiveOpportunities();
  const staticPages = staticRoutes.map((route) => ({
    url: getSiteUrl(route),
  }));
  const opportunityPages = opportunities.map((opportunity) => ({
    url: getSiteUrl(`/opportunities/${opportunity.slug}`),
    ...(opportunity.updated_at
      ? { lastModified: new Date(opportunity.updated_at) }
      : {}),
  }));

  return [...staticPages, ...opportunityPages];
}

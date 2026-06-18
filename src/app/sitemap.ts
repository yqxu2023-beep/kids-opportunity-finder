import type { MetadataRoute } from "next";
import { opportunities } from "@/lib/opportunities";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = staticRoutes.map((route) => ({
    url: getSiteUrl(route),
  }));
  const opportunityPages = opportunities.map((opportunity) => ({
    url: getSiteUrl(`/opportunities/${opportunity.id}`),
    ...(opportunity.lastUpdated
      ? { lastModified: new Date(`${opportunity.lastUpdated}T00:00:00`) }
      : {}),
  }));

  return [...staticPages, ...opportunityPages];
}

export const siteConfig = {
  siteName: "Kids Opportunity Finder",
  siteUrl: "https://www.kidsopportunityfinder.com",
  contactEmail: "kidsopportunityfinder@gmail.com",
  description:
    "Helping families discover kids and youth programs, camps, events, and learning opportunities.",
} as const;

export function getSiteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}

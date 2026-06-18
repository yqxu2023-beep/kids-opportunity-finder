import type { Metadata } from "next";
import { OpportunitiesClient } from "./OpportunitiesClient";
import {
  getActiveOpportunities,
  hasOpportunityDataConfiguration,
} from "@/lib/opportunities";

export const metadata: Metadata = {
  title: "Browse Opportunities | Kids Opportunity Finder",
  description: "Browse kids and youth programs, camps, events, and learning opportunities.",
  alternates: { canonical: "/opportunities" },
};

type OpportunitiesPageProps = {
  searchParams: Promise<{
    search?: string | string[];
    age?: string | string[];
    category?: string | string[];
    free?: string | string[];
  }>;
};

function readFirstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function OpportunitiesPage({ searchParams }: OpportunitiesPageProps) {
  const params = await searchParams;
  const initialSearch = readFirstParam(params.search);
  const initialAge = readFirstParam(params.age);
  const initialCategory = readFirstParam(params.category);
  const initialFreeOnly = readFirstParam(params.free) === "true";
  const opportunities = await getActiveOpportunities({ includeExpired: true });

  return (
    <OpportunitiesClient
      initialSearch={initialSearch}
      initialAge={initialAge}
      initialCategory={initialCategory}
      initialFreeOnly={initialFreeOnly}
      opportunities={opportunities}
      dataUnavailable={!hasOpportunityDataConfiguration()}
    />
  );
}

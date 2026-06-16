import opportunitiesData from "@/data/opportunities.json";
import type { Opportunity } from "@/types/opportunity";

export const opportunities = opportunitiesData as Opportunity[];

export function getOpportunityById(id: string) {
  return opportunities.find((opportunity) => opportunity.id === id);
}

"use client";

import { useEffect, useState } from "react";
import { OpportunityCard } from "@/components/OpportunityCard";
import {
  getSavedOpportunitySlugs,
  savedActivitiesChangedEvent,
} from "@/components/SaveActivityButton";
import type { Opportunity } from "@/types/opportunity";

export function SavedOpportunities({ opportunities }: { opportunities: Opportunity[] }) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const updateSavedSlugs = () => setSavedSlugs(getSavedOpportunitySlugs());
    updateSavedSlugs();
    window.addEventListener("storage", updateSavedSlugs);
    window.addEventListener(savedActivitiesChangedEvent, updateSavedSlugs);
    return () => {
      window.removeEventListener("storage", updateSavedSlugs);
      window.removeEventListener(savedActivitiesChangedEvent, updateSavedSlugs);
    };
  }, []);

  const savedOpportunities = opportunities.filter((opportunity) =>
    savedSlugs.includes(opportunity.slug)
  );

  if (savedOpportunities.length === 0) {
    return <p className="mt-6 text-slate-700">No saved activities yet.</p>;
  }

  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {savedOpportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}

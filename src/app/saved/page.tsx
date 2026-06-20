import type { Metadata } from "next";
import { getPublishedOpportunities } from "@/lib/opportunities";
import { SavedOpportunities } from "./SavedOpportunities";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Saved Activities | Kids Opportunity Finder",
  description: "View your saved kids and youth activities.",
  alternates: { canonical: "/saved" },
};

export default async function SavedPage() {
  const opportunities = await getPublishedOpportunities();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        Saved Activities
      </h1>
      <SavedOpportunities opportunities={opportunities} />
    </main>
  );
}

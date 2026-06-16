"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/OpportunityCard";
import { opportunities } from "@/lib/opportunities";

type OpportunitiesClientProps = {
  initialSearch: string;
  initialAge: string;
  initialCategory: string;
  initialFreeOnly: boolean;
};

export function OpportunitiesClient({
  initialSearch,
  initialAge,
  initialCategory,
  initialFreeOnly,
}: OpportunitiesClientProps) {
  const [keyword, setKeyword] = useState(initialSearch);
  const [age, setAge] = useState(initialAge);
  const [category, setCategory] = useState(initialCategory);
  const [freeOnly, setFreeOnly] = useState(initialFreeOnly);

  const categories = useMemo(() => {
    return Array.from(new Set(opportunities.map((opportunity) => opportunity.category))).sort();
  }, []);

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const searchableText = [
      opportunity.title,
      opportunity.provider,
      opportunity.category,
      opportunity.description,
      opportunity.city,
    ]
      .join(" ")
      .toLowerCase();

    const matchesKeyword = normalizedKeyword.length === 0 || searchableText.includes(normalizedKeyword);
    const numericAge = Number(age);
    const matchesAge = age === "" || (numericAge >= opportunity.ageMin && numericAge <= opportunity.ageMax);
    const matchesCategory = category === "" || opportunity.category === category;
    const matchesFree = !freeOnly || opportunity.isFree;

    return matchesKeyword && matchesAge && matchesCategory && matchesFree;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-700">Browse</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">Opportunities</h1>
        </div>
        <p className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
          {filteredOpportunities.length} of {opportunities.length} opportunities
        </p>
      </div>

      <section className="mt-6 rounded-[1.5rem] border border-orange-100 bg-white p-4 shadow-[0_16px_42px_rgba(194,65,12,0.10)]">
        <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr_0.9fr_auto] md:items-end">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Search</span>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Try STEM, library, soccer, Yellowknife"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-orange-50/60 px-4 py-3 text-slate-950 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Child age</span>
            <input
              value={age}
              onChange={(event) => setAge(event.target.value)}
              inputMode="numeric"
              min="0"
              max="18"
              type="number"
              placeholder="Any"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-orange-50/60 px-4 py-3 text-slate-950 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-orange-50/60 px-4 py-3 text-slate-950 outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
            >
              <option value="">All categories</option>
              {categories.map((categoryName) => (
                <option key={categoryName} value={categoryName}>
                  {categoryName}
                </option>
              ))}
            </select>
          </label>

          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <input
              checked={freeOnly}
              onChange={(event) => setFreeOnly(event.target.checked)}
              type="checkbox"
              className="h-5 w-5 rounded border-slate-300 text-emerald-700"
            />
            <span className="text-sm font-bold text-slate-800">Free only</span>
          </label>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </section>

      {filteredOpportunities.length === 0 ? (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-amber-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-black text-slate-950">No matches yet</h2>
          <p className="mt-2 text-slate-700">Try a different keyword, age, category, or free filter.</p>
        </div>
      ) : null}
    </main>
  );
}

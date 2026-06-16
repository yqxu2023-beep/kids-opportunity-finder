"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function HomeSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [age, setAge] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedKeyword = keyword.trim();
    const params = new URLSearchParams();

    if (trimmedKeyword) {
      params.set("search", trimmedKeyword);
    }

    if (age) {
      params.set("age", age);
    }

    if (freeOnly) {
      params.set("free", "true");
    }

    const query = params.toString();
    const target = query ? `/opportunities?${query}` : "/opportunities";

    router.push(target);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-orange-100 bg-white p-3 shadow-[0_24px_70px_rgba(194,65,12,0.16)]"
    >
      <div className="grid gap-3 md:grid-cols-[1fr_9rem_auto_auto] md:items-center">
        <div>
          <label className="sr-only" htmlFor="home-search">
            Search opportunities
          </label>
          <input
            id="home-search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search activities, camps, sports, STEM, library programs..."
            className="min-h-14 w-full rounded-[1.35rem] border border-slate-200 bg-rose-50/50 px-5 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
        </div>
        <label className="block">
          <span className="sr-only">Child age</span>
          <input
            value={age}
            onChange={(event) => setAge(event.target.value)}
            inputMode="numeric"
            min="0"
            max="18"
            type="number"
            placeholder="Age"
            className="min-h-14 w-full rounded-[1.35rem] border border-slate-200 bg-orange-50/60 px-5 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
        </label>
        <label className="flex min-h-14 items-center justify-between gap-3 rounded-[1.35rem] border border-slate-200 bg-white px-5">
          <span className="text-sm font-black text-slate-800">Free Only</span>
          <input
            checked={freeOnly}
            onChange={(event) => setFreeOnly(event.target.checked)}
            type="checkbox"
            className="h-5 w-5 rounded border-slate-300 accent-orange-600"
          />
        </label>
        <button
          type="submit"
          className="min-h-14 rounded-[1.35rem] bg-orange-600 px-8 text-base font-black text-white shadow-sm transition hover:bg-orange-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}

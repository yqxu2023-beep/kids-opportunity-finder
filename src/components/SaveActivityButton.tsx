"use client";

import { useEffect, useState } from "react";

export const savedActivitiesStorageKey = "savedOpportunitySlugs";
export const savedActivitiesChangedEvent = "saved-activities-changed";

export function getSavedOpportunitySlugs() {
  if (typeof window === "undefined") return [];

  try {
    const value = JSON.parse(window.localStorage.getItem(savedActivitiesStorageKey) ?? "[]");
    return Array.isArray(value)
      ? value.filter((slug): slug is string => typeof slug === "string")
      : [];
  } catch {
    return [];
  }
}

export function SaveActivityButton({ slug }: { slug: string }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const updateSavedState = () => setIsSaved(getSavedOpportunitySlugs().includes(slug));
    updateSavedState();
    window.addEventListener("storage", updateSavedState);
    window.addEventListener(savedActivitiesChangedEvent, updateSavedState);
    return () => {
      window.removeEventListener("storage", updateSavedState);
      window.removeEventListener(savedActivitiesChangedEvent, updateSavedState);
    };
  }, [slug]);

  function toggleSaved() {
    const savedSlugs = getSavedOpportunitySlugs();
    const nextSlugs = savedSlugs.includes(slug)
      ? savedSlugs.filter((savedSlug) => savedSlug !== slug)
      : [...savedSlugs, slug];

    window.localStorage.setItem(savedActivitiesStorageKey, JSON.stringify(nextSlugs));
    window.dispatchEvent(new Event(savedActivitiesChangedEvent));
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      aria-pressed={isSaved}
      className="relative z-20 inline-flex min-h-9 items-center justify-center rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
    >
      {isSaved ? "♥ Saved" : "♡ Save"}
    </button>
  );
}

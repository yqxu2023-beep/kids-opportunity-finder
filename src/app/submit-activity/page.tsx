import type { Metadata } from "next";
import { SubmitActivityForm } from "@/components/SubmitActivityForm";

export const metadata: Metadata = { title: "Submit an Activity | Kids Opportunity Finder", description: "Providers can submit a children's activity or youth program for review.", alternates: { canonical: "/submit-activity" } };

export default function SubmitActivityPage() {
  return <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6"><p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">For providers</p><h1 className="mt-3 text-4xl font-black text-slate-950">Submit an Activity</h1><p className="mt-4 mb-8 text-lg leading-8 text-slate-700">Share a public program with local families. We review submissions before publishing and may contact you to confirm details.</p><SubmitActivityForm /></main>;
}

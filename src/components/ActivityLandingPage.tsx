import Link from "next/link";
import { OpportunityCard } from "@/components/OpportunityCard";
import type { Opportunity } from "@/types/opportunity";

type ActivityLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  activities: Opportunity[];
};

export function ActivityLandingPage({ eyebrow, title, description, activities }: ActivityLandingPageProps) {
  return (
    <main>
      <section className="bg-[linear-gradient(135deg,#fff7ed,#ffe4e6)]">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-slate-950">Explore {activities.length} activities</h2>
          <Link href="/opportunities" className="text-sm font-black text-orange-700 hover:text-orange-600">Browse all</Link>
        </div>
        {activities.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => <OpportunityCard key={activity.id} opportunity={activity} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-orange-300 bg-white p-8 text-center">
            <h2 className="text-xl font-black text-slate-950">New listings are coming</h2>
            <p className="mt-2 text-slate-700">Providers can help families by sharing an activity with us.</p>
            <Link href="/submit-activity" className="mt-5 inline-flex rounded-full bg-orange-600 px-5 py-3 font-black text-white">Submit an activity</Link>
          </div>
        )}
      </section>
    </main>
  );
}

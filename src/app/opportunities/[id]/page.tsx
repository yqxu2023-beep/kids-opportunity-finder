import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryIcon, getOpportunityById, opportunities } from "@/lib/opportunities";

type OpportunityDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return opportunities.map((opportunity) => ({
    id: opportunity.id,
  }));
}

export async function generateMetadata({ params }: OpportunityDetailPageProps) {
  const { id } = await params;
  const opportunity = getOpportunityById(id);

  if (!opportunity) {
    return {
      title: "Opportunity Not Found",
    };
  }

  return {
    title: `${opportunity.title} | Kids Opportunity Finder`,
    description: opportunity.description,
  };
}

export default async function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const { id } = await params;
  const opportunity = getOpportunityById(id);

  if (!opportunity) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link href="/opportunities" className="text-sm font-bold text-sky-800 hover:text-sky-600">
        Back to opportunities
      </Link>

      <article className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
            {getCategoryIcon(opportunity.categoryGroup)} {opportunity.category}
          </span>
          {opportunity.isFree ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              Free
            </span>
          ) : (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              Paid
            </span>
          )}
        </div>

        <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
          {opportunity.title}
        </h1>
        <p className="mt-3 text-lg font-semibold text-slate-600">{opportunity.provider}</p>
        <p className="mt-6 text-lg leading-8 text-slate-700">{opportunity.description}</p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-sky-50 p-4">
            <dt className="text-sm font-black uppercase tracking-wide text-sky-800">Ages</dt>
            <dd className="mt-1 text-lg font-bold text-slate-950">
              {opportunity.ageMin}-{opportunity.ageMax}
            </dd>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4">
            <dt className="text-sm font-black uppercase tracking-wide text-emerald-800">Cost</dt>
            <dd className="mt-1 text-lg font-bold text-slate-950">{opportunity.cost}</dd>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <dt className="text-sm font-black uppercase tracking-wide text-amber-800">Schedule</dt>
            <dd className="mt-1 text-lg font-bold text-slate-950">{opportunity.schedule}</dd>
          </div>
          <div className="rounded-lg bg-rose-50 p-4">
            <dt className="text-sm font-black uppercase tracking-wide text-rose-800">Location</dt>
            <dd className="mt-1 text-lg font-bold text-slate-950">
              {opportunity.location}, {opportunity.city}
            </dd>
          </div>
        </dl>

        <a
          href={opportunity.registrationUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-orange-100 bg-rose-50 px-6 py-3 text-base font-bold text-orange-700 transition hover:border-orange-600 hover:bg-orange-600 hover:text-white sm:w-auto"
        >
          Open Registration Link
        </a>
      </article>
    </main>
  );
}

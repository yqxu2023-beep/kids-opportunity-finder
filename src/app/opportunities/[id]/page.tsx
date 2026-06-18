import Link from "next/link";
import { notFound } from "next/navigation";
import { CostBadge, InfoIcon } from "@/components/OpportunityUi";
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

      <article className="mt-6 rounded-[1.5rem] border border-orange-100 bg-white p-6 shadow-[0_16px_42px_rgba(194,65,12,0.10)] sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
            {getCategoryIcon(opportunity.categoryGroup)} {opportunity.category}
          </span>
          <CostBadge isFree={opportunity.isFree} />
        </div>

        <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
          {opportunity.title}
        </h1>
        <p className="mt-3 text-lg font-semibold text-slate-600">{opportunity.provider}</p>
        <p className="mt-6 text-lg leading-8 text-slate-700">{opportunity.description}</p>

        <dl className="mt-8 grid gap-5 rounded-[1.25rem] border border-sky-100 bg-slate-50 p-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <InfoIcon name="age" />
            <div>
              <dt className="text-sm font-bold text-slate-500">Ages</dt>
              <dd className="font-bold text-slate-950">{opportunity.ageMin}-{opportunity.ageMax}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <InfoIcon name="calendar" />
            <div>
              <dt className="text-sm font-bold text-slate-500">Start date</dt>
              <dd className="font-bold text-slate-950">{opportunity.startDate ?? opportunity.schedule}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <InfoIcon name="cost" />
            <div>
              <dt className="text-sm font-bold text-slate-500">Cost</dt>
              <dd className="font-bold text-slate-950">{opportunity.cost}</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <InfoIcon name="location" />
            <div>
              <dt className="text-sm font-bold text-slate-500">Location</dt>
              <dd className="font-bold text-slate-950">{opportunity.location}, {opportunity.city}</dd>
            </div>
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

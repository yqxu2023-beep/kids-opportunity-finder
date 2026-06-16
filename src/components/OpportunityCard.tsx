import Link from "next/link";
import type { Opportunity } from "@/types/opportunity";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className="group flex h-full flex-col justify-between rounded-[1.35rem] border border-orange-100 bg-white p-5 shadow-[0_14px_34px_rgba(194,65,12,0.10)] transition duration-200 hover:translate-y-1 hover:border-orange-500 hover:shadow-[0_18px_42px_rgba(194,65,12,0.14)] focus:outline-none focus:ring-4 focus:ring-orange-100"
    >
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
            {opportunity.category}
          </span>
          {opportunity.isFree ? (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              Free
            </span>
          ) : null}
        </div>
        <h2 className="text-xl font-black text-slate-950">{opportunity.title}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-600">{opportunity.provider}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">
          {opportunity.description}
        </p>
      </div>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="font-bold text-slate-500">Ages</dt>
            <dd className="text-slate-900">
              {opportunity.ageMin}-{opportunity.ageMax}
            </dd>
          </div>
          <div>
            <dt className="font-bold text-slate-500">City</dt>
            <dd className="text-slate-900">{opportunity.city}</dd>
          </div>
        </dl>
        <span className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-rose-50 px-4 py-3 text-sm font-bold text-orange-700 transition group-hover:bg-orange-600 group-hover:text-white">
          View Details <span className="ml-2" aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}

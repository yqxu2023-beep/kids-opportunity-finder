import Link from "next/link";
import { InfoIcon } from "@/components/OpportunityUi";
import { OpportunityStickerBadge } from "@/components/OpportunityStickerBadge";
import { ReportIssueLink } from "@/components/ReportIssueLink";
import { formatOpportunityDate, getCategoryIcon, getOfficialUrl, getOpportunityCost, getProviderName } from "@/lib/opportunities";
import type { Opportunity } from "@/types/opportunity";

type OpportunityCardProps = { opportunity: Opportunity };

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-orange-100 bg-white shadow-[0_14px_34px_rgba(194,65,12,0.10)] transition duration-200 hover:translate-y-1 hover:border-orange-500 hover:shadow-[0_18px_42px_rgba(194,65,12,0.14)] focus:outline-none focus:ring-4 focus:ring-orange-100"
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
            {getCategoryIcon(opportunity.category)} {opportunity.category ?? "Other"}
          </span>
          <OpportunityStickerBadge opportunity={opportunity} />
        </div>

        <h2 className="text-xl font-black text-slate-950">
          <Link href={`/opportunities/${opportunity.slug}`} className="after:absolute after:inset-0">
            {opportunity.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          {getProviderName(opportunity)} <span className="text-slate-300">|</span> {opportunity.city ?? "Unknown"}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">{opportunity.description}</p>

        <dl className="mt-5 grid gap-3 rounded-2xl border border-sky-100 bg-slate-50 p-4 text-sm">
          <InfoRow icon="age" label="Ages" value={`Ages ${opportunity.age_min ?? 0}-${opportunity.age_max ?? 18}`} />
          <InfoRow icon="calendar" label="Start date" value={formatOpportunityDate(opportunity.start_date)} />
          <InfoRow icon="cost" label="Cost" value={getOpportunityCost(opportunity)} />
          <InfoRow icon="location" label="City" value={opportunity.city ?? "Unknown"} />
        </dl>
        <div className="relative z-10 mt-4 border-t border-slate-100 pt-4 text-xs font-bold text-slate-600">
          <p>Last updated: {formatOpportunityDate(opportunity.updated_at)}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
            <a href={getOfficialUrl(opportunity)} target="_blank" rel="noreferrer" className="text-sky-800 underline decoration-sky-200 underline-offset-4 hover:text-sky-600">
              Source / Official link
            </a>
            <ReportIssueLink opportunity={opportunity} className="text-rose-700 underline decoration-rose-200 underline-offset-4 hover:text-rose-600">
              Report outdated info
            </ReportIssueLink>
          </div>
        </div>
      </div>

      <Link href={`/opportunities/${opportunity.slug}`} className="relative z-10 inline-flex w-full items-center justify-center bg-rose-50 px-4 py-3 text-sm font-bold text-orange-700 transition group-hover:bg-orange-600 group-hover:text-white">
        View Details <span className="ml-2" aria-hidden="true">&rarr;</span>
      </Link>
    </article>
  );
}

function InfoRow({ icon, label, value }: { icon: "age" | "calendar" | "cost" | "location"; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <InfoIcon name={icon} />
      <div><dt className="sr-only">{label}</dt><dd className="font-semibold text-slate-800">{value}</dd></div>
    </div>
  );
}

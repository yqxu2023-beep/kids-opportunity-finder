import { ReportIssueLink } from "@/components/ReportIssueLink";
import { formatOpportunityDate, getOfficialUrl } from "@/lib/opportunities";
import type { Opportunity } from "@/types/opportunity";

export function ActivityTrustLinks({
  opportunity,
  pillActions = false,
  showReportLink = true,
}: {
  opportunity: Opportunity;
  pillActions?: boolean;
  showReportLink?: boolean;
}) {
  return (
    <div className="text-xs font-bold text-slate-600">
      <p>Last updated: {formatOpportunityDate(opportunity.updated_at)}</p>
      <div className={`mt-2 flex flex-wrap ${pillActions ? "gap-2" : "gap-x-4 gap-y-2"}`}>
        <a
          href={getOfficialUrl(opportunity)}
          target="_blank"
          rel="noreferrer"
          className={pillActions
            ? "inline-flex min-h-9 items-center rounded-full bg-sky-100 px-4 text-sky-900 transition hover:bg-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            : "text-sky-800 underline decoration-sky-200 underline-offset-4 hover:text-sky-600"}
        >
          {pillActions ? "Official Source" : "Source / Official link"}
        </a>
        {showReportLink && (
          <ReportIssueLink
            opportunity={opportunity}
            className={pillActions
              ? "inline-flex min-h-9 items-center rounded-full border border-slate-300 bg-white px-4 text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              : "text-rose-700 underline decoration-rose-200 underline-offset-4 hover:text-rose-600"}
          >
            {pillActions ? "Report an issue" : "Report outdated info"}
          </ReportIssueLink>
        )}
      </div>
    </div>
  );
}

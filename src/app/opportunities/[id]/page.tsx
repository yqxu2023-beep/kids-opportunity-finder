import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityTrustLinks } from "@/components/ActivityTrustLinks";
import { CostBadge, InfoIcon } from "@/components/OpportunityUi";
import { ReportIssueLink } from "@/components/ReportIssueLink";
import { contactEmail } from "@/lib/email";
import { getSiteUrl, siteConfig } from "@/lib/site";
import {
  getCategoryIcon,
  getOpportunityById,
  opportunities,
} from "@/lib/opportunities";

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
    title: `${opportunity.title} | ${siteConfig.siteName}`,
    description: opportunity.description,
    alternates: { canonical: `/opportunities/${opportunity.id}` },
    openGraph: {
      title: opportunity.title,
      description: opportunity.description,
      url: getSiteUrl(`/opportunities/${opportunity.id}`),
    },
  };
}

export default async function OpportunityDetailPage({ params }: OpportunityDetailPageProps) {
  const { id } = await params;
  const opportunity = getOpportunityById(id);

  if (!opportunity) {
    notFound();
  }

  const locationLines = opportunity.location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (locationLines.at(-1)?.toLocaleLowerCase() !== opportunity.city.toLocaleLowerCase()) {
    locationLines.push(opportunity.city);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-7">
      <article className="rounded-[1.5rem] border border-orange-100 bg-white p-5 shadow-[0_16px_42px_rgba(194,65,12,0.10)] sm:p-7">
        <Link
          href="/opportunities"
          className="inline-flex text-sm font-bold text-sky-800 transition hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          &larr; Back to all opportunities
        </Link>

        <div className="mt-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
            {getCategoryIcon(opportunity.categoryGroup)} {opportunity.category}
          </span>
          {opportunity.isFree && <CostBadge isFree label="FREE" />}
        </div>

        <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.1] text-slate-950">
          {opportunity.title}
        </h1>
        <p className="mt-2 text-base font-semibold text-slate-600 sm:text-lg">{opportunity.provider}</p>
        <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">{opportunity.description}</p>

        <dl className="mt-5 grid gap-4 rounded-[1.25rem] border border-sky-100 bg-slate-50 p-4 sm:grid-cols-2 sm:p-5">
          <div className="flex items-start gap-3">
            <InfoIcon name="age" />
            <div>
              <dt className="text-sm font-bold text-slate-500">Ages</dt>
              <dd className="font-bold text-slate-950">{opportunity.ageMin}-{opportunity.ageMax}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <InfoIcon name="calendar" />
            <div>
              <dt className="text-sm font-bold text-slate-500">Start date</dt>
              <dd className="font-bold text-slate-950">{opportunity.startDate ?? opportunity.schedule}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <InfoIcon name="cost" />
            <div>
              <dt className="text-sm font-bold text-slate-500">Cost</dt>
              <dd className="font-bold text-slate-950">{opportunity.cost}</dd>
            </div>
          </div>
          <div className="flex min-w-0 items-start gap-3">
            <InfoIcon name="location" />
            <div className="min-w-0">
              <dt className="text-sm font-bold text-slate-500">Location</dt>
              <dd className="font-bold leading-6 text-slate-950">
                {locationLines.map((line) => <span key={line} className="block break-words">{line}</span>)}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <ActivityTrustLinks opportunity={opportunity} pillActions showReportLink={false} />
        </div>

        <a
          href={opportunity.registrationUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-orange-600 px-7 py-3 text-base font-black text-white shadow-[0_8px_20px_rgba(234,88,12,0.28)] transition hover:bg-orange-700 hover:shadow-[0_10px_24px_rgba(194,65,12,0.34)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:w-auto"
        >
          Open Registration Link &rarr;
        </a>

        <footer className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-600">
          <span>See something that needs updating? </span>
          <ReportIssueLink
            opportunity={opportunity}
            className="font-bold text-rose-700 underline decoration-rose-200 underline-offset-4 transition hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            Report an Issue
          </ReportIssueLink>
          <span className="mt-2 block">
            Email fallback:{" "}
            <a className="font-bold underline underline-offset-4" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </span>
        </footer>
      </article>
    </main>
  );
}

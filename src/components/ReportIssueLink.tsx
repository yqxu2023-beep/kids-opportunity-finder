"use client";

import type { MouseEvent, ReactNode } from "react";
import { getOutdatedReportUrl } from "@/lib/opportunities";
import type { Opportunity } from "@/types/opportunity";

export function ReportIssueLink({
  opportunity,
  children,
  className,
}: {
  opportunity: Opportunity;
  children: ReactNode;
  className: string;
}) {
  function includeCurrentListingUrl(event: MouseEvent<HTMLAnchorElement>) {
    const listingUrl = `${window.location.origin}/opportunities/${opportunity.slug}`;
    event.currentTarget.href = getOutdatedReportUrl(opportunity, listingUrl);
  }

  return (
    <a
      href={getOutdatedReportUrl(opportunity)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={includeCurrentListingUrl}
    >
      {children}
    </a>
  );
}

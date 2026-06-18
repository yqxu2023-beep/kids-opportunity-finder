import type { CSSProperties } from "react";
import { getOpportunityCostBadgeLabel } from "@/lib/opportunities";
import type { Opportunity } from "@/types/opportunity";

type OpportunityStickerBadgeProps = {
  opportunity: Pick<Opportunity, "cost" | "isFree">;
};

const badgeColors: Record<"free" | "price" | "contact", CSSProperties> = {
  free: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
    border: "1px solid #22C55E",
    boxShadow: "0 4px 10px rgba(34, 197, 94, 0.24)",
  },
  price: {
    backgroundColor: "#FFD43B",
    color: "#92400E",
    border: "1px solid #F59E0B",
    boxShadow: "0 4px 10px rgba(245, 158, 11, 0.28)",
  },
  contact: {
    backgroundColor: "#EDE9FE",
    color: "#5B21B6",
    border: "1px solid #A78BFA",
    boxShadow: "0 4px 10px rgba(139, 92, 246, 0.24)",
  },
};

export function OpportunityStickerBadge({ opportunity }: OpportunityStickerBadgeProps) {
  const label = getOpportunityCostBadgeLabel(opportunity);
  const badgeType = opportunity.isFree ? "free" : label.startsWith("$") ? "price" : "contact";

  return (
    <span
      className="font-display inline-flex shrink-0 items-center whitespace-nowrap px-3 py-1 text-xs"
      style={{
        ...badgeColors[badgeType],
        transform: "rotate(-5deg)",
        borderRadius: "9999px",
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}

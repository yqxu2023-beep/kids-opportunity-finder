import type { CSSProperties, ReactNode } from "react";

type InfoIconName = "age" | "calendar" | "cost" | "location";

const iconPaths: Record<InfoIconName, ReactNode> = {
  age: <><circle cx="12" cy="7" r="3" /><path d="M6.5 20v-1.5a5.5 5.5 0 0 1 11 0V20M9 13.8V20M15 13.8V20" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
  cost: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5c-.7-.7-1.8-1.1-3.2-1.1-1.8 0-3.1.9-3.1 2.3 0 3.5 6.4 1.6 6.4 5.2 0 1.4-1.3 2.4-3.3 2.4-1.5 0-2.8-.5-3.7-1.4M12 5.5v13" /></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
};

const iconColors: Record<InfoIconName, CSSProperties> = {
  age: { backgroundColor: "#E0F2FE", color: "#0284C7" },
  calendar: { backgroundColor: "#F3E8FF", color: "#7E22CE" },
  cost: { backgroundColor: "#DCFCE7", color: "#15803D" },
  location: { backgroundColor: "#FFEDD5", color: "#EA580C" },
};

export function InfoIcon({ name }: { name: InfoIconName }) {
  return (
    <span
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-sm"
      style={iconColors[name]}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" className="h-4 w-4">
        {iconPaths[name]}
      </svg>
    </span>
  );
}

export function CostBadge({
  isFree,
  label,
  sticker = false,
}: {
  isFree: boolean;
  label?: string;
  sticker?: boolean;
}) {
  const colorClasses = sticker
    ? "border-[#F59E0B] bg-[#FFD43B] text-[#92400E] shadow-[0_4px_10px_rgba(245,158,11,0.28)]"
    : isFree
      ? "border-amber-400 bg-amber-200 text-amber-950 shadow-amber-200"
      : "border-orange-300 bg-orange-100 text-orange-800 shadow-orange-100";
  const shapeClasses = sticker ? "-rotate-[5deg] font-bold" : "-rotate-2 font-black";

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${shapeClasses} ${colorClasses}`}>
      {label ?? (isFree ? "Free" : "Contact Provider")}
    </span>
  );
}

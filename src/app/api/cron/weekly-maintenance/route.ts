import { NextRequest, NextResponse } from "next/server";
import { createMaintenanceClient } from "@/lib/supabase-maintenance";

export const dynamic = "force-dynamic";

const ONGOING_CATEGORIES = new Set(["ongoing", "drop-in", "drop in"]);

function yellowknifeDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Yellowknife",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createMaintenanceClient({ requireServiceRole: true });
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase maintenance credentials are not configured" },
      { status: 503 },
    );
  }

  const today = yellowknifeDate();
  const { data: ended, error: endedError } = await supabase
    .from("opportunities")
    .update({ status: "archived" })
    .eq("status", "published")
    .not("end_date", "is", null)
    .lt("end_date", today)
    .select("id");

  if (endedError) return NextResponse.json({ ok: false, error: endedError.message }, { status: 500 });

  const { data: openEnded, error: openEndedError } = await supabase
    .from("opportunities")
    .select("id,category")
    .eq("status", "published")
    .is("end_date", null)
    .not("start_date", "is", null)
    .lt("start_date", today);

  if (openEndedError) {
    return NextResponse.json({ ok: false, error: openEndedError.message }, { status: 500 });
  }

  const openEndedIds = (openEnded ?? [])
    .filter(({ category }) => !ONGOING_CATEGORIES.has((category ?? "").trim().toLowerCase()))
    .map(({ id }) => id);

  if (openEndedIds.length > 0) {
    const { error } = await supabase
      .from("opportunities")
      .update({ status: "archived" })
      .eq("status", "published")
      .in("id", openEndedIds);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const { data: sources, error: sourcesError } = await supabase
    .from("sources")
    .select("id")
    .eq("active", true)
    .eq("check_frequency", "weekly");

  if (sourcesError) return NextResponse.json({ ok: false, error: sourcesError.message }, { status: 500 });

  const sourceIds = (sources ?? []).map(({ id }) => id);
  if (sourceIds.length > 0) {
    const checkedAt = new Date().toISOString();
    const { error } = await supabase
      .from("sources")
      .update({ last_checked_at: checkedAt, updated_at: checkedAt })
      .in("id", sourceIds);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    archivedExpired: (ended?.length ?? 0) + openEndedIds.length,
    sourcesChecked: sourceIds.length,
    linksFlagged: 0,
  });
}

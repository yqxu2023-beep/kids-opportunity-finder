import { createMaintenanceClient } from "@/lib/supabase-maintenance";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ReviewOpportunity = {
  id: string; title: string; provider_name: string | null; category: string | null;
  age_min: number | null; age_max: number | null; start_date: string | null; end_date: string | null;
  city: string | null; status: string; source_url: string | null; registration_url: string | null;
  last_checked_at: string | null; last_verified_at: string | null; review_note: string | null;
};

const columns = [
  "id", "title", "provider_name", "category", "age_min", "age_max", "start_date", "end_date",
  "city", "status", "source_url", "registration_url", "last_checked_at", "last_verified_at", "review_note",
].join(",");

function dateOnly(date: Date) { return date.toISOString().slice(0, 10); }

function OpportunityTable({ rows }: { rows: ReviewOpportunity[] }) {
  if (rows.length === 0) return <p className="mt-3 text-sm text-slate-500">No opportunities in this section.</p>;
  const labels = ["Title", "Provider", "Category", "Ages", "Start", "End", "City", "Status", "Source", "Registration", "Last checked", "Last verified", "Review note"];
  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-[1500px] text-left text-xs">
        <thead className="bg-slate-100 text-slate-700"><tr>{labels.map((label) => <th key={label} className="px-3 py-2 font-bold">{label}</th>)}</tr></thead>
        <tbody className="divide-y divide-slate-200 bg-white align-top">
          {rows.map((row) => <tr key={row.id}>
            <td className="max-w-64 px-3 py-2 font-semibold">{row.title}</td>
            <td className="px-3 py-2">{row.provider_name ?? "-"}</td><td className="px-3 py-2">{row.category ?? "-"}</td>
            <td className="px-3 py-2">{row.age_min ?? "?"}-{row.age_max ?? "?"}</td><td className="px-3 py-2">{row.start_date ?? "-"}</td>
            <td className="px-3 py-2">{row.end_date ?? "-"}</td><td className="px-3 py-2">{row.city ?? "-"}</td><td className="px-3 py-2 font-semibold">{row.status}</td>
            <td className="px-3 py-2">{row.source_url ? <a className="text-blue-700 underline" href={row.source_url} target="_blank" rel="noreferrer">Open source</a> : "-"}</td>
            <td className="px-3 py-2">{row.registration_url ? <a className="text-blue-700 underline" href={row.registration_url} target="_blank" rel="noreferrer">Open registration</a> : "-"}</td>
            <td className="px-3 py-2">{row.last_checked_at ?? "-"}</td><td className="px-3 py-2">{row.last_verified_at ?? "-"}</td>
            <td className="max-w-72 whitespace-pre-wrap px-3 py-2">{row.review_note ?? "-"}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default async function AdminReviewPage() {
  const supabase = createMaintenanceClient();
  let rows: ReviewOpportunity[] = [];
  let errorMessage: string | null = null;
  if (!supabase) errorMessage = "Supabase is not configured for this environment.";
  else {
    const { data, error } = await supabase.from("opportunities").select(columns).in("status", ["draft", "needs_review", "published"]).order("updated_at", { ascending: false });
    if (error) errorMessage = error.message; else rows = (data ?? []) as unknown as ReviewOpportunity[];
  }

  const now = new Date();
  const today = dateOnly(now);
  const inSevenDays = dateOnly(new Date(now.getTime() + 7 * 86_400_000));
  const thirtyDaysAgo = now.getTime() - 30 * 86_400_000;
  const sections = [
    { title: "Draft opportunities", rows: rows.filter((row) => row.status === "draft") },
    { title: "Needs review", rows: rows.filter((row) => row.status === "needs_review") },
    { title: "Expiring soon", rows: rows.filter((row) => row.status === "published" && row.end_date !== null && row.end_date >= today && row.end_date <= inSevenDays) },
    { title: "Missing important information", rows: rows.filter((row) => row.age_min === null || row.age_max === null || row.start_date === null || !row.registration_url?.trim() || !row.source_url?.trim()) },
    { title: "Old verification", rows: rows.filter((row) => row.status === "published" && (row.last_verified_at === null || new Date(row.last_verified_at).getTime() < thirtyDaysAgo)) },
  ];

  return <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">
    <h1 className="text-3xl font-bold text-slate-950">Opportunity review</h1>
    <p className="mt-2 text-sm text-slate-600">Read-only maintenance queues. Publishing remains a manual database action.</p>
    {errorMessage && <p className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">Could not load review data: {errorMessage}</p>}
    <div className="mt-8 space-y-10">{sections.map((section) => <section key={section.title}><h2 className="text-xl font-bold text-slate-900">{section.title} ({section.rows.length})</h2><OpportunityTable rows={section.rows} /></section>)}</div>
  </main>;
}

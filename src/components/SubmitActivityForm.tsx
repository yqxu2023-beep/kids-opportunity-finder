"use client";

import { FormEvent, useState } from "react";

export function SubmitActivityForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = ["Provider submission", "", ...Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`)];
    const subject = "Provider submission - Kids Opportunity Finder";
    window.location.href = `mailto:kidsopportunityfinder@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("Your email app should open with the activity details. Review the message, then send it to complete your submission.");
  }

  const inputClass = "mt-2 w-full rounded-2xl border border-slate-200 bg-orange-50/50 px-4 py-3 outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100";

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_16px_42px_rgba(194,65,12,0.10)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-bold text-slate-800">Provider name<input required name="Provider name" className={inputClass} /></label>
        <label className="font-bold text-slate-800">Contact email<input required type="email" name="Contact email" className={inputClass} /></label>
      </div>
      <label className="font-bold text-slate-800">Activity name<input required name="Activity name" className={inputClass} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-bold text-slate-800">Category<select required name="Category" className={inputClass}><option value="">Choose one</option><option>Sports</option><option>Camps</option><option>Arts & Culture</option><option>Library Programs</option><option>Community & Family</option><option>Other</option></select></label>
        <label className="font-bold text-slate-800">City / community<input required name="City or community" className={inputClass} /></label>
        <label className="font-bold text-slate-800">Age range<input required name="Age range" placeholder="Example: 8-12" className={inputClass} /></label>
        <label className="font-bold text-slate-800">Cost<input required name="Cost" placeholder="Free or dollar amount" className={inputClass} /></label>
        <label className="font-bold text-slate-800">Start date<input type="date" name="Start date" className={inputClass} /></label>
        <label className="font-bold text-slate-800">End date<input type="date" name="End date" className={inputClass} /></label>
      </div>
      <label className="font-bold text-slate-800">Official or registration link<input required type="url" name="Official link" placeholder="https://" className={inputClass} /></label>
      <label className="font-bold text-slate-800">Description<textarea required name="Description" rows={5} className={inputClass} /></label>
      <label className="flex items-start gap-3 text-sm font-semibold text-slate-700"><input required type="checkbox" name="Information confirmed" value="Yes" className="mt-1 h-5 w-5" />I confirm that I represent this provider or have permission to share this public information.</label>
      <button className="min-h-12 rounded-full bg-orange-600 px-6 font-black text-white hover:bg-orange-700">Prepare submission email</button>
      {status ? <p role="status" className="rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-900">{status}</p> : null}
    </form>
  );
}

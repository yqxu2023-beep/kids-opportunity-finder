import type { ReactNode } from "react";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">{intro}</p>
      <div className="mt-8 grid gap-5 text-slate-700 [&_a]:font-bold [&_a]:text-sky-800 [&_a]:underline [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-slate-950 [&_p]:leading-7">{children}</div>
    </main>
  );
}

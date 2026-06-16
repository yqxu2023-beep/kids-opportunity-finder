import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-black text-slate-950">Page not found</h1>
      <p className="mt-3 text-slate-700">The opportunity you are looking for is not available.</p>
      <Link
        href="/opportunities"
        className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 font-bold text-white"
      >
        Browse opportunities
      </Link>
    </main>
  );
}

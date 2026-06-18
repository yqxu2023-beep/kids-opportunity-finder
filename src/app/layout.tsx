import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kids Opportunity Finder",
  description:
    "Find family-friendly activities, camps, sports, STEM programs, and youth opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <header className="sticky top-0 z-30 border-b border-rose-100 bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3 text-slate-950">
              <Link
                href="/opportunities"
                aria-label="Search opportunities"
                className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-600 text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-100"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10.5" cy="10.5" r="5.75" stroke="currentColor" strokeWidth="2.5" />
                  <path
                    d="m15 15 4.25 4.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </Link>
              <Link href="/" className="font-display text-base font-black tracking-tight sm:text-lg">
                Kids Opportunity Finder
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm font-black text-slate-700 sm:gap-6">
              <Link href="/opportunities" className="transition hover:text-rose-700">
                Browse
              </Link>
              <a
                href="mailto:hello@example.com?subject=Submit%20an%20Opportunity"
                className="transition hover:text-rose-700"
              >
                For Providers
              </a>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

import Link from "next/link";

const contactEmail = "kidsopportunityfinder@gmail.com";

const footerLinks = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/for-providers", label: "For Providers" },
  {
    href: `mailto:${contactEmail}?subject=Report%20an%20issue%20-%20Kids%20Opportunity%20Finder`,
    label: "Report an issue",
  },
  {
    href: `mailto:${contactEmail}?subject=Contact%20Kids%20Opportunity%20Finder`,
    label: "Contact",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-rose-100 bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="font-display text-base font-black tracking-tight text-slate-950 transition hover:text-rose-700"
            >
              Kids Opportunity Finder
            </Link>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Helping families discover kids and youth programs in Yellowknife.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-slate-700 sm:justify-end"
          >
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-rose-700">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
          &copy; 2026 Kids Opportunity Finder. Please confirm program details with the provider.
        </p>
      </div>
    </footer>
  );
}

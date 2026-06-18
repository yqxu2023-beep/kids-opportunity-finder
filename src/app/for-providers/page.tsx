import type { Metadata } from "next";
import { buildGmailComposeUrl, contactEmail } from "@/lib/email";

export const metadata: Metadata = {
  title: "For Providers | Kids Opportunity Finder",
  description:
    "Share your children and youth programs with local families through Kids Opportunity Finder.",
  alternates: { canonical: "/for-providers" },
};

const providerTypes = [
  "Libraries",
  "Schools",
  "Sports clubs",
  "Art and music programs",
  "Community organizations",
  "Non-profits",
  "Faith/community groups",
  "Government or city programs",
  "Any provider offering safe activities for children or youth",
];

const programDetails = [
  "Program name",
  "Organization name",
  "Age range",
  "Start date and end date",
  "Time",
  "Location / city",
  "Cost",
  "Registration link",
  "Contact email or phone",
  "Short description",
  "Poster or flyer image if available",
];

const reasonsToSubmit = [
  "Help local families find your programs",
  "Reach newcomers and busy parents",
  "Promote free and low-cost youth opportunities",
  "Keep community activity information easier to discover",
];

const submissionEmailBody = `Organization name:
Opportunity title:
Age range:
Dates:
Cost:
Location:
Registration link:
Contact info:
Notes:`;

const submissionEmailUrl = buildGmailComposeUrl(
  "Submit or Update an Opportunity",
  submissionEmailBody
);

export default function ForProvidersPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-700">
          Community partners
        </p>
        <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">
          For Providers
        </h1>
        <p className="mt-5 text-xl font-bold leading-8 text-slate-800">
          Share your children and youth programs with local families.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
          Kids Opportunity Finder helps parents discover activities, programs,
          camps, classes, and community opportunities for children and youth. If
          your organization offers programs for ages 0-18, you can share your
          information with us so families can find it more easily.
        </p>
      </header>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
        <ProviderCard title="Who can submit?" items={providerTypes} />
        <ProviderCard
          title="What information should providers include?"
          items={programDetails}
        />
        <ProviderCard title="Why submit?" items={reasonsToSubmit} />
      </div>

      <section className="mx-auto mt-10 max-w-3xl rounded-[1.5rem] border border-orange-200 bg-white p-6 text-center shadow-[0_14px_34px_rgba(194,65,12,0.10)] sm:p-8">
        <h2 className="text-2xl font-black text-slate-950">
          Ready to share your program?
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-700">
          Send us your opportunity details and help more families discover what
          your organization has to offer.
        </p>
        <a
          href={submissionEmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-lg font-semibold text-slate-950 shadow-[0_8px_18px_rgba(194,65,12,0.20)] transition hover:bg-orange-600 hover:shadow-[0_10px_22px_rgba(194,65,12,0.25)] focus:outline-none focus:ring-4 focus:ring-orange-200 sm:w-auto sm:min-w-72"
        >
          Submit an Opportunity
        </a>
        <p className="mt-3 text-sm text-slate-600">
          Or email{" "}
          <a className="font-bold text-rose-700 underline underline-offset-4" href={`mailto:${contactEmail}`}>
            {contactEmail}
          </a>
        </p>
      </section>
    </main>
  );
}

function ProviderCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-[1.35rem] border border-orange-100 bg-white p-6 shadow-[0_14px_34px_rgba(194,65,12,0.10)]">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <ul className="mt-5 grid gap-3 text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-6">
            <span
              aria-hidden="true"
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

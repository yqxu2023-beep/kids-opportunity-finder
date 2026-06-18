import Link from "next/link";
import { ActivityTrustLinks } from "@/components/ActivityTrustLinks";
import { HomeSearch } from "@/components/HomeSearch";
import { OpportunityStickerBadge } from "@/components/OpportunityStickerBadge";
import { InfoIcon } from "@/components/OpportunityUi";
import {
  getActiveOpportunities,
  getCategoryGroup,
  getCategoryIcon,
  getOpportunityCost,
  getProviderName,
  isOpportunityUpcoming,
  sortOpportunitiesByDate,
} from "@/lib/opportunities";
import type { Opportunity } from "@/types/opportunity";

function getCategoryCards(opportunities: Opportunity[]) {
  const getCategoryActivityCount = (category: string) =>
    opportunities.filter((item) => getCategoryGroup(item.category) === category).length;
  return [
  {
    title: "Sports",
    icon: getCategoryIcon("Sports"),
    description: "Active programs, teams, and beginner-friendly skill sessions.",
    href: "/opportunities?category=Sports",
    count: getCategoryActivityCount("Sports"),
    className: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Arts",
    icon: getCategoryIcon("Arts"),
    description: "Creative workshops, crafts, storytelling, and music activities.",
    href: "/opportunities?category=Arts",
    count: getCategoryActivityCount("Arts"),
    className: "bg-rose-50 text-rose-700",
  },
  {
    title: "Library",
    icon: getCategoryIcon("Library"),
    description: "Reading clubs, family programs, and free learning events.",
    href: "/opportunities?category=Library",
    count: getCategoryActivityCount("Library"),
    className: "bg-amber-50 text-amber-700",
  },
  {
    title: "Camps",
    icon: getCategoryIcon("Camps"),
    description: "Seasonal camps, weekend programs, and school-break ideas.",
    href: "/opportunities?category=Camps",
    count: getCategoryActivityCount("Camps"),
    className: "bg-orange-50 text-orange-700",
  },
  ].sort((first, second) => second.count - first.count || first.title.localeCompare(second.title));
}

const comingSoon = [
  {
    title: "Weekend Adventure Blind Box",
    description: "A playful future way to discover weekend ideas for the whole family.",
    accent: "bg-orange-400",
  },
  {
    title: "Skill Tree",
    description: "A visual path for connecting interests to activities and growing skills.",
    accent: "bg-emerald-400",
  },
  {
    title: "Gear Exchange",
    description: "A future community space for sharing activity gear families already have.",
    accent: "bg-sky-400",
  },
  {
    title: "Parent Comments & Feedback",
    description: "A future place for practical parent notes about programs and fit.",
    accent: "bg-rose-400",
  },
];

function parseLocalDate(value: string | undefined) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value: string | undefined) {
  const date = parseLocalDate(value);

  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getUpcomingActivities(opportunities: Opportunity[]) {
  return sortOpportunitiesByDate(opportunities)
    .filter((opportunity) => isOpportunityUpcoming(opportunity))
    .slice(0, 6);
}

function UpcomingCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article
      className="group flex h-full flex-col justify-between rounded-[1.6rem] border border-transparent bg-white p-5 shadow-[0_18px_42px_rgba(43,70,99,0.12)] transition duration-200 hover:translate-y-1 hover:border-orange-500 hover:shadow-[0_22px_48px_rgba(194,65,12,0.14)] focus:outline-none focus:ring-4 focus:ring-orange-100"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">
            {getCategoryIcon(opportunity.category)} {opportunity.category ?? "Other"}
          </span>
          <OpportunityStickerBadge opportunity={opportunity} />
        </div>
        <h3 className="mt-4 text-xl font-black leading-snug text-slate-950">
          <Link href={`/opportunities/${opportunity.slug}`} className="hover:text-orange-700">{opportunity.title}</Link>
        </h3>
        <p className="mt-1 text-sm font-bold text-slate-600">{getProviderName(opportunity)}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <InfoIcon name="age" />
            <div>
              <dt className="font-black text-slate-500">Ages</dt>
              <dd className="mt-1 text-slate-950">{opportunity.age_min ?? 0}-{opportunity.age_max ?? 18}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <InfoIcon name="calendar" />
            <div>
              <dt className="font-black text-slate-500">Starts</dt>
              <dd className="mt-1 text-slate-950">{formatDate(opportunity.start_date ?? undefined)}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <InfoIcon name="location" />
            <div>
              <dt className="font-black text-slate-500">City</dt>
              <dd className="mt-1 text-slate-950">{opportunity.city ?? "Unknown"}</dd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <InfoIcon name="cost" />
            <div>
              <dt className="font-black text-slate-500">Cost</dt>
              <dd className="mt-1 text-slate-950">{getOpportunityCost(opportunity)}</dd>
            </div>
          </div>
        </dl>
        <div className="mt-5 border-t border-slate-100 pt-4">
          <ActivityTrustLinks opportunity={opportunity} />
        </div>
      </div>

      <Link href={`/opportunities/${opportunity.slug}`} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-rose-50 px-4 text-sm font-black text-orange-700 transition group-hover:bg-orange-600 group-hover:text-white">
        View Details <span className="ml-2" aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default async function Home() {
  const opportunities = await getActiveOpportunities();
  const upcomingActivities = getUpcomingActivities(opportunities);
  const categoryCards = getCategoryCards(opportunities);

  return (
    <main>
      <section className="relative bg-[linear-gradient(135deg,#fff7ed_0%,#ffe4e6_48%,#fff1f2_100%)]">
        <div className="mx-auto max-w-6xl px-4 pb-28 pt-14 text-center sm:px-6 sm:pb-32 sm:pt-20">
          <Link
            href="/opportunities"
            className="hero-count-badge mx-auto inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-black focus:outline-none"
          >
            <span aria-hidden="true">🔎</span>
            <span>{opportunities.length} total opportunities waiting to be explored</span>
          </Link>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl">
            Find Kids Activities in <span className="text-orange-600">Yellowknife</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl">
            Discover activities, camps, STEM programs, sports, library events, and free
            opportunities in Yellowknife and beyond.
          </p>
          <Link
            href="/opportunities"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-orange-600 px-8 text-base font-black text-white shadow-[0_14px_32px_rgba(234,88,12,0.28)] transition hover:bg-orange-700"
          >
            Explore Activities
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 max-w-5xl px-4 sm:px-6">
        <HomeSearch />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="rounded-[1.5rem] border border-orange-100 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition duration-200 hover:translate-y-1 hover:border-orange-500 hover:shadow-[0_18px_44px_rgba(194,65,12,0.13)] focus:outline-none focus:ring-4 focus:ring-orange-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-2xl ${category.className}`}
                  >
                    {category.icon}
                  </span>
                  <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-black text-slate-600">
                    {category.count} activities
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-950">{category.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-rose-700">
                Plan your week
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Upcoming Activities
              </h2>
              <p className="mt-2 text-slate-700">Activities coming up soon in Yellowknife.</p>
            </div>
            <Link
              href="/opportunities"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:text-rose-700"
            >
              Browse all
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcomingActivities.map((opportunity) => (
              <UpcomingCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff7ed_0%,#fff1f2_100%)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-orange-700">
              Coming soon
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Ideas We Are Exploring
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {comingSoon.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-orange-100 bg-white/85 p-5 shadow-[0_14px_34px_rgba(194,65,12,0.08)]"
              >
                <div className={`h-2 w-16 rounded-full ${item.accent}`} />
                <h3 className="mt-5 text-lg font-black text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <h2 className="text-xl font-black">Kids Opportunity Finder</h2>
            <p className="mt-4 max-w-md leading-7 text-slate-300">
              Helping newcomer parents find trusted activities, programs, and free opportunities
              for kids in Yellowknife and nearby communities.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
              Quick Links
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-bold text-slate-200">
              <Link href="/opportunities" className="hover:text-white">
                Browse Activities
              </Link>
              <Link href="/free-activities" className="hover:text-white">
                Free Activities
              </Link>
              <Link href="/summer-camps" className="hover:text-white">Summer Camps</Link>
              <Link href="/teen-activities" className="hover:text-white">Teen Activities</Link>
              <Link href="/sports-programs" className="hover:text-white">Sports Programs</Link>
              <Link href="/after-school-programs" className="hover:text-white">After-School Programs</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">
              Support
            </h3>
            <div className="mt-4 grid gap-3 text-sm font-bold text-slate-200">
              <Link href="/submit-activity" className="hover:text-white">
                Submit an Opportunity
              </Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

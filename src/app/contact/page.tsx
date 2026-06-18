import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
export const metadata: Metadata = { title: "Contact | Kids Opportunity Finder", description: "Contact Kids Opportunity Finder about listings, corrections, or partnerships.", alternates: { canonical: "/contact" } };
export default function ContactPage() { return <InfoPage eyebrow="Get in touch" title="Contact" intro="Questions, corrections, and ideas from families and providers are welcome."><section><h2>General questions</h2><p>Email <a href="mailto:kidsopportunityfinder@gmail.com">kidsopportunityfinder@gmail.com</a>. Please avoid sending sensitive information about a child.</p></section><section><h2>Listing updates</h2><p>Use the “Report outdated info” link on an activity for the fastest review.</p></section><section><h2>Providers</h2><p><Link href="/submit-activity">Submit an activity</Link> with dates, ages, cost, and an official link.</p></section></InfoPage>; }

import { siteConfig } from "@/lib/site";

export const contactEmail = siteConfig.contactEmail;

export function buildGmailComposeUrl(subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

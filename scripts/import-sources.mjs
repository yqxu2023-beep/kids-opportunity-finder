import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";

import { createClient } from "@supabase/supabase-js";

const ENV_FILE = resolve(".env.local");
const SOURCES_FILE = resolve("data/sources/sources.json");
const ALLOWED_FIELDS = [
  "provider_name",
  "website_url",
  "facebook_url",
  "perfectmind_url",
  "contact_email",
  "source_type",
  "check_frequency",
  "last_checked_at",
  "active",
  "notes",
];
const VALID_FREQUENCIES = new Set(["weekly", "monthly", "seasonal"]);

function fail(message) {
  console.error(`Sources import failed: ${message}`);
  process.exitCode = 1;
}

async function main() {
  if (existsSync(ENV_FILE)) {
    loadEnvFile(ENV_FILE);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const missingVariables = [
    !supabaseUrl && "NEXT_PUBLIC_SUPABASE_URL",
    !serviceRoleKey && "SUPABASE_SERVICE_ROLE_KEY",
  ].filter(Boolean);

  if (missingVariables.length > 0) {
    throw new Error(`Missing required environment variable(s): ${missingVariables.join(", ")}`);
  }

  const parsed = JSON.parse(await readFile(SOURCES_FILE, "utf8"));
  if (!Array.isArray(parsed)) {
    throw new Error("data/sources/sources.json must contain a JSON array.");
  }

  const seenProviderNames = new Set();
  const sources = parsed.map((source, index) => {
    if (!source || typeof source !== "object" || Array.isArray(source)) {
      throw new Error(`Source ${index + 1} must be an object.`);
    }

    const providerName = source.provider_name;
    if (typeof providerName !== "string" || providerName.trim() === "") {
      throw new Error(`Source ${index + 1} is missing provider_name.`);
    }

    const normalizedName = providerName.trim();
    if (seenProviderNames.has(normalizedName)) {
      throw new Error(`Duplicate provider_name: ${normalizedName}`);
    }
    seenProviderNames.add(normalizedName);

    if (!VALID_FREQUENCIES.has(source.check_frequency)) {
      throw new Error(
        `Source "${normalizedName}" has an invalid check_frequency. Use weekly, monthly, or seasonal.`,
      );
    }

    return Object.fromEntries(
      ALLOWED_FIELDS.map((field) => [
        field,
        field === "provider_name" ? normalizedName : (source[field] ?? null),
      ]),
    );
  });

  console.log(`Total sources loaded: ${sources.length}`);
  if (sources.length === 0) {
    console.log("No sources to import.");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase
    .schema("public")
    .from("sources")
    .upsert(sources, { onConflict: "provider_name" })
    .select("provider_name");

  if (error) {
    throw error;
  }

  console.log(`Sources inserted/updated: ${data?.length ?? sources.length}`);
  console.log("Sources import completed successfully.");
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});

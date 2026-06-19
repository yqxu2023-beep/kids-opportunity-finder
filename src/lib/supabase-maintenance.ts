import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createMaintenanceClient(options: { requireServiceRole?: boolean } = {}): SupabaseClient | null {
  if (!supabaseUrl) return null;
  const key = options.requireServiceRole ? serviceRoleKey : serviceRoleKey ?? anonKey;
  if (!key) return null;

  return createClient(supabaseUrl, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

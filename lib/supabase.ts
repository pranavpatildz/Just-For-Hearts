import { createClient, SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and restart the server."
  )
}

if (process.env.NODE_ENV !== "production") {
  console.log("SUPABASE URL:", supabaseUrl)
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)
